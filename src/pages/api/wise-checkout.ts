// API route for Wise payment link generation
// This handler respects a `WISE_API_TOKEN` env var. If not present, it returns a safe stub URL.
// For production, implement the Wise API flow on the server and do NOT expose secrets to the client.

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.WISE_API_TOKEN;
  // Basic request validation (amount, currency) can be added here
  if (!token) {
    // No token configured — return a static/fallback URL the frontend can use for testing
    return res.status(200).json({ url: 'https://wise.com/pay/example' });
  }

  // Token is present but full Wise integration is environment-specific and requires account setup.
  // Implement the API call below following Wise's documentation for payment link / transfer creation.
  // NOTE: Do NOT echo the token back to the client.

  try {
    // Placeholder behavior: production implementation should create a payment with Wise and return the payment link.
    // For now return a success marker and instruct deployer to implement the Wise flow.
    return res.status(200).json({ url: 'https://wise.com/pay/example', note: 'WISE_API_TOKEN is set — implement server-side Wise integration to create a real checkout link.' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate Wise checkout', details: String(err) });
  }
}
