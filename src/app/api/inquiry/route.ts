import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// @ts-expect-error - nodemailer is not typed
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      travelDate,
      message,
      inquiryType,
      // Visa specific fields
      country,
      visaType,
      // Tour specific fields
      tourTitle,
      tourDuration,
      tourPrice,
      travelers
    } = body;

    // Validate required fields
    if (!name || !email || !inquiryType) {
      return NextResponse.json(
        { error: 'Name, email, and inquiry type are required' },
        { status: 400 }
      );
    }

    // Create inquiry record in database
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        message: message || null,
        travelDate: travelDate || null,
        type: inquiryType.toUpperCase() as 'VISA' | 'TOUR',
        // Store type-specific data as JSON
        metadata: {
          ...(inquiryType === 'visa' && {
            country,
            visaType
          }),
          ...(inquiryType === 'tour' && {
            tourTitle,
            tourDuration,
            tourPrice,
            travelers: travelers ? parseInt(travelers) : 1
          })
        },
        status: 'NEW'
      }
    });

    // Send email notification using existing email system
    try {
      const transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_HOST,
          pass: process.env.EMAIL_PASS,
        },
      });

      if (inquiryType === 'visa') {
        // Send visa inquiry email
        await transporter.sendMail({
          from: `"Radiant Way Travel Website" <info@radiantwaytravel.com>`,
          to: "info@radiantwaytravel.com",
          subject: `New Visa Inquiry - ${country}`,
          html: `
            <div style="font-family: Arial, sans-serif; background: #fff; border-radius: 8px; border: 1px solid #eee; padding: 24px; max-width: 500px; margin: auto;">
              <h2 style="color: #008c95; margin-bottom: 16px;">New Visa Inquiry</h2>
              
              <!-- Visa Details -->
              <div style="background: #f8fffe; padding: 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #008c95;">
                <h3 style="color: #008c95; margin: 0 0 8px 0; font-size: 18px;">Visa Details</h3>
                <p style="margin: 4px 0; color: #333;"><strong>Country:</strong> ${country}</p>
                <p style="margin: 4px 0; color: #333;"><strong>Visa Type:</strong> ${visaType || 'Not specified'}</p>
                <p style="margin: 4px 0; color: #333;"><strong>Travel Date:</strong> ${travelDate || 'Not specified'}</p>
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
                  <td style="padding: 8px 0; font-weight: bold; color: #333; vertical-align: top;">Message:</td>
                  <td style="padding: 8px 0; color: #555;">${message ? message.replace(/\n/g, "<br>") : 'No additional message'}</td>
                </tr>
              </table>
              
              <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #999;">This inquiry was sent from the Radiant Way Travel website visa services form.</p>
            </div>
          `,
        });
      } else {
        // Send tour inquiry email
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
      }

      console.log('Email sent successfully for', inquiryType, 'inquiry');
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the inquiry if email fails
    }

    return NextResponse.json(
      { 
        message: 'Inquiry submitted successfully',
        inquiryId: inquiry.id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const where: any = {};
    if (type) where.type = type;
    if (status) where.status = status;

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
