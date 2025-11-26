import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Loader } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

export default function EnrollPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Example: Fetch plans from CMS or use static content as fallback
  const pricingPlans = [
    {
      name: 'BASIC',
      price: '$29',
      period: '/month',
      description: 'Essential features for small practices',
      features: [
        'Access to Ready-to-use Kit',
        'Basic Data Centre access',
        'Community support',
      ],
      buttonText: 'Subscribe with Wise',
      paymentLink: 'https://wise.com/pay/basic',
      highlighted: false,
    },
    {
      name: 'STANDARD',
      price: '$59',
      period: '/month',
      description: 'Best value for growing practices',
      features: [
        'All BASIC features',
        'Full Data Centre access',
        'Trusted Alliance resources',
        'Priority support',
      ],
      buttonText: 'Subscribe with Wise',
      paymentLink: 'https://wise.com/pay/standard',
      highlighted: true,
    },
    {
      name: 'PREMIUM',
      price: '$99',
      period: '/month',
      description: 'Full access and personalized support',
      features: [
        'All STANDARD features',
        '1-on-1 consulting',
        'Custom integrations',
      ],
      buttonText: 'Contact Us',
      paymentLink: null,
      highlighted: false,
    },
  ];

  const handleSubscribe = async (plan: typeof pricingPlans[0]) => {
    if (!plan.paymentLink) {
      navigate('/contact');
      return;
    }

    setLoading(true);
    try {
      // Extract price as number (e.g., "$29" -> 29)
      const priceNumber = parseFloat(plan.price.replace('$', ''));

      const response = await fetch('/.netlify/functions/wise-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: plan.name,
          amount: priceNumber,
          currency: 'USD',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || 'Failed to initialize payment');
        setLoading(false);
        return;
      }

      // Redirect to Wise payment with the calculated amount
      window.open(data.url, '_blank');
      toast.success(`Opening Wise payment for $${priceNumber}...`);
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error('Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12" style={{ background: 'var(--color-bg-light)' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-text-default)' }}
          >
            {t('pricing_title')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-text-default)' }}>
            {t('pricing_subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden hover-lift opacity-0 animate-fade-in-up ${
                plan.highlighted
                  ? 'border-2 shadow-2xl scale-105 md:scale-110'
                  : 'border border-gray-200'
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'forwards',
                borderColor: plan.highlighted ? 'var(--color-accent)' : undefined,
                background: plan.highlighted ? 'var(--color-accent)' : undefined,
                color: plan.highlighted ? 'var(--accent-foreground)' : undefined,
              }}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 px-4 py-1 text-sm font-semibold rounded-bl-lg" style={{ background: 'var(--color-accent)', color: 'var(--accent-foreground)' }}>
                  STANDARD
                </div>
              )}
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle
                  className="text-2xl mb-2"
                  style={{ fontFamily: 'M PLUS Rounded 1c' }}
                >
                  {plan.name}
                </CardTitle>
                <CardDescription style={{ color: plan.highlighted ? 'var(--accent-foreground)' : 'var(--color-text-default)' }}>
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold" style={{ color: plan.highlighted ? 'var(--accent-foreground)' : 'var(--color-text-default)' }}>
                    {plan.price}
                  </span>
                  <span style={{ color: plan.highlighted ? 'var(--accent-foreground)' : 'var(--color-text-default)' }}>{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: plan.highlighted ? 'var(--accent-foreground)' : 'var(--color-accent)' }}>
                        <Check className={plan.highlighted ? 'w-3 h-3 text-[var(--color-accent)]' : 'w-3 h-3 text-[var(--accent-foreground)]'} />
                      </div>
                      <span className="text-sm" style={{ color: plan.highlighted ? 'var(--accent-foreground)' : 'var(--color-text-default)' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button
                  onClick={() => handleSubscribe(plan)}
                  disabled={loading}
                  className="w-full gap-2"
                  style={{ background: plan.highlighted ? 'var(--accent-foreground)' : 'var(--color-accent)', color: plan.highlighted ? 'var(--color-accent)' : 'var(--accent-foreground)' }}
                  size="lg"
                >
                  {loading && <Loader className="w-4 h-4 animate-spin" />}
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        {/* Additional Info */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <Card className="border-0" style={{ background: 'var(--color-bg-light)' }}>
            <CardContent className="p-8 space-y-4">
              <h3
                className="text-2xl font-bold"
                style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-text-default)' }}
              >
                All Plans Include
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-accent))' }}>
                    <Check className="w-6 h-6" style={{ color: 'var(--accent-foreground)' }} />
                  </div>
                  <p className="font-semibold" style={{ color: 'var(--color-text-default)' }}>Money-Back Guarantee</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-default)' }}>30-day refund policy</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-accent))' }}>
                    <Check className="w-6 h-6" style={{ color: 'var(--accent-foreground)' }} />
                  </div>
                  <p className="font-semibold" style={{ color: 'var(--color-text-default)' }}>Cancel Anytime</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-default)' }}>No long-term commitment</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-accent))' }}>
                    <Check className="w-6 h-6" style={{ color: 'var(--accent-foreground)' }} />
                  </div>
                  <p className="font-semibold" style={{ color: 'var(--color-text-default)' }}>Secure Payment</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-default)' }}>SSL encrypted checkout</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}