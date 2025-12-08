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

        {/* Loading & Error States */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-accent rounded-full animate-spin" style={{ borderTopColor: 'var(--color-accent)' }}></div>
            <p className="text-gray-500 text-lg">Loading events...</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-12 space-y-4">
            <p className="text-red-500 text-lg font-semibold">{error}</p>
            <p className="text-gray-600 text-sm">Unable to load events. Please try again later or view all events below.</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {events.map((event: any) => (
              <Card
                key={event?.id}
                className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group"
              >
                {/* Event Image */}
                {event?.logo?.url ? (
                  <div className="w-full h-48 overflow-hidden bg-gray-200">
                    <img
                      src={event.logo.url}
                      alt={event?.name?.text || 'Event'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div
                    className="w-full h-48 flex items-center justify-center text-white font-semibold"
                    style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-accent))' }}
                  >
                    {event?.name?.text?.charAt(0) || 'E'}
                  </div>
                )}

                {/* Card Content */}
                <CardHeader className="pt-4">
                  <CardTitle
                    className="text-lg leading-tight line-clamp-2"
                    style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-text-default)' }}
                  >
                    {event?.name?.text || 'Untitled event'}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="space-y-3 text-sm">
                    {event?.start?.local && (
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                        <span style={{ color: 'var(--color-text-default)' }}>
                          {new Date(event.start.local).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                    {event?.venue?.address?.address_1 && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }} />
                        <span style={{ color: 'var(--color-text-default)' }} className="line-clamp-2">
                          {event.venue.address.address_1}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>

                {/* CTA Button */}
                <CardFooter className="pt-0">
                  <a
                    href={event?.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg"
                    style={{ background: 'var(--color-accent)' }}
                  >
                    View Event
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : null}

        {!loading && !error && events.length === 0 && (
          <div className="text-center py-16 space-y-6">
            <p className="text-gray-600 text-lg">No events found at the moment.</p>
            <p className="text-gray-500">Check back soon or visit our Eventbrite page for all upcoming events.</p>
          </div>
        )}

        {/* View All Events CTA */}
        <div className="flex justify-center mt-8">
          <a
            href="https://kaisg.eventbrite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 text-lg"
            style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-accent))' }}
          >
            {t('view_all_events')}
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
// ...existing code ends above. Removed unreachable/duplicate JSX below main return.