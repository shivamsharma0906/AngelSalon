import React from 'react';
import { siteConfig } from '../../data/site';
import { Container } from '../ui/Container';
import { CountUp } from '../ui/CountUp';

export const TrustBar: React.FC = () => {
  const brandPartners = [
    { name: "L'Oréal Professionnel Paris", origin: "France" },
    { name: "Skeyndor Clinical Skincare", origin: "Spain" },
    { name: "Nashi Argan Luxury Haircare", origin: "Italy" },
    { name: "Matrix Biolage", origin: "USA" },
    { name: "Olaplex Bond Science", origin: "USA" },
    { name: "Rica Waxing", origin: "Italy" },
  ];

  return (
    <section className="bg-surface/80 border-b border-border py-10 sm:py-14" aria-label="Trust, Metrics and Brand Partners">
      <Container size="lg">
        {/* Top 4 Metrics Grid with CountUp */}
        <div data-reveal data-reveal-stagger className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-border/60 mb-10">
          {siteConfig.trustStats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center justify-center p-2 sm:px-4 ${
                index > 0 ? 'pt-4 sm:pt-0' : ''
              }`}
            >
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gold via-gold-soft to-gold-soft bg-clip-text text-transparent tracking-tight mb-1.5">
                <CountUp value={stat.value} />
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-luxury text-text font-bold mb-1">
                {stat.label}
              </span>
              <span className="text-xs text-text-muted max-w-[210px] leading-relaxed hidden sm:block">
                {stat.description}
              </span>
            </div>
          ))}
        </div>

        {/* Global Brand Partners Strip */}
        <div data-reveal className="pt-8 border-t border-border/60 text-center">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold block mb-4">
            Official Global Salon Partners & Authentic Formulations
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3">
            {brandPartners.map((partner, idx) => (
              <div key={idx} className="flex items-center gap-1.5 group">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors"></span>
                <span className="text-xs sm:text-sm font-serif tracking-wide text-text-muted group-hover:text-gold transition-colors font-medium">
                  {partner.name}
                </span>
                <span className="text-[10px] text-text-subtle">
                  ({partner.origin})
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TrustBar;
