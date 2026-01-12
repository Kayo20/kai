import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Home, Calendar, UserPlus, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  // hide header/nav on the Admin route for a clean admin UI
  const isAdminRoute = false;
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/events', label: t('nav.events') },
    { path: '/enroll', label: t('nav.enroll') },
    { path: '/contact', label: t('nav.contact') },
    { path: '/credits', label: 'Credits' },
  ];
  navLinks.push({ path: '/admin', label: 'Admin' });


  // Status banner component: shows whether required env vars are present on deployed site
  function EnvStatusBanner() {
    const [status, setStatus] = useState<null | { ok: boolean; missing: string[]; raw?: unknown }>(null);

    useEffect(() => {
      let mounted = true;
      fetch('/.netlify/functions/env-check')
        .then(async (res) => {
          const text = await res.text().catch(() => null);
          let data = null;
          try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
          if (!res.ok) throw new Error((data && data.error) || String(text || res.status));
          return data;
        })
        .then((data) => {
          if (!mounted) return;
          if (!data || !data.env) {
            setStatus({ ok: false, missing: [], raw: data });
            return;
          }
          const missing = Object.keys(data.env).filter((k) => !data.env[k]);
          setStatus({ ok: missing.length === 0, missing, raw: data.env });
        })
        .catch((err) => {
          if (!mounted) return;
          console.warn('env-check failed', err);
          setStatus({ ok: false, missing: [], raw: String(err) });
        });
      return () => { mounted = false; };
    }, []);

    if (status === null) return null; // hide while loading to avoid flicker

    // Banner styles
    const base = 'w-full text-sm py-2 text-center';
    if (status.ok) {
      return (
        <div className={`${base} bg-green-600 text-white`}>
          Status: All required environment variables present
        </div>
      );
    }

    // If missing keys are known, show them; otherwise show generic warning
    return (
      <div className={`${base} bg-red-600 text-white`}>
        {status.missing && status.missing.length > 0 ? (
          <>
            Missing env vars: {status.missing.join(', ')} — add them in Netlify Site settings
          </>
        ) : (
          <>Env check unavailable or returned unexpected data. Check function logs.</>
        )}
      </div>
    );
  }

  const mobileNavItems = [
    { path: '/', label: t('home'), icon: Home },
    { path: '/events', label: t('events'), icon: Calendar },
    { path: '/enroll', label: t('enroll'), icon: UserPlus },
    { path: '/contact', label: t('contact'), icon: Mail },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header (hidden on Admin route) */}
      {!isAdminRoute && (
        <header
          className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
          style={{ background: 'var(--color-accent)' }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3">
                <img src="/logo.jpg" alt="Kai logo" className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover" />
                <span className="text-xl md:text-2xl font-bold" style={{ color: 'var(--color-brand-primary)', fontFamily: 'M PLUS Rounded 1c' }}>
                  Kai
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-sm font-medium transition-colors ${isActive ? 'font-semibold' : ''}`}
                      style={{ color: isActive ? 'var(--accent-foreground)' : 'var(--color-brand-primary)' }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <a
                  href="https://sharepoint.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium transition-colors"
                  style={{ color: 'var(--accent-foreground)' }}
                >
                  {t('header.manageAccount')}
                </a>
              </nav>

              {/* Language Switcher & Mobile Menu */}
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Globe className="w-4 h-4" />
                      <span className="uppercase">{language}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setLanguage('en')}>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('es')}>
                      Español
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('fr')}>
                      Français
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 transition-colors"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileMenuOpen}
                  style={{ color: 'var(--accent-foreground)' }}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden" style={{ background: 'var(--color-accent)' }}>
              <nav className="container mx-auto px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                    style={
                      location.pathname === link.path
                        ? { background: 'var(--color-bg-light)', color: 'var(--color-accent)' }
                        : { color: 'var(--accent-foreground)' }
                    }
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://sharepoint.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                  style={{ color: 'var(--accent-foreground)' }}
                >
                  {t('header.manageAccount')}
                </a>
              </nav>
            </div>
          )}
        </header>
      )}

      {/* Env status banner (shows Netlify env-check results) */}
      <EnvStatusBanner />

      {/* Breadcrumbs (hidden on Admin route) */}
      {location.pathname !== '/' && !isAdminRoute && (
        <div className="container mx-auto px-4 pt-24 pb-4">
          <nav className="flex items-center space-x-2 text-sm" style={{ color: 'var(--color-text-default)' }}>
            <Link to="/" className="transition-colors" style={{ color: 'var(--color-brand-primary)' }}>
              {t('home')}
            </Link>
            <span>/</span>
            <span className="font-medium" style={{ color: 'var(--color-text-default)' }}>
              {navLinks.find((link) => link.path === location.pathname)?.label || 'Page'}
            </span>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${location.pathname === '/' ? 'pt-16 md:pt-20' : ''}`}>
        {children}
      </main>

      {/* Mobile Bottom Navigation (hidden on Admin route) */}
      {!isAdminRoute && (
        <div className="mobile-nav-bar md:hidden">
          <div className="flex items-center justify-around h-16">
            {mobileNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center justify-center space-y-1 flex-1 h-full transition-colors mobile-nav-item ${isActive ? 'mobile-nav-item-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="mobile-nav-badge">
                    <Icon className="w-5 h-5" style={{ color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-default)' }} />
                  </div>
                  <span className="text-xs font-medium" style={{ color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-default)' }}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: 'var(--color-accent)' }} className="text-white mt-auto mb-16 md:mb-0">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src="/logo.jpg" alt="Kai logo" className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover" />
                <span className="text-xl font-bold" style={{ fontFamily: 'M PLUS Rounded 1c' }}>
                  Kai
                </span>
              </div>
              <p className="text-white text-sm">
                Knowledge & Innovation for Everyone
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4" style={{ fontFamily: 'M PLUS Rounded 1c' }}>
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white hover:underline transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4" style={{ fontFamily: 'M PLUS Rounded 1c' }}>
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/legal"
                    className="text-white hover:underline transition-colors text-sm"
                  >
                    {t('nav.terms')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold mb-4" style={{ fontFamily: 'M PLUS Rounded 1c' }}>
                Connect
              </h3>
              <a
                href="https://linkedin.com/company/kai-sustainability-group-ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-white hover:underline transition-colors text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>{t('footer.linkedin')}</span>
              </a>
            </div>
          </div>

          <div className="border-t border-white/30 mt-8 pt-8 text-center text-white text-sm">
            <p>&copy; {new Date().getFullYear()} Kai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}