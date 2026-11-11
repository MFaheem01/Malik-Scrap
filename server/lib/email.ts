import nodemailer from 'nodemailer';

const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = Number(process.env.SMTP_PORT) || 465;
const smtpSecure = process.env.SMTP_SECURE !== 'false';
const smtpUser = process.env.SMTP_USER || 'oyit8t@gmail.com';
const smtpPass = (process.env.SMTP_PASS || 'ljmf fifi bzgg fqvf').replace(/\s+/g, '');
const notificationEmail = process.env.NOTIFICATION_EMAIL || 'oyit8t@gmail.com';

export function createMailTransporter() {
  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

export interface LeadEmailPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  date?: string;
}

/**
 * Send notification email when a user submits a scrap purchase inquiry
 */
export async function sendLeadNotifications(payload: LeadEmailPayload): Promise<boolean> {
  try {
    const transporter = createMailTransporter();

    const timestamp = payload.date || new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' });

    // 1. Notification to the Admin / Malik Scrap Team
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #ea580c; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 22px;">🔔 New Scrap Metal Inquiry Received!</h2>
          <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">Malik Scrap Metal Buyers — Lead Dispatch System</p>
        </div>
        <div style="padding: 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
          <p style="font-size: 16px; font-weight: bold; margin-top: 0; color: #0f172a;">A new seller has requested a scrap valuation or container pickup:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #64748b;">Seller Name:</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${payload.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Email Address:</td>
              <td style="padding: 10px 0; color: #ea580c; font-weight: 600;"><a href="mailto:${payload.email}" style="color: #ea580c; text-decoration: none;">${payload.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Phone / Mobile:</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${payload.phone || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Scrap Type / Subject:</td>
              <td style="padding: 10px 0; font-weight: bold; color: #0f172a;">${payload.subject || 'General Scrap Purchase'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Submission Time:</td>
              <td style="padding: 10px 0; color: #64748b;">${timestamp}</td>
            </tr>
          </table>

          <div style="background-color: #f8fafc; border-left: 4px solid #ea580c; padding: 14px; margin-top: 16px; border-radius: 4px;">
            <div style="font-weight: bold; color: #334155; margin-bottom: 6px;">Message / Quantity Details:</div>
            <div style="color: #475569; white-space: pre-line;">${payload.message || 'No additional details specified.'}</div>
          </div>

          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${payload.email}?subject=RE: Scrap Valuation - Malik Scrap Metal" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 12px 24px; border-radius: 6px; font-weight: bold; text-decoration: none;">Reply Directly to Customer</a>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #94a3b8;">
          Automated notification delivered by Malik Scrap Portal via NodeMailer.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Malik Scrap Alert" <${smtpUser}>`,
      to: notificationEmail,
      subject: `🔥 New Scrap Inquiry: ${payload.subject || payload.name}`,
      html: adminHtml,
    });

    // 2. Automated Confirmation Receipt to the Customer
    try {
      const customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
          <div style="background-color: #0f172a; color: #ffffff; padding: 24px; text-align: center; border-bottom: 3px solid #ea580c;">
            <h2 style="margin: 0; font-size: 24px; color: #ffffff;">Malik <span style="color: #ea580c;">Scrap Metal Buyers</span></h2>
            <p style="margin: 6px 0 0; font-size: 13px; color: #cbd5e1;">Industrial & Commercial Scrap Metal Purchase</p>
          </div>
          <div style="padding: 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
            <p style="font-size: 16px;">Dear <strong>${payload.name}</strong>,</p>
            <p>Thank you for reaching out to <strong>Malik Scrap Metal Buyers</strong>. We have received your scrap valuation request regarding <strong>${payload.subject || 'your metal scrap'}</strong>.</p>
            
            <p>Our industrial valuation and dispatch team is currently reviewing your details. A certified representative will contact you via phone or email shortly with our daily buying price and container pickup availability.</p>

            <div style="background-color: #fff7ed; border: 1px solid #ffedd5; padding: 14px; border-radius: 6px; margin: 18px 0;">
              <h4 style="margin: 0 0 6px; color: #9a3412;">Need Immediate Dispatch Assistance?</h4>
              <p style="margin: 0; color: #c2410c; font-size: 13px;">Call our 24/7 Scrap Dispatch Hotline directly at: <strong>+971 50 436 3615</strong></p>
            </div>

            <p style="font-size: 12px; color: #64748b; margin-top: 20px;">
              Yard Location: Dubai Industrial City, Phase 2, Dubai, United Arab Emirates.<br>
              Certified 100-Ton Digital Weighbridge open 24/7.
            </p>
          </div>
          <div style="background-color: #f8fafc; padding: 14px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9;">
            © ${new Date().getFullYear()} Malik Scrap Metal Buyers. All rights reserved.
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Malik Scrap Metal Buyers" <${smtpUser}>`,
        to: payload.email,
        subject: `We Received Your Scrap Inquiry — Malik Scrap Metal Buyers`,
        html: customerHtml,
      });
    } catch (custErr) {
      console.warn('[NodeMailer] Could not send customer confirmation email:', custErr);
    }

    return true;
  } catch (err) {
    console.error('[NodeMailer] Failed to send email notification:', err);
    return false;
  }
}

