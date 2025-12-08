const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { name, email, companyName, message } = body;
  if (!name || !email || !companyName || !message) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
  }

  const mailHost = process.env.MAIL_HOST;
  const mailPort = process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 587;
  const mailUser = process.env.MAIL_USERNAME;
  const mailPass = process.env.MAIL_PASSWORD;
  const mailSecure = (process.env.MAIL_ENCRYPTION || '').toLowerCase() === 'ssl';

  if (!mailHost || !mailUser || !mailPass) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Mail server not configured' }) };
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
    const text = `Name: ${name}\nCompany: ${companyName}\nEmail: ${email}\n\n${message}`;
    const html = `<p><strong>Name:</strong> ${name}</p><p><strong>Company:</strong> ${companyName}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message}</p>`;

    await transporter.sendMail({ from, to, subject, text, html });
    return { statusCode: 200, body: JSON.stringify({ message: 'Message sent' }) };
  } catch (err) {
    console.error('sendMail error', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send email', details: String(err) }) };
  }
};
