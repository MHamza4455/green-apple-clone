import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, travelDate, travelers, tourTitle, tourDuration, tourPrice } = await req.json();

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
      subject: `New Tour Inquiry - ${tourTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #fff; border-radius: 8px; border: 1px solid #eee; padding: 24px; max-width: 500px; margin: auto;">
          <h2 style="color: #008c95; margin-bottom: 16px;">New Tour Inquiry</h2>
          
          <!-- Tour Details -->
          <div style="background: #f8fffe; padding: 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #008c95;">
            <h3 style="color: #008c95; margin: 0 0 8px 0; font-size: 18px;">Tour Details</h3>
            <p style="margin: 4px 0; color: #333;"><strong>Tour:</strong> ${tourTitle}</p>
            <p style="margin: 4px 0; color: #333;"><strong>Duration:</strong> ${tourDuration}</p>
            <p style="margin: 4px 0; color: #333;"><strong>Price:</strong> ${tourPrice}</p>
          </div>

          <!-- Customer Information -->
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #333;">Name:</td>
              <td style="padding: 8px 0; color: #555;">${name}</td>
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
              <td style="padding: 8px 0; font-weight: bold; color: #333;">Travel Date:</td>
              <td style="padding: 8px 0; color: #555;">${travelDate || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #333;">Number of Travelers:</td>
              <td style="padding: 8px 0; color: #555;">${travelers}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #333; vertical-align: top;">Message:</td>
              <td style="padding: 8px 0; color: #555;">${message ? message.replace(/\n/g, "<br>") : 'No additional message'}</td>
            </tr>
          </table>
          
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #999;">This inquiry was sent from the Radiant Way Travel website tour inquiry form.</p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Tour inquiry email error:", err);
    return new Response(JSON.stringify({ error: "Failed to send tour inquiry" }), { status: 500 });
  }
}
