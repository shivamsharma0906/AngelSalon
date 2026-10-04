import React, { useRef, useState, useEffect, useCallback } from 'react';

export interface CarouselProps {
  /**
   * Accessible description of the carousel contents (e.g. "Real client hair transformations")
   */
  label: string;
  /**
   * Slides to render within the carousel track
   */
  children: React.ReactNode;
  /**
   * Class name applied to each <li> slide wrapper.
   * Default: ~85% mobile width, ~46% tablet width, ~31% desktop width with snap-start.
   */
  slideClassName?: string;
  /**
   * Additional wrapper class name
   */
  className?: string;
  /**
   * Additional track class name
   */
  trackClassName?: string;
}

/**
 * Reusable, dependency-free Carousel built on native CSS scroll-snap.
 * Provides accessible semantics (carousel roledescription, slide counts),
 * keyboard navigation (ArrowLeft / ArrowRight), and responsive Prev/Next controls (sm+).
 */
export const Carousel: React.FC<CarouselProps> = ({
  label,
  children,
  slideClassName = 'w-[85vw] sm:w-[46%] lg:w-[31%] shrink-0 snap-start',
  className = '',
  trackClassName = '',
}) => {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const slides = React.Children.toArray(children).filter(Boolean);
  const totalSlides = slides.length;

  // Update navigation buttons enabled/disabled state based on current scroll position
  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    // Allow a 2px buffer for fractional pixel roundoff
    const atStart = scrollLeft <= 2;
    const atEnd = scrollLeft + clientWidth >= scrollWidth - 2;

    setCanScrollLeft(!atStart);
    setCanScrollRight(!atEnd);
  }, []);

  // Set up ResizeObserver and initial scroll check (SSR-safe)
  useEffect(() => {
    updateScrollState();

    const track = trackRef.current;
    if (!track) return;

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateScrollState();
      });
      resizeObserver.observe(track);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [updateScrollState, totalSlides]);

  // Check user preference for reduced motion (SSR safe)
  const isReducedMotion = useCallback((): boolean => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Scroll by approximately 90% of visible track width
  const scrollByFraction = useCallback(
    (direction: 'left' | 'right') => {
      const track = trackRef.current;
      if (!track) return;

      const offset = track.clientWidth * 0.9;
      const targetScroll =
        direction === 'left'
          ? track.scrollLeft - offset
          : track.scrollLeft + offset;

      const behavior = isReducedMotion() ? 'auto' : 'smooth';

      track.scrollTo({
        left: targetScroll,
        behavior,
      });
    },
    [isReducedMotion]
  );

  // Keyboard navigation when focus is inside or on the track
  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByFraction('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByFraction('right');
    }
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={`relative w-full ${className}`}
    >
      {/* Header Controls (Desktop / Tablet sm+ Prev & Next buttons) */}
      <div className="hidden sm:flex items-center justify-end gap-2.5 mb-4">
        <button
          type="button"
          onClick={() => scrollByFraction('left')}
          disabled={!canScrollLeft}
          aria-label={`Previous slide for ${label}`}
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-gold-line text-gold hover:border-gold hover:bg-gold hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-gold-line disabled:hover:text-gold disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => scrollByFraction('right')}
          disabled={!canScrollRight}
          aria-label={`Next slide for ${label}`}
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-gold-line text-gold hover:border-gold hover:bg-gold hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-gold-line disabled:hover:text-gold disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Snap-x Track */}
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label={`${label} scrollable list (use arrow keys to scroll)`}
        onKeyDown={handleKeyDown}
        onScroll={updateScrollState}
        className={`flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 sm:gap-6 pb-4 pt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-[4px] ${trackClassName}`}
      >
        {slides.map((child, index) => (
          <li
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${totalSlides}`}
            className={slideClassName}
          >
            {child}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Carousel;
