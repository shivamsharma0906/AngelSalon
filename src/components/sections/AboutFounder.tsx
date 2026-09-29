import React from 'react';
import { siteConfig } from '../../data/site';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { CountUp } from '../ui/CountUp';

export const AboutFounder: React.FC = () => {
  const { founder } = siteConfig;

  return (
    <section className="py-16 sm:py-24 bg-surface border-y border-border" aria-label="About Angels Salon & Philosophy">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image Column with Golden Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Gold decorative offset frame */}
              <div
                className="absolute -inset-3 rounded-sm border border-gold/40 pointer-events-none transform -rotate-1 hidden sm:block"
                aria-hidden="true"
              ></div>

              {/* Main Image with Soft Reveal */}
              <div data-reveal="image" className="relative rounded-sm overflow-hidden border border-border shadow-2xl bg-ink aspect-[4/5]">
                <img
                  src={founder.image}
                  alt={founder.imageAlt}
                  width={600}
                  height={750}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />

                {/* Golden Experience Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-ink/90 backdrop-blur-md border border-gold/40 p-4 rounded-sm shadow-gold-sm flex items-center justify-between">
                  <div>
                    <span className="block font-serif text-2xl font-bold text-gold">
                      <CountUp value={founder.yearsExperience} />
                    </span>
                    <span className="text-xs uppercase tracking-luxury text-text-muted">
                      Excellence in Mumbai
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center text-gold">
                    ★
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story & Philosophy Column */}
          <div data-reveal className="lg:col-span-7 flex flex-col justify-center">
            <SectionHeading
              subtitle={founder.subtitle}
              title={founder.title}
              align="left"
              showDivider={false}
              className="mb-6"
            />

            <blockquote className="border-l-2 border-gold pl-5 py-2 mb-6 italic font-serif text-lg sm:text-xl text-gold-soft leading-relaxed">
              "{founder.quote}"
            </blockquote>

            <div className="space-y-4 text-text-muted text-base leading-relaxed mb-8">
              {founder.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/80 mb-8">
              <div>
                <h4 className="font-serif text-base font-bold text-text mb-1">
                  Surgical Sterilization
                </h4>
                <p className="text-xs text-text-muted">
                  Hospital-grade autoclaving of metal tools & single-use disposable kits.
                </p>
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-text mb-1">
                  Global Product Partners
                </h4>
                <p className="text-xs text-text-muted">
                  Exclusively formulated with L'Oréal Professionnel, Olaplex & Kérastase.
                </p>
              </div>
            </div>

            {/* Signature Block */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 bg-gold/60"></div>
              <div>
                <span className="font-serif text-lg font-bold text-text tracking-wide block">
                  {founder.signatureName}
                </span>
                <span className="text-xs uppercase tracking-luxury text-gold">
                  {founder.signatureRole}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
