import React from 'react';
import { homeData } from '../../data/home';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { ShieldCheckIcon, UserGroupIcon, SparklesIcon, ScissorsIcon, ArrowRightIcon } from '../ui/icons';

export const WhyChooseUs: React.FC = () => {
  const { reasons } = homeData;

  const renderIcon = (id: string) => {
    switch (id) {
      case 'hygiene':
        return <ShieldCheckIcon size={26} className="text-gold" />;
      case 'staff':
        return <UserGroupIcon size={26} className="text-gold" />;
      case 'treatments':
        return <SparklesIcon size={26} className="text-gold" />;
      case 'family':
        return <ScissorsIcon size={26} className="text-gold" />;
      default:
        return <SparklesIcon size={26} className="text-gold" />;
    }
  };

  const scrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    const reviewsEl = document.getElementById('reviews');
    if (reviewsEl) {
      reviewsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section tone="ink" className="py-16 sm:py-24" aria-label="Why Clients Choose Angels Salon">
      <Container size="lg">
        
        {/* Section Header */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[12px] uppercase tracking-wider text-gold font-semibold block mb-2">
            {reasons.subheading}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
            {reasons.heading}
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-4" />
          <p className="text-base text-muted font-normal leading-relaxed">
            {reasons.description}
          </p>
        </div>

        {/* 4 Reasons Grid */}
        <div data-reveal data-reveal-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.items.map((item) => (
            <Card
              key={item.id}
              hoverEffect
              className="p-6 flex flex-col justify-between h-full group"
            >
              <div>
                <div className="w-12 h-12 rounded-[4px] bg-ink border border-gold/30 flex items-center justify-center mb-5 group-hover:border-gold transition-colors">
                  {renderIcon(item.id)}
                </div>
                <h3 className="font-serif text-xl font-bold text-text mb-2 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-base text-muted leading-relaxed font-normal mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gold/25">
                <a
                  href="#reviews"
                  onClick={scrollToReviews}
                  className="text-xs uppercase tracking-wider text-gold hover:text-gold-soft font-semibold inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <span>Read client reviews</span>
                  <ArrowRightIcon size={14} />
                </a>
              </div>
            </Card>
          ))}
        </div>

      </Container>
    </Section>
  );
};

export default WhyChooseUs;
