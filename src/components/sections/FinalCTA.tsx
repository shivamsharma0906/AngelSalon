import React from 'react';
import { homeData } from '../../data/home';
import { siteConfig } from '../../data/site';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { LaurelDivider } from '../ui/LaurelDivider';
import { WhatsAppIcon, ArrowRightIcon } from '../ui/icons';

export const FinalCTA: React.FC<{ tone?: 'ink' | 'surface' }> = ({ tone = 'surface' }) => {
  const { finalCta } = homeData;

  const whatsAppFinalUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hi Angels Salon & Academy! I would like to book an appointment. Could you please share available slots?"
  )}`;

  return (
    <Section tone={tone} className="py-20 sm:py-28 border-t border-gold-line text-center" aria-label="Book Your Experience">
      <Container size="md" data-reveal>
        <div className="flex justify-center mb-6">
          <LaurelDivider size="md" />
        </div>

        <span className="text-[12px] uppercase tracking-wider text-gold font-semibold mb-3 block">
          Your Beauty Sanctuary Awaits
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
          {finalCta.heading}
        </h2>

        <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {finalCta.subtext}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            as="a"
            href={whatsAppFinalUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="gold"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 text-sm uppercase tracking-wider font-bold rounded-[4px]"
            leftIcon={<WhatsAppIcon size={18} />}
          >
            {finalCta.primaryText}
          </Button>

          <Button
            as="a"
            href={finalCta.secondaryLink}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] border-line hover:border-gold-line text-text hover:text-gold px-8 py-3.5 text-sm uppercase tracking-wider font-semibold rounded-[4px]"
            rightIcon={<ArrowRightIcon size={16} />}
          >
            {finalCta.secondaryText}
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default FinalCTA;
