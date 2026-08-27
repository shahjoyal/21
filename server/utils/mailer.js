import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }
  return transporter;
}

export async function sendOtpEmail(toEmail, name, otp) {
  const t = getTransporter();

  if (!t) {
    // No Gmail credentials configured yet — log to console so local/dev testing still works.
    console.warn(
      `[mailer] GMAIL_USER / GMAIL_APP_PASSWORD not set. OTP for ${toEmail} is: ${otp} (valid 10 minutes)`
    );
    return { delivered: false };
  }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#FAF7F2;border-radius:16px;border:1px solid #E89A25;">
      <h2 style="color:#134e48;margin-bottom:4px;">२१ कळ्या Modak Studio</h2>
      <p style="color:#444;font-size:14px;">Namaskar ${name || ''},</p>
      <p style="color:#444;font-size:14px;">Use the code below to verify your email address. It is valid for 10 minutes.</p>
      <div style="font-size:32px;font-weight:900;letter-spacing:8px;color:#134e48;background:#fff;padding:14px 0;text-align:center;border-radius:12px;border:1px dashed #E89A25;margin:16px 0;">
        ${otp}
      </div>
      <p style="color:#888;font-size:12px;">If you did not request this, you can safely ignore this email.</p>
    </div>
  `;

  await t.sendMail({
    from: `"21 Kalya Modak Studio" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: `Your OTP code: ${otp}`,
    html,
  });

  return { delivered: true };
}
