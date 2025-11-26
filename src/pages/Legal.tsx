import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

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
            {t('terms_conditions')}
          </h1>
          <p style={{ color: 'var(--color-text-default)' }}>Last updated: December 12, 2025</p>
        </div>

        {/* Terms Content */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="leading-relaxed" style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
                By accessing and using Kai's services, you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please do
                not use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>2. Use License</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="leading-relaxed mb-4" style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
                Permission is granted to temporarily access the materials (information or software) on
                Kai's platform for personal, non-commercial transitory viewing only. This is the grant
                of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2" style={{ color: 'var(--color-text-default)' }}>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on Kai's platform</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>3. User Account</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="leading-relaxed" style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
                When you create an account with us, you must provide information that is accurate,
                complete, and current at all times. Failure to do so constitutes a breach of the Terms,
                which may result in immediate termination of your account on our service. You are
                responsible for safeguarding the password that you use to access the service and for any
                activities or actions under your password.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>4. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="leading-relaxed" style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
                The service and its original content, features, and functionality are and will remain the
                exclusive property of Kai and its licensors. The service is protected by copyright,
                trademark, and other laws of both the United States and foreign countries. Our trademarks
                and trade dress may not be used in connection with any product or service without the
                prior written consent of Kai.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>5. Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="leading-relaxed mb-4" style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
                Certain aspects of the service are provided for a fee or other charges. You will have the
                opportunity to review and accept the fees that you will be charged before using a service
                that requires payment. We may change fees at any time with reasonable notice.
              </p>
              <p style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
                All fees are non-refundable unless otherwise stated in our refund policy. We offer a
                30-day money-back guarantee for new subscriptions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>6. Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and
                protect your personal information. By using our service, you agree to the collection and
                use of information in accordance with our Privacy Policy. We do not sell or share your
                personal information with third parties without your consent.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>7. Termination</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
                We may terminate or suspend your account immediately, without prior notice or liability,
                for any reason whatsoever, including without limitation if you breach the Terms. Upon
                termination, your right to use the service will immediately cease. If you wish to
                terminate your account, you may simply discontinue using the service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>8. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
                In no event shall Kai, nor its directors, employees, partners, agents, suppliers, or
                affiliates, be liable for any indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data, use, goodwill, or other
                intangible losses, resulting from your access to or use of or inability to access or use
                the service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>9. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any
                time. If a revision is material, we will try to provide at least 30 days' notice prior to
                any new terms taking effect. What constitutes a material change will be determined at our
                sole discretion.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'M PLUS Rounded 1c' }}>10. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-4 space-y-2" style={{ color: 'var(--color-text-default)' }}>
                <p>Email: legal@kai.com</p>
                <p>Address: 123 Innovation Drive, Los Angeles, CA 90001</p>
                <p>Phone: (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}