exports.handler = async function(event, context) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const msBookingsUrl = process.env.MS_BOOKINGS_URL;
  if (!msBookingsUrl) {
    return { statusCode: 404, body: JSON.stringify({ error: 'MS Bookings URL not configured' }) };
  }

  return { statusCode: 200, body: JSON.stringify({ url: msBookingsUrl }) };
};
