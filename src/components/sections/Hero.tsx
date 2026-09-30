import React, { useState } from 'react';
import { homeData } from '../../data/home';
import { googleSummary, googleReviews } from '../../data/reviews';
import { siteConfig } from '../../data/site';
import { Button } from '../ui/Button';
import { BookingModal } from '../ui/BookingModal';
import { HorizontalBookingBar } from './HorizontalBookingBar';
import { WhatsAppIcon, StarIcon, ArrowRightIcon } from '../ui/icons';

export const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hero } = homeData;
  const verifiedStats = hero.stats.filter((s) => s.verified);

  const whatsAppHeroUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hi Angels Salon & Academy! I would like to inquire about appointments and services."
  )}`;

  return (
    <>
      <section
        className="relative min-h-[100svh] min-h-screen-svh flex flex-col justify-between overflow-x-clip bg-ink pt-20 sm:pt-24 pb-8 sm:pb-12 w-full max-w-full"
        aria-label="Welcome to Angels Salon & Academy"
      >
        {/* Static Background Image Overlay (No animation on hero/LCP image) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_bg.jpg"
            alt="Luxury hair and beauty salon ambiance at Angels Salon Ghatkopar"
            className="w-full h-full object-cover object-center opacity-30"
            loading="eager"
            {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        </div>

        {/* Ambient Subtle Gold Radial Glow (Desktop only) */}
        <div className="hidden lg:block absolute top-1/4 left-10 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 my-auto py-2 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">

            {/* Left Column: Headline, Subtext, CTAs, and Stats */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left">
              
              {/* Eyebrow */}
              <div className="flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-wider font-semibold text-gold mb-3 sm:mb-4">
                <span>{hero.eyebrow}</span>
                <span className="text-gold-line">•</span>
                <a
                  href={googleSummary.reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-gold transition-colors inline-flex items-center gap-1 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <StarIcon size={13} className="text-gold fill-gold" />
                  <span>{googleSummary.rating} Google rating</span>
                  <span>({googleSummary.count} reviews)</span>
                </a>
              </div>

              {/* Exactly one H1 on the page (3 balanced lines) */}
              <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text leading-[1.1] mb-4 sm:mb-5">
                {hero.h1Line1} <br />
                <span className="italic font-normal text-gold">
                  {hero.h1Line2}
                </span> <br />
                {hero.h1Line3}
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg md:text-xl text-muted max-w-2xl font-normal leading-relaxed mb-6 sm:mb-8">
                {hero.subtext}
              </p>

              {/* Primary & Secondary CTAs (Visible without scrolling on mobile) */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  variant="gold"
                  size="lg"
                  fullWidth
                  className="sm:w-auto min-h-[48px] font-bold px-8 py-3.5 text-sm uppercase tracking-wider rounded-[4px]"
                  rightIcon={<ArrowRightIcon size={16} />}
                >
                  {hero.primaryCtaText}
                </Button>

                <Button
                  as="a"
                  href={whatsAppHeroUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="sm:w-auto min-h-[48px] border-gold-line text-gold hover:border-gold hover:bg-gold/10 px-6 py-3.5 text-sm uppercase tracking-wider rounded-[4px]"
                  leftIcon={<WhatsAppIcon size={18} className="text-gold" />}
                >
                  {hero.secondaryCtaText}
                </Button>
              </div>

              {/* Verified Stats Row (Only verified stats render) */}
              {verifiedStats.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-8 w-full max-w-lg border-t border-gold/25 pt-4 sm:pt-6">
                  {verifiedStats.map((stat) => (
                    <div key={stat.id} className="flex flex-col">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-gold leading-none mb-1">
                        {stat.value}
                      </span>
                      <span className="text-[12px] font-semibold text-text uppercase tracking-wider">
                        {stat.label}
                      </span>
                      {stat.sublabel && (
                        <span className="text-[12px] text-muted font-normal">
                          {stat.sublabel}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Right Column: Visual Frame with Real Client Work + Smooth Hover Zoom */}
            <div className="lg:col-span-5 xl:col-span-5 w-full flex justify-center lg:justify-end">
              <div
                className="hero-showcase-frame relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[4px] overflow-hidden border border-gold/40 hover:border-gold/60 bg-raised shadow-2xl transition-all duration-300 group"
              >
                <img
                  src="/images/real/client_feather_blowout.jpg?v=2"
                  alt="Real client styling at Angels Salon & Academy Mumbai"
                  width={500}
                  height={625}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent pointer-events-none" />

                {/* Floating Verified Review Pill */}
                <div
                  className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 rounded-[4px] bg-raised/95 border border-gold/30 hover:border-gold/50 backdrop-blur-md shadow-xl transition-colors z-10"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1 text-gold text-xs">
                      <StarIcon size={12} className="fill-gold text-gold" />
                      <span className="font-bold text-text ml-0.5">{googleSummary.rating} / 5.0</span>
                    </div>
                    <span className="text-[12px] uppercase tracking-wider text-muted font-semibold">
                      Google review
                    </span>
                  </div>
                  <p className="text-[12px] text-muted leading-snug line-clamp-2 italic mb-2">
                    "{googleReviews[0]?.text}"
                  </p>
                  <div className="flex items-center justify-between pt-1.5 border-t border-gold/25 text-[12px]">
                    <span className="font-semibold text-text truncate max-w-[150px]">
                      {googleReviews[0]?.name}
                    </span>
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

        {/* Integrated Booking Bar (Stacked card on mobile, horizontal row on desktop) */}
        <div className="relative z-20 w-full mt-6 sm:mt-8">
          <HorizontalBookingBar />
        </div>

      </section>

      {/* VIP Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Hero;
