exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { planName, amount, currency = 'USD' } = body;
  const token = process.env.WISE_API_TOKEN;

  if (!token) {
    console.error('WISE_API_TOKEN not configured');
    // Still allow a simple checkout link even without token
  }

  if (!planName || !amount) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing planName or amount' }) };
  }

  try {
    const wiseLink = `https://wise.com/send?amount=${encodeURIComponent(amount)}&currency=${encodeURIComponent(currency)}`;
    return { statusCode: 200, body: JSON.stringify({ success: true, url: wiseLink, planName, amount, currency }) };
  } catch (err) {
    console.error('wise checkout error', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to generate Wise checkout', details: String(err) }) };
  }
};
