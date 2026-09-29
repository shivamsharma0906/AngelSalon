import React from 'react';
import { siteConfig } from '../../data/site';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { LaurelDivider } from '../ui/LaurelDivider';

export const CTABanner: React.FC = () => {

  return (
    <section className="py-20 sm:py-28 bg-ink relative overflow-hidden text-center" aria-label="Book Your Experience">
      {/* Radial Gold Background Ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/8 rounded-full blur-3xl pointer-events-none" />

      <Container size="md" className="relative z-10" data-reveal>
        <LaurelDivider size="lg" className="mb-6" />

        <span className="text-xs sm:text-sm uppercase tracking-luxury text-gold font-semibold mb-3 block">
          Your Beauty Sanctuary Awaits
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-text tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
          Ready to Experience the Angels Transformation?
        </h2>

        <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Whether you desire a couture bridal makeover, sun-kissed balayage, or career-defining academy training, our master artists are ready for you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            as="a"
            href="/contact"
            variant="gold"
            size="lg"
            data-btn-sweep
            className="w-full sm:w-auto shadow-gold-sm min-h-[48px]"
          >
            Book an Appointment
          </Button>

          <Button
            as="a"
            href={`tel:${siteConfig.contact.phoneRaw}`}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-h-[48px]"
            leftIcon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            }
          >
            Call {siteConfig.contact.phoneDisplay}
          </Button>
        </div>
      </Container>
    </section>
  );
};
