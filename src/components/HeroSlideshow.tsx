import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HeroSlideItem, EditorialHeroSlide, SplitHeroSlide } from '../data/heroSlides';
import { Button } from './ui/Button';
import { WhatsAppIcon } from './ui/WhatsAppIcon';

export interface HeroSlideshowProps {
  slides: HeroSlideItem[];
  className?: string;
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
  slides,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);

  const containerRef = useRef<HTMLElement | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const timerStartTimeRef = useRef<number>(0);
  const elapsedBeforePauseRef = useRef<number>(0);

  const SLIDE_DURATION = 5500;

  // 1. Listen for prefers-reduced-motion changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // 2. Track tab visibility (pause when hidden)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleVisibility = () => {
      setIsDocumentHidden(document.visibilityState === 'hidden');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // 3. Track IntersectionObserver (pause when scrolled out of view)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 4. Slide navigation helper (announces to screen readers only on manual change)
  const goToSlide = useCallback(
    (index: number, isAutomatic = false) => {
      setActiveIndex(index);
      setProgressPercent(0);
      elapsedBeforePauseRef.current = 0;
      timerStartTimeRef.current = Date.now();
      if (!isAutomatic) {
        setLiveAnnouncement(`Slide ${index + 1} of ${slides.length}: ${slides[index].headline}`);
      }
    },
    [slides]
  );

  const nextSlide = useCallback(
    (isAutomatic = false) => {
      const nextIndex = (activeIndex + 1) % slides.length;
      goToSlide(nextIndex, isAutomatic);
    },
    [activeIndex, slides.length, goToSlide]
  );

  const prevSlide = useCallback(() => {
    const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex, false);
  }, [activeIndex, slides.length, goToSlide]);

  const isPaused =
    isReducedMotion ||
    isHovered ||
    isFocused ||
    isDocumentHidden ||
    !isInViewport ||
    slides.length <= 1;

  // 5. Autoplay timer & smooth progress tracking (5.5 seconds)
  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      return;
    }

    timerStartTimeRef.current = Date.now() - elapsedBeforePauseRef.current;

    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - timerStartTimeRef.current;
      elapsedBeforePauseRef.current = elapsed;
      const pct = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
      setProgressPercent(pct);

      if (elapsed >= SLIDE_DURATION) {
        elapsedBeforePauseRef.current = 0;
        timerStartTimeRef.current = Date.now();
        nextSlide(true);
      }
    }, 50);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [isPaused, activeIndex, nextSlide]);

  // 6. Pointer swipe handling (horizontal threshold ~40px, never blocks vertical scroll)
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
    pointerStartY.current = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null || pointerStartY.current === null) return;
    const diffX = e.clientX - pointerStartX.current;
    const diffY = e.clientY - pointerStartY.current;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        nextSlide(false);
      } else {
        prevSlide();
      }
    }

    pointerStartX.current = null;
    pointerStartY.current = null;
  };

  // 7. Keyboard navigation when hero or its controls have focus
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide(false);
    }
  };

  // 8. Hover detection for fine pointers only
  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured salon highlights and services"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`relative w-full h-[calc(100svh-64px)] sm:h-[calc(100vh-76px)] lg:h-[calc(100vh-80px)] min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] max-h-[920px] flex flex-col justify-between overflow-hidden bg-ink select-none touch-pan-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold group ${className}`}
    >
      {/* Stable Visually Hidden H1 per page */}
      <h1 className="sr-only">
        Angels Salon & Academy | Luxury Hair, Skin & Bridal Salon in Ghatkopar East, Mumbai
      </h1>

      {/* Stacked Slides Container with Smooth 800ms Crossfade */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const isFirstSlide = index === 0;

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}: ${slide.headline}`}
              aria-hidden={!isActive}
              data-active={isActive}
              {...(!isActive ? ({ inert: '' } as unknown as React.HTMLAttributes<HTMLDivElement>) : {})}
              className={`absolute inset-0 w-full h-full transition-opacity ${
                isReducedMotion ? 'duration-0' : 'duration-[800ms]'
              } ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {slide.layout === 'editorial' ? (
                <EditorialSlideView
                  slide={slide}
                  slideIndex={index}
                  isFirstSlide={isFirstSlide}
                  isActive={isActive}
                  isReducedMotion={isReducedMotion}
                />
              ) : (
                <AcademySlideView
                  slide={slide}
                  isFirstSlide={isFirstSlide}
                  isActive={isActive}
                  isReducedMotion={isReducedMotion}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Floating Side Navigation Arrows (< and >) */}
      <div className="hidden md:block absolute inset-y-0 left-0 right-0 z-30 pointer-events-none">
        <div className="w-full h-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-12 h-12 rounded-full border border-gold-line bg-ink/75 text-gold hover:border-gold hover:bg-gold hover:text-ink backdrop-blur-md transition-all duration-300 flex items-center justify-center pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold shadow-2xl hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={() => nextSlide(false)}
            aria-label="Next slide"
            className="w-12 h-12 rounded-full border border-gold-line bg-ink/75 text-gold hover:border-gold hover:bg-gold hover:text-ink backdrop-blur-md transition-all duration-300 flex items-center justify-center pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold shadow-2xl hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Spacer to push controls to bottom */}
      <div className="flex-1" />

      {/* Minimalist Floating Pagination Dots (Matching Reference 4) */}
      <div className="relative z-30 w-full flex items-center justify-center pb-6 sm:pb-8 pointer-events-auto">
        <div
          className="flex items-center gap-2 sm:gap-2.5"
          role="tablist"
          aria-label="Hero carousel navigation"
        >
          {slides.map((slide, idx) => {
            const isActive = idx === activeIndex;

            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Show slide ${idx + 1} of ${slides.length}: ${slide.headline}`}
                onClick={() => goToSlide(idx, false)}
                className="w-6 h-6 min-w-[24px] min-h-[24px] flex items-center justify-center p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full transition-transform active:scale-90"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-gold shadow-sm'
                      : 'w-2 h-2 bg-text-muted/40 hover:bg-gold/60'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Autoplay Progress Line at Bottom Edge of Hero */}
      {!isReducedMotion && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-ink/60 z-30 overflow-hidden">
          <div
            className="h-full bg-gold transition-all ease-linear shadow-gold-sm"
            style={{ width: `${progressPercent}%`, transitionDuration: '50ms' }}
          />
        </div>
      )}

      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>
    </section>
  );
};

/**
 * Editorial Slide View (Slides 1, 2, 3)
 * Full-width immersive background image with subtle cinematic zoom,
 * directional gradient overlay, elegant typography, gold accents, and distinct visual features.
 */
const EditorialSlideView: React.FC<{
  slide: EditorialHeroSlide;
  slideIndex: number;
  isFirstSlide: boolean;
  isActive: boolean;
  isReducedMotion: boolean;
}> = ({ slide, slideIndex, isFirstSlide, isActive, isReducedMotion }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-end lg:justify-center overflow-hidden">
      {/* Immersive Background Image with Subtle Cinematic Zoom */}
      <picture className="absolute inset-0 w-full h-full overflow-hidden">
        <source
          media="(max-width: 640px)"
          srcSet={slide.mobileImage.srcSet}
          width={slide.mobileImage.width}
          height={slide.mobileImage.height}
        />
        <source
          media="(min-width: 641px)"
          srcSet={slide.desktopImage.srcSet}
          width={slide.desktopImage.width}
          height={slide.desktopImage.height}
        />
        <img
          src={slide.desktopImage.src}
          alt={isActive ? slide.alt : ''}
          width={slide.desktopImage.width}
          height={slide.desktopImage.height}
          loading={isFirstSlide ? 'eager' : 'lazy'}
          decoding="async"
          {...(isFirstSlide
            ? ({ fetchpriority: 'high' } as React.ImgHTMLAttributes<HTMLImageElement>)
            : {})}
          className={`w-full h-full object-cover object-[var(--mobile-pos)] sm:object-[var(--desktop-pos)] opacity-100 transition-transform duration-[6000ms] ease-out ${
            isActive && !isReducedMotion ? 'scale-105' : 'scale-100'
          }`}
          style={
            {
              '--mobile-pos': slide.mobileObjectPosition,
              '--desktop-pos': slide.desktopObjectPosition,
            } as React.CSSProperties
          }
        />
      </picture>

      {/* Directional Luxury Scrim:
          Deep gradient behind left-aligned text for 100% WCAG AAA readability,
          opening up clearly to the right so the photo remains the main, luminous visual focus!
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 via-50% to-transparent lg:hidden pointer-events-none" />
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 via-35% lg:via-42% to-transparent pointer-events-none" />
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent h-32 bottom-0 top-auto pointer-events-none" />


      {/* Left-Aligned Editorial Text Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-16 pb-20 sm:pb-24 lg:py-0">
        <div className="max-w-md lg:max-w-xl text-left">
          {/* Eyebrow with Gold Accent Line */}
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="w-6 sm:w-8 h-[1.5px] bg-gold inline-block" />
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              {slide.label}
            </span>
          </div>

          {/* Large Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(2.35rem,4.2vw,3.75rem)] font-normal text-text leading-[1.1] mb-4 tracking-tight">
            {slide.headline}
          </h2>

          {/* Short Line of Body Text */}
          <p className="text-sm sm:text-base text-text-muted font-light leading-relaxed mb-5 sm:mb-6 max-w-sm sm:max-w-md">
            {slide.bodyText}
          </p>

          {/* Distinct Feature Pills (Customized per Slide) */}
          {slideIndex === 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                Hair • Skin • Nails
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-raised/80 border border-line text-text-muted">
                Pant Nagar, Ghatkopar East
              </span>
            </div>
          )}

          {slideIndex === 1 && (
            <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                Ammonia-Free Toning
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                Custom Balayage
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-raised/80 border border-line text-text-muted">
                Global Shades
              </span>
            </div>
          )}

          {slideIndex === 2 && (
            <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                HD Bridal Makeup
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                Paithani & Saree Draping
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-raised/80 border border-line text-text-muted">
                Occasion Styling
              </span>
            </div>
          )}

          {slideIndex === 3 && (
            <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                Hands-on Studio Work
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                Master Stylist Mentors
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-raised/80 border border-line text-text-muted">
                Small Student Batches
              </span>
            </div>
          )}

          {/* Luxury CTA Button */}
          <div>
            <Button
              as="a"
              href={slide.cta.href}
              target={slide.cta.isExternal ? '_blank' : undefined}
              rel={slide.cta.isExternal ? 'noopener noreferrer' : undefined}
              variant="gold"
              size="md"
              leftIcon={slide.cta.isWhatsApp ? <WhatsAppIcon size={16} className="text-ink shrink-0" /> : undefined}
              className="min-h-[48px] px-8 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-gold-sm hover:shadow-gold-md transition-all duration-300"
            >
              {slide.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Academy Slide View (Slide 4)
 * Premium full-width immersive Academy showcase.
 * Replaces basic sticker grid with a cohesive, editorial layout:
 * - Immersive background of live academy studio
 * - Left frosted-glass panel with diploma syllabus highlights & CTA
 * - Right floating student spotlight card showcasing live floor results
 */
const AcademySlideView: React.FC<{
  slide: SplitHeroSlide;
  isFirstSlide: boolean;
  isActive: boolean;
  isReducedMotion: boolean;
}> = ({ slide, isFirstSlide, isActive, isReducedMotion }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-end lg:justify-center overflow-hidden">
      {/* Full-Width Immersive Studio Training Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={slide.collageImages[0]?.src || '/images/hero-carousel/collage_c1_academy.webp'}
          alt={isActive ? 'Angels Salon Academy live training studio floor' : ''}
          width={1920}
          height={1080}
          loading={isFirstSlide ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full h-full object-cover opacity-60 transition-transform duration-[6000ms] ease-out ${
            isActive && !isReducedMotion ? 'scale-105' : 'scale-100'
          }`}
        />
      </div>

      {/* Atmospheric Luxury Dark Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 via-45% to-ink/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30 pointer-events-none" />


      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-16 pb-20 sm:pb-24 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left: Solid Frosted Glass Editorial Panel */}
          <div className="w-full max-w-xl text-left">
            <div className="p-6 sm:p-8 lg:p-10 rounded-xl bg-surface/90 border border-gold-line backdrop-blur-md shadow-2xl">
              {slide.label && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-[1.5px] bg-gold inline-block" />
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    {slide.label}
                  </span>
                </div>
              )}

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-text leading-[1.12] mb-3.5 tracking-tight">
                {slide.headline}
              </h2>

              <p className="text-sm sm:text-base text-text-muted font-light leading-relaxed mb-5">
                {slide.bodyText}
              </p>

              {/* 4 Distinct Academy Pillars */}
              <div className="grid grid-cols-2 gap-2.5 pt-4 pb-6 border-t border-line text-xs font-medium text-text-muted">
                <div className="flex items-center gap-2">
                  <span className="text-gold font-bold">✦</span> Hands-on Studio Work
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold font-bold">✦</span> Master Stylist Mentors
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold font-bold">✦</span> Hair, Skin & Makeup
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold font-bold">✦</span> Small Student Batches
                </div>
              </div>

              <div>
                <Button
                  as="a"
                  href={slide.cta.href}
                  variant="gold"
                  size="md"
                  className="min-h-[48px] px-8 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-gold-sm"
                >
                  {slide.cta.label}
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Floating Student Work Feature Card (Replaces the basic sticker grid) */}
          <div className="hidden lg:flex flex-col w-72 xl:w-80 rounded-xl border border-gold-line bg-surface/90 backdrop-blur-md p-3.5 shadow-2xl overflow-hidden shrink-0">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-line bg-raised mb-3 group/preview">
              <img
                src={slide.collageImages[1]?.src || '/images/hero-carousel/collage_c2_haircut.webp'}
                alt="Student precision haircut result at Angels Academy"
                width={360}
                height={450}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/preview:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
                <span className="text-[9.5px] font-semibold uppercase tracking-wider text-gold block">
                  Studio Spotlight
                </span>
                <span className="text-xs font-serif text-text">
                  Live Client Styling Practice
                </span>
              </div>
            </div>

            {/* Thumbnail Preview Row */}
            <div className="grid grid-cols-3 gap-2">
              {slide.collageImages.slice(2, 5).map((thumb) => (
                <div
                  key={thumb.id}
                  className="aspect-square rounded-[3px] border border-line overflow-hidden bg-raised relative"
                >
                  <img
                    src={thumb.src}
                    alt={thumb.alt}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSlideshow;
