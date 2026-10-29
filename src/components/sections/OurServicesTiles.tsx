import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { buildWhatsAppLink } from '../../lib/whatsapp';

export interface LustreServiceTile {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  path: string;
  objectPosition?: string;
}

export const LUSTRE_SERVICES: LustreServiceTile[] = [
  {
    id: 'lived-in-colour',
    title: 'Lived-in Colour',
    description: 'Balayage, glosses and soft dimension, hand-painted to grow out beautifully.',
    image: '/images/real/client2_caramel_balayage_after.webp',
    alt: 'Dimensional French balayage and lived-in colour at Angel Salon Mumbai',
    path: '/services/womens-hair-colour',
    objectPosition: '50% 25%',
  },
  {
    id: 'scalp-therapy',
    title: 'Scalp Therapy',
    description: 'A detoxifying cleanse and pressure-point massage for a healthier foundation.',
    image: '/images/real/interior_wash_lounge.webp',
    alt: 'Ergonomic wash lounge scalp therapy at Angel Salon Ghatkopar East',
    path: '/services/hair-treatments',
    objectPosition: '50% 50%',
  },
  {
    id: 'signature-cut',
    title: 'Signature Cut',
    description: 'A consultation-led cut, wash and finish shaped to your texture and routine.',
    image: '/images/real/interior_styling_stations.webp',
    alt: 'Precision Vidal Sassoon haircut and styling stations at Angel Salon',
    path: '/services/womens-haircut-and-style',
    objectPosition: '50% 40%',
  },
  {
    id: 'nanoplastia-repair',
    title: 'Nanoplastia & Repair',
    description: 'Liquid glass hair smoothening and bond reconstruction that restores strength and mirror shine.',
    image: '/images/real/client1_glass_hair_after.webp',
    alt: 'Molecular Nanoplastia hair smoothening and liquid glass finish at Angel Salon',
    path: '/services/hair-treatments',
    objectPosition: '50% 30%',
  },
  {
    id: 'aesthetic-skincare',
    title: 'Aesthetic Skincare',
    description: 'Clinical Korean glass clean-ups, hydra-infusion facials and nourishing botanical therapies.',
    image: '/images/real/interior_skincare_dispensary.webp',
    alt: 'Luxury skincare dispensary and aesthetic facials at Angel Salon',
    path: '/services/skin-care',
    objectPosition: '50% 40%',
  },
  {
    id: 'boutique-nails',
    title: 'Boutique Nail Bar',
    description: 'Russian gel nail extensions, chrome finishes, deluxe manicures and hand-foot reflexology.',
    image: '/images/real/interior_nail_bar.webp',
    alt: 'Boutique illuminated nail bar and gel extensions lounge at Angel Salon Mumbai',
    path: '/services/nails',
    objectPosition: '50% 45%',
  },
];

export const OurServicesTiles: React.FC = () => {
  const whatsAppBookingUrl = buildWhatsAppLink({
    message: "Hi Angel Salon & Academy! I would like to book a service appointment. Could you please share available slots?",
  });

  return (
    <Section id="services" tone="surface" className="py-20 sm:py-28 border-t border-border" aria-label="Our Salon Services Directory">
      <Container size="lg">
        {/* Lustre Split Header */}
        <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-[1.5px] bg-gold" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-text font-semibold">
                Our Services
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-text leading-[1.15] tracking-tight">
              Services, tailored <br className="hidden sm:inline" />
              <span className="italic font-normal">to the way you live.</span>
            </h2>
          </div>

          <div className="max-w-md flex flex-col items-start lg:items-end text-left lg:text-right gap-4">
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
              From a quick refresh to a full transformation, every service begins with a one-to-one consultation and finishes with a plan for home.
            </p>
            <a
              href={whatsAppBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-dark/40 hover:border-dark text-text text-xs uppercase tracking-wider font-semibold transition-all duration-300 hover:bg-dark hover:text-text-inverse"
            >
              <span>Book Appointment</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        {/* 6 Lustre Editorial Service Cards with Zoom-in on hover */}
        <div
          data-reveal
          data-reveal-stagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {LUSTRE_SERVICES.map((service) => (
            <Link
              key={service.id}
              to={service.path}
              className="group relative aspect-[3/4.2] sm:aspect-[3/4] rounded-tl-[70px] sm:rounded-tl-[90px] rounded-tr-[24px] rounded-b-[24px] overflow-hidden bg-surface-subtle shadow-lustre-sm hover:shadow-lustre-md transition-all duration-500 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={`Explore ${service.title}`}
            >
              {/* Background Image with Zoom-in Feature */}
              <img
                src={service.image}
                alt={service.alt}
                width={600}
                height={800}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: service.objectPosition || 'center' }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none select-none"
              />

              {/* Bottom Frosted Card Overlay */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-4 sm:p-5 rounded-[20px] bg-white/85 dark:bg-surface/90 backdrop-blur-md border border-white/70 shadow-lg text-left transition-transform duration-300 group-hover:-translate-y-1">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-text mb-1 group-hover:text-gold-text transition-colors leading-tight">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-text-muted leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
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
