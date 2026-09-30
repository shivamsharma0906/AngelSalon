import React from 'react';
import { homeData } from '../../data/home';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { ArrowRightIcon } from '../ui/icons';

export const WelcomeToAngels: React.FC = () => {
  const { welcome } = homeData;

  if (!welcome || !welcome.verified || welcome.paragraphs.length === 0) {
    return null;
  }

  return (
    <Section tone="ink" className="py-16 sm:py-24" aria-label="Welcome to Angels Salon & Academy">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Image Frame */}
          <div data-reveal="image" className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-[4/3] rounded-[4px] overflow-hidden border border-gold/40 hover:border-gold/60 transition-colors duration-300 bg-raised shadow-xl">
              <img
                src={welcome.image}
                alt={welcome.imageAlt}
                width={600}
                height={450}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Copy Column */}
          <div data-reveal className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-[12px] uppercase tracking-wider text-gold font-semibold block mb-2">
              {welcome.subtitle}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4 leading-tight">
              {welcome.title}
            </h2>
            <div className="w-12 h-0.5 bg-gold mb-6" />

            <div className="space-y-4 text-base sm:text-lg text-muted font-normal leading-relaxed mb-8">
              {welcome.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <Button
              as="a"
              href={welcome.ctaLink}
              variant="outline"
              size="md"
              className="min-h-[48px] border-gold-line text-gold hover:border-gold px-8 py-3 text-sm uppercase tracking-wider font-semibold rounded-[4px]"
              rightIcon={<ArrowRightIcon size={16} />}
            >
              {welcome.ctaText}
            </Button>
          </div>

        </div>
      </Container>
    </Section>
  );
};

export default WelcomeToAngels;
