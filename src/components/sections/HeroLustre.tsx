import React, { useState } from 'react';
import { siteConfig } from '../../data/site';
import { googleSummary } from '../../data/reviews';
import { buildWhatsAppLink } from '../../lib/whatsapp';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { StarIcon } from '../ui/icons';

const HERO_IMAGES = [
  {
    id: 'styling-stations',
    title: 'Styling Sanctuary',
    subtitle: 'Vidal Sassoon Precision',
    src: '/images/real/interior_styling_stations.webp',
    alt: 'Angels Salon & Academy modern styling stations and vanity mirrors in Ghatkopar East',
    badge: 'Flagship Studio',
  },
  {
    id: 'balayage',
    title: 'French Balayage',
    subtitle: 'Dimensional Caramel Tones',
    src: '/images/real/client2_caramel_balayage_after.webp',
    alt: 'Real client dimensional caramel balayage crafted at Angels Salon Mumbai',
    badge: 'Master Colourists',
  },
  {
    id: 'glass-hair',
    title: 'Nanoplastia Shine',
    subtitle: 'Mirror-Glass Smoothing',
    src: '/images/real/client1_glass_hair_after.webp',
    alt: 'Real client mirror-glass hair smoothening and Nanoplastia treatment result',
    badge: 'Signature Treatment',
  },
  {
    id: 'academy-studio',
    title: 'Beauty Academy',
    subtitle: 'Hands-on Model Training',
    src: '/images/real/interior_studio_floor.webp',
    alt: 'Angels Academy spacious salon floor and student training stations in Mumbai',
    badge: 'Certified Diplomas',
  },
];

export const HeroLustre: React.FC = () => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const whatsAppBookingUrl = buildWhatsAppLink({
    message: "Hi Angels Salon & Academy! I would like to schedule an appointment. Could you please share available slots?",
  });

  const activePhoto = HERO_IMAGES[activePhotoIdx];

  return (
    <section
      role="region"
      aria-label="Welcome and Salon Overview"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Top Eyebrow (Lustre Studio clean luxury tracked pill) */}
        <div data-reveal className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 border border-border shadow-lustre-sm">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-gold-text">
              Ghatkopar East, Mumbai · Hair Salon & Academy
            </span>
          </div>
        </div>

        {/* Editorial Headline (Instrument Serif bold luxury) */}
        <div data-reveal className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal text-text leading-[1.08] tracking-tight">
            Crafted for confidence, <br className="hidden sm:inline" />
            <span className="italic font-normal">made to shine.</span>
          </h1>
        </div>

        {/* Refined Subhead */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="text-sm sm:text-base md:text-lg text-text-muted font-normal leading-relaxed">
            A boutique unisex sanctuary for Vidal Sassoon precision haircuts, bespoke French balayage, transformative Nanoplastia treatments, and government-recognized beauty academy diplomas in Pant Nagar.
          </p>
        </div>

        {/* Dual Lustre Action Buttons & Social Proof */}
        <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-16">
          <a
            href={whatsAppBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-dark text-text-inverse hover:bg-gold-text text-xs sm:text-sm uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-md active:scale-95"
          >
            <WhatsAppIcon size={16} className="fill-current text-gold shrink-0" />
            <span>Book Appointment</span>
          </a>

          <a
            href="#services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-surface border border-border hover:border-gold/60 text-text hover:text-gold-text text-xs sm:text-sm uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-sm"
          >
            <span>Explore Services</span>
            <span aria-hidden="true">&darr;</span>
          </a>

          <a
            href={siteConfig.branches[0].googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-surface/60 border border-border/80 text-xs text-text hover:text-gold transition-colors mt-1 sm:mt-0"
          >
            <div className="flex items-center text-gold">
              <StarIcon size={14} className="fill-gold text-gold" />
            </div>
            <span className="font-bold">{googleSummary.rating}★</span>
            <span className="text-text-muted">({googleSummary.count} on Google)</span>
          </a>
        </div>

        {/* Lustre Studio Architectural Arched Visual Centerpiece */}
        <div data-reveal="image" className="relative max-w-3xl mx-auto">
          {/* Main Arched Photo Frame */}
          <div className="relative aspect-[4/5] sm:aspect-[16/11] md:aspect-[16/10] w-full rounded-t-[160px] sm:rounded-t-[240px] md:rounded-t-[280px] rounded-b-[28px] overflow-hidden bg-dark shadow-lustre-lg border-2 border-border/80 group">
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              width={1600}
              height={1000}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Caption Pill inside the Arch */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between p-3 sm:p-4 rounded-full bg-surface/95 backdrop-blur-md border border-border shadow-lustre-md">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-gold" />
                <div>
                  <p className="font-serif text-sm sm:text-base font-bold text-text leading-none mb-0.5">
                    {activePhoto.title}
                  </p>
                  <p className="text-[11px] sm:text-xs text-text-muted leading-none">
                    {activePhoto.subtitle}
                  </p>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-gold/15 text-gold-text">
                {activePhoto.badge}
              </span>
            </div>
          </div>

          {/* Interactive Photo Selection Pills (Below the arch) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 sm:mt-6">
            {HERO_IMAGES.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setActivePhotoIdx(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  idx === activePhotoIdx
                    ? 'bg-dark text-text-inverse shadow-sm'
                    : 'bg-surface/80 border border-border text-text-muted hover:border-gold hover:text-text'
                }`}
              >
                {img.title}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Stats Counter Bar (Lustre Studio minimal divider grid) */}
        <div data-reveal className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-16 sm:pt-20 mt-12 border-t border-border max-w-4xl mx-auto text-center">
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold text-text mb-1">4.7★</p>
            <p className="text-xs uppercase tracking-wider text-text-muted font-medium">Google Rating</p>
            <p className="text-[11px] text-gold-text mt-0.5">636+ Verified Reviews</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold text-text mb-1">10+</p>
            <p className="text-xs uppercase tracking-wider text-text-muted font-medium">Years in Mumbai</p>
            <p className="text-[11px] text-gold-text mt-0.5">Pant Nagar Benchmark</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold text-text mb-1">15k+</p>
            <p className="text-xs uppercase tracking-wider text-text-muted font-medium">Delighted Clients</p>
            <p className="text-[11px] text-gold-text mt-0.5">Hair, Skin & Nails</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold text-text mb-1">500+</p>
            <p className="text-xs uppercase tracking-wider text-text-muted font-medium">Academy Graduates</p>
            <p className="text-[11px] text-gold-text mt-0.5">Certified Professionals</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroLustre;
