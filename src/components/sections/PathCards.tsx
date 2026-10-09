import React from 'react';
import { Link } from 'react-router-dom';
import { homeData } from '../../data/home';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { ScissorsIcon, GraduationCapIcon, WhatsAppIcon, ArrowRightIcon } from '../ui/icons';

export const PathCards: React.FC = () => {
  const { pathCards } = homeData;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'scissors':
        return <ScissorsIcon size={28} className="text-gold" />;
      case 'academy':
        return <GraduationCapIcon size={28} className="text-gold" />;
      case 'whatsapp':
        return <WhatsAppIcon size={28} className="text-gold" />;
      default:
        return <ScissorsIcon size={28} className="text-gold" />;
    }
  };

  return (
    <Section tone="background" className="py-12 sm:py-16" aria-label="Explore Our Core Offerings">
      <Container size="lg">
        <h2 className="sr-only">Our Core Offerings</h2>
        <div data-reveal data-reveal-stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pathCards.map((card) => {
            const cardContent = (
              <Card
                key={card.id}
                hoverEffect
                className="p-6 sm:p-8 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="w-12 h-12 rounded-[4px] bg-surface-subtle border border-gold/30 flex items-center justify-center mb-5 group-hover:border-gold transition-colors">
                    {renderIcon(card.icon)}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-text mb-2 group-hover:text-gold-text transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-base text-text-muted leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gold/25 flex items-center justify-between text-sm font-semibold text-gold-text uppercase tracking-wider">
                  <span>Explore</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowRightIcon size={16} />
                  </span>
                </div>
              </Card>
            );

            if (card.isExternal) {
              return (
                <a
                  key={card.id}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-[4px]"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <Link
                key={card.id}
                to={card.href}
                className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-[4px]"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default PathCards;
