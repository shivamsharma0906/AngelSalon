import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

const GALLERY_ITEMS = [
  {
    id: 'styling-stations',
    title: 'Styling Sanctuary',
    category: 'Interior Atelier',
    src: '/images/real/interior_styling_stations.webp',
    alt: 'Angels Salon modern styling stations and vanity mirrors in Ghatkopar East',
    aspect: 'aspect-[4/5]',
    arch: true,
  },
  {
    id: 'caramel-balayage',
    title: 'French Balayage',
    category: 'Real Transformation',
    src: '/images/real/client2_caramel_balayage_after.webp',
    alt: 'Real client dimensional honey-caramel balayage crafted at Angels Salon Mumbai',
    aspect: 'aspect-square',
    arch: false,
  },
  {
    id: 'glass-hair',
    title: 'Nanoplastia Mirror Glass',
    category: 'Texture Care',
    src: '/images/real/client1_glass_hair_after.webp',
    alt: 'Real client mirror-glass hair smoothening and Nanoplastia treatment result',
    aspect: 'aspect-[4/5]',
    arch: true,
  },
  {
    id: 'wash-lounge',
    title: 'Shampoo & Scalp Lounge',
    category: 'Relaxation',
    src: '/images/real/interior_wash_lounge.webp',
    alt: 'Comfortable reclining wash lounge chairs for hair treatments and scalp baths',
    aspect: 'aspect-square',
    arch: false,
  },
  {
    id: 'nail-bar',
    title: 'Boutique Nail Bar',
    category: 'Nail Artistry',
    src: '/images/real/interior_nail_bar.webp',
    alt: 'Dedicated backlit nail bar and lacquer collection at Angels Salon',
    aspect: 'aspect-[16/10]',
    arch: false,
  },
  {
    id: 'signage',
    title: 'Boutique Facade',
    category: 'Pant Nagar Flagship',
    src: '/images/real/storefront_signage_gold.webp',
    alt: 'Angels Salon & Academy 3D gold illuminated academy signage and boutique exterior',
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

        {/* Asymmetrical Lustre Photo Grid */}
        <div data-reveal data-reveal-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden bg-dark border border-border hover:border-gold/50 shadow-lustre-sm hover:shadow-lustre-md transition-all duration-300 ${
                item.arch
                  ? 'rounded-t-[180px] rounded-b-[24px]'
                  : 'rounded-[24px] sm:rounded-[28px]'
              }`}
            >
              <div className={`relative w-full ${item.aspect} overflow-hidden`}>
                <img
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Caption Pill on Hover */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-full bg-surface/90 backdrop-blur-md border border-border shadow-sm flex items-center justify-between transition-transform duration-300">
                  <div>
                    <p className="font-serif text-sm font-bold text-text leading-none mb-0.5">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-text-muted leading-none">
                      {item.category}
                    </p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-gold" />
                </div>
              </div>
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
