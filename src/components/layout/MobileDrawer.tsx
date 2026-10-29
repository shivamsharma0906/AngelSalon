import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/site';
import { buildWhatsAppLink } from '../../lib/whatsapp';

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Body scroll lock with position restoration & Esc key & Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
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
    message: "Hi Angel Salon & Academy! I would like to book an appointment. Could you please share available slots?",
  });

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Academy', path: '/academy' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-[60] flex flex-col items-center justify-start pt-3 sm:pt-4 px-3 sm:px-6 bg-dark/60 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      {/* Floating Navbar Dropdown Card matching Lustre layout (Anchored at top navbar position) */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-surface rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 shadow-2xl border border-border/80 flex flex-col animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Row: Brand on left, Solid dark circle close button on right */}
        <div className="flex items-center justify-between pb-5 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold/50 p-0.5 shadow-sm bg-surface shrink-0">
              <img
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-luxury text-text leading-none mb-0.5">
                ANGEL
              </span>
              <span className="text-[8.5px] uppercase tracking-luxury text-gold-text font-medium leading-none">
                Salon &amp; Academy
              </span>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-dark text-text-inverse hover:bg-gold-text transition-colors shadow-sm outline-none focus:outline-none focus:ring-0"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Clean, spacious vertical navigation list matching reference */}
        <nav className="py-5 flex flex-col space-y-2.5" aria-label="Mobile Navigation">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `text-base sm:text-lg font-medium transition-colors py-1 block tracking-wide ${
                  isActive
                    ? 'text-gold font-semibold'
                    : 'text-text hover:text-gold'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Action CTA: Book Appointment pill button */}
        <div className="pt-2">
          <a
            href={whatsAppBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gold-dark text-text-inverse hover:bg-dark text-sm font-medium tracking-wide transition-all duration-300 shadow-md active:scale-95 min-h-[46px]"
          >
            <span>Book Appointment</span>
            <span aria-hidden="true" className="text-base leading-none">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
