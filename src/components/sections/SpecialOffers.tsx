import React, { useState, useEffect } from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Carousel } from '../Carousel';
import { buildWhatsAppLink } from '../../lib/whatsapp';
import {
  SpecialOfferItem,
  specialOffersData,
  getActiveOffers,
} from '../../data/offers';

export type { SpecialOfferItem };
export { specialOffersData };

export const SpecialOffers: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [selectedPoster, setSelectedPoster] = useState<SpecialOfferItem | null>(null);
  const activeOffers = getActiveOffers();

  // Esc listener and body scroll lock for poster preview
  useEffect(() => {
    if (!selectedPoster) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPoster(null);
    };

    const savedTop = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedTop}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, savedTop);
    };
  }, [selectedPoster]);

  if (activeOffers.length === 0) {
    return null;
  }

  return (
    <section className={`py-12 sm:py-20 lg:py-24 bg-ink ${className}`} aria-label="Current Salon Offers & Seasonal Packages">
      <Container size="lg">
        <div data-reveal>
          <SectionHeading
            subtitle="Celebratory Specials & Privileges"
            title="Seasonal Salon Privileges"
            description="Curated seasonal packages and bespoke styling privileges, claimable directly through WhatsApp concierge."
            align="center"
          />
        </div>

        {/* Carousel Presentation: Quiet Editorial Text Cards */}
        <div data-reveal>
          <Carousel
            label="Seasonal salon privileges and packages"
            slideClassName="w-[85vw] xs:w-[80vw] sm:w-[350px] lg:w-[380px] shrink-0 snap-start"
          >
            {activeOffers.map((offer) => {
              const bookingLink = buildWhatsAppLink({
                message: offer.whatsappMessage,
              });

              return (
                <Card
                  key={offer.id}
                  data-card-hover
                  className="h-full p-6 sm:p-7 flex flex-col justify-between group border-border hover:border-gold/60 transition-all duration-300 bg-surface rounded-[4px]"
                >
                  <div>
                    {/* Header: Badge & Optional Rate */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] uppercase tracking-luxury text-gold font-semibold">
                        {offer.badge}
                      </span>
                      <span className="text-xs font-semibold text-text-muted px-2 py-0.5 rounded bg-raised border border-border">
                        {offer.discount}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-text mb-3 group-hover:text-gold transition-colors leading-snug">
                      {offer.title}
                    </h3>

                    {/* Single-line editorial summary */}
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4">
                      {offer.description}
                    </p>

                    {/* Terms */}
                    <p className="text-[11px] text-text-subtle italic mb-6">
                      {offer.terms}
                    </p>
                  </div>

                  {/* Actions: Primary WhatsApp button & quiet poster preview link */}
                  <div className="pt-4 border-t border-border/60 flex flex-col gap-2.5">
                    <Button
                      as="a"
                      href={bookingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="whatsapp"
                      size="sm"
                      fullWidth
                      className="min-h-[44px] text-xs font-semibold uppercase tracking-wider"
                    >
                      Enquire on WhatsApp
                    </Button>

                    <button
                      type="button"
                      onClick={() => setSelectedPoster(offer)}
                      className="text-center text-[11px] text-text-muted hover:text-gold transition-colors py-1 inline-flex items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                    >
                      <span>View poster</span>
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </Card>
              );
            })}
          </Carousel>
        </div>
      </Container>

      {/* Poster Preview Lightbox Modal */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPoster(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Official poster for ${selectedPoster.title}`}
        >
          <div
            className="relative max-w-lg w-full bg-surface border border-gold-line rounded-lg overflow-hidden shadow-card-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-raised">
              <h4 className="font-serif text-base font-bold text-text truncate pr-4">
                {selectedPoster.title}
              </h4>
              <button
                type="button"
                onClick={() => setSelectedPoster(null)}
                className="w-8 h-8 rounded-full bg-surface text-text hover:text-gold flex items-center justify-center border border-border"
                aria-label="Close poster preview"
              >
                ✕
              </button>
            </div>
            <div className="p-3 bg-ink flex items-center justify-center max-h-[75vh]">
              <img
                src={selectedPoster.image}
                alt={selectedPoster.alt}
                className="max-h-[70vh] w-auto object-contain rounded"
              />
            </div>
            <div className="p-4 bg-raised border-t border-border flex items-center justify-between text-xs">
              <span className="text-text-muted">{selectedPoster.terms}</span>
              <Button
                as="a"
                href={buildWhatsAppLink({ message: selectedPoster.whatsappMessage })}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="sm"
              >
                Claim on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SpecialOffers;
