import React from 'react';
import { homeData } from '../../data/home';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { ArrowRightIcon } from '../ui/icons';

export const AcademyTeaser: React.FC = () => {
  const { academyTeaser } = homeData;

  if (!academyTeaser || !academyTeaser.verified || !academyTeaser.headline) {
    return null;
  }

  return (
    <Section tone="surface" className="py-16 sm:py-24 border-y border-line" aria-label="Angels Academy Teaser">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Photo Column */}
          <div data-reveal="image" className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-[4px] overflow-hidden border border-line bg-raised shadow-xl">
              <img
                src={academyTeaser.image}
                alt={academyTeaser.imageAlt}
                width={600}
                height={450}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Copy Column (2 lines + CTA) */}
          <div data-reveal className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start text-left">
            <span className="text-[12px] uppercase tracking-wider text-gold font-semibold block mb-2">
              Education & Artistry
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4 leading-tight">
              {academyTeaser.headline}
            </h2>
            <div className="w-12 h-0.5 bg-gold mb-6" />

            <p className="text-base sm:text-lg text-muted font-normal leading-relaxed mb-8 max-w-xl">
              {academyTeaser.subtext}
            </p>

            <Button
              as="a"
              href={academyTeaser.ctaLink}
              variant="gold"
              size="md"
              className="min-h-[48px] px-8 py-3.5 text-sm uppercase tracking-wider font-bold rounded-[4px]"
              rightIcon={<ArrowRightIcon size={16} />}
            >
              {academyTeaser.ctaText}
            </Button>
          </div>

        </div>
      </Container>
    </Section>
  );
};

export default AcademyTeaser;
