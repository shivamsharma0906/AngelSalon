import React, { useState, useEffect, useCallback } from 'react';
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
      className="bg-surface border border-border hover:border-gold/50 rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 flex flex-col justify-between shadow-lustre-sm hover:shadow-lustre-md transition-all duration-300 h-full group"
      aria-label={`Review by ${review.name}`}
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1 text-gold" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} size={15} className="fill-gold text-gold" />
            ))}
          </div>

          <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-background border border-border text-gold-text">
            Verified Client
          </span>
        </div>

        <blockquote className="text-sm sm:text-base text-text-muted leading-relaxed font-normal mb-6">
          <span className="text-gold font-serif text-xl leading-none select-none mr-1">“</span>
          {review.text}
          <span className="text-gold font-serif text-xl leading-none select-none ml-1">”</span>
        </blockquote>
      </div>

      <div>
        <div className="pt-5 border-t border-border flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full bg-surface-subtle border border-gold/40 text-gold-text flex items-center justify-center font-bold text-xs uppercase tracking-wider shadow-sm select-none"
              aria-hidden="true"
            >
              {initials}
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-text group-hover:text-gold-text transition-colors leading-tight">
                {review.name}
              </h3>
              <span className="text-[11px] text-text-muted font-normal">
                Verified Google Client
              </span>
            </div>
          </div>

          {hasReviewsUrl && (
            <a
              href={googleSummary.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-text-muted hover:text-gold uppercase tracking-wider font-semibold transition-colors shrink-0"
              aria-label="View on Google"
            >
              Google ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({
  tone = 'surface',
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const total = googleReviews.length;

  const currentReview = googleReviews[currentIndex];
  const initials = getInitials(currentReview.name);

  const goToNext = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      setIsFading(false);
    }, 180);
  }, [total]);

  const goToPrev = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
      setIsFading(false);
    }, 180);
  }, [total]);

  // Gentle auto-rotation every 7s when not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      goToNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  return (
    <Section
      id="reviews"
      tone={tone}
      className={`relative py-28 sm:py-36 border-t border-border overflow-hidden select-none ${className}`}
      aria-label="Customer Testimonials"
    >
      {/* Massive Editorial Watermark Text in Background (Visible warm champagne tone matching reference) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-serif text-[110px] sm:text-[180px] md:text-[240px] lg:text-[290px] font-normal text-surface-subtle leading-none tracking-tight block whitespace-nowrap opacity-90 transition-opacity">
          Kind words
        </span>
      </div>

      <Container size="lg" className="relative z-10">
        {/* Lustre Eyebrow Header */}
        <div data-reveal className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <span className="w-8 h-[1.5px] bg-gold" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] text-gold-text font-semibold">
              Client Love
            </span>
            <span className="w-8 h-[1.5px] bg-gold" aria-hidden="true" />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-text-muted mt-2">
            <div className="flex items-center text-gold" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} size={14} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="font-bold text-text">{googleSummary.rating} out of 5 stars</span>
            <span>·</span>
            <span>{googleSummary.count}+ verified Google reviews</span>
          </div>
        </div>

        {/* Signature Lustre Stacked Testimonial Card with 3D Layer Hover & Transitions */}
        <div
          data-reveal
          className="group relative max-w-xl md:max-w-2xl mx-auto px-3 sm:px-6 cursor-default"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Deepest Stack Card (Subtle background accent peeking out on hover) */}
          <div
            className="absolute inset-0 translate-y-2 sm:translate-y-3 rotate-[1.5deg] sm:rotate-[2deg] rounded-[24px] sm:rounded-[32px] bg-surface-subtle/60 border border-border/60 transition-all duration-500 ease-out group-hover:translate-y-5 sm:group-hover:translate-y-6 group-hover:rotate-[3.5deg] sm:group-hover:rotate-[4deg] group-hover:translate-x-2.5 pointer-events-none"
            aria-hidden="true"
          />

          {/* Angled Background Stack Card (Warm champagne paper stack) */}
          <div
            className="absolute inset-0 translate-y-3 sm:translate-y-4 -rotate-[2.5deg] sm:-rotate-[3deg] rounded-[24px] sm:rounded-[32px] bg-surface-subtle border border-border shadow-xl transition-all duration-500 ease-out group-hover:translate-y-6 sm:group-hover:translate-y-7 group-hover:-rotate-[5deg] sm:group-hover:-rotate-[5.5deg] group-hover:-translate-x-2.5 group-hover:shadow-2xl group-hover:border-gold/30 pointer-events-none"
            aria-hidden="true"
          />

          {/* Active Foreground Card (Crisp white / surface card with dynamic elevation) */}
          <div className="relative rounded-[24px] sm:rounded-[32px] bg-white dark:bg-surface p-7 sm:p-10 md:p-12 border border-border/80 shadow-2xl transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.01] group-hover:border-gold/50 group-hover:shadow-[0_30px_60px_-15px_rgba(23,21,19,0.14)]">
            {/* Card Header: Story Counter & 5 Gold Stars */}
            <div className="flex items-center justify-between pb-5 border-b border-border/60">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium text-text-muted transition-colors duration-300 group-hover:text-gold-text">
                Client Story &mdash; {String(currentIndex + 1).padStart(2, '0')}
              </span>

              <div className="flex items-center gap-1 text-gold transition-transform duration-300 group-hover:scale-105" aria-label="5 stars rating">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={15} className="fill-gold text-gold" />
                ))}
              </div>
            </div>

            {/* Animated Story Content Wrapper with smooth crossfade */}
            <div
              className={`transition-all duration-300 ease-out ${
                isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              {/* Verbatim Quote */}
              <div className="min-h-[140px] sm:min-h-[110px] flex items-center my-6 sm:my-8">
                <blockquote className="font-serif text-lg sm:text-2xl text-text font-normal leading-relaxed italic">
                  &ldquo;{currentReview.text}&rdquo;
                </blockquote>
              </div>

              {/* Reviewer Details & Navigation Buttons */}
              <div className="pt-6 border-t border-border/60 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-subtle border border-gold/40 text-gold-text flex items-center justify-center font-serif font-bold text-xs sm:text-sm uppercase shadow-sm select-none shrink-0 transition-all duration-300 group-hover:border-gold group-hover:scale-105"
                    aria-hidden="true"
                  >
                    {initials}
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-text leading-tight group-hover:text-gold-text transition-colors">
                      {currentReview.name}
                    </h3>
                    <span className="text-[11px] sm:text-xs text-text-muted font-normal">
                      Verified Google Client &middot; Angel Salon
                    </span>
                  </div>
                </div>

                {/* Prev / Next Story Navigation Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={goToPrev}
                    aria-label="Previous client story"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border hover:border-gold text-text hover:text-gold flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110 active:scale-95 outline-none focus:outline-none focus:ring-0 cursor-pointer"
                  >
                    &larr;
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Next client story"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-dark text-text-inverse hover:bg-gold-text flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110 active:scale-95 outline-none focus:outline-none focus:ring-0 cursor-pointer"
                  >
                    &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Reviews Direct Link Button */}
        {googleSummary.reviewsUrl && (
          <div data-reveal className="text-center mt-12 sm:mt-16">
            <a
              href={googleSummary.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 px-7 py-3 rounded-full bg-surface border border-border hover:border-gold/80 hover:-translate-y-1 hover:shadow-lustre-md text-text hover:text-gold-text text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-sm"
            >
              <span>Read All {googleSummary.count} Google Reviews</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">↗</span>
            </a>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default GoogleReviews;
