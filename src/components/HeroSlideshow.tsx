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

  const SLIDE_DURATION = 4500;

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

  // Continuous auto-sliding: pauses only when tab is hidden or element is scrolled out of viewport
  const isPaused =
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

  return (
    <section
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured salon highlights and services"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`relative w-full h-[445px] xs:h-[460px] sm:h-[calc(100vh-72px)] sm:min-h-[640px] lg:min-h-[700px] max-h-[920px] flex flex-col justify-between overflow-hidden bg-ink select-none touch-pan-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold group ${className}`}
    >
      {/* Stable Visually Hidden H1 per page */}
      <h1 className="sr-only">
        Angels Salon & Academy | Luxury Hair, Skin & Bridal Salon in Ghatkopar East, Mumbai
      </h1>

      {/* Horizontal Carousel Track */}
      <div
        className={`absolute inset-0 z-0 flex w-full h-full ${
          isReducedMotion ? '' : 'transition-transform duration-500 ease-out'
        }`}
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
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
              className="relative w-full h-full shrink-0 flex-none bg-ink overflow-hidden"
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
            className="w-12 h-12 rounded-full border border-gold-line bg-ink/75 text-gold hover:border-gold hover:bg-gold hover:text-text backdrop-blur-md transition-all duration-300 flex items-center justify-center pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold shadow-2xl hover:scale-105 active:scale-95"
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
            className="w-12 h-12 rounded-full border border-gold-line bg-ink/75 text-gold hover:border-gold hover:bg-gold hover:text-text backdrop-blur-md transition-all duration-300 flex items-center justify-center pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold shadow-2xl hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Minimalist Floating Pagination Dots */}
      <div className="absolute bottom-2.5 sm:bottom-6 left-0 right-0 z-30 flex items-center justify-center pointer-events-auto">
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
 * Editorial Slide View (Slides 1, 2, 3, 4, 5)
 * Horizontal uncropped 16:9 photo layout on mobile with proportional typography,
 * Full-width immersive background on desktop with directional scrim.
 */
const EditorialSlideView: React.FC<{
  slide: EditorialHeroSlide;
  slideIndex: number;
  isFirstSlide: boolean;
  isActive: boolean;
  isReducedMotion: boolean;
}> = ({ slide, slideIndex, isFirstSlide, isActive, isReducedMotion }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-start sm:justify-end lg:justify-center overflow-hidden bg-ink">
      {/* Horizontal Photo Frame on mobile (16:9, completely uncropped and clearly visible),
          Full-screen background cover on tablet/desktop */}
      <div className="relative w-full aspect-[16/9] xs:aspect-[16/9] sm:aspect-auto sm:absolute sm:inset-0 sm:h-full overflow-hidden bg-surface shrink-0 shadow-sm">
        <picture className="w-full h-full block">
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
            className={`w-full h-full object-cover sm:object-[var(--desktop-pos)] opacity-100 transition-transform duration-[6000ms] ease-out ${
              isActive && !isReducedMotion ? 'scale-100 sm:scale-105' : 'scale-100'
            }`}
            style={
              {
                '--desktop-pos': slide.desktopObjectPosition,
              } as React.CSSProperties
            }
          />
        </picture>
        {/* Subtle luxury gold accent divider on mobile */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold/80 to-transparent sm:hidden" />
      </div>

      {/* Directional Luxury Scrim on desktop/tablet only */}
      <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-ink via-ink/80 via-50% to-transparent lg:hidden pointer-events-none" />
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 via-35% lg:via-42% to-transparent pointer-events-none" />
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent h-32 bottom-0 top-auto pointer-events-none" />

      {/* Left-Aligned Editorial Text Content: flows directly underneath the horizontal photo on mobile */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 xl:px-12 flex flex-col justify-start sm:justify-end lg:justify-center pt-2.5 xs:pt-3 sm:pt-16 pb-8 sm:pb-24 lg:py-0 flex-1 sm:flex-none">
        <div className="max-w-md lg:max-w-xl text-left">
          {/* Eyebrow with Gold Accent Line */}
          <div className="flex items-center gap-2 mb-1 xs:mb-1.5 sm:mb-3.5">
            <span className="w-5 sm:w-8 h-[1.5px] bg-gold inline-block" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {slide.label}
            </span>
          </div>

          {/* Large Headline */}
          <h2 className="font-serif text-[20px] xs:text-[22px] sm:text-4xl md:text-5xl lg:text-[clamp(2.35rem,4.2vw,3.75rem)] font-normal text-text leading-[1.18] sm:leading-[1.1] mb-1 xs:mb-1.5 sm:mb-4 tracking-tight">
            {slide.headline}
          </h2>

          {/* Short Line of Body Text */}
          <p className="text-xs sm:text-base text-text-muted font-light leading-relaxed mb-2 xs:mb-2.5 sm:mb-6 max-w-sm sm:max-w-md line-clamp-2 sm:line-clamp-none">
            {slide.bodyText}
          </p>

          {/* Distinct Feature Pills (Customized per Slide) */}
          {slideIndex === 0 && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 xs:mb-3 sm:mb-8">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                Hair • Skin • Nails
              </span>
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-raised/80 border border-line text-text-muted">
                Pant Nagar, Ghatkopar East
              </span>
            </div>
          )}

          {slideIndex === 1 && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 xs:mb-3 sm:mb-8">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                Ammonia-Free Toning
              </span>
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                Custom Balayage
              </span>
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-raised/80 border border-line text-text-muted">
                Global Shades
              </span>
            </div>
          )}

          {slideIndex === 2 && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 xs:mb-3 sm:mb-8">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                HD Bridal Makeup
              </span>
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                Paithani & Saree Draping
              </span>
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-raised/80 border border-line text-text-muted">
                Occasion Styling
              </span>
            </div>
          )}

          {slideIndex === 3 && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 xs:mb-3 sm:mb-8">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                Gel Extensions & Nail Art
              </span>
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                Korean Glass Facials
              </span>
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-raised/80 border border-line text-text-muted">
                Deluxe Hand & Foot Spas
              </span>
            </div>
          )}

          {slideIndex === 4 && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 xs:mb-3 sm:mb-8">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                Hands-on Studio Work
              </span>
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-raised/80 border border-gold-line text-gold">
                Master Stylist Mentors
              </span>
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-raised/80 border border-line text-text-muted">
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
              size="sm"
              leftIcon={slide.cta.isWhatsApp ? <WhatsAppIcon size={15} className="text-ink shrink-0" /> : undefined}
              className="min-h-[40px] xs:min-h-[42px] sm:min-h-[48px] px-5 xs:px-6 sm:px-8 text-[11px] xs:text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-gold-sm hover:shadow-gold-md transition-all duration-300"
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
          src={slide.collageImages[0]?.src || '/images/real/interior_studio_floor.webp'}
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
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col justify-end h-full pt-16 pb-14 sm:pb-24 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left: Solid Frosted Glass Editorial Panel */}
          <div className="w-full max-w-xl text-left">
            <div className="p-4 xs:p-5 sm:p-8 lg:p-10 rounded-2xl bg-surface/95 border border-gold-line/40 backdrop-blur-md shadow-2xl">
              {slide.label && (
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="w-5 sm:w-6 h-[1.5px] bg-gold inline-block" />
                  <span className="text-[10.5px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    {slide.label}
                  </span>
                </div>
              )}

              <h2 className="font-serif text-2xl xs:text-[26px] sm:text-4xl md:text-5xl font-normal text-text leading-[1.14] sm:leading-[1.12] mb-2 sm:mb-3.5 tracking-tight">
                {slide.headline}
              </h2>

              <p className="text-xs xs:text-sm sm:text-base text-text-muted font-light leading-relaxed mb-3 sm:mb-5 line-clamp-2 sm:line-clamp-none">
                {slide.bodyText}
              </p>

              {/* 4 Distinct Academy Pillars */}
              <div className="grid grid-cols-2 gap-2 pt-3 pb-4 sm:pt-4 sm:pb-6 border-t border-line text-[11px] sm:text-xs font-medium text-text-muted">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-gold font-bold">✦</span> Hands-on Studio Work
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-gold font-bold">✦</span> Master Stylist Mentors
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-gold font-bold">✦</span> Hair, Skin & Makeup
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-gold font-bold">✦</span> Small Student Batches
                </div>
              </div>

              <div>
                <Button
                  as="a"
                  href={slide.cta.href}
                  variant="gold"
                  size="md"
                  className="min-h-[44px] sm:min-h-[48px] px-6 sm:px-8 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-gold-sm"
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
                src={slide.collageImages[1]?.src || '/images/real/interior_styling_stations.webp'}
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
