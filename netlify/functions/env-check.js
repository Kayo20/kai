exports.handler = async function (event, context) {
  // Returns presence (true/false) of key env variables to help debug deployment
  const keys = [
    'EVENTBRITE_CLIENT',
    'EVENTBRITE_SECRET',
    'WISE_API_TOKEN',
    'MS_BOOKINGS_URL',
    'MAIL_HOST',
    'MAIL_PORT',
    'MAIL_USERNAME',
    'MAIL_PASSWORD',
    'MAIL_FROM',
    'CONTACT_RECEIVER',
  ];

  const result = {};
  keys.forEach((k) => {
    result[k] = !!process.env[k];
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, env: result }),
  };
};
