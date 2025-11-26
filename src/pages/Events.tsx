import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

export default function EventsPage() {
  const { t } = useLanguage();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/.netlify/functions/eventbrite-events')
      .then(async (res) => {
        const text = await res.text();
        let data = null;
        try {
          data = text ? JSON.parse(text) : null;
        } catch (e) {
          // non-JSON response
        }
        if (!res.ok) {
          console.error('Event fetch failed', res.status, data || text);
          throw new Error((data && (data.error || JSON.stringify(data))) || text || `Status ${res.status}`);
        }
        return data;
      })
      .then((data) => {
        if (!data) {
          setEvents([]);
          setError('No events data');
          setLoading(false);
          return;
        }
        // Eventbrite returns an "events" array; some endpoints return differently
        if (data.events) {
          setEvents(data.events);
        } else {
          setEvents(data.events || []);
          if ((data.events || []).length === 0) setError('No events found');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
        setError(String(err.message || err));
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen py-12" style={{ background: 'var(--color-bg-light)' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-text-default)' }}
          >
            {t('nav.events')}
          </h1>
        </div>

        {/* Events Grid */}
        {loading && <p className="text-center text-gray-500">Loading events...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {events.map((event) => (
              <Card key={event.id} className="hover-lift flex flex-col">
                {event.logo && (
                  <div className="w-full h-40 overflow-hidden rounded-t-lg">
                    <img
                      src={event.logo.url}
                      alt={event.name.text}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg" style={{ fontFamily: 'M PLUS Rounded 1c' }}>
                    {event.name.text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-2 text-sm">
                    {event.start && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.start.local).toLocaleDateString()}</span>
                      </div>
                    )}
                    {event.venue && event.venue.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.venue.address.address_1}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white transition"
                    style={{ background: 'var(--color-accent)' }}
                  >
                    View Event <ExternalLink className="w-4 h-4" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : null}

        {/* Eventbrite link */}
        <div className="text-center">
          <a
            href="https://www.eventbrite.com/o/kai-events"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-lg text-white transition"
            style={{ background: 'var(--color-accent)' }}
          >
            {t('view_all_events')} <ExternalLink className="w-4 h-4 inline ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
}
// ...existing code ends above. Removed unreachable/duplicate JSX below main return.