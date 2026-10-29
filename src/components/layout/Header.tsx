import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/site';
import { navigationData } from '../../data/nav';
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none`}
      >
        <div
          className={`w-full max-w-7xl mx-auto px-5 sm:px-8 py-2.5 sm:py-3 rounded-full bg-surface/90 backdrop-blur-md border border-border transition-all duration-300 pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 ${
            isScrolled ? 'shadow-lustre-md bg-surface/95 border-gold/40' : 'shadow-lustre-sm'
          }`}
        >
          {/* Brand Logo & Name (Lustre Studio typographic balance) */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 group outline-none focus:outline-none focus:ring-0 rounded-full shrink-0 pr-1"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-gold/50 p-0.5 transition-transform duration-300 group-hover:scale-105 shadow-sm bg-surface shrink-0">
              <img
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={siteConfig.logo.width}
                height={siteConfig.logo.height}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm sm:text-lg font-bold tracking-luxury text-text transition-colors group-hover:text-gold leading-none mb-0.5">
                ANGEL
              </span>
              <span className="text-[8px] sm:text-[9.5px] uppercase tracking-luxury text-gold-text font-medium leading-none">
                Salon & Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Centered, refined tracking) */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10"
            aria-label="Main Navigation"
          >
            {navigationData.map((item) => (
              <NavDropdown key={item.path} item={item} />
            ))}
          </nav>

          {/* Mobile / Tablet Hamburger Button (Solid dark circular button matching Lustre layout) */}
          <div className="flex lg:hidden items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isDrawerOpen}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-dark text-text-inverse hover:bg-gold-text transition-colors shadow-sm outline-none focus:outline-none focus:ring-0"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="17" x2="20" y2="17"></line>
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
