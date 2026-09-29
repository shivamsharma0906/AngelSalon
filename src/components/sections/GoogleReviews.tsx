import React, { useState, useEffect, useRef, useCallback } from 'react';
import { googleReviews, googleSummary, GoogleReview } from '../../data/reviews';
import { Container } from '../ui/Container';

interface GoogleReviewsProps {
  mode?: 'carousel' | 'grid';
  limit?: number;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatCapturedDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  if (!year || !month || !day) return dateStr;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  const dayNum = date.getDate();
  const monthName = date.toLocaleString('en-US', { month: 'short' });
  const fullYear = date.getFullYear();
  return `${dayNum} ${monthName} ${fullYear}`;
}

export const GoogleReviewCard: React.FC<{ review: GoogleReview }> = ({ review }) => {
  const initials = getInitials(review.name);
  const hasReviewsUrl = Boolean(googleSummary.reviewsUrl && googleSummary.reviewsUrl.trim().length > 0);

  return (
    <article
      data-card-hover
      className="bg-surface/90 border border-border hover:border-gold/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-lg transition-all duration-300 h-full group"
      aria-label={`Review by ${review.name}`}
    >
      <div>
        {/* Header: Initial Avatar, Name, and Google Badge */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full bg-ink border border-gold/40 text-gold flex items-center justify-center font-bold text-xs uppercase tracking-wider shadow-sm select-none"
              aria-hidden="true"
            >
              {initials}
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-text group-hover:text-gold transition-colors leading-tight">
                {review.name}
              </h3>
              <span className="text-[11px] text-text-subtle font-medium uppercase tracking-wider">
                Google review
              </span>
            </div>
          </div>

          {/* Google Icon */}
          <div className="w-6 h-6 rounded-full bg-ink/80 border border-border flex items-center justify-center shrink-0" aria-hidden="true">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.9z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
              />
            </svg>
          </div>
        </div>

        {/* Verbatim Review Text with UI quotation marks */}
        <blockquote className="text-base text-text-muted leading-relaxed font-light">
          <span className="text-gold font-serif text-lg leading-none select-none">“</span>
          {review.text}
          <span className="text-gold font-serif text-lg leading-none select-none">”</span>
        </blockquote>
      </div>

      {/* Conditional Read on Google link for possiblyTruncated reviews (min 44px tap target) */}
      {review.possiblyTruncated && hasReviewsUrl && (
        <div className="pt-3 mt-3 border-t border-border/60">
          <a
            href={googleSummary.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] text-xs text-gold hover:text-gold-soft font-semibold inline-flex items-center gap-1.5 transition-colors py-2"
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
  // Calculate percentage for partly filled star icon
  const rating = googleSummary.rating;
  const fillPercent = Math.round((rating % 1) * 100) || 70;
  const capturedDateText = `Rating and count as of ${formatCapturedDate(googleSummary.capturedOn)}`;
  const summaryLineText = `${googleSummary.rating} on Google · ${googleSummary.count} reviews`;

  return (
    <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-12">
      {/* 4.7 Rating with Partly Filled Star */}
      <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-surface/90 border border-gold/40 shadow-gold-sm mb-3">
        <span className="font-serif text-2xl sm:text-3xl font-bold text-gold tracking-tight">
          {googleSummary.rating}
        </span>

        {/* Partly filled star icon */}
        <svg
          className="w-6 h-6 shrink-0"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="google-partly-filled-star" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={`${fillPercent}%`} stopColor="#C5A880" />
              <stop offset={`${fillPercent}%`} stopColor="rgba(197, 168, 128, 0.2)" />
            </linearGradient>
          </defs>
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill="url(#google-partly-filled-star)"
            stroke="#C5A880"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="text-xs sm:text-sm font-semibold text-text">
          {summaryLineText}
        </span>
      </div>

      {/* Date caption */}
      <p className="text-xs text-text-subtle font-light">
        {capturedDateText}
      </p>
    </div>
  );
};

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({
  mode = 'carousel',
  limit,
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

    // Check if user prefers reduced motion
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

  const bottomButtonText = `Showing ${items.length} selected reviews. Read all ${googleSummary.count} reviews on Google`;

  return (
    <section
      className={`py-16 sm:py-24 bg-ink relative overflow-hidden ${className}`}
      aria-label="What Our Clients Say"
    >
      {/* Golden backdrop accent (Hidden on mobile) */}
      <div className="hidden md:block absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <Container size="lg">
        {/* Section Heading & Subline */}
        <div data-reveal className="text-center mb-6">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold block mb-2">
            Selected reviews from our Google Business Profile
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text">
            What Our Clients Say
          </h2>
        </div>

        {/* Dynamic Google Summary Bar */}
        <GoogleReviewSummaryHeader />

        {mode === 'carousel' ? (
          /* Carousel Presentation (Home / Carousel Mode) */
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

            {/* Carousel Controls */}
            {items.length > visibleCount && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous review"
                  className="w-11 h-11 rounded-full border border-border bg-surface hover:border-gold hover:text-gold text-text flex items-center justify-center transition-colors shadow-sm focus:outline-none focus:ring-1 focus:ring-gold"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Dots indicator */}
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      tabIndex={-1}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentIndex === idx ? 'w-6 bg-gold' : 'w-2 bg-border hover:bg-gold/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next review"
                  className="w-11 h-11 rounded-full border border-border bg-surface hover:border-gold hover:text-gold text-text flex items-center justify-center transition-colors shadow-sm focus:outline-none focus:ring-1 focus:ring-gold"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Masonry Grid Presentation (Testimonials Page) */
          <div data-reveal data-reveal-stagger className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {items.map((review) => (
              <div key={review.id} className="break-inside-avoid">
                <GoogleReviewCard review={review} />
              </div>
            ))}
          </div>
        )}

        {/* Below the cards: Google reviews CTA button */}
        {hasReviewsUrl && (
          <div data-reveal className="mt-12 text-center">
            <a
              href={googleSummary.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-surface border border-gold/40 text-gold hover:bg-gold hover:text-ink font-semibold text-xs uppercase tracking-luxury transition-all duration-300 shadow-gold-sm group"
            >
              <span>{bottomButtonText}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}
      </Container>
    </section>
  );
};

export default GoogleReviews;
