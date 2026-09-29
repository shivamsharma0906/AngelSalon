import React from 'react';
import { buildWhatsAppLink } from '../../lib/whatsapp';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
  const whatsAppUrl = buildWhatsAppLink({
    message: "Hi Angels Salon & Academy! I would like to enquire about appointments and courses.",
  });

  return (
    <aside aria-label="Quick WhatsApp Contact" className="hidden lg:block fixed bottom-6 right-6 z-40">
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Angels Salon & Academy on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Pulsing halo */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none"
          aria-hidden="true"
        ></span>

        {/* Real WhatsApp Icon */}
        <WhatsAppIcon className="w-8 h-8 text-white relative z-10 transition-transform duration-300 group-hover:scale-110" />

        {/* Desktop Tooltip */}
        <span
          className="hidden md:inline-block absolute right-full mr-3 px-3 py-1.5 rounded-sm bg-surface text-text text-xs uppercase tracking-luxury font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-border shadow-md"
        >
          Chat with us
        </span>
      </a>
    </aside>
  );
};
