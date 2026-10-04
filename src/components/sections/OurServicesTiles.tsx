import React from 'react';
import { Link } from 'react-router-dom';
import { homeServiceTiles, HomeServiceTile } from '../../data/services';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { ScissorsIcon, SparklesIcon } from '../ui/icons';
import { Carousel } from '../Carousel';

export const OurServicesTiles: React.FC = () => {
  // Render ONLY verified service tiles
  const verifiedTiles = homeServiceTiles.filter((tile) => tile.verified);

  if (verifiedTiles.length === 0) {
    return null;
  }

  const renderFallbackIcon = (tile: HomeServiceTile) => {
    if (tile.id === 'haircut' || tile.id === 'colour' || tile.id === 'treatments') {
      return <ScissorsIcon size={36} className="text-gold" />;
    }
    return <SparklesIcon size={36} className="text-gold" />;
  };

  const renderTileContent = (tile: HomeServiceTile) => (
    <Link
      to={`/services/${tile.slug}`}
      className="group flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-[4px] p-1.5 transition-transform duration-300 w-full"
    >
      {/* Circular Photo with Gold Ring Offset */}
      <div className="p-2 sm:p-2.5 rounded-full border border-gold-line group-hover:border-gold group-hover:scale-105 transition-all duration-300 mb-3 sm:mb-4 bg-ink">
        <div className="w-[88px] h-[88px] xs:w-[100px] xs:h-[100px] sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-raised flex items-center justify-center">
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
      <h3 className="font-serif text-base sm:text-lg font-bold text-text group-hover:text-gold transition-colors leading-tight mb-1">
        {tile.label}
      </h3>

      {/* Verified Tag */}
      <span className="text-[11px] text-muted uppercase tracking-wider font-medium">
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

        {/* Mobile & Tablet (<lg): Accessible Carousel avoids squishing 3-per-row */}
        <div data-reveal className="lg:hidden">
          <Carousel
            label="Salon service disciplines"
            slideClassName="w-[44vw] xs:w-[40vw] sm:w-[170px] md:w-[190px] shrink-0 snap-start flex flex-col items-center"
          >
            {verifiedTiles.map((tile) => (
              <div key={tile.id} className="w-full">
                {renderTileContent(tile)}
              </div>
            ))}
          </Carousel>
        </div>

        {/* Desktop (lg+): Clean 6-column grid where all disciplines fit symmetrically in one row */}
        <div
          data-reveal
          data-reveal-stagger
          className="hidden lg:grid lg:grid-cols-6 gap-x-6 items-start justify-items-center"
        >
          {verifiedTiles.map((tile, idx) => {
            const revealVariant = idx < 3 ? 'left' : 'right';
            return (
              <div key={tile.id} data-reveal={revealVariant} className="w-full">
                {renderTileContent(tile)}
              </div>
            );
          })}
        </div>

      </Container>
    </Section>
  );
};

export default OurServicesTiles;
