import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/site';
import { buildWhatsAppLink } from '../../lib/whatsapp';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

export const BottomActionBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const location = useLocation();

  // Scroll listener: appear after scrolling past hero (~350px)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 350);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard awareness via VisualViewport & focus events
  useEffect(() => {
    const handleViewportResize = () => {
      if (window.visualViewport) {
        // If viewport height dropped significantly, virtual keyboard is active
        const isKeyboard = window.visualViewport.height < window.innerHeight * 0.8;
        setIsKeyboardOpen(isKeyboard);
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        setIsKeyboardOpen(true);
      }
    };

    const handleFocusOut = () => {
      setIsKeyboardOpen(false);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportResize);
    }
    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportResize);
      }
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // Do not show on Contact page (has its own primary form) or if keyboard is open
  const isContactPage = location.pathname === '/contact';
  const shouldRender = isVisible && !isKeyboardOpen && !isContactPage;

  const whatsAppBookingUrl = buildWhatsAppLink({
    message: "Hi Angels Salon & Academy! I would like to book an appointment. Could you please share available slots?",
  });

  return (
    <aside
      aria-label="Mobile Quick Booking and Directions Bar"
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-out bg-surface/95 backdrop-blur-md border-t border-border shadow-2xl pb-safe ${
        shouldRender ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
    >
      <div className="h-14 px-3 flex items-center justify-around gap-2 max-w-md mx-auto">
        {/* 1. Call Button */}
        <a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          className="flex-1 min-h-[44px] flex flex-col items-center justify-center text-text-muted hover:text-gold transition-colors group"
          aria-label={`Call ${siteConfig.name}`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold mb-0.5 group-hover:scale-110 transition-transform"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span className="text-[10px] font-semibold uppercase tracking-wider">Call</span>
        </a>

        {/* 2. Primary WhatsApp Button (Prominent Gold Accent) */}
        <a
          href={whatsAppBookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.5] min-h-[44px] px-3 py-1 rounded-full bg-gold text-text font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-gold-hover transition-all active:scale-95"
          aria-label="Book on WhatsApp"
        >
          <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
          <span className="text-xs uppercase tracking-luxury font-bold leading-none">WhatsApp</span>
        </a>

        {/* 3. Directions Button */}
        <a
          href={siteConfig.branches[0].googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] flex flex-col items-center justify-center text-text-muted hover:text-gold transition-colors group"
          aria-label="Get Google Maps Directions"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold mb-0.5 group-hover:scale-110 transition-transform"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span className="text-[10px] font-semibold uppercase tracking-wider">Directions</span>
        </a>
      </div>
    </aside>
  );
};

export default BottomActionBar;
