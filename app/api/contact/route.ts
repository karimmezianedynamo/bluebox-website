import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const BLOCKED_DOMAINS = [
  "gmail.com", "googlemail.com",
  "hotmail.com", "hotmail.fr", "hotmail.co.uk",
  "outlook.com", "outlook.fr",
  "yahoo.com", "yahoo.fr",
  "live.com", "live.fr",
  "icloud.com", "me.com",
  "msn.com", "laposte.net", "free.fr",
  "orange.fr", "sfr.fr", "wanadoo.fr",
];

export async function POST(req: NextRequest) {
  const { fullName, companyName, email, phone, message } = await req.json();

  const domain = email?.split("@")[1]?.toLowerCase();
  if (BLOCKED_DOMAINS.includes(domain)) {
    return NextResponse.json(
      { error: "Please use a professional email address." },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"BlueBox Website" <${process.env.SMTP_USER}>`,
    to: "contact@blueboxgroup.io",
    replyTo: email,
    subject: `New contact request from ${fullName} – ${companyName}`,
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Company:</strong> ${companyName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  });

  return NextResponse.json({ success: true });
}
