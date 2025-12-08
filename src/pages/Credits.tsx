import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreditsPage() {
  const { t } = useLanguage();

  const credits = [
    {
      category: 'Design & Development',
      contributors: ['UX/UI Designer', 'Frontend Developer', 'Backend Developer']
    },
    {
      category: 'Content & Strategy',
      contributors: ['Content Writer', 'Strategy Consultant', 'SEO Specialist']
    },
    {
      category: 'Testing & QA',
      contributors: ['QA Engineer', 'Quality Assurance Lead']
    },
    {
      category: 'Project Management',
      contributors: ['Project Manager', 'Scrum Master']
    }
  ];

  return (
    <div className="min-h-screen py-12" style={{ background: 'var(--color-bg-light)' }}>
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1
            className="text-5xl md:text-6xl font-bold"
            style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-text-default)' }}
          >
            Credits
          </h1>
          <p className="text-lg" style={{ color: 'var(--color-text-default)' }}>
            The talented people behind Kai Sustainability Group
          </p>
        </div>

        {/* Credits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {credits.map((section, index) => (
            <Card key={index} className="hover-lift">
              <CardHeader>
                <CardTitle
                  className="text-2xl"
                  style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-brand-primary)' }}
                >
                  {section.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.contributors.map((contributor, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 p-2 rounded"
                      style={{ background: 'var(--color-bg-light)' }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ background: 'var(--color-accent)' }}
                      ></div>
                      <span style={{ color: 'var(--color-text-default)' }}>
                        {contributor}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Acknowledgments Section */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle
              className="text-3xl"
              style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-brand-primary)' }}
            >
              Special Thanks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
              We extend our heartfelt gratitude to all the partners, clients, and team members who have been instrumental in the success of Kai Sustainability Group Ltd.
            </p>
            <p style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
              This project would not have been possible without the dedication, expertise, and commitment of our exceptional team. Each member has contributed their unique skills and perspectives to create something remarkable.
            </p>
            <p style={{ color: 'var(--color-text-default)', lineHeight: 1.75 }}>
              Thank you for being part of our journey towards sustainability and excellence.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
