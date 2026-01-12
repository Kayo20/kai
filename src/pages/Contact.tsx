import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Calendar, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

// MS Bookings button component
function MsBookingsButton() {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch('/.netlify/functions/ms-bookings')
      .then(async (res) => {
        const text = await res.text();
        let data = null;
        try { data = text ? JSON.parse(text) : null; } catch (e) { console.warn('MS Bookings parse error', e); }
        if (!res.ok) {
          const msg = (data && (data.error || JSON.stringify(data))) || text || `Status ${res.status}`;
          throw new Error(msg);
        }
        return data;
      })
      .then((data) => {
        if (!mounted) return;
        if (data && data.url) setUrl(data.url);
        else setError('MS Bookings URL not available');
      })
      .catch((err) => {
        if (!mounted) return;
        setError(String(err.message || err));
      });
    return () => { mounted = false; };
  }, []);

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }
  if (!url) {
    return <div className="text-center p-4">Loading...</div>;
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full px-6 py-3 text-lg font-semibold rounded-lg text-center transition"
      style={{ background: 'linear-gradient(90deg, var(--color-brand-primary), var(--color-accent))', color: 'var(--accent-foreground)' }}
    >
      Book Meeting Online
    </a>
  );
}

// reCAPTCHA removed: contact form will no longer request or send captcha tokens

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate
    if (!formData.name || !formData.email || !formData.companyName || !formData.message) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      // captcha removed: no token will be sent
      const captchaToken = '';

      const resp = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData }),
      });

      const json = await resp.json();
      if (!resp.ok) throw new Error(json?.error || 'Failed to send message');

      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', companyName: '', message: '' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Contact submit error', err);
      toast.error(message || 'Failed to send message');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //MS Bookings iframe component

  function MsBookingsIframe() {
    const [url, setUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch('/api/ms-bookings')
        .then((res) => res.json())
        .then((data) => {
          if (data.url) setUrl(data.url);
          else setError('MS Bookings URL not available');
        })
        .catch(() => setError('Failed to load booking URL'));
    }, []);

    if (error) {
      return <div className="text-red-500 text-center p-4">{error}</div>;
    }
    if (!url) {
      return <div className="text-center p-4">Loading booking calendar...</div>;
    }
    return (
      <div style={{ width: '100%', height: 400 }}>
        <iframe
          src={url}
          width="100%"
          height="100%"
          scrolling="yes"
          style={{ border: 0, minHeight: 400 }}
          title="Kai MS Bookings"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-12" style={{ background: 'var(--color-bg-light)' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-text-default)' }}
          >
            {t('contact.title')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-text-default)' }}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* MS Bookings Integration */}
          <div className="flex flex-col items-center justify-center space-y-4 p-6">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-accent)' }}>
              <Calendar className="w-6 h-6" style={{ color: 'var(--accent-foreground)' }} />
            </div>
            <h2
              className="text-2xl font-bold text-center"
              style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-text-default)' }}
            >
              {t('contact.title')}
            </h2>
            <p className="text-center" style={{ color: 'var(--color-text-default)' }}>
              {t('contact.bookings_text')}
            </p>
            <MsBookingsButton />
          </div>



          {/* Contact Form */}
          <Card className="hover-lift">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-accent))' }}>
                <Mail className="w-6 h-6" style={{ color: 'var(--accent-foreground)' }} />
              </div>
              <CardTitle
                className="text-2xl"
                style={{ fontFamily: 'M PLUS Rounded 1c' }}
              >
                {t('contact.form_title')}
              </CardTitle>
              <CardDescription>
                {t('contact.form_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('name')}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="transition-smooth focus:ring-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="transition-smooth focus:ring-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">{t('contact.company_label')}</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Your Company Name"
                    required
                    className="transition-smooth focus:ring-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('message')}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    required
                    className="transition-smooth focus:ring-2"
                  />
                </div>

                {/* CAPTCHA Placeholder */}
                {/* <div className="rounded-lg p-4 text-center" style={{ background: 'var(--color-bg-light)', border: '2px dashed var(--border)' }}>
                  <p className="text-sm" style={{ color: 'var(--color-text-default)' }}>CAPTCHA verification would appear here</p>
                </div> */}

                <Button
                  type="submit"
                  className="w-full gap-2"
                  size="lg"
                  style={{ background: 'linear-gradient(90deg, var(--color-brand-primary), var(--color-accent))', color: 'var(--accent-foreground)' }}
                >
                  {t('submit')}
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Email Launcher */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto border-0" style={{ background: 'var(--color-bg-light)' }}>
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-accent))' }}>
                  <Mail className="w-8 h-8" style={{ color: 'var(--accent-foreground)' }} />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-text-default)' }}
                >
                  {t('contact.email_title')}
                </h3>
                <p style={{ color: 'var(--color-text-default)' }}>
                  {t('contact.email_subtitle')}
                </p>
                {import.meta.env.VITE_CONTACT_EMAIL && (
                  <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
                    className='inline-block px-6 py-3 font-semibold text-lg rounded-lg transition'
                    style={{ background: 'linear-gradient(90deg, var(--color-brand-primary), var(--color-accent))', color: 'var(--accent-foreground)' }}>
                    {t('legal.send_email_button')}
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}