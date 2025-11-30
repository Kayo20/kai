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
      className={`transform-gpu transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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
            Terms & Conditions
          </h1>
          <p style={{ color: 'var(--color-text-default)' }}>Last updated: July 25, 2025</p>
        </div>

        {/* Terms Content */}
        <div className="space-y-6">
          {/* Intro card */}
          <AnimatedCard index={0}>
            <Card>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 56, height: 56, borderRadius: 28, background: 'linear-gradient(90deg,var(--color-brand-primary),var(--color-accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>T</div>
                <div>
                  <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>Terms & Conditions</CardTitle>
                  <div style={{ color: 'var(--color-text-default)' }}>Last updated: July 25, 2025</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
                Welcome to Kai Sustainability Group Ltd (“Kai”). These Terms and Conditions (“Terms") govern your access and use of kaisg.com and all related products and services (“Services"). By using our Website, you agree to these Terms. If you do not agree, please discontinue use immediately.
              </p>
            </CardContent>
          </Card>
          </AnimatedCard>

          {/* 1. Acceptance of Terms */}
          <AnimatedCard index={1}>
            <Card>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>1</div>
                <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>Acceptance of Terms</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
                By accessing or using this Website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you are using the Website on behalf of an organization, you represent that you have the authority to bind that organization.
              </p>
            </CardContent>
          </Card>
          </AnimatedCard>

          {/* 2. Accounts & Membership */}
          <AnimatedCard index={2}>
            <Card>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>2</div>
                <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>Accounts & Membership</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                <li>You are responsible for maintaining the security of your account.</li>
                <li>You must provide accurate and complete information.</li>
                <li>Any actions taken under your account are your responsibility.</li>
                <li>You must notify us immediately of any unauthorized access or security breach.</li>
              </ul>
              <p style={{ color: 'var(--color-text-default)' }}>We reserve the right to monitor, suspend, or delete accounts that violate these Terms or harm our reputation. Deleted accounts may not be re-registered.</p>
            </CardContent>
          </Card>
          </AnimatedCard>

          {/* 3. Links to External Resources */}
          <AnimatedCard index={3}>
            <Card>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>3</div>
                <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>Links to External Resources</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--color-text-default)' }}>Our Website may contain links to third-party websites or applications. Kai does not endorse, control, or assume responsibility for any third-party content, products, or services. You access external links at your own risk and are responsible for reviewing their policies and terms.</p>
            </CardContent>
          </Card>
          </AnimatedCard>

          {/* 4. Prohibited Uses */}
          <AnimatedCard index={4}>
            <Card>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>4</div>
                <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>Prohibited Uses</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                <li>For unlawful activities</li>
                <li>To violate any regulations or laws</li>
                <li>To infringe intellectual property rights</li>
                <li>To harass, abuse, discriminate, or harm others</li>
                <li>To submit misleading information</li>
                <li>To upload harmful code, viruses, or malicious software</li>
                <li>To spam, scrape, crawl, or phish</li>
                <li>For any immoral or obscene purpose</li>
                <li>To attempt to bypass or interfere with security features</li>
              </ul>
              <p style={{ color: 'var(--color-text-default)' }}>We may restrict or terminate access for violating any of the above.</p>
            </CardContent>
          </Card>
          </AnimatedCard>

          {/* 5. Intellectual Property Rights */}
          <AnimatedCard index={5}>
            <Card>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>5</div>
                <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>Intellectual Property Rights</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--color-text-default)' }}>All content, trademarks, logos, graphics, and materials displayed on the Website are owned by Kai or our licensors. Nothing in these Terms grants you the right to copy, reproduce, distribute, or use these materials without our written permission.</p>
            </CardContent>
          </Card>
          </AnimatedCard>

          {/* 6. Indemnification */}
          <AnimatedCard index={6}>
            <Card>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>6</div>
                <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>Indemnification</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--color-text-default)' }}>You agree to indemnify and hold harmless Kai, its employees, directors, partners, and affiliates from any claims, losses, damages, or expenses (including legal fees) arising from your use of the Website, your content, or your violation of these Terms.</p>
            </CardContent>
          </Card>
          </AnimatedCard>

          {/* 7. Severability */}
          <AnimatedCard index={7}>
            <Card>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>7</div>
                <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>Severability</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--color-text-default)' }}>If any part of these Terms is found to be unenforceable or invalid, the remaining portions will still remain in effect and enforceable to the fullest extent allowed by law.</p>
            </CardContent>
          </Card>
          </AnimatedCard>

          {/* 8. Governing Law & Dispute Resolution */}
          <AnimatedCard index={8}>
            <Card>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>8</div>
                <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>Governing Law & Dispute Resolution</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--color-text-default)' }}>These Terms are governed by the laws of the United Kingdom. Any disputes arising under these Terms shall be resolved exclusively in courts located within the United Kingdom. You waive any right to a jury trial. The United Nations Convention on Contracts for the International Sale of Goods does not apply.</p>
            </CardContent>
          </Card>
          </AnimatedCard>

          {/* 9. Changes to These Terms */}
          <AnimatedCard index={9}>
            <Card>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>9</div>
                <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>Changes to These Terms</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--color-text-default)' }}>We may update these Terms at any time. When changes are made, the updated date will reflect at the top of this page. Continued use of the Website after changes indicates your acceptance of the updated Terms.</p>
            </CardContent>
          </Card>
          </AnimatedCard>

          {/* 10. Contact Us */}
          <AnimatedCard index={10}>
            <Card>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-foreground)', fontWeight: 700 }}>10</div>
                <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>Contact Us</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--color-text-default)' }}>For questions or concerns about these Terms, please contact us at:</p>
              {
                (() => {
                  const publicEmail = (import.meta as any).env?.VITE_CONTACT_EMAIL;
                  return publicEmail ? <p>{publicEmail}</p> : null;
                })()
              }
            </CardContent>
          </Card>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}