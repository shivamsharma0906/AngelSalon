import React, { useState, useRef, useEffect } from 'react';
import { siteConfig } from '../../data/site';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { MapPinIcon, ClockIcon, PhoneIcon, WhatsAppIcon, DirectionsIcon } from '../ui/icons';

export const VisitAngels: React.FC<{ tone?: 'ink' | 'surface' }> = ({ tone = 'surface' }) => {
  const branch = siteConfig.branches[0];
  const [activeView, setActiveView] = useState<'storefront' | 'map'>('storefront');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsMapLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!branch) return null;

  const whatsAppVisitUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hi Angel Salon & Academy! I would like to visit your Ghatkopar East salon. What are your available time slots today?"
  )}`;

  return (
    <Section id="contact" tone={tone} className="relative py-20 sm:py-28 border-t border-border" aria-label="Visit Our Salon Location">
      <div id="reserve" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />
      <Container size="lg">
        {/* Lustre Section Header */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-text font-semibold">
              Visit & Reserve
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-text mb-4 leading-tight tracking-tight">
            Let’s create <br className="hidden sm:inline" />
            <span className="italic">your next look.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-lg mx-auto">
            Conveniently situated in Pant Nagar, Ghatkopar East. Walk-ins and reservations are welcome daily.
          </p>
        </div>

        {/* 2-Column Lustre Contact & Storefront Card */}
        <div data-reveal className="max-w-5xl mx-auto rounded-[28px] sm:rounded-[32px] bg-background/50 border border-border shadow-lustre-md p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Studio Information */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-gold/15 text-gold-text inline-block mb-4">
                  Flagship Studio & Academy
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-6">
                  Angel Salon &amp; Academy
                </h3>

                {/* Address */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 text-gold">
                    <MapPinIcon size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block mb-1">
                      Studio Location
                    </span>
                    <a
                      href={branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-text hover:text-gold transition-colors font-medium leading-relaxed block"
                    >
                      {branch.address.formatted}
                    </a>
                    <span className="text-xs text-text-muted mt-0.5 block">
                      (Beside Kirti Computer Institute)
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 text-gold">
                    <ClockIcon size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block mb-1">
                      Operating Hours
                    </span>
                    <p className="text-sm sm:text-base font-medium text-text">
                      {branch.hours}
                    </p>
                    <p className="text-xs text-text-muted">Monday through Sunday, including public holidays</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 text-gold">
                    <PhoneIcon size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block mb-1">
                      Concierge Desk
                    </span>
                    <a
                      href={`tel:${branch.phoneRaw}`}
                      className="text-sm sm:text-base text-text hover:text-gold transition-colors font-bold"
                    >
                      {branch.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Call | WhatsApp | Directions */}
              <div className="pt-6 border-t border-border flex flex-wrap gap-2.5">
                <a
                  href={`tel:${branch.phoneRaw}`}
                  className="flex-1 min-h-[44px] px-4 py-2.5 rounded-full bg-surface border border-border hover:border-gold text-text hover:text-gold text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <PhoneIcon size={14} className="text-gold" />
                  <span>Call</span>
                </a>

                <a
                  href={whatsAppVisitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-h-[44px] px-4 py-2.5 rounded-full bg-dark text-text-inverse hover:bg-gold-text text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <WhatsAppIcon size={14} className="fill-current text-gold" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={branch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-h-[44px] px-4 py-2.5 rounded-full bg-surface border border-border hover:border-gold text-text hover:text-gold text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <DirectionsIcon size={14} className="text-gold" />
                  <span>Directions</span>
                </a>
              </div>
            </div>

            {/* Right Column: Storefront Entrance / Interactive Map */}
            <div className="lg:col-span-6 flex flex-col justify-between" ref={mapContainerRef}>
              
              {/* View Switcher Pills */}
              <div className="flex items-center gap-2 mb-4" role="tablist" aria-label="Location views">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeView === 'storefront'}
                  onClick={() => setActiveView('storefront')}
                  className={`flex-1 py-2 px-4 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                    activeView === 'storefront'
                      ? 'bg-dark text-text-inverse shadow-sm'
                      : 'bg-surface border border-border text-text-muted hover:text-text'
                  }`}
                >
                  Storefront Entrance
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeView === 'map'}
                  onClick={() => {
                    setActiveView('map');
                    setIsMapLoaded(true);
                  }}
                  className={`flex-1 py-2 px-4 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                    activeView === 'map'
                      ? 'bg-dark text-text-inverse shadow-sm'
                      : 'bg-surface border border-border text-text-muted hover:text-text'
                  }`}
                >
                  Interactive Map
                </button>
              </div>

              {/* View Container */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-[24px] overflow-hidden border border-border shadow-sm bg-dark">
                {activeView === 'storefront' ? (
                  <div className="relative w-full h-full">
                    <img
                      src="/images/real/storefront_frontal.webp"
                      alt="Angel Salon & Academy storefront in Pant Nagar Ghatkopar East with clean glass entrance and illuminated signage"
                      width={1200}
                      height={900}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-full bg-surface/90 backdrop-blur-md border border-border shadow-sm flex items-center justify-between text-xs">
                      <span className="font-semibold text-text">Pant Nagar Flagship Entrance</span>
                      <a
                        href={branch.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] uppercase tracking-wider text-gold-text hover:text-gold font-bold"
                      >
                        Open Maps &rarr;
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full">
                    {isMapLoaded ? (
                      <iframe
                        src={branch.googleMapsEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Angel Salon & Academy Google Map"
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-surface">
                        <span className="text-xs text-text-muted font-serif">Loading interactive map...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
};

export default VisitAngels;
