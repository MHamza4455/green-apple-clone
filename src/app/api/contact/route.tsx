import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, serviceInterest, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_HOST,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Radiant Way Travel Website" <info@radiantwaytravel.com>`,
      to: "info@radiantwaytravel.com",
      subject: `New Contact Form Submission`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #fff; border-radius: 8px; border: 1px solid #eee; padding: 24px; max-width: 500px; margin: auto;">
          <h2 style="color: #008c95; margin-bottom: 16px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #333;">Name:</td>
              <td style="padding: 8px 0; color: #555;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 8px 0; color: #555;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
              <td style="padding: 8px 0; color: #555;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #333;">Service Interest:</td>
              <td style="padding: 8px 0; color: #555;">${serviceInterest || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #333; vertical-align: top;">Message:</td>
              <td style="padding: 8px 0; color: #555;">${message.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #999;">This message was sent from the Radiant Way Travel website contact form.</p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Email error:", err);
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }
}
