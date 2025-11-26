import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Proxy API routes to local handlers implemented in src/pages/api
import contactHandler from './api/contact.js';
import wiseHandler from './api/wise-checkout.js';
import eventbriteHandler from './api/eventbrite.js';

app.post('/api/contact', async (req, res) => {
  // Adapt Next request/response to express
  try {
    // next handler expects (req, res) shaped like NextApiRequest/NextApiResponse
    await contactHandler(req, res);
  } catch (err) {
    console.error('contact handler error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/wise-checkout', async (req, res) => {
  try {
    await wiseHandler(req, res);
  } catch (err) {
    console.error('wise handler error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// MS Bookings endpoint
app.get('/api/ms-bookings', (req, res) => {
  const msBookingsUrl = process.env.MS_BOOKINGS_URL;
  console.log('MS Bookings URL from env:', msBookingsUrl);
  if (!msBookingsUrl) {
    console.error('MS_BOOKINGS_URL not configured');
    return res.status(404).json({ error: 'MS Bookings URL not configured' });
  }
  res.json({ url: msBookingsUrl });
});

// Eventbrite endpoint
app.get('/api/eventbrite-events', async (req, res) => {
  try {
    await eventbriteHandler(req, res);
  } catch (err) {
    console.error('eventbrite handler error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT_API || 5178;
app.listen(port, () => console.log(`Dev API server listening on http://localhost:${port}`));
