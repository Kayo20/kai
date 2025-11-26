export default async function wiseHandler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { planName, amount, currency = 'USD' } = req.body;
  const token = process.env.WISE_API_TOKEN;

  if (!token) {
    console.error('WISE_API_TOKEN not configured');
    return res.status(500).json({ error: 'Wise payment not configured' });
  }

  if (!planName || !amount) {
    return res.status(400).json({ error: 'Missing planName or amount' });
  }

  try {
    console.log(`Creating Wise payment for ${planName} - ${amount} ${currency}`);

    // Generate a Wise payment link
    // Format: https://wise.com/send?amount={amount}&currency={currency}
    const wiseLink = `https://wise.com/send?amount=${amount}&currency=${currency}`;

    res.json({
      success: true,
      url: wiseLink,
      planName: planName,
      amount: amount,
      currency: currency,
    });
  } catch (err) {
    console.error('wise checkout error', err);
    return res.status(500).json({ error: 'Failed to generate Wise checkout', details: String(err) });
  }
}
