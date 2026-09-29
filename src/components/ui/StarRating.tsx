import React from 'react';

export interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 5,
  maxRating = 5,
  size = 16,
  className = '',
  showValue = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-1 text-gold ${className}`} aria-label={`Rating: ${rating} out of ${maxRating} stars`}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: maxRating }).map((_, index) => {
          const isFilled = index < Math.floor(rating);
          const isHalf = !isFilled && index < rating;

          return (
            <svg
              key={index}
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={isFilled ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isFilled ? 'text-gold fill-gold' : isHalf ? 'text-gold fill-gold/50' : 'text-border'}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-text ml-1.5">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};
