import React, { useState, useEffect, useRef, useCallback } from 'react';
import { googleReviews, googleSummary, GoogleReview } from '../../data/reviews';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { StarIcon } from '../ui/icons';

interface GoogleReviewsProps {
  mode?: 'carousel' | 'grid';
  limit?: number;
  tone?: 'ink' | 'surface';
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const GoogleReviewCard: React.FC<{ review: GoogleReview }> = ({ review }) => {
  const initials = getInitials(review.name);
  const hasReviewsUrl = Boolean(googleSummary.reviewsUrl && googleSummary.reviewsUrl.trim().length > 0);

  return (
    <article
      className="bg-raised border border-line hover:border-gold-line rounded-[4px] p-6 sm:p-7 flex flex-col justify-between shadow-md transition-all duration-300 h-full group"
      aria-label={`Review by ${review.name}`}
    >
      <div>
        {/* Header: Initial Avatar, Name, and Google Badge */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full bg-ink border border-gold-line text-gold flex items-center justify-center font-bold text-xs uppercase tracking-wider shadow-sm select-none"
              aria-hidden="true"
            >
              {initials}
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-text group-hover:text-gold transition-colors leading-tight">
                {review.name}
              </h3>
              <span className="text-[12px] text-muted font-medium uppercase tracking-wider">
                Google review
              </span>
            </div>
          </div>

          {/* Star Rating Badge */}
          <div className="flex items-center gap-1 text-gold" aria-label="5 out of 5 stars">
            <StarIcon size={14} className="fill-gold text-gold" />
            <span className="text-xs font-bold text-text">5.0</span>
          </div>
        </div>

        {/* Verbatim Review Text */}
        <blockquote className="text-base text-muted leading-relaxed font-normal">
          <span className="text-gold font-serif text-lg leading-none select-none">“</span>
          {review.text}
          <span className="text-gold font-serif text-lg leading-none select-none">”</span>
        </blockquote>
      </div>

      {/* Conditional Read on Google link for possiblyTruncated reviews (min 44px tap target) */}
      {review.possiblyTruncated && hasReviewsUrl && (
        <div className="pt-3 mt-4 border-t border-line">
          <a
            href={googleSummary.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] text-xs text-gold hover:text-gold-soft font-semibold inline-flex items-center gap-1.5 transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          >
            <span>Read on Google</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      )}
    </article>
  );
};

export const GoogleReviewSummaryHeader: React.FC = () => {
  const summaryLineText = `${googleSummary.rating} on Google · ${googleSummary.count} reviews`;

  return (
    <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-12">
      {/* 4.7 Rating with Gold Star */}
      <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-raised border border-gold-line shadow-sm mb-3">
        <span className="font-serif text-2xl sm:text-3xl font-bold text-gold tracking-tight">
          {googleSummary.rating}
        </span>
        <StarIcon size={20} className="fill-gold text-gold shrink-0" />
        <span className="text-xs sm:text-sm font-semibold text-text">
          {summaryLineText}
        </span>
      </div>

      {/* Note: Showing selected reviews */}
      <p className="text-xs text-muted font-normal">
        Showing selected reviews
      </p>
    </div>
  );
};

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({
  mode = 'carousel',
  limit = 4,
  tone = 'surface',
  className = '',
}) => {
  const items = limit ? googleReviews.slice(0, limit) : googleReviews;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Responsive cards per view calculation
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  // Auto-advance with reduced-motion check and pause-on-hover/focus
  useEffect(() => {
    if (mode !== 'carousel') return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || isPaused || maxIndex === 0) {
      return;
    }

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [mode, isPaused, maxIndex, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const hasReviewsUrl = Boolean(googleSummary.reviewsUrl && googleSummary.reviewsUrl.trim().length > 0);
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Section
      id="reviews"
      tone={tone}
      className={`py-16 sm:py-24 border-y border-line relative overflow-hidden ${className}`}
      aria-label="Client Reviews and Testimonials"
    >
      <Container size="lg">
        {/* Section Heading */}
        <div data-reveal className="text-center mb-6">
          <span className="text-[12px] uppercase tracking-wider text-gold font-semibold block mb-2">
            Selected Reviews
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text">
            What Our Clients Say
          </h2>
        </div>

        {/* Dynamic Google Summary Bar */}
        <GoogleReviewSummaryHeader />

        {mode === 'carousel' ? (
          /* Carousel Presentation */
          <div
            data-reveal
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Google Customer Reviews Carousel"
          >
            {/* Viewport Frame */}
            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                }}
              >
                {items.map((review) => (
                  <div
                    key={review.id}
                    className="shrink-0 p-3"
                    style={{ width: `${100 / visibleCount}%` }}
                  >
                    <GoogleReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls with 44px min tap targets */}
            {items.length > visibleCount && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous review"
                  className="w-11 h-11 rounded-full border border-line bg-raised hover:border-gold-line text-text hover:text-gold flex items-center justify-center transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Dots indicator with 44px hit bounds */}
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      tabIndex={-1}
                      aria-label={`Go to slide ${idx + 1}`}
                      className="p-3 flex items-center justify-center"
                    >
                      <span
                        className={`h-1.5 rounded-full transition-all duration-300 block ${
                          currentIndex === idx ? 'w-6 bg-gold' : 'w-2 bg-line hover:bg-gold-line'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next review"
                  className="w-11 h-11 rounded-full border border-line bg-raised hover:border-gold-line text-text hover:text-gold flex items-center justify-center transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Grid Presentation (Testimonials Page) */
          <div data-reveal data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((review) => (
              <div key={review.id}>
                <GoogleReviewCard review={review} />
              </div>
            ))}
          </div>
        )}

        {/* Read all reviews on Google CTA */}
        {hasReviewsUrl && (
          <div data-reveal className="mt-10 sm:mt-12 text-center">
            <a
              href={googleSummary.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 min-h-[48px] px-8 py-3.5 rounded-[4px] bg-raised border border-gold-line text-gold hover:bg-gold hover:text-ink font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold group"
            >
              <span>Read all reviews on Google</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default GoogleReviews;
