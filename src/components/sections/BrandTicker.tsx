import React from 'react';

export const BrandTicker: React.FC = () => {
  const tickerItems = [
    'PRECISION HAIRCUTS',
    'FRENCH BALAYAGE',
    'LIQUID GLASS NANOPLASTIA',
    'SKEYNDOR DERMACEUTICALS',
    'RUSSIAN GEL EXTENSIONS',
    'GOVT. RECOGNIZED ACADEMY',
    'HD BRIDAL COUTURE',
    'RICA ITALIAN WAXING',
    'KOREAN HYDRA-GLOW',
    'UNISEX SANCTUARY',
  ];

  return (
    <div
      className="bg-surface border-y border-border py-3.5 sm:py-4 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="flex items-center space-x-8 animate-marquee whitespace-nowrap">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-6 shrink-0">
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-text-muted hover:text-gold transition-colors">
              {item}
            </span>
            <span className="text-gold text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandTicker;
