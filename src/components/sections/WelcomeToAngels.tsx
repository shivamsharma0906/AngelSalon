import React from 'react';
import { homeData } from '../../data/home';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { ArrowRightIcon } from '../ui/icons';

export const WelcomeToAngels: React.FC = () => {
  const { welcome } = homeData;

  if (!welcome || !welcome.verified || welcome.paragraphs.length === 0) {
    return null;
  }

  return (
    <Section tone="surface" className="py-20 sm:py-28 border-t border-border" aria-label="About Angels Salon & Academy">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Asymmetrical Lustre Arched Image Frame */}
          <div data-reveal="image" className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] sm:aspect-[4/5] rounded-t-[180px] rounded-b-[28px] overflow-hidden border border-border shadow-lustre-md bg-dark">
              <img
                src={welcome.image}
                alt={welcome.imageAlt}
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Pill on Image */}
              <div className="absolute bottom-5 left-5 right-5 p-3 rounded-full bg-surface/90 backdrop-blur-md border border-border shadow-sm flex items-center justify-between">
                <span className="text-xs font-semibold text-text">Ghatkopar East Flagship</span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-gold-text">Est. 2014</span>
              </div>
            </div>
          </div>

          {/* Editorial Copy Column */}
          <div data-reveal className="lg:col-span-7 flex flex-col items-start text-left order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 border border-border shadow-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-gold-text font-semibold">
                Studio Philosophy
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-text mb-6 leading-[1.15] tracking-tight">
              A modern sanctuary for hair <br className="hidden sm:inline" />
              <span className="italic">that feels like you.</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-text-muted font-normal leading-relaxed mb-8 max-w-xl">
              {welcome.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={welcome.ctaLink}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-dark text-text-inverse hover:bg-gold-text text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-sm active:scale-95"
              >
                <span>{welcome.ctaText}</span>
                <ArrowRightIcon size={14} />
              </a>

              <a
                href="tel:07303312054"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-border hover:border-gold/60 text-xs text-text-muted hover:text-text uppercase tracking-wider font-semibold transition-colors"
              >
                <span>Direct Concierge: 073033 12054</span>
              </a>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
};

export default WelcomeToAngels;
