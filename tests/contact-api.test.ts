import { describe, expect, it, beforeEach, vi } from "vitest";
import { NextRequest } from "next/server";
import { parseContactPayload } from "@/utils/contact";

const sendEmailMock = vi.hoisted(() => vi.fn());

vi.mock("@/utils/email", () => ({ sendEmail: sendEmailMock }));

const { POST } = await import("@/app/api/contact/route");

const post = (payload: unknown, rawBody?: string) => {
  const url = new URL("https://example.com/api/contact");
  const request = new NextRequest(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: rawBody ?? JSON.stringify(payload),
  });
  return POST(request);
};

const validPayload = {
  fullName: "Jane Doe",
  email: "jane@example.com",
  phone: "+58 412 000 0000",
  message: "Quiero agendar un diagnóstico operativo",
  source: "home",
};

const validWithoutSource = (() => {
  const { source: _source, ...rest } = validPayload;
  return rest;
})();

beforeEach(() => {
  sendEmailMock.mockReset();
});

describe("parseContactPayload", () => {
  it("accepts a complete valid payload and trims fields", () => {
    const result = parseContactPayload({
      ...validPayload,
      fullName: "  Jane Doe  ",
      email: "  jane@example.com  ",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.fullName).toBe("Jane Doe");
      expect(result.data.email).toBe("jane@example.com");
      expect(result.data.phone).toBe("+58 412 000 0000");
    }
  });

  it.each([
    [null, "payload"],
    ["string", "payload"],
    [[], "payload"],
    [{ ...validPayload, fullName: "" }, "name"],
    [{ ...validPayload, fullName: "   " }, "name"],
    [{ ...validPayload, fullName: "x".repeat(121) }, "name"],
    [{ ...validPayload, email: "not-an-email" }, "email"],
    [{ ...validPayload, message: "" }, "message"],
    [{ ...validPayload, message: "y".repeat(5001) }, "message"],
    [{ ...validWithoutSource }, "source"],
    [{ ...validPayload, source: "volver" }, "source"],
    [{ ...validPayload, unexpected: "x" }, "unexpected"],
    [{ ...validPayload, phone: 12345 }, "phone"],
    [{ ...validPayload, website: 42 }, "website"],
  ])("rejects malformed input %o", (payload, _case) => {
    const result = parseContactPayload(payload);
    expect(result.ok).toBe(false);
  });

  it("rejects prototype-related own keys", () => {
    const payload = JSON.parse(
      '{"fullName":"Jane Doe","email":"jane@example.com","phone":"+58 412","message":"Hola","source":"home","__proto__":{"evil":true}}'
    );
    const result = parseContactPayload(payload);
    expect(result.ok).toBe(false);
  });

  it("accepts empty phone and empty honeypot", () => {
    const result = parseContactPayload({ ...validPayload, phone: "", source: "contact" });
    expect(result.ok).toBe(true);
  });
});

describe("POST /api/contact", () => {
  it("returns 200 and sends email with source for a valid home payload", async () => {
    sendEmailMock.mockResolvedValue({ messageId: "test-1", response: "250 OK" });
    const res = await post(validPayload);
    expect(res.status).toBe(200);
    expect(sendEmailMock).toHaveBeenCalledTimes(1);
    const args = sendEmailMock.mock.calls[0][0] as { subject: string };
    expect(args.subject).toContain("[home]");
  });

  it.each(["contact", "diagnostico"])("sends email for valid source %s", async (source) => {
    sendEmailMock.mockResolvedValue({ messageId: "test-1" });
    const res = await post({ ...validPayload, source });
    expect(res.status).toBe(200);
    expect(sendEmailMock.mock.calls[0][0].subject).toContain(`[${source}]`);
  });

  it("does not send email when the honeypot is filled", async () => {
    const res = await post({ ...validPayload, website: "https://spam.example" });
    expect(res.status).toBe(200);
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it.each<[unknown, string]>([
    [{ ...validPayload, email: "bad" }, "invalid email"],
    [{ ...validPayload, fullName: "" }, "missing name"],
    [{ ...validPayload, secret: "x" }, "unexpected field"],
    [{ ...validPayload, message: "z".repeat(5001) }, "oversized message"],
    [{ ...validWithoutSource }, "missing source"],
    [null, "null body"],
    [[1, 2], "array body"],
  ])("returns 400 without sending for %s", async (payload, _label) => {
    const res = await post(payload);
    expect(res.status).toBe(400);
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("returns 400 for malformed JSON", async () => {
    const res = await post(undefined, "{not-json");
    expect(res.status).toBe(400);
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("returns 500 with a generic message when SMTP fails", async () => {
    sendEmailMock.mockRejectedValue(new Error("ECONNECTION smtp.example.com:465"));
    const res = await post(validPayload);
    expect(res.status).toBe(500);
    const body = (await res.json()) as Record<string, unknown>;
    expect(body.error).toBe("Something went wrong. Please try again later.");
    expect("details" in body).toBe(false);
    expect(JSON.stringify(body)).not.toContain("smtp.example.com");
    expect(JSON.stringify(body)).not.toContain("ECONNECTION");
  });
});