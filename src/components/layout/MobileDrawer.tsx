import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/site';
import { navigationData, NavItem } from '../../data/nav';
import { buildWhatsAppLink } from '../../lib/whatsapp';
import { Button } from '../ui/Button';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  // Accordion state: only one submenu open at a time on mobile
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  // Close drawer on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Body scroll lock with position restoration & Esc key & Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    // 1. Precise body scroll lock preserving scroll position
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    // 2. Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // 3. Keydown handler: Escape & Tab Trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusable = Array.from(focusableElements).filter(
          (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
        );

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);

      // Restore body scroll position accurately
      const savedTop = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';

      if (savedTop) {
        const restoreY = Math.abs(parseInt(savedTop, 10));
        window.scrollTo(0, restoreY);
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const whatsAppBookingUrl = buildWhatsAppLink({
    message: "Hi Angels Salon & Academy! I would like to book an appointment. Could you please share available slots?",
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 flex justify-end bg-ink/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative w-[min(100%,22rem)] h-full h-[100dvh] max-h-[100dvh] overflow-hidden bg-surface border-l border-border flex flex-col justify-between p-4 sm:p-6 shadow-2xl animate-slide-up pt-safe pb-safe"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              className="w-10 h-10 rounded-full border border-gold/40 object-cover"
            />
            <div className="flex flex-col">
              <span className="font-serif text-base font-bold tracking-luxury text-text">
                ANGELS
              </span>
              <span className="text-[9.5px] uppercase tracking-luxury text-gold">
                Salon & Academy
              </span>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="w-11 h-11 flex items-center justify-center text-text-muted hover:text-gold border border-transparent hover:border-gold/30 rounded-sm transition-colors focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Navigation Links with Nested Accordions (Minimum 48px rows) */}
        <nav
          className="my-3 flex-1 flex flex-col justify-start overflow-y-auto space-y-1 pr-1 overscroll-contain"
          aria-label="Mobile Navigation"
        >
          {navigationData.map((item: NavItem) => {
            const hasChildren = item.hasDropdown && item.children && item.children.length > 0;
            const isSubmenuOpen = openSubmenu === item.label;
            const submenuId = `mobile-submenu-${item.label.toLowerCase().replace(/\s+/g, '-')}`;

            if (!hasChildren) {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `min-h-[48px] px-4 py-3 text-base font-serif tracking-wide rounded-sm transition-colors flex items-center justify-between ${
                      isActive
                        ? 'text-gold font-bold bg-gold/10 border-l-2 border-gold pl-5'
                        : 'text-text-muted hover:text-text hover:bg-surface-elevated'
                    }`
                  }
                >
                  <span>{item.label}</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold/60">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </NavLink>
              );
            }

            return (
              <div key={item.path} className="border-b border-border/40 pb-1">
                {/* Parent Row: Label link on left, separate Chevron toggle on right */}
                <div className="min-h-[48px] flex items-center justify-between rounded-sm hover:bg-surface-elevated/50">
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex-1 min-h-[48px] px-4 py-3 text-base font-serif tracking-wide transition-colors flex items-center ${
                        isActive ? 'text-gold font-bold' : 'text-text-muted hover:text-text'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>

                  {/* Disclosure Button (48x48px touch target) */}
                  <button
                    type="button"
                    aria-expanded={isSubmenuOpen}
                    aria-controls={submenuId}
                    aria-label={item.ariaLabel || `Toggle ${item.label} submenu`}
                    onClick={() => toggleSubmenu(item.label)}
                    className="w-12 h-12 flex items-center justify-center text-text-muted hover:text-gold transition-colors focus:outline-none focus:text-gold"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180 text-gold' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>

                {/* Submenu Accordion Panel — 2-column grid */}
                <div
                  id={submenuId}
                  hidden={!isSubmenuOpen}
                  className={`px-1 py-2 border-l-2 border-gold/30 ml-2 my-1 ${
                    isSubmenuOpen ? 'block animate-fade-in' : 'hidden'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-1">
                    {item.children?.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `min-h-[44px] flex items-start px-2.5 py-2 text-xs tracking-wide rounded-sm transition-colors leading-tight ${
                            isActive
                              ? 'text-gold font-bold bg-gold/10 border border-gold/30'
                              : 'text-text-muted hover:text-gold hover:bg-surface-elevated border border-border/40 hover:border-gold/20'
                          }`
                        }
                      >
                        <span className="line-clamp-2">{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Bottom Actions: Call and Book on WhatsApp (Minimum 48px heights) */}
        <div className="pt-3 border-t border-border space-y-2.5 shrink-0">
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="min-h-[48px] w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-sm bg-surface-elevated border border-border text-sm font-semibold text-text hover:text-gold hover:border-gold/40 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Call {siteConfig.contact.phoneDisplay}</span>
          </a>

          <Button
            as="a"
            href={whatsAppBookingUrl}
            target="_blank"
            variant="whatsapp"
            size="md"
            fullWidth
            className="min-h-[48px] shadow-md text-sm font-bold tracking-luxury"
            leftIcon={<WhatsAppIcon className="w-5 h-5 fill-current" />}
          >
            Book on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
