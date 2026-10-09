import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/site';
import { navigationData } from '../../data/nav';
import { buildWhatsAppLink } from '../../lib/whatsapp';
import { Button } from '../ui/Button';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { NavDropdown } from './NavDropdown';
import { MobileDrawer } from './MobileDrawer';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsAppBookingUrl = buildWhatsAppLink({
    message: "Hi Angels Salon & Academy! I would like to book an appointment. Could you please share available slots?",
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-safe bg-surface/95 backdrop-blur-md border-b border-border/60 ${
          isScrolled
            ? 'py-2 sm:py-3 shadow-card-light'
            : 'py-2.5 sm:py-3.5 shadow-sm'
        }`}
      >
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo & Brand Name */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-1 focus:ring-gold rounded-sm shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-gold/60 p-0.5 transition-transform duration-300 group-hover:scale-105 shadow-gold-sm bg-surface shrink-0">
              <img
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={siteConfig.logo.width}
                height={siteConfig.logo.height}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm sm:text-lg font-bold tracking-luxury text-text transition-colors group-hover:text-gold leading-none mb-0.5 sm:mb-1">
                ANGELS
              </span>
              <span className="text-[8.5px] sm:text-[10px] uppercase tracking-luxury text-gold font-medium leading-none">
                Salon & Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Balanced Spacing */}
          <nav
            className="hidden xl:flex items-center space-x-1 xl:space-x-1.5 2xl:space-x-2"
            aria-label="Main Navigation"
          >
            {navigationData.map((item) => (
              <NavDropdown key={item.path} item={item} />
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Direct Call Badge (Wide Desktop) */}
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="hidden 2xl:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text hover:text-gold-text transition-colors py-1.5 px-3 rounded-full border border-border/80 hover:border-gold/40 bg-surface min-h-[44px]"
              aria-label={`Call ${siteConfig.name}`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>{siteConfig.contact.phoneDisplay}</span>
            </a>

            {/* Subtle Divider (Desktop) */}
            <div className="hidden 2xl:block w-px h-5 bg-border/80" />

            {/* Mobile Compact Gold "Book" CTA Button */}
            <Button
              as="a"
              href={whatsAppBookingUrl}
              target="_blank"
              variant="gold"
              size="sm"
              className="sm:hidden shadow-gold-sm min-h-[40px] px-3 py-1.5 text-xs font-bold tracking-wider"
              leftIcon={<WhatsAppIcon className="w-3.5 h-3.5 fill-current" />}
            >
              Book
            </Button>

            {/* Tablet & Desktop Full "Book on WhatsApp" Button */}
            <Button
              as="a"
              href={whatsAppBookingUrl}
              target="_blank"
              variant="gold"
              size="sm"
              className="hidden sm:inline-flex shadow-gold-sm min-h-[40px]"
              leftIcon={<WhatsAppIcon className="w-4 h-4 fill-current" />}
            >
              Book on WhatsApp
            </Button>

            {/* Mobile / Tablet Hamburger Button (44x44px minimum touch target) */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isDrawerOpen}
              className="xl:hidden w-11 h-11 flex items-center justify-center rounded-sm border border-border text-text hover:text-gold hover:border-gold transition-colors focus:outline-none focus:ring-1 focus:ring-gold"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Drawer */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default Header;
