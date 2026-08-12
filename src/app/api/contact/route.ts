import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/email";
import { parseContactPayload } from "@/utils/contact";

const escapeHtml = (input: unknown): string => {
  if (typeof input !== "string") return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const parsed = parseContactPayload(body);
  if (!parsed.ok) {
    console.error(`[contact] rejected payload: ${parsed.reason}`);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }

  const { fullName, email, phone, message, source, website } = parsed.data;

  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  }

  const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Origin:</strong> ${escapeHtml(source)}</p>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message)}</p>
    `;

  try {
    await sendEmail({
      to: process.env.EMAIL_FROM || "contact@nextwrld.com",
      subject: `[${source}] New Contact Form: ${escapeHtml(fullName)}`,
      html: emailHtml,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[contact] failed to send email (source=${source}):`, message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: "Message sent successfully" },
    { status: 200 }
  );
}