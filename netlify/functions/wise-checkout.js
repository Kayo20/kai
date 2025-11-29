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
    console.log('WISE_API_TOKEN not configured; using basic payment link');
  }

  if (!planName || !amount) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing planName or amount' }) };
  }

  try {
    // Use Wise's direct payment/request money link format
    // This creates a direct payment request that users can pay without login
    const wiseLink = `https://wise.com/request-money?sourceAmount=${encodeURIComponent(amount)}&sourceCurrency=${encodeURIComponent(currency)}&targetCurrency=${encodeURIComponent(currency)}`;
    return { statusCode: 200, body: JSON.stringify({ success: true, url: wiseLink, planName, amount, currency }) };
  } catch (err) {
    console.error('wise checkout error', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to generate Wise checkout', details: String(err) }) };
  }
};
