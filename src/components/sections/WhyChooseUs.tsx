import React from 'react';
import { homeData } from '../../data/home';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { ShieldCheckIcon, UserGroupIcon, SparklesIcon, ScissorsIcon } from '../ui/icons';

export const WhyChooseUs: React.FC = () => {
  const { reasons } = homeData;

  const renderIcon = (id: string) => {
    switch (id) {
      case 'hygiene':
        return <ShieldCheckIcon size={24} className="text-gold" />;
      case 'staff':
        return <UserGroupIcon size={24} className="text-gold" />;
      case 'treatments':
        return <SparklesIcon size={24} className="text-gold" />;
      case 'family':
        return <ScissorsIcon size={24} className="text-gold" />;
      default:
        return <SparklesIcon size={24} className="text-gold" />;
    }
  };

  return (
    <Section tone="surface" className="py-20 sm:py-28 border-t border-border" aria-label="Why Clients Choose Angels Salon">
      <Container size="lg">
        {/* Lustre Section Header */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 border border-border shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold-text font-semibold">
              The Angels Difference
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-text mb-4 leading-tight tracking-tight">
            Why guests keep <br className="hidden sm:inline" />
            <span className="italic">coming back.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-lg mx-auto">
            {reasons.description}
          </p>
        </div>

        {/* 4 Lustre Pillar Cards */}
        <div data-reveal data-reveal-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {reasons.items.map((item, idx) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between p-7 rounded-[24px] sm:rounded-[28px] bg-background/50 border border-border hover:border-gold/50 shadow-lustre-sm hover:shadow-lustre-md transition-all duration-300"
            >
              <div>
                {/* Number & Icon Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center group-hover:scale-105 group-hover:border-gold/50 transition-all duration-300 shadow-sm">
                    {renderIcon(item.id)}
                  </div>
                  <span className="font-serif text-2xl font-normal text-border group-hover:text-gold transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-text mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Review Highlight Keyword Pill */}
              <div className="pt-4 border-t border-border/80 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-text">
                  Keyword
                </span>
                <span className="text-[11px] font-medium text-text bg-surface px-2.5 py-0.5 rounded-full border border-border/80">
                  "{item.highlightReviewKeyword}"
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default WhyChooseUs;
