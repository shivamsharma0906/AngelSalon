import React from 'react';
import { googleReviews, googleSummary, GoogleReview } from '../../data/reviews';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { StarIcon } from '../ui/icons';
import { Carousel } from '../Carousel';

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
        {/* Header: Star Rating and Verified Badge */}
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

        {/* Verbatim Review Text */}
        <blockquote className="text-sm sm:text-base text-text-muted leading-relaxed font-normal mb-6">
          <span className="text-gold font-serif text-xl leading-none select-none mr-1">“</span>
          {review.text}
          <span className="text-gold font-serif text-xl leading-none select-none ml-1">”</span>
        </blockquote>
      </div>

      <div>
        {/* Reviewer Details */}
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
              Google &rarr;
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({
  mode = 'carousel',
  limit,
  tone = 'surface',
  className = '',
}) => {
  const displayReviews = limit ? googleReviews.slice(0, limit) : googleReviews;

  return (
    <Section id="reviews" tone={tone} className={`py-20 sm:py-28 border-t border-border ${className}`} aria-label="Customer Testimonials">
      <Container size="lg">
        {/* Lustre Section Header */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 border border-border shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold-text font-semibold">
              Client Feedback
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-text mb-4 leading-tight tracking-tight">
            Kind <span className="italic">words.</span>
          </h2>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-text-muted">
            <div className="flex items-center text-gold">
              <StarIcon size={14} className="fill-gold text-gold" />
            </div>
            <span className="font-bold text-text">{googleSummary.rating} out of 5 stars</span>
            <span>·</span>
            <span>Based on {googleSummary.count} verified Google reviews</span>
          </div>
        </div>

        {/* Carousel or Grid Presentation */}
        {mode === 'carousel' ? (
          <div data-reveal>
            <Carousel
              label="Customer testimonials"
              slideClassName="w-[85vw] sm:w-[48%] lg:w-[32%] shrink-0 snap-start"
              autoRotate
              autoRotateInterval={5500}
            >
              {displayReviews.map((review) => (
                <div key={review.id} className="h-full pr-4 sm:pr-6">
                  <GoogleReviewCard review={review} />
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <div data-reveal data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayReviews.map((review) => (
              <GoogleReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {/* Google Reviews Direct Link Button */}
        {googleSummary.reviewsUrl && (
          <div data-reveal className="text-center mt-12 sm:mt-16">
            <a
              href={googleSummary.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-surface border border-border hover:border-gold/60 text-text hover:text-gold-text text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-sm"
            >
              <span>Read All {googleSummary.count} Google Reviews</span>
              <span aria-hidden="true">&nearr;</span>
            </a>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default GoogleReviews;
