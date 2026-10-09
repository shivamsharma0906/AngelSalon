import React, { useState, useEffect } from 'react';

export const WhatsAppWidget: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPosition = window.scrollY + clientHeight;

      // Minimize widget if within 180px of page bottom (overlaps footer)
      if (scrollHeight - scrollPosition < 180) {
        setIsMinimized(true);
      } else {
        setIsMinimized(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappNumber = '917303312054';
  const initialText = encodeURIComponent('Hi Angels Salon, I would like to book an appointment. Please share available slots.');
  const waUrl = `https://wa.me/${whatsappNumber}?text=${initialText}`;

  return (
    <a
      href={waUrl}
      className={`floating-whatsapp-widget ${isMinimized ? 'minimized' : ''}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <div className="whatsapp-badge-pulse" />
      <div className="whatsapp-icon-container">
        <svg className="whatsapp-svg" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 100.5 32 0 132.5 0 255.9c0 39.4 10.2 77.9 29.8 112L0 480l114.8-30.1c32.9 17.9 69.9 27.4 108.9 27.4 123.5 0 224-100.5 224-223.9 0-59.8-23.2-116.1-65.1-158.1zM223.9 444c-33.3 0-66-8.9-94.4-25.9l-6.8-4-70.2 18.4 18.8-68.5-4.4-7.1c-18.7-29.7-28.5-64.1-28.5-99.7C38.4 153.9 121 71.3 224 71.3c49.9 0 96.9 19.5 132.2 54.8 35.3 35.3 54.8 82.2 54.8 132.2 0 102.7-82.6 185.7-187.1 185.7zm102.5-112.2c-5.6-2.8-33.3-16.4-38.5-18.3-5.2-1.9-9-2.8-12.8 2.8-3.8 5.6-14.6 18.3-17.9 22-3.3 3.8-6.6 4.2-12.2 1.4-5.6-2.8-23.6-8.7-45-27.8-16.6-14.8-27.8-33.1-31.1-38.8-3.3-5.6-.4-8.7 2.4-11.5 2.5-2.5 5.6-6.6 8.5-9.9 2.8-3.3 3.8-5.6 5.6-9.4 1.9-3.8.9-7-1.4-12.2-2.8-5.6-12.8-30.9-17.6-42.3-4.6-11.2-9.3-9.7-12.8-9.9-3.3-.2-7.1-.2-10.9-.2-3.8 0-10 1.4-15.2 7-5.2 5.6-20.1 19.7-20.1 48.1 0 28.4 20.7 55.8 23.6 59.8 2.8 3.8 40.7 62.2 98.6 87.2 13.8 6 24.6 9.6 33 12.3 13.9 4.4 26.6 3.8 36.6 2.3 11.2-1.7 33.3-13.6 38-26.1 4.6-12.5 4.6-23.2 3.3-25.4-1.3-2.3-5.2-3.6-10.8-6.4z" fill="#FFF" />
        </svg>
      </div>
      <span className="whatsapp-label">Book on WhatsApp</span>
    </a>
  );
};

export default WhatsAppWidget;
