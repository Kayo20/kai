// src/pages/Credits.tsx

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';

// Define the component using the React.FC (Functional Component) type for TypeScript
const CreditsPage: React.FC = () => {
  const { t } = useLanguage();
  
  // Array of portfolio/credit images from the credit folder
  const portfolioImages = [
    '/credit/img.png',
    '/credit/img (2).png',
    '/credit/img (3).png',
    '/credit/img (4).png',
    '/credit/img (5).png',
  ];

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
            Meet Yumi
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: 'var(--accent-foreground)' }}>
            Our amazing brand designer who brought Kai's vibrant identity to life
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
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-accent)' }}>Role</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-default)' }}>Logo & Brand Designer</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-accent)' }}>Location</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-default)' }}>Akita, Japan</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-accent)' }}>Born</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-default)' }}>1995</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-accent)' }}>Background</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-default)' }}>Banking → Design</p>
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
                  About Yumi
                </h2>
                <p className="text-base md:text-lg leading-relaxed italic mb-6 p-6 rounded-lg" style={{ background: 'white', color: 'var(--color-text-default)', borderLeft: '4px solid var(--color-accent)' }}>
                  "I absolutely love discovering and crafting logos. Even when travelling abroad, I eagerly snap photos of stunning logos I find. I'm passionate about simple and flat logo designs. My superpower is capturing clients' ideas through engaging conversations and interviews, then bringing those visions to life in my designs!"
                </p>
              </div>

              {/* Background */}
              <div className="mb-10">
                <h3 
                  className="text-xl md:text-2xl font-bold mb-4" 
                  style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-brand-primary)' }}
                >
                  Background & Expertise
                </h3>
                <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--color-text-default)' }}>
                  Born in Akita in 1995, Yumi graduated from Akita Prefectural University and initially worked as a banker before pursuing her passion for logo design. This unique career transition brought fresh perspectives and professional discipline to her creative work.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-default)' }}>
                  Today, Yumi specializes in creating logos and brand identities across a variety of industries, including corporate logos, store logos, and service logos. Her work is characterized by minimalist aesthetics, clean lines, and a deep understanding of brand storytelling.
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
                  Her Contribution to Kai
                </h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-default)' }}>
                  Yumi's creative vision was instrumental in developing Kai's vibrant brand identity. Through thoughtful conversations about our mission and values, she crafted a visual language that perfectly captures our commitment to sustainability, innovation, and knowledge sharing. We're incredibly grateful for her talent and dedication!
                </p>
              </div>
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="max-w-6xl mx-auto">
            {/* <div className="text-center mb-12">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4" 
                style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-brand-primary)' }}
              >
                Yumi's Logo Portfolio
              </h2>
              <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-default)' }}>
                A showcase of beautiful, minimalist logo designs that demonstrate her expertise in brand identity creation
              </p>
            </div> */}

            {/* Portfolio Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {portfolioImages.map((imgPath, index) => (
                <div 
                  key={index} 
                  className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white p-4 md:p-6 flex items-center justify-center"
                  style={{ minHeight: '200px' }}
                >
                  <img 
                    src={imgPath}
                    alt={`Logo Design ${index + 1}`}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;