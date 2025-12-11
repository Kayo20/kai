import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles, Users, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';




export default function HomePage() {
  const { t } = useLanguage();
  const [visibleBlocks, setVisibleBlocks] = useState<number[]>([]);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = blockRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1 && !visibleBlocks.includes(index)) {
              setVisibleBlocks((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    blockRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleBlocks]);

  const contentBlocks = [
    {
      icon: Sparkles,
      title: t('homepage.block1_title'),
      description: t('homepage.block1_text'),
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    },
    {
      icon: Users,
      title: t('homepage.block2_title'),
      description: t('homepage.block2_text'),
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
    },
    {
      icon: Zap,
      title: t('homepage.block3_1_title'),
      description: t('homepage.block3_1_text'),
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    },
    {
      icon: Zap,
      title: t('homepage.block3_2_title'),
      description: t('homepage.block3_2_text'),
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    },
    {
      icon: Zap,
      title: t('homepage.block3_3_title'),
      description: t('homepage.block3_3_text'),
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[var(--color-bg-light)] overflow-hidden">
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4 opacity-0 animate-fade-in-up">
              <h1
                className="text-5xl md:text-7xl font-bold"
                style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-brand-primary)' }}
              >
                Kai
              </h1>
              <p className="text-xl md:text-2xl" style={{ color: 'var(--color-text-default)' }}>
                {t('hero_title')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animation-delay-400 opacity-0 animate-fade-in-up">
              <Link to="/enroll">
                <Button size="lg" className="gap-2" style={{ background: 'var(--color-accent)', color: 'var(--accent-foreground)' }}>
                  {t('get_started')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/events">
                <Button size="lg" variant="outline" className="gap-2" style={{ color: 'var(--color-brand-primary)', borderColor: 'var(--color-brand-primary)' }}>
                  {t('view_events')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Credits Preview (moved from Credits page) */}
      {/* <section className="py-12 lg:py-20" style={{ background: 'var(--color-bg-light)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-8">
            <h3 className="text-xl md:text-2xl font-semibold" style={{ color: 'var(--color-brand-primary)', fontFamily: 'M PLUS Rounded 1c' }}>
              Featured Logos
            </h3>
            <p className="text-sm text-gray-600">A selection of logo designs by our brand designer.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
            {['/credit/img.png','/credit/img (2).png','/credit/img (3).png','/credit/img (4).png','/credit/img (5).png'].map((src, i) => (
              <div key={i} className="overflow-hidden rounded-xl bg-white p-4 md:p-6 flex items-center justify-center shadow-sm hover:shadow-lg transition-shadow duration-300" style={{ minHeight: 140 }}>
                <img src={src} alt={`Logo ${i+1}`} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Content Blocks */}
      <section className="py-20" style={{ background: 'var(--color-bg-light)' }}>
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {contentBlocks.map((block, index) => {
              const Icon = block.icon;
              const isEven = index % 2 === 0;
              const isVisible = visibleBlocks.includes(index);

              return (
                <div
                  key={index}
                  ref={(el: HTMLDivElement | null) => {
                    blockRefs.current[index] = el;
                  }}
                  className={`scroll-reveal ${isVisible ? 'revealed' : ''}`}
                >
                  <Card className="overflow-hidden border-0 shadow-xl hover-lift">
                    <CardContent className="p-0">
                      <div className={`grid md:grid-cols-2 gap-0 ${isEven ? '' : 'md:grid-flow-dense'}`}>
                        <div className={`relative h-64 md:h-auto ${isEven ? '' : 'md:col-start-2'}`}>
                          <img
                            src={block.image}
                            alt={block.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(11,76,106,0.12), rgba(255,138,0,0.12))' }}></div>
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-accent))' }}>
                            <Icon className="w-8 h-8" style={{ color: 'var(--accent-foreground)' }} />
                          </div>
                          <h2
                            className="text-3xl md:text-4xl font-bold"
                            style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-text-default)' }}
                          >
                            {block.title}
                          </h2>
                          <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-default)' }}>
                            {block.description}
                          </p>
                          <div>
                            <Link to="/enroll">
                              <Button className="gap-2" style={{ background: 'linear-gradient(90deg, var(--color-brand-primary), var(--color-accent))', color: 'var(--accent-foreground)' }}>
                                {t('learn_more')}
                                <ArrowRight className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Section - styled card with modern reveal animation */}
      <section className="py-20" style={{ background: 'var(--color-bg-light)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="scroll-reveal opacity-0 animate-fade-in-up">
              <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-2xl transform transition-transform duration-500 hover:-translate-y-1">
                <div style={{ padding: '1px', background: 'linear-gradient(90deg, var(--color-brand-primary), var(--color-accent))' }}>
                  <CardContent style={{ background: 'var(--color-bg-light)', padding: '2rem' }}>
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-accent))' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8" style={{ color: 'var(--accent-foreground)' }}>
                            <path fill="currentColor" d="M12 2L2 7v6c0 5 4 9 10 9s10-4 10-9V7l-10-5z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-brand-primary)' }}>
                          {t('homepage.philosophy_title')}
                        </h3>
                        <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-default)' }}>
                          {t('homepage.philosophy_text')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Credits Preview Section */}
      <section className="py-12" style={{ background: 'var(--color-bg-light)' }}>
        <div className="container mx-auto px-4">
          {/* <div className="max-w-6xl mx-auto text-center mb-8">
            <h3 className="text-2xl font-bold" style={{ fontFamily: 'M PLUS Rounded 1c', color: 'var(--color-brand-primary)' }}>
              Featured Logos
            </h3>
            <p className="text-sm text-gray-600">A selection of logo designs that helped shape Kai's visual identity.</p>
          </div> */}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <img src="/credit/img.png" className="w-full h-32 object-contain p-3 bg-white rounded-md shadow-sm" alt="logo 1" />
            <img src="/credit/img (2).png" className="w-full h-32 object-contain p-3 bg-white rounded-md shadow-sm" alt="logo 2" />
            <img src="/credit/img (3).png" className="w-full h-32 object-contain p-3 bg-white rounded-md shadow-sm" alt="logo 3" />
            <img src="/credit/img (4).png" className="w-full h-32 object-contain p-3 bg-white rounded-md shadow-sm" alt="logo 4" />
            <img src="/credit/img (5).png" className="w-full h-32 object-contain p-3 bg-white rounded-md shadow-sm" alt="logo 5" />
          </div>

          {/* <div className="text-center mt-6">
            <Link to="/credits">
              <Button className="gap-2" style={{ background: 'linear-gradient(90deg, var(--color-brand-primary), var(--color-accent))', color: 'var(--accent-foreground)' }}>
                View Full Credits
              </Button>
            </Link>
          </div> */}
        </div>
      </section>
    </div>
  );
}
