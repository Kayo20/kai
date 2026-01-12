// src/pages/Credits.tsx

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';

// Define the component using the React.FC (Functional Component) type for TypeScript
const CreditsPage: React.FC = () => {
  const { t } = useLanguage();
  
  // Portfolio images moved to Home page; Credits page focuses on profile and bio

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-light)' }}>
      {/* Hero Section */}
      <div className="py-12 md:py-20" style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-accent))' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 md:w-10 md:h-10" style={{ color: 'var(--accent-foreground)' }} />
          </div>
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4" 
            style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--accent-foreground)' }}
          >
            {t('credits.yumi.title')}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: 'var(--accent-foreground)' }}>
            {t('credits.yumi.subtitle')}
          </p>
        </div>
      </div>

      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto mb-16">
            
            {/* Left: Profile Image & Quick Info */}
            <div className="lg:col-span-1 flex flex-col">
              <div className="rounded-2xl overflow-hidden shadow-xl mb-6 sticky top-20">
                <img 
                  src="/credit/Yumi.jpg" 
                  alt="Yumi Umekawa - Logo Designer" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Quick Facts Card */}
              <div 
                className="rounded-xl p-6 md:p-8 shadow-lg"
                style={{ background: 'white', borderLeft: '4px solid var(--color-accent)' }}
              >
                <h3 
                  className="font-bold text-lg mb-4" 
                  style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-brand-primary)' }}
                >
                  Yumi Umekawa
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-accent)' }}>{t('credits.yumi.role_label')}</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-default)' }}>{t('credits.yumi.role_value')}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-accent)' }}>{t('credits.yumi.location_label')}</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-default)' }}>{t('credits.yumi.location_value')}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-accent)' }}>{t('credits.yumi.born_label')}</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-default)' }}>{t('credits.yumi.born_value')}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-accent)' }}>{t('credits.yumi.background_label')}</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-default)' }}>{t('credits.yumi.background_value')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Detailed Content */}
            <div className="lg:col-span-2">
              {/* Introduction */}
              <div className="mb-10">
                <h2 
                  className="text-2xl md:text-3xl font-bold mb-6" 
                  style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-brand-primary)' }}
                >
                  {t('credits.yumi.about_title')}
                </h2>
                <p className="text-base md:text-lg leading-relaxed italic mb-6 p-6 rounded-lg" style={{ background: 'white', color: 'var(--color-text-default)', borderLeft: '4px solid var(--color-accent)' }}>
                  {t('credits.yumi.quote')}
                </p>
              </div>

              {/* Background */}
              <div className="mb-10">
                <h3 
                  className="text-xl md:text-2xl font-bold mb-4" 
                  style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-brand-primary)' }}
                >
                  {t('credits.yumi.background_title')}
                </h3>
                <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--color-text-default)' }}>
                  {t('credits.yumi.bio_1')}
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-default)' }}>
                  {t('credits.yumi.bio_2')}
                </p>
              </div>

              {/* Contribution to Kai */}
              <div 
                className="p-6 md:p-8 rounded-xl mb-10"
                style={{ background: 'linear-gradient(135deg, rgba(59, 150, 163, 0.1), rgba(11, 76, 106, 0.1))', border: '2px solid var(--color-accent)' }}
              >
                <h3 
                  className="text-xl font-bold mb-3" 
                  style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-brand-primary)' }}
                >
                  {t('credits.yumi.contribution_title')}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-default)' }}>
                  {t('credits.yumi.contribution_text')}
                </p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default CreditsPage;