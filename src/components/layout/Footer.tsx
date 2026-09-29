import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/site';
import { googleSummary } from '../../data/reviews';
import { buildWhatsAppLink } from '../../lib/whatsapp';
import { LaurelDivider } from '../ui/LaurelDivider';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const flagship = siteConfig.branches[0];

  const whatsAppBookingUrl = buildWhatsAppLink({
    message: "Hi Angels Salon & Academy! I would like to book a luxury styling appointment. Please let me know your available slots.",
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative overflow-hidden bg-gradient-to-b from-[#0f0e0c] via-[#090807] to-[#040404] text-text border-t border-gold/30 pb-20 lg:pb-0"
      aria-label="Footer"
    >
      {/* Background Ambience: Subtle Golden Radiant Glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gold/10 rounded-full blur-[140px]"
        aria-hidden="true"
      />

      {/* Decorative Laurel Ribbon at top */}
      <div className="pt-8 sm:pt-10 flex justify-center">
        <LaurelDivider size="md" />
      </div>

      {/* 1. Pre-Footer VIP Concierge Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pb-16">
        <div
          data-reveal
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface via-surface-elevated/80 to-surface border border-gold/30 shadow-[0_10px_35px_rgba(0,0,0,0.6)] p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10"
        >
          {/* Background Shimmer Flare */}
          <div
            className="pointer-events-none absolute -right-20 -bottom-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl"
            aria-hidden="true"
          />

          {/* Left: Concierge Pitch & Badge */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 z-10">
            <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/50 flex items-center justify-center shrink-0 text-gold shadow-gold-sm">
              <WhatsAppIcon className="w-7 h-7 fill-current" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-[10px] sm:text-xs uppercase tracking-luxury text-gold font-bold">
                  Bespoke VIP Concierge
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-medium tracking-wide">
                  Online Daily
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text tracking-tight">
                Ready for Your Transformation?
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-xl font-light leading-relaxed">
                Connect directly with our master directors for hair consultations, custom bridal packages, or academy diploma enrollment in Ghatkopar East.
              </p>
            </div>
          </div>

          {/* Right: Dual VIP CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 z-10 w-full lg:w-auto">
            <a
              href={whatsAppBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-btn-sweep
              className="min-h-[48px] w-full sm:w-auto px-6 py-3 rounded-full bg-gold text-ink font-bold text-xs uppercase tracking-luxury shadow-gold-md hover:bg-gold-soft transition-all flex items-center justify-center gap-2 group"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
              <span>Book Appointment</span>
              <span className="transition-transform group-hover:translate-x-1 font-mono">→</span>
            </a>

            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="min-h-[48px] w-full sm:w-auto px-5 py-3 rounded-full bg-surface-elevated border border-border text-text hover:text-gold hover:border-gold/50 transition-colors flex items-center justify-center gap-2 text-xs font-semibold"
              aria-label={`Call ${siteConfig.name}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>{siteConfig.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main 4-Column Architectural Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div data-reveal data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12">

          {/* Column 1: Haute Brand Emblem & Trust (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col space-y-5">
            {/* Brand Logo & Wordmark */}
            <Link
              to="/"
              className="flex items-center gap-3.5 group focus:outline-none focus:ring-1 focus:ring-gold rounded-sm w-fit"
              aria-label="Angels Salon & Academy - Back to top"
            >
              <div className="relative w-13 h-13 rounded-full overflow-hidden border-2 border-gold/70 p-0.5 transition-transform duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(201,162,39,0.3)] bg-ink shrink-0">
                <img
                  src={siteConfig.logo.src}
                  alt={siteConfig.logo.alt}
                  width={52}
                  height={52}
                  className="w-13 h-13 object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-luxury text-text transition-colors group-hover:text-gold leading-none mb-1">
                  ANGELS
                </span>
                <span className="text-[10px] uppercase tracking-luxury text-gold font-semibold leading-none">
                  Haute Coiffure & Academy
                </span>
                <span className="text-[9px] uppercase tracking-wider text-text-subtle mt-0.5">
                  Mumbai • Estd. 2014
                </span>
              </div>
            </Link>

            {/* Editorial Brand Blurb */}
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-light max-w-sm">
              Mumbai's premier unisex sanctuary for Vidal Sassoon-trained precision cutting, couture French balayage, and Skeyndor Spain clinical skin rituals.
            </p>

            {/* Verified Google Rating Pill */}
            <a
              href={googleSummary.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-surface-elevated/70 border border-gold/30 hover:border-gold transition-all text-xs w-fit group shadow-sm"
              title="Read verified reviews on Google Business Profile"
            >
              <div className="flex items-center text-[#FFB800] text-xs">
                <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gold/50">★</span>
              </div>
              <span className="font-bold text-text group-hover:text-gold transition-colors">
                {googleSummary.rating} on Google
              </span>
              <span className="text-text-subtle text-[11px]">
                ({googleSummary.count} Verified Reviews)
              </span>
              <span className="text-gold text-[10px] transition-transform group-hover:translate-x-0.5">↗</span>
            </a>

            {/* Social Icons (Minimum 44x44px touch targets) */}
            <div className="flex items-center gap-3 pt-1">
              {siteConfig.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="w-11 h-11 rounded-full bg-surface border border-border/80 flex items-center justify-center text-text-muted hover:text-gold hover:border-gold hover:bg-gold/10 hover:scale-105 transition-all focus:outline-none focus:ring-1 focus:ring-gold shrink-0 shadow-sm"
                >
                  {social.platform === 'instagram' && (
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  )}
                  {social.platform === 'facebook' && (
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  )}
                  {social.platform === 'whatsapp' && (
                    <WhatsAppIcon className="w-5 h-5 fill-current" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Haute Rituals (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col space-y-3.5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-luxury text-gold block mb-1">
                Menu Directory
              </span>
              <h3 className="font-serif text-lg font-bold text-text tracking-wide border-b border-border/70 pb-2 inline-block">
                Salon Rituals
              </h3>
            </div>

            <ul className="space-y-1 text-xs sm:text-sm text-text-muted">
              <li>
                <Link
                  to="/services/french-balayage-colour"
                  data-link-draw
                  className="min-h-[44px] flex items-center gap-2 hover:text-gold transition-colors py-1.5"
                >
                  <span className="text-gold text-xs">›</span> French Balayage & Colour
                </Link>
              </li>
              <li>
                <Link
                  to="/services/hair-styling-treatments"
                  data-link-draw
                  className="min-h-[44px] flex items-center gap-2 hover:text-gold transition-colors py-1.5"
                >
                  <span className="text-gold text-xs">›</span> Hair Architecture & Botox
                </Link>
              </li>
              <li>
                <Link
                  to="/services/bridal-makeup-couture"
                  data-link-draw
                  className="min-h-[44px] flex items-center gap-2 hover:text-gold transition-colors py-1.5"
                >
                  <span className="text-gold text-xs">›</span> Royal Bridal Couture
                </Link>
              </li>
              <li>
                <Link
                  to="/services/aesthetic-skincare-facials"
                  data-link-draw
                  className="min-h-[44px] flex items-center gap-2 hover:text-gold transition-colors py-1.5"
                >
                  <span className="text-gold text-xs">›</span> Skeyndor Clinical Facials
                </Link>
              </li>
              <li>
                <Link
                  to="/services/hand-feet-nail-couture"
                  data-link-draw
                  className="min-h-[44px] flex items-center gap-2 hover:text-gold transition-colors py-1.5"
                >
                  <span className="text-gold text-xs">›</span> Nail Architecture & Art
                </Link>
              </li>
              <li className="pt-2 border-t border-border/40">
                <Link
                  to="/services"
                  className="min-h-[44px] flex items-center gap-1.5 text-gold font-bold hover:text-gold-soft transition-colors py-1 text-xs uppercase tracking-wider"
                >
                  <span>Explore All Pricing</span>
                  <span className="font-mono">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academy & Discovery (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col space-y-3.5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-luxury text-gold block mb-1">
                Education & Portfolio
              </span>
              <h3 className="font-serif text-lg font-bold text-text tracking-wide border-b border-border/70 pb-2 inline-block">
                Academy & Studio
              </h3>
            </div>

            <ul className="space-y-1 text-xs sm:text-sm text-text-muted">
              <li>
                <Link
                  to="/academy/master-hairdressing-diploma"
                  data-link-draw
                  className="min-h-[44px] flex items-center gap-2 hover:text-gold transition-colors py-1.5"
                >
                  <span className="text-gold text-xs">›</span> Hairdressing Master Diploma
                </Link>
              </li>
              <li>
                <Link
                  to="/academy/bridal-makeup-artistry"
                  data-link-draw
                  className="min-h-[44px] flex items-center gap-2 hover:text-gold transition-colors py-1.5"
                >
                  <span className="text-gold text-xs">›</span> Bridal Makeup Artistry
                </Link>
              </li>
              <li>
                <Link
                  to="/style-gallery"
                  data-link-draw
                  className="min-h-[44px] flex items-center gap-2 hover:text-gold transition-colors py-1.5"
                >
                  <span className="text-gold text-xs">›</span> Style Gallery & Portfolios
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  data-link-draw
                  className="min-h-[44px] flex items-center gap-2 hover:text-gold transition-colors py-1.5"
                >
                  <span className="text-gold text-xs">›</span> Client Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  data-link-draw
                  className="min-h-[44px] flex items-center gap-2 hover:text-gold transition-colors py-1.5"
                >
                  <span className="text-gold text-xs">›</span> Salon Retail Boutique
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  data-link-draw
                  className="min-h-[44px] flex items-center gap-2 hover:text-gold transition-colors py-1.5"
                >
                  <span className="text-gold text-xs">›</span> Founder Story & Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Flagship Sanctuary & Hours (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-luxury text-gold block mb-1">
                Visit Our Studio
              </span>
              <h3 className="font-serif text-lg font-bold text-text tracking-wide border-b border-border/70 pb-2 inline-block">
                Flagship Sanctuary
              </h3>
            </div>

            {/* Architectural Location Card */}
            <div className="rounded-xl bg-surface/80 border border-gold/30 p-4 sm:p-5 shadow-card-dark space-y-3.5 relative overflow-hidden group hover:border-gold/60 transition-colors">
              {/* Active Open Status Pill */}
              <div className="flex items-center justify-between pb-2.5 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-bold text-text uppercase tracking-wider">
                    Open Daily
                  </span>
                </div>
                <span className="text-[11px] text-gold font-medium">
                  9:30 AM – 9:00 PM
                </span>
              </div>

              {/* Exact Address */}
              <div className="space-y-1 text-xs text-text-muted leading-relaxed">
                <p className="font-serif text-sm font-bold text-text">
                  Angels Salon & Academy
                </p>
                <address className="not-italic">
                  29/843, Shival Nagar, Pant Nagar,<br />
                  Ghatkopar East, Mumbai 400075
                </address>
                <p className="text-[11px] text-text-subtle font-light">
                  (Beside Kirti Computer Institute)
                </p>
              </div>

              {/* 1-Tap Google Maps Button with Gold Sweep */}
              <a
                href={flagship.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-btn-sweep
                className="min-h-[44px] w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-gold/15 border border-gold/40 text-gold hover:bg-gold hover:text-ink font-bold text-xs uppercase tracking-luxury transition-all shadow-sm group/btn"
              >
                <span>Get Directions (Maps)</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-x-1">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>

              {/* Quick Communication Links */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/60">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="min-h-[40px] flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-sm bg-surface-elevated border border-border text-gold hover:text-gold-soft hover:border-gold/40 transition-colors text-xs font-semibold"
                  title="Call Salon Direct"
                >
                  <span>📞 Call</span>
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="min-h-[40px] flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-sm bg-surface-elevated border border-border text-text-muted hover:text-gold hover:border-gold/40 transition-colors text-xs truncate"
                  title="Send Email"
                >
                  <span>✉️ Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar: Divider, Copyright & Legal Navigation */}
        <div className="mt-12 pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4 text-center sm:text-left">
          <p className="font-light">
            &copy; {currentYear} <strong className="text-text font-medium">{siteConfig.name}</strong>. All Rights Reserved. Crafted for Haute Coiffure & Bespoke Beauty.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <Link
              to="/contact"
              className="min-h-[44px] inline-flex items-center px-1.5 text-text-muted hover:text-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-border">•</span>
            <Link
              to="/contact"
              className="min-h-[44px] inline-flex items-center px-1.5 text-text-muted hover:text-gold transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-border">•</span>
            <Link
              to="/academy"
              className="min-h-[44px] inline-flex items-center px-1.5 text-text-muted hover:text-gold transition-colors"
            >
              Academy Admissions
            </Link>
            <span className="text-border">•</span>
            {/* Smooth Scroll to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top of page"
              className="min-h-[44px] inline-flex items-center gap-1 text-gold hover:text-gold-soft transition-colors font-medium px-2"
            >
              <span>Back to Top</span>
              <span className="font-mono text-sm">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
