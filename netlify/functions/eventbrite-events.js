exports.handler = async function(event, context) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // Accept either EVENTBRITE_TOKEN (preferred, personal OAuth token) or EVENTBRITE_CLIENT (legacy name)
  const eventbriteToken = process.env.EVENTBRITE_TOKEN || process.env.EVENTBRITE_CLIENT;
  if (!eventbriteToken) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Eventbrite API token not configured' }) };
  }
  console.log('Using Eventbrite token env var:', !!process.env.EVENTBRITE_TOKEN ? 'EVENTBRITE_TOKEN' : (process.env.EVENTBRITE_CLIENT ? 'EVENTBRITE_CLIENT' : 'none'));

  try {
    const orgResponse = await fetch('https://www.eventbriteapi.com/v3/users/me/organizations/', {
      headers: {
        'Authorization': `Bearer ${eventbriteToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!orgResponse.ok) {
      console.error('Eventbrite org fetch error:', orgResponse.status);
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch Eventbrite organizations' }) };
    }

    const orgData = await orgResponse.json();
    if (!orgData.organizations || orgData.organizations.length === 0) {
      return { statusCode: 404, body: JSON.stringify({ error: 'No Eventbrite organization found' }) };
    }

    const orgId = orgData.organizations[0].id;

    const eventsResponse = await fetch(`https://www.eventbriteapi.com/v3/organizations/${orgId}/events/`, {
      headers: {
        'Authorization': `Bearer ${eventbriteToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!eventsResponse.ok) {
      const text = await eventsResponse.text().catch(() => null);
      console.error('Eventbrite events fetch error:', eventsResponse.status, text);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'Failed to fetch Eventbrite events', status: eventsResponse.status, details: text }),
      };
    }

    const eventsData = await eventsResponse.json();
    return { statusCode: 200, body: JSON.stringify(eventsData) };
  } catch (err) {
    console.error('Eventbrite handler error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
