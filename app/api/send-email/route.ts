import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "New Consultation Booking",
      html: `
        <h2>New Consultation Request</h2>
        <p><b>Name:</b> ${data.firstName} ${data.lastName}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Education:</b> ${data.education}</p>
        <p><b>Country:</b> ${data.country}</p>
        <p><b>Preferred Country:</b> ${data.preferredCountry}</p>
        <p><b>Study Level:</b> ${data.studyLevel}</p>
        <p><b>Intake Year:</b> ${data.intakeYear}</p>
        <p><b>Date:</b> ${data.date}</p>
        <p><b>Time:</b> ${data.time}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
