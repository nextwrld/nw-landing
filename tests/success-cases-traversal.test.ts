import fs from "fs";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import {
  getAllSuccessCases,
  getSuccessCaseBySlug,
  getPostBySlug,
  getSuccessCaseSlugs,
} from "@/utils/markdown";
import { InvalidContentPathError } from "@/utils/validate";
import { GET as getSuccessCase } from "@/app/api/success-cases/[slug]/route";

let readSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  readSpy = vi.spyOn(fs, "readFileSync");
});

afterEach(() => {
  readSpy.mockRestore();
});

describe("markdown loader path validation", () => {
  it.each(["es", "en"] as const)("reads an existing success case for locale %s", (locale) => {
    const result = getSuccessCaseBySlug("crm", locale, ["title"]);
    expect(result?.title).toBeTruthy();
    expect(readSpy).toHaveBeenCalled();
  });

  it("returns null for a well-formed but unknown slug", () => {
    expect(getSuccessCaseBySlug("does-not-exist", "es", ["title"])).toBeNull();
  });

  it.each(["../blogs", "..", "../../", "foo", "es/../blogs", "ES", "es ", ""])(
    "rejects unsupported locale %j before disk access",
    (locale) => {
      readSpy.mockClear();
      expect(() => getSuccessCaseBySlug("crm", locale as never, ["title"])).toThrow(
        InvalidContentPathError
      );
      expect(readSpy).not.toHaveBeenCalled();
    }
  );

  it.each(["..", "../blogs", "../../", "foo/bar", "foo\\bar", "crm.mdx", "", "%2e%2e"])(
    "rejects invalid slug %j before disk access",
    (slug) => {
      readSpy.mockClear();
      expect(() => getSuccessCaseBySlug(slug, "es", ["title"])).toThrow(
        InvalidContentPathError
      );
      expect(readSpy).not.toHaveBeenCalled();
    }
  );

  it("list slugs only for supported locales", () => {
    expect(getSuccessCaseSlugs("es")).toEqual(expect.arrayContaining(["crm"]));
    expect(() => getSuccessCaseSlugs("abc" as never)).toThrow(InvalidContentPathError);
  });

  it("getAllSuccessCases works per locale with clean slugs", () => {
    const cases = getAllSuccessCases("en", ["slug", "title"]);
    expect(cases.length).toBeGreaterThan(0);
    for (const item of cases) {
      expect(item.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(item.title).toBeTruthy();
    }
  });

  it("rejects blog slugs before disk access", () => {
    readSpy.mockClear();
    expect(() => getPostBySlug("../blogs/contact-form", [])).toThrow(
      InvalidContentPathError
    );
    expect(readSpy).not.toHaveBeenCalled();
  });
});

describe("success case API locale/slug validation", () => {
  const callGet = async (slug: string, query: Record<string, string>) => {
    const url = new URL("https://example.com/api/success-cases/" + slug);
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value);
    }
    const request = new NextRequest(url);
    return getSuccessCase(request, { params: Promise.resolve({ slug }) });
  };

  it("serves crm for locale=es", async () => {
    readSpy.mockClear();
    const res = await callGet("crm", { locale: "es" });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.title).toBeTruthy();
    expect(body.content).toContain("<");
  });

  it("serves crm for locale=en", async () => {
    const res = await callGet("crm", { locale: "en" });
    expect(res.status).toBe(200);
  });

  it("defaults to es when locale is missing", async () => {
    const res = await callGet("crm", {});
    expect(res.status).toBe(200);
  });

  it.each(["../blogs", "../../", "foo", ""])(
    "rejects locale %j with 400 before disk access",
    async (locale) => {
      readSpy.mockClear();
      const res = await callGet("crm", { locale });
      expect(res.status).toBe(400);
      expect(readSpy).not.toHaveBeenCalled();
    }
  );

  it.each(["../blogs", "foo/bar", "crm.mdx", "..", "..%2Fblogs"])(
    "rejects slug %j with 400 before disk access",
    async (slug) => {
      readSpy.mockClear();
      const res = await callGet(slug, { locale: "es" });
      expect(res.status).toBe(400);
      expect(readSpy).not.toHaveBeenCalled();
    }
  );

  it("returns 404 for a valid but missing slug", async () => {
    const res = await callGet("does-not-exist", { locale: "es" });
    expect(res.status).toBe(404);
  });
});