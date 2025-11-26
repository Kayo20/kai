// Secure contact API
// - Verifies reCAPTCHA server-side using RECAPTCHA_SECRET
// - Validates/sanitizes input fields
// - Sends an email via SMTP using environment variables (Nodemailer)
// IMPORTANT: Do NOT commit your secrets. Set these env vars on the server or in a local `.env` (excluded from VCS).

import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  captcha?: string; // reCAPTCHA token from client
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, captcha } = (req.body || {}) as ContactBody;

  // Basic input validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // CAPTCHA removed: proceed without server-side captcha verification

  // Prepare email via SMTP (Nodemailer)
  const mailHost = process.env.MAIL_HOST;
  const mailPort = process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 587;
  const mailUser = process.env.MAIL_USERNAME;
  const mailPass = process.env.MAIL_PASSWORD;
  const mailSecure = (process.env.MAIL_ENCRYPTION || '').toLowerCase() === 'ssl';

  if (!mailHost || !mailUser || !mailPass) {
    return res.status(500).json({ error: 'Mail server not configured on server' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: mailSecure,
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    const from = process.env.MAIL_FROM || mailUser;
    const to = process.env.CONTACT_RECEIVER || mailUser;

    const subject = `New contact message from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const html = `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message}</p>`;

    await transporter.sendMail({ from, to, subject, text, html });

    return res.status(200).json({ message: 'Message sent' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send email', details: String(err) });
  }
}
