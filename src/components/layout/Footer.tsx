import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/site';
import { googleSummary } from '../../data/reviews';
import { LaurelDivider } from '../ui/LaurelDivider';
import {
  WhatsAppIcon,
  PhoneIcon,
  MailIcon,
  DirectionsIcon,
  InstagramIcon,
  FacebookIcon,
  StarIcon,
  ArrowRightIcon,
} from '../ui/icons';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const flagship = siteConfig.branches[0];

  const whatsAppBookingUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hi Angels Salon & Academy! I would like to book an appointment. Could you please share available slots?"
  )}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative overflow-x-clip bg-dark text-text-inverse border-t border-gold-line pb-20 lg:pb-0"
      aria-label="Footer"
    >
      <div className="pt-8 sm:pt-12 flex justify-center">
        <LaurelDivider size="md" />
      </div>

      {/* Pre-Footer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-8 sm:pb-14">
        <div data-reveal className="relative overflow-hidden rounded-[4px] bg-dark-surface border border-gold/40 hover:border-gold/60 transition-colors shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          
          <div className="flex items-center gap-4 sm:gap-5 w-full lg:w-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-dark border border-gold-line flex items-center justify-center shrink-0 text-gold shadow-sm">
              <WhatsAppIcon size={26} className="text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] uppercase tracking-wider text-gold font-semibold">Salon Concierge</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-[12px] text-text-inverse-muted font-normal">Available Daily</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-text-inverse tracking-tight leading-tight">
                Ready for Your Transformation?
              </h2>
              <p className="hidden sm:block text-sm text-text-inverse-muted mt-1 max-w-xl font-normal leading-relaxed">
                Connect directly with our team for appointments, styling consultations, or academy diploma enrollment.
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            <a
              href={whatsAppBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] flex-1 sm:flex-none sm:w-auto px-6 py-3 rounded-[4px] bg-gold text-text font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-gold-soft transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <WhatsAppIcon size={16} />
              <span>Book Now</span>
              <ArrowRightIcon size={14} />
            </a>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="min-h-[48px] flex-1 sm:flex-none sm:w-auto px-5 py-3 rounded-[4px] bg-ink border border-gold/30 text-text hover:text-gold hover:border-gold transition-colors flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={`Call ${siteConfig.name}`}
            >
              <PhoneIcon size={16} className="text-gold shrink-0" />
              <span>Call</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-14">
        <div data-reveal data-reveal-stagger className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-[4px] w-fit"
            >
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gold-line p-0.5 transition-transform duration-300 group-hover:scale-105 bg-ink shrink-0">
                <img
                  src={siteConfig.logo.src}
                  alt={siteConfig.logo.alt}
                  width={44}
                  height={44}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-wider text-text transition-colors group-hover:text-gold leading-none mb-1">
                  ANGELS
                </span>
                <span className="text-[12px] uppercase tracking-wider text-gold font-semibold leading-none">
                  Salon & Academy
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted leading-relaxed font-normal max-w-sm">
              Ghatkopar East's premier unisex destination for precision haircuts, bespoke hair colour, smoothening treatments, and certified academy education.
            </p>

            {/* Google Rating Badge */}
            <a
              href={googleSummary.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[4px] bg-raised border border-gold/30 hover:border-gold transition-all text-xs w-fit group shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold min-h-[44px]"
            >
              <div className="flex items-center text-gold text-xs">
                <StarIcon size={14} className="fill-gold text-gold" />
              </div>
              <span className="font-bold text-text group-hover:text-gold transition-colors">
                {googleSummary.rating} on Google
              </span>
              <span className="text-muted text-[12px]">({googleSummary.count} reviews)</span>
              <span className="text-gold text-[12px]">↗</span>
            </a>

            {/* Social Links (White icons with gold hover/focus) */}
            <div className="flex items-center gap-2.5 pt-2">
              {siteConfig.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="w-11 h-11 rounded-full bg-raised border border-gold/30 flex items-center justify-center text-text hover:text-gold hover:border-gold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold shrink-0"
                >
                  {social.platform === 'instagram' && <InstagramIcon size={18} />}
                  {social.platform === 'facebook' && <FacebookIcon size={18} />}
                  {social.platform === 'whatsapp' && <WhatsAppIcon size={18} />}
                </a>
              ))}
            </div>
          </div>

          {/* Links: 2 Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-x-4 gap-y-0 lg:gap-x-8">

            {/* Column 1: Salon Rituals */}
            <div className="flex flex-col">
              <div className="mb-3">
                <span className="text-[12px] font-bold uppercase tracking-wider text-gold block">Directory</span>
                <span className="font-serif text-base font-bold text-text border-b border-gold/25 pb-1 block">Salon Services</span>
              </div>
              <ul className="space-y-1 text-sm text-muted">
                {[
                  { to: '/services/womens-haircut-and-style', label: 'Haircut & Styling' },
                  { to: '/services/womens-hair-colour', label: 'French Balayage' },
                  { to: '/services/hair-treatments', label: 'Hair Treatments' },
                  { to: '/services/skin-care', label: 'Clinical Facials' },
                  { to: '/services/nails', label: 'Nail Extensions' },
                ].map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="min-h-[44px] flex items-center gap-1.5 hover:text-gold transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                    >
                      <span className="text-gold text-xs shrink-0">›</span>
                      <span className="line-clamp-1">{item.label}</span>
                    </Link>
                  </li>
                ))}
                <li className="pt-2 border-t border-gold/25 mt-1">
                  <Link
                    to="/services"
                    className="min-h-[44px] flex items-center gap-1 text-gold font-bold hover:text-gold-soft transition-colors py-1 text-xs uppercase tracking-wider focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    All Services & Pricing →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Academy & Information */}
            <div className="flex flex-col">
              <div className="mb-3">
                <span className="text-[12px] font-bold uppercase tracking-wider text-gold block">Masterclasses</span>
                <span className="font-serif text-base font-bold text-text border-b border-gold/25 pb-1 block">Academy</span>
              </div>
              <ul className="space-y-1 text-sm text-muted">
                {[
                  { to: '/academy/hair-courses', label: 'Hair Courses' },
                  { to: '/academy/makeup-courses', label: 'Makeup Courses' },
                  { to: '/style-gallery', label: 'Style Gallery' },
                  { to: '/testimonials', label: 'Testimonials' },
                  { to: '/about', label: 'About Angels' },
                ].map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="min-h-[44px] flex items-center gap-1.5 hover:text-gold transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                    >
                      <span className="text-gold text-xs shrink-0">›</span>
                      <span className="line-clamp-1">{item.label}</span>
                    </Link>
                  </li>
                ))}
                <li className="pt-2 border-t border-gold/25 mt-1">
                  <Link
                    to="/academy"
                    className="min-h-[44px] flex items-center gap-1 text-gold font-bold hover:text-gold-soft transition-colors py-1 text-xs uppercase tracking-wider focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    Academy Information →
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Location Column */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-gold block">Flagship Studio</span>
              <span className="font-serif text-base font-bold text-text">Visit Angels</span>
            </div>

            <div className="rounded-[4px] bg-raised border border-gold/30 p-4 space-y-3 hover:border-gold transition-colors">
              <div className="flex items-center justify-between pb-2 border-b border-gold/25">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-[12px] font-bold text-text uppercase tracking-wider">Open Daily</span>
                </div>
                <span className="text-[12px] text-gold font-medium">9:30 AM – 9:00 PM</span>
              </div>

              {/* Tappable directions address */}
              <div className="space-y-1 text-xs leading-relaxed">
                <p className="font-serif text-sm font-bold text-text">Angels Salon &amp; Academy</p>
                <a
                  href={flagship.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted hover:text-gold transition-colors text-[12px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  29/843, Shival Nagar, Pant Nagar,<br />
                  Ghatkopar East, Mumbai 400075
                </a>
                <p className="text-[12px] text-muted">(Beside Kirti Computer Institute)</p>
              </div>

              {/* Get Directions Link Button */}
              <a
                href={flagship.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] w-full flex items-center justify-center gap-2 px-3 py-2 rounded-[4px] bg-ink border border-gold-line text-gold hover:bg-gold hover:text-text font-bold text-xs uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              >
                <span>Get Directions</span>
                <DirectionsIcon size={14} />
              </a>

              {/* Phone & Email 48px rows on mobile */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gold/25">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="min-h-[48px] flex items-center justify-center gap-1.5 px-2 py-2 rounded-[4px] bg-ink border border-gold/30 text-gold hover:border-gold transition-colors text-xs font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <PhoneIcon size={14} />
                  <span>Call</span>
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="min-h-[48px] flex items-center justify-center gap-1.5 px-2 py-2 rounded-[4px] bg-ink border border-gold/30 text-muted hover:text-gold hover:border-gold transition-colors text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <MailIcon size={14} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer-bar Strip for Copyright */}
        <div className="mt-10 sm:mt-14 pt-4 sm:pt-6 border-t border-gold/25 flex flex-col sm:flex-row items-center justify-between text-xs text-text-inverse-muted gap-3 text-center sm:text-left">
          <p className="font-normal text-[12px]">
            &copy; {CURRENT_YEAR} <strong className="text-text-inverse font-medium">{siteConfig.name}</strong>. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <Link
              to="/privacy"
              className="min-h-[44px] inline-flex items-center px-2 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              Privacy Policy
            </Link>
            <span className="text-gold/40">•</span>
            <Link
              to="/terms"
              className="min-h-[44px] inline-flex items-center px-2 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-gold/40">•</span>
            <Link
              to="/academy"
              className="min-h-[44px] inline-flex items-center px-2 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              Academy
            </Link>
            <span className="text-gold/40">•</span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="min-h-[44px] inline-flex items-center gap-1 text-gold hover:text-gold-soft transition-colors font-medium px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              <span>Top</span>
              <span className="font-mono">↑</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
