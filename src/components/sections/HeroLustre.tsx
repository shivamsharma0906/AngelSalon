import React, { useState, useEffect, useRef, useCallback } from 'react';
import { googleSummary } from '../../data/reviews';
import { buildWhatsAppLink } from '../../lib/whatsapp';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
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
    id: 'beauty-academy',
    label: 'Beauty Academy',
    images: [
      {
        src: '/images/real/storefront_frontal.webp',
        alt: 'Angel Salon & Academy straight-on storefront facade and 3D gold brand signage in Ghatkopar East',
        focalPoint: '50% 35%',
        width: 1920,
        height: 1072,
      },
      {
        src: '/images/real/interior_studio_floor.webp',
        alt: 'Angel Academy live student training atelier and hands-on styling workstations',
        focalPoint: '50% 45%',
        width: 1200,
        height: 1600,
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

        {/* Editorial Headline (Two-line structure: upright first line, italic second line) */}
        {/* TODO: Awaiting user's custom headline. Current placeholder uses salon's genuine tagline: */}
        <div data-reveal className="text-center max-w-4xl mx-auto mb-3 sm:mb-4">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-normal text-text leading-[1.12] tracking-tight">
            Elevating Personal Artistry, <br className="hidden sm:inline" />
            <span className="italic font-normal">in every detail.</span>
          </h1>
        </div>

        {/* Refined Subhead */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
          <p className="text-sm sm:text-base md:text-lg text-text-muted font-normal leading-relaxed">
Vidal Sassoon precision cuts, French balayage and Nanoplastia treatments in a calm, unisex studio, plus a government-recognized beauty academy.          </p>
        </div>

        {/* Dual Lustre Action Buttons (Duplicate rating pill removed from CTAs per requirement) */}
        <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <a
            href={whatsAppBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-dark text-text-inverse hover:bg-gold-text text-xs sm:text-sm uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-md active:scale-95 min-h-[44px]"
          >
            <WhatsAppIcon size={16} className="fill-current text-gold shrink-0" />
            <span>Book Appointment</span>
          </a>

          <a
            href="#services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-surface border border-border hover:border-gold/60 text-text hover:text-gold-text text-xs sm:text-sm uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-sm min-h-[44px]"
          >
            <span>Explore Services</span>
            <span aria-hidden="true">&darr;</span>
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
            className="relative w-full aspect-[4/3.8] sm:aspect-[16/11] lg:aspect-[16/9.5] rounded-tl-[110px] rounded-tr-[24px] rounded-br-[130px] rounded-bl-[24px] sm:rounded-tl-[240px] sm:rounded-tr-[36px] sm:rounded-br-[280px] sm:rounded-bl-[36px] lg:rounded-tl-[300px] lg:rounded-tr-[44px] lg:rounded-br-[340px] lg:rounded-bl-[44px] overflow-hidden bg-surface-subtle shadow-[0_24px_60px_-12px_rgba(20,17,14,0.18)] sm:shadow-[0_36px_90px_-18px_rgba(20,17,14,0.24)] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4"
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
                  style={{ objectPosition: img.focalPoint || '50% 40%' }}
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

          {/* Overlapping Small Photo Card (Bottom-Left edge): Portrait hair-work photo with 6-8px white border, rotated ~ -5deg */}
          <div
            className="absolute -bottom-6 sm:-bottom-9 lg:-bottom-12 left-2 sm:-left-4 lg:-left-8 z-20 w-32 sm:w-44 md:w-52 lg:w-60 aspect-[3/4] rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] border-[6px] sm:border-[8px] lg:border-[10px] border-white bg-surface shadow-2xl shadow-dark/30 -rotate-[3deg] sm:-rotate-[5deg] overflow-hidden pointer-events-none select-none transition-transform duration-300 hover:rotate-0"
            aria-hidden="true"
          >
            <img
              src="/images/real/client2_caramel_balayage_after.webp"
              alt=""
              width={300}
              height={400}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 25%' }}
            />
          </div>

          {/* Overlapping Frosted Stat Chip (Bottom-Right edge): Translucent frosted white, rotated ~ +3deg, real Google proof */}
          <a
            href={googleSummary.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Angel Salon rated ${googleSummary.rating} out of 5 stars on Google from ${googleSummary.count} verified client reviews`}
            className="absolute -bottom-5 sm:-bottom-7 lg:-bottom-9 right-2 sm:-right-4 lg:-right-8 z-20 flex items-center gap-2.5 sm:gap-3.5 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white/95 backdrop-blur-md border border-white/80 shadow-xl sm:shadow-2xl shadow-dark/20 rotate-[2deg] sm:rotate-[3deg] text-text hover:text-gold transition-all duration-300 hover:scale-105 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center shrink-0 text-gold shadow-sm">
              <StarIcon size={16} className="fill-gold text-gold" />
            </div>
            <div className="flex flex-col text-left pr-1">
              <div className="flex items-center gap-1 leading-none">
                <span className="font-serif font-bold text-base sm:text-xl text-text group-hover:text-gold transition-colors">
                  {googleSummary.rating}★
                </span>
                <span className="text-xs sm:text-sm text-text-muted font-medium">on Google</span>
              </div>
              <span className="text-[11px] sm:text-xs text-text-muted leading-tight mt-0.5 sm:mt-1">
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
