import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { ShieldCheckIcon, ScissorsIcon, SparklesIcon, HeartIcon } from '../ui/icons';

interface WhyFeature {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const WHY_FEATURES: WhyFeature[] = [
  {
    number: '01',
    title: 'Expert Stylists',
    description: 'Experienced artists trained in Vidal Sassoon precision cutting, bespoke colour and transformative styling for every hair texture.',
    icon: ScissorsIcon,
  },
  {
    number: '02',
    title: 'Premium Products',
    description: 'Professional, certified cruelty-free and organic formulas chosen for healthy, long-lasting, and beautiful hair results.',
    icon: SparklesIcon,
  },
  {
    number: '03',
    title: 'Personalised Care',
    description: 'Every visit starts with a dedicated consultation tailored to your hair condition, facial contours, lifestyle and routine.',
    icon: HeartIcon,
  },
  {
    number: '04',
    title: 'Clean & Safe',
    description: 'Hospital-grade sterilized tools, fresh sealed linens, and a calm, spotless unisex sanctuary every day.',
    icon: ShieldCheckIcon,
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <Section tone="surface" className="py-20 sm:py-28 border-t border-border" aria-label="Why Clients Choose Angel Family Salon">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, description & Arched Salon Photo */}
          <div data-reveal className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-6 h-[1.5px] bg-gold" aria-hidden="true" />
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-text font-semibold">
                  Why Angel Family Salon
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-text mb-5 leading-[1.15] tracking-tight">
                Why guests keep <br className="hidden sm:inline" />
                <span className="italic font-normal">coming back.</span>
              </h2>

              <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal mb-8 max-w-md">
                Small details, thoughtful care, and great hair every visit is designed to leave you feeling your best.
              </p>
            </div>

            {/* Arched Salon Product / Vanity Photo Frame */}
            <div data-reveal="image" className="relative w-full aspect-[4/3] rounded-tl-[70px] rounded-br-[70px] rounded-tr-[24px] rounded-bl-[24px] overflow-hidden border border-border shadow-lustre-md bg-dark">
              <img
                src="/images/real/interior_skincare_dispensary.webp"
                alt="Angel Salon & Academy luxury professional hair and skincare dispensary in Ghatkopar East"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover select-none"
              />
            </div>
          </div>

          {/* Right Column: 2x2 Feature Cards Grid (2-Column Mobile & Desktop) */}
          <div data-reveal data-reveal-stagger className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-6">
            {WHY_FEATURES.map((feat) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={feat.number}
                  className="rounded-[18px] sm:rounded-[28px] bg-surface p-4 sm:p-7 md:p-8 border border-border/80 shadow-lustre-sm hover:shadow-lustre-md hover:border-gold/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top row: Circular icon pill on left, Number on right */}
                    <div className="flex items-center justify-between mb-3 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-surface-subtle border border-gold/40 flex items-center justify-center text-gold group-hover:scale-105 transition-transform duration-300 shadow-sm">
                        <IconComp size={16} className="text-gold" />
                      </div>
                      <span className="font-serif text-xs sm:text-sm font-normal text-text-muted">
                        {feat.number}
                      </span>
                    </div>

                    <h3 className="font-serif text-sm xs:text-base sm:text-2xl font-normal text-text mb-1.5 sm:mb-3 group-hover:text-gold-text transition-colors leading-snug">
                      {feat.title}
                    </h3>

                    <p className="text-[11px] sm:text-sm text-text-muted leading-relaxed font-normal">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </Container>
    </Section>
  );
};

export default WhyChooseUs;
