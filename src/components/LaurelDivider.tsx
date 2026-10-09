import React from 'react';

export interface LaurelDividerProps {
  className?: string;
}

export const LaurelDivider: React.FC<LaurelDividerProps> = ({ className = '' }) => {
  return (
    <div className={`laurel-divider-container scroll-reveal ${className}`}>
      <svg className="laurel-divider-svg" viewBox="0 0 200 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Left laurel branch */}
        <path d="M70,15 C60,18 52,14 45,10 C50,11 55,13 60,13 M75,15 C68,13 63,9 60,5 C62,9 65,12 70,14" stroke="var(--color-gold, #C9A227)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M50,12 C40,14 32,10 25,6 C30,7 35,9 40,9 M55,12 C48,10 43,6 40,2 C42,6 45,9 50,11" stroke="var(--color-gold, #C9A227)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        {/* Right laurel branch */}
        <path d="M130,15 C140,18 148,14 155,10 C150,11 145,13 140,13 M125,15 C132,13 137,9 140,5 C138,9 135,12 130,14" stroke="var(--color-gold, #C9A227)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M150,12 C160,14 168,10 175,6 C170,7 165,9 160,9 M145,12 C152,10 157,6 160,2 C158,6 155,9 150,11" stroke="var(--color-gold, #C9A227)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        {/* Center gold beads */}
        <circle cx="100" cy="15" r="3.5" fill="url(#dividerGold)" />
        <circle cx="91" cy="15" r="1.5" fill="var(--color-gold, #C9A227)" opacity="0.8" />
        <circle cx="109" cy="15" r="1.5" fill="var(--color-gold, #C9A227)" opacity="0.8" />
        <defs>
          <linearGradient id="dividerGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DFAC6C" />
            <stop offset="100%" stopColor="#C68B45" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default LaurelDivider;
