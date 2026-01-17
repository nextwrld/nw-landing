import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, message } = body;

    // Validación básica
    if (!fullName || !email || !message) {
      console.error("❌ Validation failed:", { fullName: !!fullName, email: !!email, message: !!message });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }


    // Enviar email
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    await sendEmail({
      to: process.env.EMAIL_FROM || "contact@nextwrld.com",
      subject: `New Contact Form: ${fullName}`,
      html: emailHtml,
    });

    console.log("✅ Email sent successfully!");

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error sending email:");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error.message,
        hint: "Check server logs for more details"
      },
      { status: 500 }
    );
  }
}
