import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/email";

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
  try {
    const body = await request.json();
    const { fullName, email, phone, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message)}</p>
    `;

    await sendEmail({
      to: process.env.EMAIL_FROM || "contact@nextwrld.com",
      subject: `New Contact Form: ${escapeHtml(fullName)}`,
      html: emailHtml,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (process.env.NODE_ENV !== "production") {
      console.error("Error sending email:", message);
    }
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: message,
      },
      { status: 500 }
    );
  }
}
