import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CreditsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-12" style={{ background: 'var(--color-bg-light)' }}>
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-text-default)' }}
          >
            Credits
          </h1>
          <p style={{ color: 'var(--color-text-default)' }}>
            Acknowledgments and attributions
          </p>
        </div>

        {/* Credits Content */}
        <div className="space-y-8 max-w-3xl mx-auto">
          {/* Credits Image */}
          <div className="flex justify-center">
            <img
              src="/credit.png"
              alt="Credits"
              className="w-full max-w-2xl rounded-lg shadow-lg"
              style={{ border: '2px solid var(--color-accent)' }}
            />
          </div>

          {/* Additional Credits Text (Optional) */}
          <div 
            className="p-6 rounded-lg"
            style={{ background: 'white', border: `1px solid var(--color-accent)` }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-text-default)' }}
            >
              Our Team & Partners
            </h2>
            <p style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
              We would like to extend our heartfelt gratitude to all those who have contributed to the success of Kai Sustainability Group. 
              Our team consists of highly experienced professionals dedicated to delivering excellence in compliance consulting, sustainability, 
              and business services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
