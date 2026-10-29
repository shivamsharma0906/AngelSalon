import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/site';
import { googleSummary } from '../../data/reviews';
import {
  WhatsAppIcon,
  PhoneIcon,
  MailIcon,
  DirectionsIcon,
  InstagramIcon,
  FacebookIcon,
  StarIcon,
} from '../ui/icons';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const flagship = siteConfig.branches[0];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative overflow-x-clip bg-dark text-text-inverse border-t border-border/25 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] lg:pb-0"
      aria-label="Footer"
    >
      {/* Main 4-Column Directory Grid (Lustre Studio Rhythm: 4 desktop, 2 tablet, 1 mobile) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 pt-12 sm:pt-16">
        <div data-reveal data-reveal-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 xl:gap-10">

          {/* Column 1: Brand Block */}
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-full w-fit"
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-gold/60 p-0.5 transition-transform duration-300 group-hover:scale-105 bg-dark-surface shadow-sm shrink-0">
                <img
                  src={siteConfig.logo.src}
                  alt={siteConfig.logo.alt}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-serif text-2xl font-bold tracking-wider text-text-inverse transition-colors group-hover:text-gold leading-none mb-1">
                  ANGEL
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold leading-none">
                  Salon & Academy
                </span>
                <span className="text-[11px] text-text-inverse-muted mt-1 leading-none">
                  Ghatkopar East · Mumbai
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-text-inverse-muted leading-relaxed font-normal">
              Ghatkopar East&apos;s premier unisex destination for precision haircuts, bespoke hair colour, smoothening treatments, and certified academy education.
            </p>

            {/* Google Rating Pill */}
            <a
              href={googleSummary.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Angel Salon rated ${googleSummary.rating} out of 5 stars on Google from ${googleSummary.count} verified reviews`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-surface border border-gold/30 hover:border-gold transition-all text-xs w-fit group shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              <div className="flex items-center text-gold text-xs">
                <StarIcon size={13} className="fill-gold text-gold" />
              </div>
              <span className="font-bold text-text-inverse group-hover:text-gold transition-colors">
                {googleSummary.rating} on Google
              </span>
              <span className="text-text-inverse-muted text-[11px]">({googleSummary.count} reviews)</span>
              <span className="text-gold text-[12px] leading-none select-none" aria-hidden="true">↗</span>
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              {siteConfig.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="w-9 h-9 rounded-full bg-dark-surface border border-gold/30 flex items-center justify-center text-text-inverse hover:text-gold hover:border-gold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold shrink-0"
                >
                  {social.platform === 'instagram' && <InstagramIcon size={16} />}
                  {social.platform === 'facebook' && <FacebookIcon size={16} />}
                  {social.platform === 'whatsapp' && <WhatsAppIcon size={16} />}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Salon Services ("Explore") */}
          <nav aria-label="Salon services footer navigation" className="flex flex-col">
            <div className="mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gold block">
                Directory
              </span>
              <span className="font-serif text-base font-bold text-text-inverse border-b border-border/30 pb-1 block">
                Salon Services
              </span>
            </div>
            <ul className="space-y-1 text-xs text-text-inverse-muted">
              {[
                { to: '/services/womens-haircut-and-style', label: "Women's Haircut & Styling" },
                { to: '/services/womens-hair-colour', label: 'French Balayage' },
                { to: '/services/hair-treatments', label: 'Hair Treatments' },
                { to: '/services/skin-care', label: 'Clinical Facials' },
                { to: '/services/nails', label: 'Nail Extensions' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="min-h-[38px] flex items-center gap-1.5 hover:text-gold transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    <span className="text-gold text-xs shrink-0 select-none">›</span>
                    <span className="line-clamp-1">{item.label}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-border/30 mt-1">
                <Link
                  to="/services"
                  className="min-h-[38px] flex items-center gap-1 text-gold font-bold hover:text-gold-soft transition-colors py-1 text-xs uppercase tracking-wider focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <span>All Services & Pricing</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 3: Academy ("Masterclasses") */}
          <nav aria-label="Academy footer navigation" className="flex flex-col">
            <div className="mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gold block">
                Masterclasses
              </span>
              <span className="font-serif text-base font-bold text-text-inverse border-b border-border/30 pb-1 block">
                Academy
              </span>
            </div>
            <ul className="space-y-1 text-xs text-text-inverse-muted">
              {[
                { to: '/academy/hair-courses', label: 'Professional Hair Courses' },
                { to: '/academy/makeup-courses', label: 'Makeup Artistry Courses' },
                { to: '/testimonials', label: 'Client Testimonials' },
                { to: '/about', label: 'The Angel Story' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="min-h-[38px] flex items-center gap-1.5 hover:text-gold transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    <span className="text-gold text-xs shrink-0 select-none">›</span>
                    <span className="line-clamp-1">{item.label}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-border/30 mt-1">
                <Link
                  to="/academy"
                  className="min-h-[38px] flex items-center gap-1 text-gold font-bold hover:text-gold-soft transition-colors py-1 text-xs uppercase tracking-wider focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <span>Academy Information</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 4: Visit & Hours ("Studio Flagship") */}
          <div className="flex flex-col space-y-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gold block">
                Studio Flagship
              </span>
              <span className="font-serif text-base font-bold text-text-inverse">
                Visit & Hours
              </span>
            </div>

            <div className="rounded-[20px] bg-dark-surface border border-gold/30 p-4 space-y-3 hover:border-gold transition-colors">
              <div className="flex items-center justify-between pb-2 border-b border-border/30">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
                  <span className="text-[11px] font-bold text-text-inverse uppercase tracking-wider">
                    Open Daily
                  </span>
                </div>
                <span className="text-[11px] text-gold font-medium">9:30 AM – 9:00 PM</span>
              </div>

              <div className="space-y-1 text-xs leading-relaxed">
                <p className="font-serif text-sm font-bold text-text-inverse">Angel Salon & Academy</p>
                <a
                  href={flagship.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-text-inverse-muted hover:text-gold transition-colors text-[11px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  29/843, Shival Nagar, Pant Nagar,<br />
                  Ghatkopar East, Mumbai 400075
                </a>
              </div>

              {/* Get Directions Link Button */}
              <a
                href={flagship.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[40px] w-full flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-gold text-dark font-bold text-xs uppercase tracking-wider hover:bg-gold-soft transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold shadow-sm"
              >
                <span>Get Directions</span>
                <DirectionsIcon size={13} />
              </a>

              {/* Phone & Email */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/30">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="min-h-[40px] flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-full bg-dark border border-gold/30 text-gold hover:border-gold transition-colors text-xs font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <PhoneIcon size={13} />
                  <span>Call</span>
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="min-h-[40px] flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-full bg-dark border border-gold/30 text-text-inverse-muted hover:text-gold hover:border-gold transition-colors text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <MailIcon size={13} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Large Brand Wordmark (Lustre Studio signature element) */}
      <div
        className="w-full overflow-hidden select-none pointer-events-none pt-2 sm:pt-6 pb-2 sm:pb-4 flex justify-center items-center"
        aria-hidden="true"
      >
        <span className="font-serif text-[17vw] sm:text-[14vw] lg:text-[130px] xl:text-[155px] font-normal tracking-[0.06em] leading-none text-text-inverse/[0.06] uppercase text-center block">
          ANGEL
        </span>
      </div>

      {/* 4. Bottom Bar Strip */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border/25 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-text-inverse-muted gap-3 text-center sm:text-left">
        <p className="font-normal text-[11px] sm:text-xs">
          © {CURRENT_YEAR} <strong className="text-text-inverse font-medium">{siteConfig.name}</strong>. All Rights Reserved.
        </p>
        <nav
          aria-label="Footer legal and utility navigation"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs"
        >
          <Link
            to="/privacy"
            className="hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold py-1"
          >
            Privacy Policy
          </Link>
          <span className="text-gold/40" aria-hidden="true">•</span>
          <Link
            to="/terms"
            className="hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold py-1"
          >
            Terms & Conditions
          </Link>
          <span className="text-gold/40" aria-hidden="true">•</span>
          <Link
            to="/academy"
            className="hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold py-1"
          >
            Academy
          </Link>
          <span className="text-gold/40" aria-hidden="true">•</span>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="inline-flex items-center gap-1 text-gold hover:text-gold-soft transition-colors font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold py-1 min-h-[36px]"
          >
            <span>Top ↑</span>
          </button>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
