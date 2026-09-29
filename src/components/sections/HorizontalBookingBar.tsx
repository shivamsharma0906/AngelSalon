import React, { useState } from 'react';
import { serviceCategoriesData } from '../../data/services';

import { Button } from '../ui/Button';

export const HorizontalBookingBar: React.FC = () => {
  const [selectedService, setSelectedService] = useState('Hair Styling & Finish');
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedSlot, setSelectedSlot] = useState('Morning (10 AM - 1 PM)');

  // Collect popular services for quick picker
  const servicesList = serviceCategoriesData.flatMap((cat) =>
    cat.services.map((s) => ({
      name: s.name,
      category: cat.name,
    }))
  ).slice(0, 15);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const message =
      `Hi Angels Salon & Academy Concierge! I would like to book a VIP appointment.\n\n` +
      `✂️ *Service*: ${selectedService}\n` +
      `📍 *Sanctuary*: Ghatkopar East, Pant Nagar, Mumbai\n` +
      `🗓️ *Preferred Date*: ${selectedDate}\n` +
      `⏰ *Preferred Slot*: ${selectedSlot}\n\n` +
      `Please let me know if this slot is available!`;

    const url = `https://wa.me/917303312054?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-surface/95 border border-gold/40 rounded-2xl lg:rounded-full p-3 sm:p-3.5 lg:p-2.5 shadow-2xl backdrop-blur-xl">
        <form onSubmit={handleBooking} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 lg:gap-3">
          
          {/* Service Column */}
          <div className="flex-1 min-h-[48px] px-3.5 py-2 lg:py-1.5 rounded-xl lg:rounded-full bg-ink/70 lg:bg-transparent border lg:border-none border-border/80 text-left flex flex-col justify-center">
            <span className="block text-[10px] uppercase tracking-wider text-text-subtle font-semibold mb-0.5">
              Experience / Service
            </span>
            <div className="relative">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-transparent text-base lg:text-xs font-bold text-text cursor-pointer focus:outline-none appearance-none pr-6 truncate"
              >
                {servicesList.map((s, idx) => (
                  <option key={idx} value={s.name} className="bg-surface text-text">
                    {s.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold text-xs">
                ▼
              </span>
            </div>
          </div>

          <div className="hidden lg:block w-px h-8 bg-border/80" />

          {/* Location Column — static, single branch */}
          <div className="flex-1 min-h-[48px] px-3.5 py-2 lg:py-1.5 rounded-xl lg:rounded-full bg-ink/70 lg:bg-transparent border lg:border-none border-border/80 text-left flex flex-col justify-center">
            <span className="block text-[10px] uppercase tracking-wider text-text-subtle font-semibold mb-0.5">
              Sanctuary / Location
            </span>
            <span className="text-base lg:text-xs font-bold text-text flex items-center gap-1.5">
              <span>📍</span>
              <span>Ghatkopar East, Mumbai</span>
            </span>
          </div>

          <div className="hidden lg:block w-px h-8 bg-border/80" />

          {/* Date Column */}
          <div className="flex-1 min-h-[48px] px-3.5 py-2 lg:py-1.5 rounded-xl lg:rounded-full bg-ink/70 lg:bg-transparent border lg:border-none border-border/80 text-left flex flex-col justify-center">
            <span className="block text-[10px] uppercase tracking-wider text-text-subtle font-semibold mb-0.5">
              Preferred Date
            </span>
            <div className="relative">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-transparent text-base lg:text-xs font-bold text-text cursor-pointer focus:outline-none appearance-none pr-6"
              >
                <option value="Today" className="bg-surface text-text">🗓️ Today (Instant Slots)</option>
                <option value="Tomorrow" className="bg-surface text-text">🗓️ Tomorrow</option>
                <option value="This Weekend" className="bg-surface text-text">🗓️ This Weekend</option>
                <option value="Next Week" className="bg-surface text-text">🗓️ Next Week</option>
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold text-xs">
                ▼
              </span>
            </div>
          </div>

          <div className="hidden lg:block w-px h-8 bg-border/80" />

          {/* Time Slot Column */}
          <div className="flex-1 min-h-[48px] px-3.5 py-2 lg:py-1.5 rounded-xl lg:rounded-full bg-ink/70 lg:bg-transparent border lg:border-none border-border/80 text-left flex flex-col justify-center">
            <span className="block text-[10px] uppercase tracking-wider text-text-subtle font-semibold mb-0.5">
              Time Window
            </span>
            <div className="relative">
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full bg-transparent text-base lg:text-xs font-bold text-text cursor-pointer focus:outline-none appearance-none pr-6"
              >
                <option value="Morning (10 AM - 1 PM)" className="bg-surface text-text">☀️ Morning (10 AM – 1 PM)</option>
                <option value="Afternoon (1 PM - 5 PM)" className="bg-surface text-text">🌤️ Afternoon (1 PM – 5 PM)</option>
                <option value="Evening (5 PM - 9 PM)" className="bg-surface text-text">🌙 Evening (5 PM – 9 PM)</option>
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold text-xs">
                ▼
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="shrink-0 pt-1 lg:pt-0">
            <Button
              type="submit"
              variant="gold"
              size="md"
              fullWidth
              className="min-h-[48px] rounded-xl lg:rounded-full px-6 py-3 font-bold shadow-md hover:shadow-lg text-sm uppercase tracking-luxury"
            >
              Send Request
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default HorizontalBookingBar;
