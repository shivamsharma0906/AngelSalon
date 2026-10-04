import React from 'react';
import { Link } from 'react-router-dom';
import { homeServiceTiles, HomeServiceTile } from '../../data/services';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { ScissorsIcon, SparklesIcon } from '../ui/icons';

export const OurServicesTiles: React.FC = () => {
  // Render ONLY verified service tiles
  const verifiedTiles = homeServiceTiles.filter((tile) => tile.verified);

  if (verifiedTiles.length === 0) {
    return null;
  }

  const renderFallbackIcon = (tile: HomeServiceTile) => {
    if (tile.id === 'haircut' || tile.id === 'colour' || tile.id === 'treatments') {
      return <ScissorsIcon size={32} className="text-gold" />;
    }
    return <SparklesIcon size={32} className="text-gold" />;
  };

  const renderTileContent = (tile: HomeServiceTile) => (
    <Link
      to={`/services/${tile.slug}`}
      className="group flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-[4px] p-1 xs:p-1.5 sm:p-2 transition-transform duration-300 w-full active:scale-95"
    >
      {/* Circular Photo with Gold Ring Offset */}
      <div className="p-1.5 xs:p-2 sm:p-2.5 rounded-full border border-gold-line group-hover:border-gold group-hover:scale-105 transition-all duration-300 mb-2 xs:mb-2.5 sm:mb-4 bg-ink shadow-md">
        <div className="w-[72px] h-[72px] xs:w-[84px] xs:h-[84px] sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-raised flex items-center justify-center">
          {tile.photo ? (
            <img
              src={tile.photo}
              alt={`${tile.label} at Angels Salon Mumbai`}
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: tile.objectPosition || 'center' }}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            renderFallbackIcon(tile)
          )}
        </div>
      </div>

      {/* Label */}
      <h3 className="font-serif text-xs xs:text-sm sm:text-base lg:text-lg font-bold text-text group-hover:text-gold transition-colors leading-tight mb-1 text-center line-clamp-2">
        {tile.label}
      </h3>

      {/* Explore Link */}
      <span className="text-[10px] xs:text-[11px] sm:text-xs text-muted group-hover:text-gold uppercase tracking-wider font-medium transition-colors">
        Explore &rarr;
      </span>
    </Link>
  );

  return (
    <Section tone="surface" className="py-16 sm:py-24 border-y border-gold/25" aria-label="Our Salon Services Directory">
      <Container size="lg">
        
        {/* Centered Heading with Gold Accent Line */}
        <div data-reveal className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <span className="text-[12px] uppercase tracking-wider text-gold font-semibold block mb-2">
            Haute Coiffure & Beauty Rituals
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
            Our Services
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto transition-transform duration-700 ease-out origin-center" />
        </div>

        {/* Symmetrical Grid: 3 columns on mobile (2 balanced rows of 3) & 6 columns on desktop */}
        <div
          data-reveal
          data-reveal-stagger
          className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-x-2 xs:gap-x-3 sm:gap-x-6 lg:gap-x-6 gap-y-7 sm:gap-y-10 items-start justify-items-center max-w-6xl mx-auto"
        >
          {verifiedTiles.map((tile) => (
            <div key={tile.id} className="w-full">
              {renderTileContent(tile)}
            </div>
          ))}
        </div>

      </Container>
    </Section>
  );
};

export default OurServicesTiles;
