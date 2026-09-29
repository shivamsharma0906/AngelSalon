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
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gold/10 rounded-full blur-[140px]" aria-hidden="true" />

      <div className="pt-6 sm:pt-10 flex justify-center">
        <LaurelDivider size="md" />
      </div>

      {/* Pre-Footer Banner — compact on mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-8 sm:pb-16">
        <div data-reveal className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-surface via-surface-elevated/80 to-surface border border-gold/30 shadow-[0_10px_35px_rgba(0,0,0,0.6)] p-4 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-10">
          <div className="pointer-events-none absolute -right-20 -bottom-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl" aria-hidden="true" />

          <div className="flex items-center gap-3 sm:gap-5 z-10 w-full lg:w-auto">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gold/15 border border-gold/50 flex items-center justify-center shrink-0 text-gold shadow-gold-sm">
              <WhatsAppIcon className="w-5 h-5 sm:w-7 sm:h-7 fill-current" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] uppercase tracking-luxury text-gold font-bold">VIP Concierge</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-medium">Online Daily</span>
              </div>
              <h2 className="font-serif text-lg sm:text-3xl font-bold text-text tracking-tight leading-tight">
                Ready for Your Transformation?
              </h2>
              <p className="hidden sm:block text-sm text-text-muted mt-1 max-w-xl font-light leading-relaxed">
                Connect directly with our master directors for hair consultations, custom bridal packages, or academy diploma enrollment.
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-2 sm:gap-3 shrink-0 z-10 w-full lg:w-auto">
            <a href={whatsAppBookingUrl} target="_blank" rel="noopener noreferrer" data-btn-sweep
              className="min-h-[44px] flex-1 sm:flex-none sm:w-auto px-5 py-2.5 rounded-full bg-gold text-ink font-bold text-xs uppercase tracking-luxury shadow-gold-md hover:bg-gold-soft transition-all flex items-center justify-center gap-2 group">
              <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
              <span>Book Now</span>
              <span className="transition-transform group-hover:translate-x-1 font-mono">→</span>
            </a>
            <a href={`tel:${siteConfig.contact.phoneRaw}`}
              className="min-h-[44px] flex-1 sm:flex-none sm:w-auto px-4 py-2.5 rounded-full bg-surface-elevated border border-border text-text hover:text-gold hover:border-gold/50 transition-colors flex items-center justify-center gap-2 text-xs font-semibold"
              aria-label={`Call ${siteConfig.name}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-gold shrink-0">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>Call</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-16">
        <div data-reveal data-reveal-stagger className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-gold rounded-sm w-fit" aria-label="Angels Salon & Academy">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold/70 p-0.5 transition-transform duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(201,162,39,0.3)] bg-ink shrink-0">
                <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} width={48} height={48} className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-luxury text-text transition-colors group-hover:text-gold leading-none mb-1">ANGELS</span>
                <span className="text-[10px] uppercase tracking-luxury text-gold font-semibold leading-none">Haute Coiffure &amp; Academy</span>
                <span className="text-[9px] uppercase tracking-wider text-text-subtle mt-0.5">Mumbai • Estd. 2014</span>
              </div>
            </Link>

            <p className="text-xs text-text-muted leading-relaxed font-light max-w-sm">
              Mumbai's premier unisex sanctuary for Vidal Sassoon-trained precision cutting, couture French balayage, and Skeyndor Spain clinical skin rituals.
            </p>

            <a href={googleSummary.reviewsUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-elevated/70 border border-gold/30 hover:border-gold transition-all text-xs w-fit group shadow-sm">
              <div className="flex items-center text-[#FFB800] text-xs">
                <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gold/50">★</span>
              </div>
              <span className="font-bold text-text group-hover:text-gold transition-colors">{googleSummary.rating} on Google</span>
              <span className="text-text-subtle text-[11px] hidden sm:inline">({googleSummary.count} Reviews)</span>
              <span className="text-gold text-[10px]">↗</span>
            </a>

            <div className="flex items-center gap-2.5 pt-1">
              {siteConfig.socialLinks.map((social) => (
                <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.ariaLabel}
                  className="w-10 h-10 rounded-full bg-surface border border-border/80 flex items-center justify-center text-text-muted hover:text-gold hover:border-gold hover:bg-gold/10 hover:scale-105 transition-all focus:outline-none focus:ring-1 focus:ring-gold shrink-0">
                  {social.platform === 'instagram' && (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  )}
                  {social.platform === 'facebook' && (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  )}
                  {social.platform === 'whatsapp' && <WhatsAppIcon className="w-4 h-4 fill-current" />}
                </a>
              ))}
            </div>
          </div>

          {/* Links — 2-col compact grid on mobile */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-x-4 gap-y-0 lg:gap-x-6">

            {/* Salon Rituals */}
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="text-[9px] font-bold uppercase tracking-luxury text-gold block">Menu Directory</span>
                <span className="font-serif text-sm sm:text-base font-bold text-text border-b border-border/70 pb-1 block">Salon Rituals</span>
              </div>
              <ul className="space-y-0 text-xs text-text-muted">
                {[
                  { to: '/services/womens-hair-colour', label: 'French Balayage' },
                  { to: '/services/hair-treatments', label: 'Hair & Botox' },
                  { to: '/services/bridal-makeup', label: 'Bridal Couture' },
                  { to: '/services/skin-care', label: 'Clinical Facials' },
                  { to: '/services/nails', label: 'Nail Art' },
                ].map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="min-h-[36px] flex items-center gap-1.5 hover:text-gold transition-colors py-0.5 leading-tight">
                      <span className="text-gold text-[10px] shrink-0">›</span>
                      <span className="line-clamp-1">{item.label}</span>
                    </Link>
                  </li>
                ))}
                <li className="pt-1 border-t border-border/40 mt-0.5">
                  <Link to="/services" className="min-h-[36px] flex items-center gap-1 text-gold font-bold hover:text-gold-soft transition-colors py-0.5 text-[10px] uppercase tracking-wider">
                    All Pricing →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Academy */}
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="text-[9px] font-bold uppercase tracking-luxury text-gold block">Education</span>
                <span className="font-serif text-sm sm:text-base font-bold text-text border-b border-border/70 pb-1 block">Academy &amp; Studio</span>
              </div>
              <ul className="space-y-0 text-xs text-text-muted">
                {[
                  { to: '/academy/hair-courses', label: 'Hair Diploma' },
                  { to: '/academy/makeup-courses', label: 'Makeup Artistry' },
                  { to: '/style-gallery', label: 'Style Gallery' },
                  { to: '/testimonials', label: 'Testimonials' },
                  { to: '/about', label: 'Founder Story' },
                ].map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="min-h-[36px] flex items-center gap-1.5 hover:text-gold transition-colors py-0.5 leading-tight">
                      <span className="text-gold text-[10px] shrink-0">›</span>
                      <span className="line-clamp-1">{item.label}</span>
                    </Link>
                  </li>
                ))}
                <li className="pt-1 border-t border-border/40 mt-0.5">
                  <Link to="/academy" className="min-h-[36px] flex items-center gap-1 text-gold font-bold hover:text-gold-soft transition-colors py-0.5 text-[10px] uppercase tracking-wider">
                    Academy Info →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Location Column */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-luxury text-gold block">Visit Our Studio</span>
              <span className="font-serif text-sm sm:text-base font-bold text-text">Flagship Sanctuary</span>
            </div>

            <div className="rounded-xl bg-surface/80 border border-gold/30 p-3 sm:p-4 shadow-card-dark space-y-2.5 hover:border-gold/60 transition-colors">
              <div className="flex items-center justify-between pb-2 border-b border-border/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-text uppercase tracking-wider">Open Daily</span>
                </div>
                <span className="text-[10px] text-gold font-medium">9:30 AM – 9:00 PM</span>
              </div>

              <div className="space-y-0.5 text-xs text-text-muted leading-relaxed">
                <p className="font-serif text-sm font-bold text-text">Angels Salon &amp; Academy</p>
                <address className="not-italic text-[11px]">
                  29/843, Shival Nagar, Pant Nagar,<br />
                  Ghatkopar East, Mumbai 400075
                </address>
                <p className="text-[10px] text-text-subtle">(Beside Kirti Computer Institute)</p>
              </div>

              <a href={flagship.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                className="min-h-[40px] w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gold/15 border border-gold/40 text-gold hover:bg-gold hover:text-ink font-bold text-xs uppercase tracking-luxury transition-all shadow-sm">
                <span>Get Directions</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/60">
                <a href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="min-h-[36px] flex items-center justify-center gap-1 px-2 py-1.5 rounded-md bg-surface-elevated border border-border text-gold hover:border-gold/40 transition-colors text-xs font-semibold">
                  📞 Call
                </a>
                <a href={`mailto:${siteConfig.contact.email}`}
                  className="min-h-[36px] flex items-center justify-center gap-1 px-2 py-1.5 rounded-md bg-surface-elevated border border-border text-text-muted hover:text-gold hover:border-gold/40 transition-colors text-xs">
                  ✉️ Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-3 text-center sm:text-left">
          <p className="font-light text-[11px]">
            &copy; {currentYear} <strong className="text-text font-medium">{siteConfig.name}</strong>. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <Link to="/contact" className="min-h-[36px] inline-flex items-center px-1.5 hover:text-gold transition-colors">Privacy</Link>
            <span className="text-border">•</span>
            <Link to="/contact" className="min-h-[36px] inline-flex items-center px-1.5 hover:text-gold transition-colors">Terms</Link>
            <span className="text-border">•</span>
            <Link to="/academy" className="min-h-[36px] inline-flex items-center px-1.5 hover:text-gold transition-colors">Academy</Link>
            <span className="text-border">•</span>
            <button type="button" onClick={scrollToTop} aria-label="Scroll back to top"
              className="min-h-[36px] inline-flex items-center gap-1 text-gold hover:text-gold-soft transition-colors font-medium px-1.5">
              Top <span className="font-mono">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
