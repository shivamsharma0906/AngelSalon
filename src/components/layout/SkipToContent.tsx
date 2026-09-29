import React from 'react';

export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-gold focus:text-ink focus:font-bold focus:shadow-gold-md focus:border focus:border-ink transition-all"
    >
      Skip to main content
    </a>
  );
};
