import nodemailer from 'nodemailer';

export default async function contactHandler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message, captcha } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  // CAPTCHA removed: proceed without server-side captcha verification

  const mailHost = process.env.MAIL_HOST;
  const mailPort = process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 587;
  const mailUser = process.env.MAIL_USERNAME;
  const mailPass = process.env.MAIL_PASSWORD;
  const mailSecure = (process.env.MAIL_ENCRYPTION || '').toLowerCase() === 'ssl';

  if (!mailHost || !mailUser || !mailPass) {
    return res.status(500).json({ error: 'Mail server not configured' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: mailSecure,
      auth: { user: mailUser, pass: mailPass },
    });

    const from = process.env.MAIL_FROM || mailUser;
    const to = process.env.CONTACT_RECEIVER || mailUser;
    const subject = `New contact message from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const html = `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message}</p>`;

    await transporter.sendMail({ from, to, subject, text, html });
    return res.status(200).json({ message: 'Message sent' });
  } catch (err) {
    console.error('sendMail error', err);
    return res.status(500).json({ error: 'Failed to send email', details: String(err) });
  }
}
