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
      return <ScissorsIcon size={36} className="text-gold" />;
    }
    return <SparklesIcon size={36} className="text-gold" />;
  };

  return (
    <Section tone="surface" className="py-16 sm:py-24 border-y border-gold/25" aria-label="Our Salon Services Directory">
      <Container size="lg">
        
        {/* Centered Heading with Expanding Gold Accent Line */}
        <div data-reveal className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-[12px] uppercase tracking-wider text-gold font-semibold block mb-2">
            Haute Coiffure & Beauty Rituals
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
            Our Services
          </h2>
          {/* Gold Accent Line with Reveal */}
          <div className="w-16 h-0.5 bg-gold mx-auto transition-transform duration-700 ease-out origin-center" />
        </div>

        {/* Tiles Grid: 6 in one row on desktop, 3x2 on tablet (<900px), 3x2 on mobile (3 cols x 2 rows) */}
        <div
          data-reveal
          data-reveal-stagger
          className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-3 sm:gap-x-6 sm:gap-y-10 items-start justify-items-center"
        >
          {verifiedTiles.map((tile, idx) => {
            // Animation slide direction: 1-3 enter from left, 4-6 from right (desktop)
            const revealVariant = idx < 3 ? 'left' : 'right';

            return (
              <Link
                key={tile.id}
                to={`/services/${tile.slug}`}
                data-reveal={revealVariant}
                className="group flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-[4px] p-1.5 transition-transform duration-300"
              >
                {/* Circular Photo with Gold Ring Offset 8-10px */}
                <div className="p-2 sm:p-2.5 rounded-full border border-gold-line group-hover:border-gold group-hover:scale-105 transition-all duration-300 mb-3 sm:mb-4 bg-ink">
                  <div className="w-[84px] h-[84px] xs:w-[96px] xs:h-[96px] sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-raised flex items-center justify-center">
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

                {/* Uppercase Letter-Spaced Label (12px min mobile, 13-14px desktop) */}
                <span className="text-[12px] sm:text-[13px] lg:text-[14px] uppercase tracking-wider font-semibold text-text group-hover:text-gold transition-colors leading-tight max-w-[110px] sm:max-w-none">
                  {tile.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* View All Services Link */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider text-gold hover:text-gold-soft font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold py-2"
          >
            <span>Explore Complete Services & Menu</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

      </Container>
    </Section>
  );
};

export default OurServicesTiles;
