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
      <div className="bg-raised border border-gold/40 hover:border-gold/60 rounded-[4px] p-4 sm:p-5 lg:p-3 shadow-2xl backdrop-blur-md transition-colors duration-300">
        <form onSubmit={handleBooking} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          
          {/* 1. Service Selection */}
          <div className="flex-1 min-h-[48px] px-3.5 py-2 rounded-[4px] bg-ink border border-gold/30 hover:border-gold/60 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold/30 transition-colors flex flex-col justify-center text-left">
            <label htmlFor="booking-service" className="text-[12px] uppercase tracking-wider text-muted font-semibold mb-0.5 flex items-center gap-1.5">
              <ScissorsIcon size={14} className="text-gold shrink-0" />
              <span>Service</span>
            </label>
            <div className="relative">
              <select
                id="booking-service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-transparent text-base font-medium text-text cursor-pointer focus:outline-none appearance-none pr-6 truncate"
              >
                {bookingDefaults.services.map((service, idx) => (
                  <option key={idx} value={service} className="bg-raised text-text">
                    {service}
                  </option>
                ))}
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                <ChevronDownIcon size={14} />
              </span>
            </div>
          </div>

          {/* 2. Location (Static Ghatkopar East) */}
          <div className="flex-1 min-h-[48px] px-3.5 py-2 rounded-[4px] bg-ink border border-gold/30 hover:border-gold/60 transition-colors flex flex-col justify-center text-left">
            <span className="text-[12px] uppercase tracking-wider text-muted font-semibold mb-0.5 flex items-center gap-1.5">
              <MapPinIcon size={14} className="text-gold shrink-0" />
              <span>Location</span>
            </span>
            <span className="text-base font-medium text-text truncate">
              Ghatkopar East, Mumbai
            </span>
          </div>

          {/* 3. Date Selection */}
          <div className="flex-1 min-h-[48px] px-3.5 py-2 rounded-[4px] bg-ink border border-gold/30 hover:border-gold/60 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold/30 transition-colors flex flex-col justify-center text-left">
            <label htmlFor="booking-date" className="text-[12px] uppercase tracking-wider text-muted font-semibold mb-0.5 flex items-center gap-1.5">
              <CalendarIcon size={14} className="text-gold shrink-0" />
              <span>Date</span>
            </label>
            <div className="relative">
              <select
                id="booking-date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-transparent text-base font-medium text-text cursor-pointer focus:outline-none appearance-none pr-6 truncate"
              >
                {bookingDefaults.dates.map((date, idx) => (
                  <option key={idx} value={date} className="bg-raised text-text">
                    {date}
                  </option>
                ))}
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                <ChevronDownIcon size={14} />
              </span>
            </div>
          </div>

          {/* 4. Time Selection */}
          <div className="flex-1 min-h-[48px] px-3.5 py-2 rounded-[4px] bg-ink border border-gold/30 hover:border-gold/60 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold/30 transition-colors flex flex-col justify-center text-left">
            <label htmlFor="booking-time" className="text-[12px] uppercase tracking-wider text-muted font-semibold mb-0.5 flex items-center gap-1.5">
              <ClockIcon size={14} className="text-gold shrink-0" />
              <span>Time Window</span>
            </label>
            <div className="relative">
              <select
                id="booking-time"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full bg-transparent text-base font-medium text-text cursor-pointer focus:outline-none appearance-none pr-6 truncate"
              >
                {bookingDefaults.times.map((slot, idx) => (
                  <option key={idx} value={slot} className="bg-raised text-text">
                    {slot}
                  </option>
                ))}
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                <ChevronDownIcon size={14} />
              </span>
            </div>
          </div>

          {/* 5. Submit Button */}
          <div className="shrink-0 pt-1 lg:pt-0">
            <Button
              type="submit"
              variant="gold"
              size="md"
              fullWidth
              className="min-h-[48px] rounded-[4px] px-6 py-3 font-bold text-sm tracking-wider uppercase"
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
