import React, { useState, useEffect } from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { buildWhatsAppLink } from '../../lib/whatsapp';

export interface SpecialOfferItem {
  id: string;
  title: string;
  badge: string;
  discount: string;
  description: string;
  image: string;
  alt: string;
  terms: string;
  whatsappMessage: string;
}

export const specialOffersData: SpecialOfferItem[] = [
  {
    id: 'offer-hair-40',
    title: 'Raksha Bandhan & Festive Hair Celebration',
    badge: 'Limited Time Festival Offer',
    discount: 'Flat 40% OFF',
    description: 'Enjoy 40% off on all signature haircuts, smoothening rituals, hair botox, and styling sessions at our Ghatkopar East salon.',
    image: '/images/real/offer_hair_40.jpg',
    alt: 'Raksha Bandhan Flat 40% Off Hair Services offer banner at Angels Salon',
    terms: 'Valid on hair services. Prior booking recommended.',
    whatsappMessage: 'Hi Angels Salon! I would like to claim the *Flat 40% Off Hair Services* offer. Please share available slots!',
  },
  {
    id: 'offer-skin-30',
    title: 'Radiant Skin & Aesthetic Glow Rituals',
    badge: 'Skincare Privilege',
    discount: 'Flat 30% OFF',
    description: 'Indulge in transformative facial therapies, hydra-infusion, enzyme de-tan, and Skeyndor aesthetic skincare at an exclusive 30% saving.',
    image: '/images/real/offer_skin_30.jpg',
    alt: 'Flat 30% Off All Skin Services official banner at Angels Salon',
    terms: 'Valid on all skin therapies & facials.',
    whatsappMessage: 'Hi Angels Salon! I would like to claim the *Flat 30% Off Skin Services* offer. When can I book a session?',
  },
  {
    id: 'offer-nails-50',
    title: 'Luxury Manicure & Spa Pedicure',
    badge: 'Hands & Feet Deluxe',
    discount: 'Flat 50% OFF',
    description: 'Treat your hands and feet to herbal Himalayan soak, gentle cuticle architecture, diamond exfoliation, and premium long-wear lacquer at half price.',
    image: '/images/real/offer_nails_50.jpg',
    alt: 'Flat 50% Off Manicure and Pedicure offer banner at Angels Salon',
    terms: 'Valid on deluxe manicure & pedicure bookings.',
    whatsappMessage: 'Hi Angels Salon! I would like to claim the *Flat 50% Off Manicure & Pedicure* offer. Please reserve a slot for me.',
  },
  {
    id: 'offer-balayage-2999',
    title: 'French Balayage, Highlights & Global Colour',
    badge: 'Couture Colour Special',
    discount: 'Starting ₹2,999/-',
    description: 'Transform your look with sun-kissed French freehand balayage, dimensional foil highlights, or rich global tints starting at just ₹2,999/-.',
    image: '/images/real/offer_balayage_2999.jpg',
    alt: 'Balayage, Highlights and Global starting from Rs 2999 at Angels Salon',
    terms: 'Starting price varies with hair length & density.',
    whatsappMessage: 'Hi Angels Salon! I would like to inquire about the *Balayage, Highlights & Global starting ₹2,999* package.',
  },
  {
    id: 'offer-rica-wax-1199',
    title: 'Rica Waxing Members Package',
    badge: 'Members Exclusive Package',
    discount: 'Only ₹1,199/-',
    description: 'Complete smooth skin care with Italian Rica Waxing: Full Hand + Full Leg + Underarms package exclusively crafted for members.',
    image: '/images/real/offer_rica_wax_1199.jpg',
    alt: 'Rica Waxing Full Hand, Full Leg, Underarms at Rs 1199 Members Package',
    terms: 'Exclusive for registered salon members.',
    whatsappMessage: 'Hi Angels Salon! I would like to book the *Rica Waxing Members Package (Full Hand + Leg + Underarms) for ₹1,199*.',
  },
];

export const SpecialOffers: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [selectedPoster, setSelectedPoster] = useState<SpecialOfferItem | null>(null);

  // Esc listener and body scroll lock for poster lightbox
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

  return (
    <section className={`py-12 sm:py-20 lg:py-24 bg-ink ${className}`} aria-label="Current Salon Offers & Seasonal Packages">
      <Container size="lg">
        <div data-reveal>
          <SectionHeading
            subtitle="Celebratory Specials & Privileges"
            title="Exclusive Salon Offers & Packages"
            description="Claim verified festive discounts and curated membership packages directly through WhatsApp concierge."
            align="center"
          />
        </div>

        {/* Mobile: Native Scroll-Snap Horizontal Swipe Row with Hint of Next Card. Desktop: Clean 3-Col Grid */}
        <div data-reveal data-reveal-stagger className="scroll-snap-x gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 pb-3 md:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {specialOffersData.map((offer) => {

            return (
              <div
                key={offer.id}
                className="w-[82vw] xs:w-[78vw] sm:w-[350px] md:w-auto scroll-snap-align-start flex-shrink-0 flex flex-col"
              >
                <Card data-card-hover className="h-full overflow-hidden flex flex-col justify-between group border-border hover:border-gold/60 transition-all duration-300">
                  <div>
                    {/* Poster Thumbnail */}
                    <div
                      onClick={() => setSelectedPoster(offer)}
                      className="relative aspect-[4/3] w-full overflow-hidden bg-surface cursor-pointer border-b border-border group-hover:opacity-95"
                      title="Click to view full poster"
                    >
                      <img
                        src={offer.image}
                        alt={offer.alt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-60" />
                      
                      {/* Discount Badge */}
                      <div className="absolute top-3 left-3 bg-gold text-ink font-bold text-xs uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-md">
                        {offer.discount}
                      </div>

                      <div className="absolute bottom-3 right-3 bg-ink/80 backdrop-blur-sm border border-gold/40 text-[10px] text-gold px-2.5 py-1 rounded-sm flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <span>View Poster</span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 sm:p-6">
                      <span className="text-[11px] uppercase tracking-luxury text-gold font-semibold mb-1 block">
                        {offer.badge}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-text mb-2 group-hover:text-gold transition-colors">
                        {offer.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4">
                        {offer.description}
                      </p>
                      <p className="text-[11px] text-text-subtle italic">
                        ℹ️ {offer.terms}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0 border-t border-border/60 mt-auto">
                    <Button
                      type="button"
                      onClick={() => setSelectedPoster(offer)}
                      variant="outline"
                      size="sm"
                      fullWidth
                      className="min-h-[44px]"
                    >
                      View Offer Details
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-1 text-[11px] text-text-subtle mt-3">
          <span>← Swipe to explore 5 offers →</span>
        </div>
      </Container>

      {/* Modal Lightbox for Poster */}
      {selectedPoster && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPoster(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-surface border border-gold/40 rounded-xl overflow-hidden shadow-2xl p-4 sm:p-6 max-h-[92dvh] flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-border mb-3 shrink-0">
              <div className="pr-4">
                <span className="text-xs uppercase tracking-luxury text-gold font-semibold block">
                  Official Angels Salon Poster
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-text truncate">
                  {selectedPoster.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPoster(null)}
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-gold hover:border-gold transition-colors shrink-0"
                aria-label="Close poster preview"
              >
                ✕
              </button>
            </div>

            <div className="rounded-lg overflow-hidden border border-border max-h-[62vh] max-h-[62dvh] flex items-center justify-center bg-ink">
              <img
                src={selectedPoster.image}
                alt={selectedPoster.alt}
                className="max-h-[60vh] max-h-[60dvh] w-auto object-contain"
              />
            </div>

            <div className="mt-3 pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-text-muted text-center sm:text-left">
                {selectedPoster.terms}
              </span>
              <Button
                as="a"
                href={buildWhatsAppLink({ message: selectedPoster.whatsappMessage })}
                target="_blank"
                variant="whatsapp"
                size="sm"
                className="min-h-[44px]"
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
