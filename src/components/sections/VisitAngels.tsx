import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/site';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MapPinIcon, ClockIcon, PhoneIcon, WhatsAppIcon, DirectionsIcon } from '../ui/icons';

export const VisitAngels: React.FC<{ tone?: 'ink' | 'surface' }> = ({ tone = 'ink' }) => {
  const branch = siteConfig.branches[0];
  const [activeView, setActiveView] = useState<'storefront' | 'map'>('storefront');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapIframeReady, setMapIframeReady] = useState(false);
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
    "Hi Angels Salon & Academy! I would like to visit your Ghatkopar East salon today. What are your available time slots?"
  )}`;

  return (
    <Section tone={tone} className="py-16 sm:py-24" aria-label="Visit Our Salon Location">
      <Container size="lg">
        
        {/* Section Header */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[12px] uppercase tracking-wider text-gold font-semibold block mb-2">
            Location & Hours
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
            Visit Angels
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-4" />
          <p className="text-base text-muted font-normal leading-relaxed">
            Conveniently located in Pant Nagar, Ghatkopar East. Walk-ins and appointments are welcome daily.
          </p>
        </div>

        {/* Location & Map Card */}
        <div className="max-w-5xl mx-auto">
          <Card className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              
              {/* Left Column: Details & Actions */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <span className="text-[12px] uppercase tracking-wider text-gold font-semibold block mb-2">
                    Flagship Sanctuary
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-6">
                    {branch.name}
                  </h3>

                  {/* Address with clickable directions link */}
                  <div className="flex items-start gap-3.5 mb-5">
                    <MapPinIcon size={20} className="text-gold shrink-0 mt-0.5" />
                    <div>
                      <a
                        href={branch.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base text-text hover:text-gold transition-colors font-medium block leading-relaxed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                      >
                        {branch.address.formatted}
                      </a>
                      <span className="text-xs text-muted block mt-0.5">
                        (Beside Kirti Computer Institute)
                      </span>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3.5 mb-5">
                    <ClockIcon size={20} className="text-gold shrink-0 mt-0.5" />
                    <div className="text-base text-muted">
                      <span className="font-semibold text-text block mb-1">
                        {branch.hours}
                      </span>
                      <ul className="text-xs text-muted space-y-0.5">
                        {branch.hoursDetail.map((detail, idx) => (
                          <li key={idx}>
                            {detail.days}: <span className="text-text">{detail.time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3.5 mb-8">
                    <PhoneIcon size={20} className="text-gold shrink-0" />
                    <a
                      href={`tel:${branch.phoneRaw}`}
                      className="text-base text-text hover:text-gold transition-colors font-semibold min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                    >
                      {branch.phone}
                    </a>
                  </div>
                </div>

                {/* Action Buttons: Call | WhatsApp | Directions */}
                <div className="space-y-3 pt-6 border-t border-line">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button
                      as="a"
                      href={`tel:${branch.phoneRaw}`}
                      variant="outline"
                      size="md"
                      fullWidth
                      className="min-h-[48px] border-line text-text hover:border-gold hover:text-gold text-xs uppercase tracking-wider font-semibold rounded-[4px]"
                      leftIcon={<PhoneIcon size={16} />}
                    >
                      Call
                    </Button>

                    <Button
                      as="a"
                      href={whatsAppVisitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="gold"
                      size="md"
                      fullWidth
                      className="min-h-[48px] text-xs uppercase tracking-wider font-bold rounded-[4px]"
                      leftIcon={<WhatsAppIcon size={16} />}
                    >
                      WhatsApp
                    </Button>

                    <Button
                      as="a"
                      href={branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="md"
                      fullWidth
                      className="min-h-[48px] border-gold-line text-gold hover:border-gold text-xs uppercase tracking-wider font-semibold rounded-[4px]"
                      leftIcon={<DirectionsIcon size={16} />}
                    >
                      Directions
                    </Button>
                  </div>

                  {/* Optional View Pricing Link */}
                  <div className="pt-2 text-center sm:text-left">
                    <Link
                      to="/services"
                      className="text-xs uppercase tracking-wider text-muted hover:text-gold font-medium inline-flex items-center gap-1 transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                    >
                      <span>View services & pricing directory</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>

              </div>

              {/* Right Column: Storefront Photo or Lazy-Loaded Map */}
              <div className="lg:col-span-6 flex flex-col justify-between" ref={mapContainerRef}>
                
                {/* View Switcher Toggle */}
                <div className="flex items-center gap-2 mb-3" role="tablist" aria-label="Location views">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeView === 'storefront'}
                    onClick={() => setActiveView('storefront')}
                    className={`flex-1 min-h-[44px] px-4 py-2 rounded-[4px] text-xs uppercase tracking-wider font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
                      activeView === 'storefront'
                        ? 'bg-gold text-ink shadow-sm'
                        : 'bg-ink border border-line text-muted hover:text-text'
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
                    className={`flex-1 min-h-[44px] px-4 py-2 rounded-[4px] text-xs uppercase tracking-wider font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
                      activeView === 'map'
                        ? 'bg-gold text-ink shadow-sm'
                        : 'bg-ink border border-line text-muted hover:text-text'
                    }`}
                  >
                    Interactive Map
                  </button>
                </div>

                {/* View Container */}
                <div className="relative w-full h-[320px] sm:h-[400px] lg:h-full min-h-[320px] lg:min-h-[400px] rounded-[4px] overflow-hidden border border-line bg-surface flex flex-col">
                  {activeView === 'storefront' ? (
                    <div className="relative w-full h-full">
                      <img
                        src="/images/real/salon_storefront.jpg"
                        alt="Angels Salon & Academy storefront in Pant Nagar Ghatkopar East with Marathi and English signage"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 p-3 rounded-[4px] bg-ink/90 backdrop-blur-md border border-line text-xs text-text flex items-center justify-between">
                        <span className="font-medium text-gold">Pant Nagar Storefront Entrance</span>
                        <a
                          href={branch.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs uppercase tracking-wider text-muted hover:text-gold flex items-center gap-1 font-semibold"
                        >
                          <span>Open in Maps</span>
                          <span aria-hidden="true">&rarr;</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full bg-surface">
                      {/* Rich Location Placeholder: Active immediately so user never sees a black screen */}
                      {!mapIframeReady && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-surface z-10">
                          <div className="relative mb-3 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-gold/20 animate-ping absolute" />
                            <div className="w-10 h-10 rounded-full bg-raised border border-gold flex items-center justify-center text-gold shadow-gold-sm relative z-10">
                              <MapPinIcon size={20} className="text-gold" />
                            </div>
                          </div>
                          <h4 className="font-serif text-base font-bold text-text mb-1">
                            Angels Salon & Academy
                          </h4>
                          <p className="text-xs text-muted max-w-xs mb-3">
                            29/843, Shival Nagar, Pant Nagar, Ghatkopar East, Mumbai
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] uppercase tracking-wider text-gold font-semibold flex items-center gap-1.5 bg-gold/10 border border-gold/25 px-3 py-1 rounded-full">
                              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                              <span>Loading Google Map...</span>
                            </span>
                            <a
                              href={branch.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] uppercase tracking-wider text-muted hover:text-gold font-semibold underline"
                            >
                              Direct Maps Link &rarr;
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Google Maps Iframe */}
                      {isMapLoaded && (
                        <iframe
                          src={branch.googleMapsEmbedUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={false}
                          loading="lazy"
                          onLoad={() => setMapIframeReady(true)}
                          referrerPolicy="strict-origin-when-cross-origin"
                          title={`${branch.name} Map`}
                          className={`w-full h-full grayscale-[15%] contrast-[105%] hover:grayscale-0 transition-opacity duration-500 ${
                            mapIframeReady ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </Card>
        </div>

      </Container>
    </Section>
  );
};

export default VisitAngels;
