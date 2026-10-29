import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { FramedImage } from '../ui/FramedImage';
import { SALON_IMAGE_ASSETS } from '../../data/imageFocalPoints';

const GALLERY_ITEMS = [
  {
    asset: SALON_IMAGE_ASSETS.stylingStations,
    aspect: 'aspect-[4/5]',
    arch: true,
  },
  {
    asset: SALON_IMAGE_ASSETS.balayageCaramel,
    aspect: 'aspect-square',
    arch: false,
  },
  {
    asset: SALON_IMAGE_ASSETS.glassHairNanoplastia,
    aspect: 'aspect-[4/5]',
    arch: true,
  },
  {
    asset: SALON_IMAGE_ASSETS.washLounge,
    aspect: 'aspect-square',
    arch: false,
  },
  {
    asset: SALON_IMAGE_ASSETS.nailBar,
    aspect: 'aspect-[16/10]',
    arch: false,
  },
  {
    asset: SALON_IMAGE_ASSETS.storefrontSignageGold,
    aspect: 'aspect-[16/10]',
    arch: false,
  },
];

export const StudioGallery: React.FC = () => {
  return (
    <Section tone="surface" className="py-20 sm:py-28 border-t border-border" aria-label="Inside the Studio Visual Gallery">
      <Container size="lg">
        {/* Lustre Section Header */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 border border-border shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold-text font-semibold">
              The Space & The Work
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-text mb-4 leading-tight tracking-tight">
            Inside the studio, <br className="hidden sm:inline" />
            <span className="italic">in every detail.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-lg mx-auto">
            A glimpse into our Ghatkopar East sanctuary: precision cutting stations, relaxing wash lounges, and genuine client transformations.
          </p>
        </div>

        {/* Asymmetrical Lustre Photo Grid utilizing FramedImage */}
        <div data-reveal data-reveal-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {GALLERY_ITEMS.map(({ asset, aspect, arch }) => (
            <div key={asset.id} className="w-full">
              <FramedImage
                src={asset.src}
                alt={asset.alt}
                focalPoint={asset.focalPoint}
                aspectRatio={aspect}
                radius={arch ? 'arch-tall' : 'rounded'}
                border="gold"
                caption={{
                  title: asset.title,
                  subtitle: asset.subtitle,
                  badge: asset.badge,
                }}
                width={asset.intrinsicWidth}
                height={asset.intrinsicHeight}
              />
            </div>
          ))}
        </div>

        {/* Social Link Pill */}
        <div data-reveal className="text-center mt-12 sm:mt-16">
          <a
            href="https://www.instagram.com/angelsalon_ghatkopar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-surface border border-border hover:border-gold/60 text-text hover:text-gold-text text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-sm"
          >
            <span>Follow Our Daily Transformations on Instagram</span>
            <span aria-hidden="true">&nearr;</span>
          </a>
        </div>
      </Container>
    </Section>
  );
};

export default StudioGallery;
