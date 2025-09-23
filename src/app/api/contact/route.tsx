import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { ContactMessageFormData } from "@/types/contactMessage";

export async function POST(req: Request) {
  try {
    const {
      fullName,
      email,
      phone,
      serviceInterest,
      message,
    }: ContactMessageFormData = await req.json();

    // Validate required fields
    if (!fullName || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }

    // Store in database first
    let contactMessage;
    try {
      contactMessage = await prisma.contactMessage.create({
        data: {
          fullName,
          email,
          phone: phone || null,
          serviceInterest: serviceInterest || null,
          message,
          status: "unread",
        },
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save message to database" }),
        { status: 500 },
      );
    }

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Radiant Way Travel Website" <info@radiantwaytravel.com>`,
        to: "info@radiantwaytravel.com",
        subject: `New Contact Form Submission - ${fullName}`,
        html: `
          <div style="font-family: Arial, sans-serif; background: #fff; border-radius: 8px; border: 1px solid #eee; padding: 24px; max-width: 500px; margin: auto;">
            <h2 style="color: #008c95; margin-bottom: 16px;">New Contact Form Submission</h2>
            <div style="background: #f8f9fa; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
              <strong>Message ID:</strong> ${contactMessage.id}
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Name:</td>
                <td style="padding: 8px 0; color: #555;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; color: #555;"><a href="mailto:${email}" style="color: #008c95;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
                <td style="padding: 8px 0; color: #555;">${phone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Service Interest:</td>
                <td style="padding: 8px 0; color: #555;">${serviceInterest || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; vertical-align: top;">Message:</td>
                <td style="padding: 8px 0; color: #555;">${message.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #999;">
              This message was sent from the Radiant Way Travel website contact form.<br>
              <strong>Submitted:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
      // Don't fail the request if email fails, but log it
      // The message is already saved in the database
    }

    return new Response(
      JSON.stringify({
        success: true,
        messageId: contactMessage.id,
        message: "Message sent successfully",
      }),
      { status: 200 },
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to process contact form" }),
      { status: 500 },
    );
  }
}
