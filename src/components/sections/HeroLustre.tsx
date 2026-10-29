import React, { useState, useEffect, useRef, useCallback } from 'react';
import { googleSummary } from '../../data/reviews';
import { buildWhatsAppLink } from '../../lib/whatsapp';
import { StarIcon } from '../ui/icons';

export interface HeroImageSlide {
  src: string;
  alt: string;
  focalPoint?: string;
  width?: number;
  height?: number;
}

export interface HeroTabShowcase {
  id: string;
  label: string;
  images: HeroImageSlide[];
}

export const HERO_SHOWCASE_TABS: HeroTabShowcase[] = [
  {
    id: 'salon-showcase',
    label: 'Angel Salon & Academy',
    images: [
      {
        src: '/images/real/interior_styling_stations.webp',
        alt: 'Angel Salon & Academy luxury styling stations with arched mirrors in Ghatkopar East',
        focalPoint: '50% 35%',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/real/storefront_frontal.webp',
        alt: 'Angel Salon & Academy straight-on storefront facade and 3D gold brand signage in Ghatkopar East',
        focalPoint: '50% 35%',
        width: 1920,
        height: 1072,
      },
    ],
  },
];

export const HeroLustre: React.FC = () => {
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const activeTab = HERO_SHOWCASE_TABS[0];
  const images = activeTab.images;

  const whatsAppBookingUrl = buildWhatsAppLink({
    message: "Hi Angel Salon & Academy! I would like to schedule an appointment. Could you please share available slots?",
  });

  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Gentle auto-rotate every ~5s only while visible and not interacted/hovered
  useEffect(() => {
    if (prefersReducedMotion || isHovered || !isInView || images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveSubIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered, isInView, images.length, prefersReducedMotion]);

  // IntersectionObserver to ensure auto-rotation only runs while visible in viewport
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Touch tap advances to next image
  const handleAdvanceImage = useCallback(() => {
    setActiveSubIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Hover swap: on fine-pointer hover, crossfade to next image (index 1), on leave revert to primary (0)
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (images.length > 1) {
      setActiveSubIndex(1);
    }
  }, [images.length]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setActiveSubIndex(0);
  }, []);

  // Keyboard navigation on frame: Enter or Space advances image
  const handleFrameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleAdvanceImage();
    }
  };

  return (
    <section
      role="region"
      aria-label="Welcome and Salon Overview"
      className="relative pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* Eyebrow Label (Lustre Studio signature tracking) */}
        <div data-reveal className="text-center mb-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] text-gold-text font-semibold inline-block">
            MODERN HAIR &amp; BEAUTY STUDIO
          </span>
        </div>

        {/* Editorial Headline (Two-line structure: upright first line, italic second line) */}
        <div data-reveal className="text-center max-w-4xl mx-auto mb-3 sm:mb-4">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-normal text-text leading-[1.12] tracking-tight">
            Crafted for confidence, <br />
            <span className="italic font-normal">made to shine.</span>
          </h1>
        </div>

        {/* Refined Subhead */}
        <div data-reveal className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <p className="text-sm sm:text-base text-text-muted font-normal leading-relaxed">
            Precision cuts, lived-in colour and restorative rituals for every hair type — in a calm studio where we listen first.
          </p>
        </div>

        {/* Dual Lustre Action Buttons (Stacked vertically on mobile, side-by-side on desktop) */}
        <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 w-full max-w-[280px] sm:max-w-none mx-auto">
          <a
            href={whatsAppBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gold-dark text-text-inverse hover:bg-dark text-xs sm:text-sm tracking-wide font-medium transition-all duration-300 shadow-lustre-md active:scale-95 min-h-[46px]"
          >
            <span>Book Appointment</span>
            <span aria-hidden="true" className="text-base leading-none">→</span>
          </a>

          <a
            href="#services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-surface/80 border border-text/40 hover:border-text text-text hover:bg-surface text-xs sm:text-sm tracking-wide font-medium transition-all duration-300 min-h-[46px]"
          >
            <span>Explore Services</span>
            <span aria-hidden="true" className="text-base leading-none">→</span>
          </a>
        </div>

        {/* Asymmetric Organic Showcase with Overlapping Hair Card & Frosted Stat Chip */}
        <div data-reveal="image" ref={containerRef} className="relative w-full max-w-5xl xl:max-w-6xl mx-auto">
          {/* Main Asymmetric Organic Image Container */}
          <div
            tabIndex={0}
            role="region"
            aria-label={`${activeTab.label} - Interactive salon photo gallery. Tap, hover, or press Space to view next photo.`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            onClick={handleAdvanceImage}
            onKeyDown={handleFrameKeyDown}
            className="relative w-full aspect-[4/3.8] sm:aspect-[16/11] lg:aspect-[16/9.5] rounded-tl-[130px] rounded-tr-[28px] rounded-br-[150px] rounded-bl-[28px] sm:rounded-tl-[240px] sm:rounded-tr-[36px] sm:rounded-br-[280px] sm:rounded-bl-[36px] lg:rounded-tl-[300px] lg:rounded-tr-[44px] lg:rounded-br-[340px] lg:rounded-bl-[44px] overflow-hidden bg-surface-subtle shadow-[0_24px_60px_-12px_rgba(20,17,14,0.18)] sm:shadow-[0_36px_90px_-18px_rgba(20,17,14,0.24)] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4"
          >
            {/* Stacked Images for the active showcase tab */}
            {images.map((img, idx) => {
              const isVisible = idx === activeSubIndex;
              const isPriority = idx === 0;

              return (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  width={img.width || 1200}
                  height={img.height || 1600}
                  loading={isPriority ? 'eager' : 'lazy'}
                  // @ts-expect-error fetchpriority attribute supported in modern browsers
                  fetchpriority={isPriority ? 'high' : 'auto'}
                  decoding={isPriority ? 'sync' : 'async'}
                  style={{ objectPosition: img.focalPoint || '50% 35%' }}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${
                    isVisible ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                  } ${
                    isHovered
                      ? 'scale-[1.03] transition-transform duration-700 ease-out'
                      : 'scale-100 transition-transform duration-700 ease-out'
                  } motion-reduce:transform-none`}
                />
              );
            })}
          </div>

          {/* Overlapping Small Photo Card (Bottom-Left edge): Portrait hair-work photo with white border, rotated ~ -5deg */}
          <div
            className="absolute -bottom-5 sm:-bottom-8 lg:-bottom-10 left-2 sm:-left-3 lg:-left-6 z-20 w-28 sm:w-40 md:w-48 lg:w-56 aspect-[3/4] rounded-[18px] sm:rounded-[26px] lg:rounded-[30px] border-[5px] sm:border-[7px] lg:border-[8px] border-white bg-surface shadow-2xl shadow-dark/25 -rotate-[4deg] sm:-rotate-[6deg] overflow-hidden pointer-events-none select-none transition-transform duration-300 hover:rotate-0"
            aria-hidden="true"
          >
            <img
              src="/images/real/client1_glass_hair_after.webp"
              alt="Angel Salon signature hair transformation"
              width={300}
              height={400}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 25%' }}
            />
          </div>

          {/* Overlapping Frosted Google Reviews Chip (Bottom-Right edge): Translucent frosted white, rotated ~ +2deg */}
          <a
            href={googleSummary.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Angel Salon rated ${googleSummary.rating} out of 5 stars on Google from ${googleSummary.count} verified client reviews`}
            className="absolute -bottom-5 sm:-bottom-7 lg:-bottom-9 right-2 sm:-right-3 lg:-right-6 z-20 flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-white/80 shadow-xl sm:shadow-2xl shadow-dark/20 rotate-[2deg] sm:rotate-[3deg] text-text hover:text-gold transition-all duration-300 hover:scale-105 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center shrink-0 text-gold shadow-sm">
              <StarIcon size={14} className="fill-gold text-gold" />
            </div>
            <div className="flex flex-col text-left pr-1">
              <div className="flex items-center gap-1 leading-none">
                <span className="font-serif font-bold text-sm sm:text-base text-text group-hover:text-gold transition-colors">
                  {googleSummary.rating}★
                </span>
                <span className="text-[11px] sm:text-xs text-text-muted font-medium">on Google</span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-text-muted leading-tight mt-0.5 whitespace-nowrap">
                {googleSummary.count} reviews
              </span>
            </div>
          </a>
        </div>

        {/* Trust Stats Counter Bar (Lustre Studio minimal divider grid) */}
        <div data-reveal className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-12 sm:pt-16 mt-10 border-t border-border max-w-4xl mx-auto text-center">
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold text-text mb-1">4.7★</p>
            <p className="text-xs uppercase tracking-wider text-text-muted font-medium">Google Rating</p>
            <p className="text-[11px] text-gold-text mt-0.5">636+ Verified Reviews</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold text-text mb-1">10+</p>
            <p className="text-xs uppercase tracking-wider text-text-muted font-medium">Years in Mumbai</p>
            <p className="text-[11px] text-gold-text mt-0.5">Pant Nagar Benchmark</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold text-text mb-1">15k+</p>
            <p className="text-xs uppercase tracking-wider text-text-muted font-medium">Delighted Clients</p>
            <p className="text-[11px] text-gold-text mt-0.5">Hair, Skin & Nails</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold text-text mb-1">500+</p>
            <p className="text-xs uppercase tracking-wider text-text-muted font-medium">Academy Graduates</p>
            <p className="text-[11px] text-gold-text mt-0.5">Certified Professionals</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroLustre;
