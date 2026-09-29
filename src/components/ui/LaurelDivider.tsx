import React from 'react';

export interface LaurelDividerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LaurelDivider: React.FC<LaurelDividerProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: { width: 140, height: 20 },
    md: { width: 180, height: 26 },
    lg: { width: 240, height: 32 },
  };

  const { width, height } = sizeMap[size];

  return (
    <div className={`flex items-center justify-center my-4 ${className}`} aria-hidden="true">
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold/90 transition-opacity hover:opacity-100"
      >
        {/* Left hairline branch */}
        <path
          d="M75 15C65 18 57 14 50 10C55 11 60 13 65 13M80 15C73 13 68 9 65 5C67 9 70 12 75 14"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M55 12C45 14 37 10 30 6C35 7 40 9 45 9M60 12C53 10 48 6 45 2C47 6 50 9 55 11"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* Right hairline branch */}
        <path
          d="M125 15C135 18 143 14 150 10C145 11 140 13 135 13M120 15C127 13 132 9 135 5C133 9 130 12 125 14"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M145 12C155 14 163 10 170 6C165 7 160 9 155 9M140 12C147 10 152 6 155 2C153 6 150 9 145 11"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* Center gold crest emblem */}
        <circle cx="100" cy="15" r="3.5" fill="#C9A227" />
        <circle cx="91" cy="15" r="1.5" fill="#C9A227" opacity="0.8" />
        <circle cx="109" cy="15" r="1.5" fill="#C9A227" opacity="0.8" />
      </svg>
    </div>
  );
};
