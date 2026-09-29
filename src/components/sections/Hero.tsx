import React, { useState } from 'react';
import { googleSummary, googleReviews } from '../../data/reviews';
import { Button } from '../ui/Button';
import { BookingModal } from '../ui/BookingModal';
import { HorizontalBookingBar } from './HorizontalBookingBar';

export const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const trustMetrics = [
    { value: `${googleSummary.rating}★`, label: "Google Rating", sub: `${googleSummary.count} Verified Reviews` },
    { value: "10+", label: "Years of Excellence", sub: "Ghatkopar East" },
    { value: "15,000+", label: "Delighted Clients", sub: "Transformations" },
    { value: "100%", label: "Strict Hygiene", sub: "Sanitized Equipment" },
  ];

  return (
    <>
      <section
        className="relative min-h-[100svh] min-h-screen-svh flex flex-col justify-between overflow-hidden bg-ink pt-20 sm:pt-28 pb-8 sm:pb-10 w-full max-w-full"
        aria-label="Welcome to Angels Salon & Academy"
      >
        {/* Rich Atmospheric Background with Warm Golden Glow */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_bg.jpg"
            alt="Luxury hair and beauty salon ambiance at Angels Salon Mumbai"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
            loading="eager"
            fetchPriority="high"
          />
          {/* Subtle Vignettes for High Contrast & Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
        </div>

        {/* Ambient Golden Radial Light Flares (Hidden on mobile to save GPU cycles) */}
        <div className="hidden md:block absolute top-1/4 left-10 w-[550px] h-[550px] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="hidden md:block absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-gold/8 rounded-full blur-[140px] pointer-events-none" />

        {/* Main Hero Showcase */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 my-auto py-4 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">

            {/* Left Column: Haute Editorial Presentation */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left">
              {/* Luxury Eyebrow - Clean Editorial Typography without pill box */}
              <div className="flex flex-wrap items-center gap-1.5 xs:gap-2.5 text-[11px] xs:text-xs uppercase tracking-luxury font-bold text-gold mb-3 sm:mb-5">
                <span>Estd. 2014</span>
                <span className="text-gold/40">•</span>
                <span>Ghatkopar East, Mumbai</span>
                <span className="text-gold/40">•</span>
                <a
                  href={googleSummary.reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-gold transition-colors inline-flex items-center gap-1 font-semibold"
                >
                  <span className="text-[#FFB800]">★ {googleSummary.rating}</span>
                  <span>({googleSummary.count} Google Reviews)</span>
                </a>
              </div>

              {/* Grand Display Headline with Balanced Wrapping */}
              <h1 className="font-serif text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-4 sm:mb-6">
                The Sanctuary of <br />
                <span className="font-serif italic font-normal bg-gradient-to-r from-[#f5df9e] via-gold to-[#cfa228] bg-clip-text text-transparent">
                  Haute Coiffure
                </span> <br />
                & Bespoke Beauty.
              </h1>

              {/* Editorial Description */}
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-text-muted max-w-2xl font-light leading-relaxed mb-6 sm:mb-8">
                From precision cuts and silky smoothening to glowing facials and flawless makeup, every visit at Angels is personal, hygienic, and made around you.
              </p>

              {/* Action Buttons: Stacked full-width on mobile with 48px touch heights */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  variant="gold"
                  size="lg"
                  fullWidth
                  className="sm:w-auto min-h-[48px] shadow-gold-md font-bold px-8 py-3.5 text-sm tracking-luxury"
                >
                  <span>Book Appointment</span>
                  <span className="ml-2 font-mono">→</span>
                </Button>

                <Button
                  as="a"
                  href="tel:+917303312054"
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="sm:w-auto min-h-[48px] px-6 py-3.5 text-sm tracking-luxury"
                  leftIcon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  }
                >
                  <span>Call Now</span>
                </Button>
              </div>

              {/* Trust Metric Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-2xl border-t border-border/80 pt-4 sm:pt-6 mb-6 lg:mb-0">
                {trustMetrics.map((m, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-serif text-xl sm:text-3xl font-bold text-gold leading-none mb-1">
                      {m.value}
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-text tracking-wide">{m.label}</span>
                    <span className="text-[10px] sm:text-[11px] text-text-subtle font-light">{m.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: High-Fashion Visual Showcase Frame */}
            <div className="lg:col-span-5 xl:col-span-5 w-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-lg aspect-[4/5] rounded-3xl overflow-hidden border-2 border-gold/40 p-2 bg-gradient-to-b from-surface via-ink to-surface shadow-2xl group">

                {/* Inner Image Container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-ink">
                  <img
                    src="/images/real/client_feather_blowout.jpg"
                    alt="Master hair styling by Angels Salon artists Mumbai"
                    className="w-full h-full object-cover object-top sm:object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  {/* Luxury bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

                  {/* Bottom Floating Client Feature Card with Real Google Review */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-2xl bg-surface/95 border border-gold/40 backdrop-blur-md shadow-2xl">
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <div className="flex items-center gap-1 text-gold text-xs">
                        <span className="text-[#FFB800]">★</span>
                        <span className="text-text font-bold ml-0.5">{googleSummary.rating} / 5.0</span>
                      </div>
                      <span className="text-[9.5px] sm:text-[10px] uppercase tracking-wider text-gold font-semibold">
                        Verified Google Review
                      </span>
                    </div>
                    <p className="text-xs text-text-muted leading-tight mb-2 italic line-clamp-3 sm:line-clamp-none">
                      "{googleReviews[0]?.text}"
                    </p>
                    <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-border/70 text-[11px]">
                      <span className="font-semibold text-text truncate max-w-[150px]">{googleReviews[0]?.name}</span>
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="text-gold hover:text-gold-soft font-bold transition-colors underline min-h-[36px] flex items-center"
                      >
                        Book Consultation →
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Docked Horizontal VIP Booking Concierge Bar — hidden on mobile to prevent overflow */}
        <div className="hidden lg:block relative z-20 w-full mt-4 sm:mt-8">
          <HorizontalBookingBar />
        </div>

      </section>

      {/* Universal VIP Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Hero;
