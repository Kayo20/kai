// src/pages/Credits.tsx

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

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
    <div className="min-h-screen py-8 md:py-12" style={{ background: 'var(--color-bg-light)' }}>
      <div className="container mx-auto px-4">
        {/* Responsive Grid: 1 column on mobile, 5 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-0 max-w-7xl mx-auto bg-white rounded-lg lg:rounded-none shadow-lg overflow-hidden">
          
          {/* --- Left Content Column (Introduction) --- */}
          <div className="lg:col-span-3 p-6 md:p-8 lg:p-10">
            <h1 
              className="text-3xl md:text-4xl font-bold mb-5" 
              style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-brand-primary)' }}
            >
              Credits & Acknowledgments
            </h1>
            
            <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--color-text-default)' }}>
              At Kai Sustainability Group, we believe in recognizing the exceptional talent and dedication of those who contribute to our success.
            </p>
            <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--color-text-default)' }}>
              We extend our heartfelt gratitude to all the professionals, designers, and partners who have played a vital role in shaping our brand and mission.
            </p>
            <p className="text-sm md:text-base leading-relaxed mb-6 font-semibold" style={{ color: 'var(--color-text-default)' }}>
              Together, we're building a sustainable future through knowledge, innovation, and collaboration.
            </p>

            <h2 
              className="text-xl md:text-2xl font-bold mt-8 mb-4" 
              style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-brand-primary)' }}
            >
              Our Contributors
            </h2>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-text-default)' }}>
              Our team consists of highly experienced professionals with diverse backgrounds in compliance consulting, sustainability, 
              accounting, auditing, and business development. Each member brings unique expertise and a passion for delivering excellence 
              to our clients. We are proud of the collaborative spirit that drives innovation and positive impact across all our projects.
            </p>
            
            {/* Main contributor image */}
            <img 
              src="/credit/Yumi.jpg" 
              alt="Kai team member" 
              className="w-full h-auto mt-6 md:mt-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            />
          </div>

          {/* --- Right Content Column (Details & Portfolio) --- */}
          <div 
            className="lg:col-span-2 border-t-4 lg:border-t-0 lg:border-l-4 p-6 md:p-8 lg:p-10" 
            style={{ background: 'var(--color-bg-light)', borderColor: 'var(--color-accent)' }}
          >
            
            {/* Top Right: ABOUT Section */}
            <div 
              className="flex flex-col lg:flex-row lg:items-stretch pb-6 md:pb-8 border-b-2 mb-6 md:mb-8" 
              style={{ borderColor: 'var(--color-accent)' }}
            >
              
              {/* Vertical Text (hidden on mobile, visible on desktop) */}
              <div 
                className="hidden lg:block text-lg font-bold tracking-wider [writing-mode:vertical-rl] rotate-180 mr-4 whitespace-nowrap mb-4 lg:mb-0" 
                style={{ color: 'var(--color-accent)' }}
              >
                ABOUT
              </div>

              {/* Mobile heading */}
              <div className="lg:hidden text-lg font-bold mb-4" style={{ color: 'var(--color-accent)', fontFamily: 'M PLUS Rounded 1c' }}>
                ABOUT
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Contributor image */}
                <img 
                  src="/credit/Yumi.jpg" 
                  alt="Kai contributor" 
                  className="w-full sm:w-24 h-auto sm:h-24 object-cover rounded-lg shadow-md flex-shrink-0"
                />
                <div className="text-xs md:text-sm leading-relaxed flex-grow">
                  <p className="font-bold m-0" style={{ color: 'var(--color-text-default)', fontFamily: 'M PLUS Rounded 1c' }}>
                    KAI SUSTAINABILITY GROUP
                  </p>
                  <p className="text-xs md:text-sm mt-1 mb-3" style={{ color: 'var(--color-accent)' }}>
                    Compliance & Sustainability Consulting
                  </p>
                  
                  <p className="text-gray-700 mb-2 text-xs md:text-sm">
                    We are a team of seasoned professionals dedicated to helping organizations achieve compliance excellence and sustainability goals through innovative solutions and trusted expertise.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Right: PORTFOLIO Section */}
            <div className="flex flex-col lg:flex-row lg:items-stretch">
              
              {/* Vertical Text (hidden on mobile) */}
              <div 
                className="hidden lg:block text-lg font-bold tracking-wider [writing-mode:vertical-rl] rotate-180 mr-4 whitespace-nowrap" 
                style={{ color: 'var(--color-accent)' }}
              >
                CREDITS
              </div>

              {/* Mobile heading */}
              <div className="lg:hidden text-lg font-bold mb-4" style={{ color: 'var(--color-accent)', fontFamily: 'M PLUS Rounded 1c' }}>
                CREDITS
              </div>
              
              {/* Portfolio/Credits Grid - Responsive columns */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3 w-full">
                {portfolioImages.map((imgPath, index) => (
                  <div key={index} className="overflow-hidden rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <img 
                      src={imgPath}
                      alt={`Credit Image ${index + 1}`}
                      className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;