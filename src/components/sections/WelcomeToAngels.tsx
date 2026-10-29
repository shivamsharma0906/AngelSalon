import React from 'react';
import { homeData } from '../../data/home';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { ArrowRightIcon } from '../ui/icons';
import { FramedImage } from '../ui/FramedImage';

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
            <FramedImage
              src={welcome.image}
              alt={welcome.imageAlt}
              focalPoint="50% 40%"
              aspectRatio="aspect-[4/5]"
              radius="arch-tall"
              border="gold"
              caption={{
                title: 'Ghatkopar East Flagship',
                subtitle: 'Precision Styling Stations',
                badge: 'Est. 2014',
              }}
              width={1200}
              height={1600}
            />
          </div>

          {/* Editorial Copy Column */}
          <div data-reveal className="lg:col-span-7 flex flex-col items-start text-left order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-text font-semibold">
                Our Philosophy
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-text mb-6 leading-tight tracking-tight">
              Every client is a canvas, <br className="hidden sm:inline" />
              <span className="italic">every detail is art.</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-text-muted leading-relaxed font-normal mb-8">
              {welcome.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Quick Navigation Action Pills */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark text-text-inverse hover:bg-gold-text text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-sm"
              >
                <span>Read Our Full Story</span>
                <ArrowRightIcon size={14} />
              </a>

              <a
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-border hover:border-gold/60 text-text hover:text-gold-text text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-sm"
              >
                <span>Explore Salon Rituals</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default WelcomeToAngels;
