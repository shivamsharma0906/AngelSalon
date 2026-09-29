import React from 'react';
import { LaurelDivider } from './LaurelDivider';

export interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  showDivider?: boolean;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  subtitle,
  title,
  description,
  align = 'center',
  showDivider = true,
  as = 'h2',
  className = '',
}) => {
  const HeadingTag = as;
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 md:mb-14 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'} ${className}`}>
      {subtitle && (
        <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-luxury text-gold mb-2.5">
          {subtitle}
        </span>
      )}
      <HeadingTag className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-text leading-[1.15]">
        {title}
      </HeadingTag>

      {showDivider && (
        <div className={isCenter ? 'flex justify-center' : 'flex justify-start'}>
          <LaurelDivider size="md" />
        </div>
      )}

      {description && (
        <p className="text-base sm:text-lg text-text-muted mt-3 font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
