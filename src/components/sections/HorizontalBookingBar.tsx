import React, { useState } from 'react';
import { homeData } from '../../data/home';
import { siteConfig } from '../../data/site';
import { Button } from '../ui/Button';
import { ChevronDownIcon, ScissorsIcon, MapPinIcon, CalendarIcon, ClockIcon, WhatsAppIcon } from '../ui/icons';

export const HorizontalBookingBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { bookingDefaults } = homeData.hero;
  const [selectedService, setSelectedService] = useState(bookingDefaults.services[0]);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedSlot, setSelectedSlot] = useState(bookingDefaults.times[0]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const message =
      `Hi Angels Salon & Academy! I would like to book an appointment.\n\n` +
      `• Service: ${selectedService}\n` +
      `• Location: Pant Nagar, Ghatkopar East, Mumbai\n` +
      `• Preferred Date: ${selectedDate}\n` +
      `• Preferred Time: ${selectedSlot}\n\n` +
      `Please let me know if this slot is available. Thank you!`;

    const url = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`w-full max-w-6xl mx-auto px-4 sm:px-6 ${className}`}>
      <div className="bg-surface border border-border hover:border-gold/60 rounded-[4px] p-4 sm:p-5 lg:p-3 shadow-card-light backdrop-blur-md transition-colors duration-300">
        <form onSubmit={handleBooking} className="grid grid-cols-2 lg:flex lg:flex-row items-stretch lg:items-center gap-2 sm:gap-3">
          
          {/* 1. Service Selection */}
          <div className="col-span-1 flex-1 min-h-[46px] sm:min-h-[48px] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-[4px] bg-surface-subtle border border-input hover:border-gold/60 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold/30 transition-colors flex flex-col justify-center text-left">
            <label htmlFor="booking-service" className="text-[10px] sm:text-[12px] uppercase tracking-wider text-text-muted font-semibold mb-0.5 flex items-center gap-1 sm:gap-1.5">
              <ScissorsIcon size={12} className="text-gold shrink-0 sm:w-3.5 sm:h-3.5" />
              <span>Service</span>
            </label>
            <div className="relative">
              <select
                id="booking-service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-base font-medium text-text cursor-pointer focus:outline-none appearance-none pr-5 sm:pr-6 truncate"
              >
                {bookingDefaults.services.map((service, idx) => (
                  <option key={idx} value={service} className="bg-surface text-text">
                    {service}
                  </option>
                ))}
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                <ChevronDownIcon size={12} className="sm:w-3.5 sm:h-3.5" />
              </span>
            </div>
          </div>

          {/* 2. Location (Static Ghatkopar East) */}
          <div className="col-span-1 flex-1 min-h-[46px] sm:min-h-[48px] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-[4px] bg-surface-subtle border border-input hover:border-gold/60 transition-colors flex flex-col justify-center text-left">
            <span className="text-[10px] sm:text-[12px] uppercase tracking-wider text-text-muted font-semibold mb-0.5 flex items-center gap-1 sm:gap-1.5">
              <MapPinIcon size={12} className="text-gold shrink-0 sm:w-3.5 sm:h-3.5" />
              <span>Location</span>
            </span>
            <span className="text-xs sm:text-base font-medium text-text truncate">
              Ghatkopar East
            </span>
          </div>

          {/* 3. Date Selection */}
          <div className="col-span-1 flex-1 min-h-[46px] sm:min-h-[48px] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-[4px] bg-surface-subtle border border-input hover:border-gold/60 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold/30 transition-colors flex flex-col justify-center text-left">
            <label htmlFor="booking-date" className="text-[10px] sm:text-[12px] uppercase tracking-wider text-text-muted font-semibold mb-0.5 flex items-center gap-1 sm:gap-1.5">
              <CalendarIcon size={12} className="text-gold shrink-0 sm:w-3.5 sm:h-3.5" />
              <span>Date</span>
            </label>
            <div className="relative">
              <select
                id="booking-date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-base font-medium text-text cursor-pointer focus:outline-none appearance-none pr-5 sm:pr-6 truncate"
              >
                {bookingDefaults.dates.map((date, idx) => (
                  <option key={idx} value={date} className="bg-surface text-text">
                    {date}
                  </option>
                ))}
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                <ChevronDownIcon size={12} className="sm:w-3.5 sm:h-3.5" />
              </span>
            </div>
          </div>

          {/* 4. Time Selection */}
          <div className="col-span-1 flex-1 min-h-[46px] sm:min-h-[48px] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-[4px] bg-surface-subtle border border-input hover:border-gold/60 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold/30 transition-colors flex flex-col justify-center text-left">
            <label htmlFor="booking-time" className="text-[10px] sm:text-[12px] uppercase tracking-wider text-text-muted font-semibold mb-0.5 flex items-center gap-1 sm:gap-1.5">
              <ClockIcon size={12} className="text-gold shrink-0 sm:w-3.5 sm:h-3.5" />
              <span>Time Window</span>
            </label>
            <div className="relative">
              <select
                id="booking-time"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-base font-medium text-text cursor-pointer focus:outline-none appearance-none pr-5 sm:pr-6 truncate"
              >
                {bookingDefaults.times.map((slot, idx) => (
                  <option key={idx} value={slot} className="bg-surface text-text">
                    {slot}
                  </option>
                ))}
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                <ChevronDownIcon size={12} className="sm:w-3.5 sm:h-3.5" />
              </span>
            </div>
          </div>

          {/* 5. Submit Button */}
          <div className="col-span-2 lg:col-span-1 shrink-0 pt-0.5 lg:pt-0">
            <Button
              type="submit"
              variant="gold"
              size="md"
              fullWidth
              className="min-h-[46px] sm:min-h-[48px] rounded-[4px] px-6 py-2.5 sm:py-3 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-gold-sm"
              leftIcon={<WhatsAppIcon size={16} />}
            >
              Request Slot
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default HorizontalBookingBar;
