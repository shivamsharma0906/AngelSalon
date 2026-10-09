import React, { useState } from 'react';
import { Container } from '../ui/Container';

export interface AboutAndFacilitiesProps {
  className?: string;
  showAboutText?: boolean;
}

export const AboutAndFacilities: React.FC<AboutAndFacilitiesProps> = ({
  className = '',
  showAboutText = true,
}) => {
  const [copied, setCopied] = useState(false);

  const address =
    '29/843, Shival Nagar, Pant Nagar, Ghatkopar East, Mumbai, Maharashtra 400075';
  const mapsUrl =
    'https://www.google.com/maps/place/Angel+salon+%26+Academy/@19.0850718,72.9121454,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c7a56b0b4e27:0x2f5182fec860269a!8m2!3d19.0850718!4d72.9121454!16s%2Fg%2F11rl9hc09h!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D';

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const facilities = [
    {
      name: 'Male Services',
      icon: (
        <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
        </svg>
      ),
    },
    {
      name: 'Female Services',
      icon: (
        <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="7" r="4" />
          <path d="M7 21l3-10h4l3 10" />
          <path d="M9 17h6" />
        </svg>
      ),
    },
    {
      name: 'Kids Services',
      icon: (
        <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M7 21v-2a5 5 0 0 1 10 0v2" />
          <circle cx="9" cy="5" r="1" />
          <circle cx="15" cy="5" r="1" />
        </svg>
      ),
    },
    {
      name: 'Wifi',
      icon: (
        <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
      ),
    },
    {
      name: 'Parking',
      icon: (
        <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
        </svg>
      ),
    },
    {
      name: 'Air Conditioning',
      icon: (
        <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      name: 'Wheelchair Access',
      icon: (
        <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4" r="2" />
          <path d="M5 11a5 5 0 0 0 5 5h4a5 5 0 0 0 5-5" />
          <path d="M8 8h5a2 2 0 0 1 2 2v6" />
          <circle cx="10.5" cy="16.5" r="4.5" />
        </svg>
      ),
    },
    {
      name: 'Beverages',
      icon: (
        <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
    },
    {
      name: 'Food',
      icon: (
        <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
          <path d="M10 2c1 .5 2 2 2 5" />
        </svg>
      ),
    },
    {
      name: 'Toilets',
      icon: (
        <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 2v10a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4V2" />
          <path d="M12 16v6" />
          <path d="M8 22h8" />
        </svg>
      ),
    },
    {
      name: 'Lockers',
      icon: (
        <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="12" y1="3" x2="12" y2="21" />
          <circle cx="8" cy="12" r="1.5" />
          <circle cx="16" cy="12" r="1.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className={`py-12 sm:py-16 ${className}`} aria-label="About Us & Salon Facilities">
      <Container size="lg">
        <div className="space-y-8">
          {/* Card 1: ABOUT US */}
          <div className="bg-surface/90 border border-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-gold/40">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold inline-block animate-pulse"></span>
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-gold">
                About Us
              </h2>
            </div>

            {/* Real Salon Exterior Storefront */}
            <div className="mb-6 relative rounded-2xl overflow-hidden border border-border bg-ink shadow-xl group">
              <div className="aspect-[16/10] sm:aspect-[16/9] md:aspect-[3/2] max-h-[520px] w-full overflow-hidden flex items-center justify-center bg-ink">
                <img
                  src="/images/salon_outside.jpg"
                  alt="Angels Salon & Academy storefront exterior in Ghatkopar East Mumbai"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 right-3 sm:right-4 flex flex-wrap items-center justify-between gap-2">
                <span className="bg-ink/85 backdrop-blur-md border border-gold/40 text-[10px] sm:text-xs font-semibold text-gold px-3 py-1 rounded-full uppercase tracking-luxury">
                  Flagship Storefront & Academy • Pant Nagar, Ghatkopar East
                </span>
                <span className="text-[11px] text-text-subtle bg-surface/85 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-border hidden sm:inline-block">
                  Open 7 Days • 9:30 AM – 9:00 PM
                </span>
              </div>
            </div>

            {/* Address Pill Bar */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-ink/70 border border-border hover:border-gold/40 transition-colors">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-text">
                <div className="w-8 h-8 rounded-lg bg-surface border border-gold/30 flex items-center justify-center shrink-0 text-gold shadow-sm">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="font-medium text-text-muted hover:text-text transition-colors leading-relaxed">
                  {address}
                </span>
              </div>

              <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0 justify-end pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="min-h-[44px] text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-lg border border-border bg-surface hover:border-gold hover:text-gold text-text-muted transition-colors flex items-center justify-center"
                  title="Copy address"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-lg bg-gold text-text font-bold hover:bg-gold-soft transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Directions</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Official Narrative */}
            {showAboutText && (
              <div className="space-y-4 text-xs sm:text-sm md:text-base text-text-muted leading-relaxed font-light">
                <p>
                  Angel's Salon is a premium unisex salon in Ghatkopar East, Mumbai, dedicated to helping you look and feel your best. Conveniently located in Shival Nagar beside Kirti Computer Institute, we offer a complete range of professional hair, skin, beauty, and grooming services for both men and women. Our experienced team combines expert techniques with high-quality products to deliver personalized services in a clean, comfortable, and welcoming environment.
                </p>
                <p>
                  Whether you're looking for a stylish haircut, hair coloring, smoothening, facials, bridal or party makeup, skincare treatments, or regular grooming, we ensure every visit is relaxing and satisfying. At Angel's Salon, customer satisfaction, hygiene, and attention to detail are at the heart of everything we do. We believe every client deserves exceptional service and a rejuvenating salon experience tailored to their individual style and preferences.
                </p>
                <p className="text-text font-medium pt-1">
                  Visit us any day of the week from <span className="text-gold font-semibold">9:30 AM to 9:00 PM</span> and experience professional beauty and grooming services that leave you looking confident and refreshed.
                </p>
              </div>
            )}
          </div>

          {/* Card 2: FACILITIES */}
          <div className="bg-surface/90 border border-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-gold/40">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold inline-block animate-pulse"></span>
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-gold">
                Facilities
              </h2>
            </div>

            {/* Facilities Pill Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
              {facilities.map((fac) => (
                <div
                  key={fac.name}
                  className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-ink/70 border border-border hover:border-gold/50 hover:bg-surface transition-all duration-200 group shadow-sm"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface border border-gold/20 group-hover:border-gold flex items-center justify-center shrink-0 transition-colors">
                    {fac.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-text group-hover:text-gold transition-colors">
                    {fac.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutAndFacilities;
