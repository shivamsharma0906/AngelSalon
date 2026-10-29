import React from 'react';
import { Link } from 'react-router-dom';
import { homeServiceTiles } from '../../data/services';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

const SERVICE_TAGS: Record<string, { tag: string; price: string; desc: string }> = {
  haircut: {
    tag: 'Hair Architecture',
    price: 'From ₹1,200',
    desc: 'Vidal Sassoon geometric cutting, curtain bangs, face contouring, and signature blowout finish.',
  },
  colour: {
    tag: 'Colour Artistry',
    price: 'From ₹2,999',
    desc: 'Dimensional French balayage, lived-in highlights, caramel ribbons, and ammonia-free toning.',
  },
  treatments: {
    tag: 'Texture Restoration',
    price: 'From ₹2,999',
    desc: 'Mirror-glass Nanoplastia, Brazilian keratin infusions, botox smoothing, and scalp detox rituals.',
  },
  skin: {
    tag: 'Skin Clinic',
    price: 'From ₹1,500',
    desc: 'Clinical glow clean-ups, hydra-infusion facials, anti-pigmentation therapies, and bridal skincare.',
  },
  nails: {
    tag: 'Nail Lounge',
    price: 'From ₹999',
    desc: 'Hard gel extensions, Russian overlay manicures, French tips, and luxury hand & foot reflexology.',
  },
  bridal: {
    tag: 'Bridal Couture',
    price: 'From ₹5,000',
    desc: 'HD airbrush bridal makeup, Paithani & Gujarati saree draping, and customized wedding party looks.',
  },
};

export const OurServicesTiles: React.FC = () => {
  const verifiedTiles = homeServiceTiles.filter((tile) => tile.verified);

  if (verifiedTiles.length === 0) {
    return null;
  }

  return (
    <Section id="services" tone="surface" className="py-20 sm:py-28 border-t border-border" aria-label="Our Salon Services Directory">
      <Container size="lg">
        {/* Lustre Section Header */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-text font-semibold">
              Curated Rituals
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-text mb-4 leading-tight tracking-tight">
            Services, tailored <br className="hidden sm:inline" />
            <span className="italic">to the way you live.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-lg mx-auto">
            From precision architecture and sun-kissed colour to clinical skincare and high-fashion bridal couture.
          </p>
        </div>

        {/* 6 Lustre Studio Editorial Service Cards */}
        <div
          data-reveal
          data-reveal-stagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {verifiedTiles.map((tile) => {
            const meta = SERVICE_TAGS[tile.id] || {
              tag: 'Studio Service',
              price: 'Contact Desk',
              desc: 'Personalized salon rituals crafted to enhance your natural beauty.',
            };

            return (
              <div
                key={tile.id}
                className="group relative flex flex-col bg-surface rounded-[24px] sm:rounded-[28px] border border-border hover:border-gold/50 shadow-lustre-sm hover:shadow-lustre-md transition-all duration-300 overflow-hidden"
              >
                {/* Photo Frame with soft arch top */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-dark">
                  {tile.photo && (
                    <img
                      src={tile.photo}
                      alt={`${tile.label} at Angels Salon Mumbai`}
                      width={600}
                      height={420}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: tile.objectPosition || 'center' }}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent pointer-events-none" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-surface/90 backdrop-blur-md text-text shadow-sm border border-border/80">
                      {meta.tag}
                    </span>
                  </div>

                  {/* Starting Price Pill */}
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-dark/90 backdrop-blur-md text-gold shadow-sm border border-gold/30">
                      {meta.price}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-text group-hover:text-gold transition-colors mb-2">
                      {tile.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
                      {meta.desc}
                    </p>
                  </div>

                  {/* Link action */}
                  <div className="pt-4 border-t border-border/80 flex items-center justify-between">
                    <Link
                      to={`/services/${tile.slug}`}
                      className="text-xs uppercase tracking-wider font-semibold text-text hover:text-gold transition-colors inline-flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-gold rounded-full"
                    >
                      <span>Explore Rituals</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>

                    <a
                      href={`https://wa.me/917303312054?text=${encodeURIComponent(`Hi Angels Salon & Academy! I would like to inquire about ${tile.label} services.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] uppercase tracking-wider font-bold text-gold-text hover:text-gold transition-colors px-3 py-1 rounded-full bg-gold/10 hover:bg-gold/20"
                    >
                      Book
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Directory CTA Pill Button */}
        <div data-reveal className="text-center mt-12 sm:mt-16">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-surface border border-border hover:border-gold/60 text-text hover:text-gold-text text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-sm"
          >
            <span>View All Services & Complete Price Menu</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default OurServicesTiles;
