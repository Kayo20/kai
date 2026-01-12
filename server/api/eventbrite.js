// Eventbrite API handler
// Fetches events from Eventbrite using the API key from environment variables

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const eventbriteClient = process.env.EVENTBRITE_CLIENT;
  if (!eventbriteClient) {
    return res.status(500).json({ error: 'Eventbrite API key not configured' });
  }

  try {
    // Fetch user's organizations first to get organization ID
    const orgResponse = await fetch('https://www.eventbriteapi.com/v3/users/me/organizations/', {
      headers: {
        'Authorization': `Bearer ${eventbriteClient}`,
        'Content-Type': 'application/json',
      },
    });

    if (!orgResponse.ok) {
      console.error('Eventbrite org fetch error:', orgResponse.status);
      return res.status(500).json({ error: 'Failed to fetch Eventbrite organizations' });
    }

    const orgData = await orgResponse.json();
    if (!orgData.organizations || orgData.organizations.length === 0) {
      return res.status(404).json({ error: 'No Eventbrite organization found' });
    }

    const orgId = orgData.organizations[0].id;

    // Fetch events for the organization
    const eventsResponse = await fetch(
      `https://www.eventbriteapi.com/v3/organizations/${orgId}/events/`,
      {
        headers: {
          'Authorization': `Bearer ${eventbriteClient}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!eventsResponse.ok) {
      console.error('Eventbrite events fetch error:', eventsResponse.status);
      return res.status(500).json({ error: 'Failed to fetch Eventbrite events' });
    }

    const eventsData = await eventsResponse.json();
    res.json(eventsData);
  } catch (err) {
    console.error('Eventbrite handler error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
