import nodemailer from "nodemailer";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

// Replace with your SMTP credentials
const smtpOptions = {
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || "465"),
  secure: parseInt(process.env.EMAIL_SERVER_PORT || "465") === 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
};

export const sendEmail = async (data: EmailPayload) => {
  console.log("📧 Email config:", {
    host: smtpOptions.host,
    port: smtpOptions.port,
    secure: smtpOptions.secure,
    user: smtpOptions.auth.user,
    hasPassword: !!smtpOptions.auth.pass,
  });

  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      ...data,
    });
    console.log("✅ Email sent:", result.messageId);
    return result;
  } catch (error: any) {
    console.error("❌ Email error:", error.message);
    throw error;
  }
};
