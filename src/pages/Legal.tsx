import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

function AnimatedCard({ index = 0, children }: { index?: number; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 80 + 50);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      className={`transform-gpu transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </div>
  );
}

export default function LegalPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-12" style={{ background: 'var(--color-bg-light)' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-text-default)' }}
          >
            {t('legal.title')}
          </h1>
          <p style={{ color: 'var(--color-text-default)' }}>{t('legal.last_updated')}</p>
        </div>

        {/* Terms Content */}
        <div className="space-y-6">
          {/* 0. Introduction */}
          <AnimatedCard index={0}>
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>0</div>
                  <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>{t('legal.section0_title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--color-text-default)' }}>{t('legal.section0_text')}</p>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* 1. Accounts and Membership */}
          <AnimatedCard index={1}>
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>1</div>
                  <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>{t('legal.section1_title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--color-text-default)' }}>{t('legal.section1_text')}</p>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* 2. Links to Other Resources */}
          <AnimatedCard index={2}>
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>2</div>
                  <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>{t('legal.section2_title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--color-text-default)' }}>{t('legal.section2_text')}</p>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* 3. Prohibited Uses */}
          <AnimatedCard index={3}>
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>3</div>
                  <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>{t('legal.section3_title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--color-text-default)' }}>{t('legal.section3_text')}</p>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* 4. Intellectual Property Rights */}
          <AnimatedCard index={4}>
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>4</div>
                  <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>{t('legal.section4_title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--color-text-default)' }}>{t('legal.section4_text')}</p>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* 5. Indemnification */}
          <AnimatedCard index={5}>
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>5</div>
                  <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>{t('legal.section5_title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--color-text-default)' }}>{t('legal.section5_text')}</p>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* 6. Severability */}
          <AnimatedCard index={6}>
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>6</div>
                  <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>{t('legal.section6_title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--color-text-default)' }}>{t('legal.section6_text')}</p>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* 7. Dispute Resolution */}
          <AnimatedCard index={7}>
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>7</div>
                  <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>{t('legal.section7_title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--color-text-default)' }}>{t('legal.section7_text')}</p>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* 8. Changes and Amendments */}
          <AnimatedCard index={8}>
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>8</div>
                  <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>{t('legal.section8_title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--color-text-default)' }}>{t('legal.section8_text')}</p>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* 9. Acceptance of These Terms */}
          <AnimatedCard index={9}>
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>9</div>
                  <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>{t('legal.section9_title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--color-text-default)' }}>{t('legal.section9_text')}</p>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* 10. Contact Us */}
          <AnimatedCard index={10}>
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>10</div>
                  <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>{t('legal.contact_us_title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p style={{ color: 'var(--color-text-default)' }}>{t('legal.contact_us_text')}</p>
                {import.meta.env.VITE_CONTACT_EMAIL && (
                  <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
                    className='inline-block px-6 py-3 font-semibold text-lg rounded-lg transition-all hover:shadow-lg'
                    style={{ background: 'linear-gradient(90deg, var(--color-brand-primary), var(--color-accent))', color: 'var(--accent-foreground)', marginTop: '1rem' }}>
                    {t('legal.send_email_button')}
                  </a>
                )}
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}
