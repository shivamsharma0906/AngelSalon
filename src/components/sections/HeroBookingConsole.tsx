import React, { useState } from 'react';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { Button } from '../ui/Button';

export interface BookingData {
  service: string;
  branch: string;
  dateType: 'today' | 'tomorrow' | 'custom';
  customDate: string;
  timeSlot: string;
  guestName: string;
  guestPhone: string;
}

const servicesList = [
  { id: 'hair-styling', name: 'Hair Cut & Couture Styling', price: 'from ₹800', category: 'Hair' },
  { id: 'balayage', name: 'French Balayage & Highlights', price: 'from ₹4,000', category: 'Color' },
  { id: 'botoplex', name: 'Protein Hair Treatment / Botoplex', price: 'from ₹7,000', category: 'Treatment' },
  { id: 'skeyndor', name: 'Skeyndor Dermapeel / Clinical Facial', price: 'from ₹3,500', category: 'Skin' },
  { id: 'bridal', name: 'Couture Bridal & HD Makeup', price: 'from ₹15,000', category: 'Bridal' },
  { id: 'nails', name: 'Nail Art & Russian Extensions', price: 'from ₹1,800', category: 'Nails' },
  { id: 'hair-extensions', name: 'Premium Hair Extensions', price: 'from ₹10,000', category: 'Hair' },
  { id: 'academy', name: 'Salon Academy Diploma Masterclass', price: 'Inquire', category: 'Academy' },
];

export const HeroBookingConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'appointment' | 'consultation'>('appointment');
  const [selectedService, setSelectedService] = useState(servicesList[0].name);
  const [selectedBranch, setSelectedBranch] = useState('Ghatkopar East (Near Tilak Nagar)');
  const [dateType, setDateType] = useState<'today' | 'tomorrow' | 'custom'>('today');
  const [customDate, setCustomDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Evening (5:00 PM – 9:00 PM)');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  // Compute display date
  const getFormattedDate = () => {
    const today = new Date();
    if (dateType === 'today') {
      return `Today, ${today.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}`;
    }
    if (dateType === 'tomorrow') {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return `Tomorrow, ${tomorrow.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}`;
    }
    if (customDate) {
      const [year, month, day] = customDate.split('-');
      const d = new Date(Number(year), Number(month) - 1, Number(day));
      return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    }
    return 'Upcoming Date';
  };

  const generateWhatsAppUrl = () => {
    const dateStr = getFormattedDate();
    let message = '';

    if (activeTab === 'consultation') {
      message = `✨ *VIP CONSULTATION REQUEST - ANGELS SALON & ACADEMY* ✨\n\n` +
        `👤 *Client*: ${guestName.trim() || 'New Guest'}\n` +
        `📞 *Contact*: ${guestPhone.trim() || 'WhatsApp'}\n` +
        `💎 *Area of Interest*: ${selectedService}\n` +
        `📍 *Preferred Branch*: ${selectedBranch}\n` +
        `📅 *Preferred Day*: ${dateStr}\n` +
        `🕒 *Preferred Time*: ${timeSlot}\n\n` +
        `I would like to request a personalized consultation with a Senior Master Stylist. Please confirm available slots!`;
    } else {
      message = `✨ *VIP APPOINTMENT BOOKING - ANGELS SALON & ACADEMY* ✨\n\n` +
        `👤 *Client Name*: ${guestName.trim() || 'Valued Guest'}\n` +
        `📞 *Mobile*: ${guestPhone.trim() || 'Via WhatsApp'}\n` +
        `✂️ *Service*: ${selectedService}\n` +
        `📍 *Salon Branch*: ${selectedBranch}\n` +
        `📅 *Date*: ${dateStr}\n` +
        `🕒 *Time Window*: ${timeSlot}\n\n` +
        `Please confirm slot availability for this appointment. Thank you!`;
    }

    return `https://wa.me/917303312054?text=${encodeURIComponent(message)}`;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-md lg:max-w-lg mx-auto bg-surface/90 border border-gold/40 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden text-left">
      {/* Top subtle golden hairline glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Header with live indicator */}
      <div className="flex items-center justify-between pb-3.5 border-b border-border/70 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-whatsapp animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-luxury text-whatsapp">
              Live Slots Available Today
            </span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-text tracking-wide">
            Reserve Your VIP Experience
          </h3>
        </div>
        <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 font-medium tracking-wider uppercase">
          Zero Advance
        </span>
      </div>

      {/* Purpose Tabs */}
      <div className="grid grid-cols-2 gap-1.5 p-1 rounded-lg bg-ink/70 border border-border/80 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('appointment')}
          className={`py-1.5 px-3 text-xs font-semibold tracking-wider uppercase rounded-md transition-all ${
            activeTab === 'appointment'
              ? 'bg-gold text-text shadow-sm'
              : 'text-text-muted hover:text-text'
          }`}
        >
          Book Appointment
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('consultation')}
          className={`py-1.5 px-3 text-xs font-semibold tracking-wider uppercase rounded-md transition-all ${
            activeTab === 'consultation'
              ? 'bg-gold text-text shadow-sm'
              : 'text-text-muted hover:text-text'
          }`}
        >
          Free Consultation
        </button>
      </div>

      <form onSubmit={handleBooking} className="space-y-3">
        {/* Service Selector */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-text-muted font-medium mb-1">
            1. Select Experience / Service
          </label>
          <div className="relative">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full bg-ink/90 border border-border hover:border-gold/60 focus:border-gold rounded-lg px-3 py-2 text-xs sm:text-sm text-text appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold transition-colors pr-8"
            >
              {servicesList.map((srv) => (
                <option key={srv.id} value={srv.name} className="bg-surface text-text py-1">
                  {srv.name} ({srv.price})
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* Branch Selector */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-text-muted font-medium mb-1">
            2. Salon Sanctuary
          </label>
          <div className="relative">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full bg-ink/90 border border-border hover:border-gold/60 focus:border-gold rounded-lg px-3 py-2 text-xs sm:text-sm text-text appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold transition-colors pr-8"
            >
              <option value="Ghatkopar East (Pant Nagar)" className="bg-surface text-text">
                📍 Ghatkopar East (Pant Nagar) • Salon & Academy
              </option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* Date Selection Pills */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-text-muted font-medium mb-1">
            3. Preferred Date
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setDateType('today')}
              className={`py-1.5 px-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                dateType === 'today'
                  ? 'bg-gold/20 border-gold text-gold shadow-gold-sm'
                  : 'bg-ink/60 border-border text-text-muted hover:border-border-gold'
              }`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setDateType('tomorrow')}
              className={`py-1.5 px-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                dateType === 'tomorrow'
                  ? 'bg-gold/20 border-gold text-gold shadow-gold-sm'
                  : 'bg-ink/60 border-border text-text-muted hover:border-border-gold'
              }`}
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => setDateType('custom')}
              className={`py-1.5 px-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                dateType === 'custom'
                  ? 'bg-gold/20 border-gold text-gold shadow-gold-sm'
                  : 'bg-ink/60 border-border text-text-muted hover:border-border-gold'
              }`}
            >
              Pick Date
            </button>
          </div>

          {dateType === 'custom' && (
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="mt-2 w-full bg-ink/90 border border-gold/50 rounded-lg px-3 py-1.5 text-xs text-text focus:outline-none focus:ring-1 focus:ring-gold"
              required={dateType === 'custom'}
            />
          )}
        </div>

        {/* Time Window Pills */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-text-muted font-medium mb-1">
            4. Preferred Time Window
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'morn', label: '10 AM - 1 PM', full: 'Morning (10:00 AM – 1:00 PM)' },
              { id: 'aft', label: '1 PM - 5 PM', full: 'Afternoon (1:00 PM – 5:00 PM)' },
              { id: 'eve', label: '5 PM - 9 PM', full: 'Evening (5:00 PM – 9:00 PM)' },
            ].map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => setTimeSlot(slot.full)}
                className={`py-1.5 px-1 text-[10px] sm:text-[11px] font-medium rounded-lg border text-center transition-all ${
                  timeSlot === slot.full
                    ? 'bg-gold/20 border-gold text-gold font-bold shadow-gold-sm'
                    : 'bg-ink/60 border-border text-text-muted hover:border-border-gold'
                }`}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>

        {/* Guest Name & Mobile Optional */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-text-subtle mb-0.5">
              Your Name
            </label>
            <input
              type="text"
              placeholder="e.g. Ananya"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-ink/80 border border-border focus:border-gold rounded-lg px-2.5 py-1.5 text-xs text-text focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-text-subtle mb-0.5">
              WhatsApp No.
            </label>
            <input
              type="tel"
              placeholder="e.g. 9876543210"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              className="w-full bg-ink/80 border border-border focus:border-gold rounded-lg px-2.5 py-1.5 text-xs text-text focus:outline-none"
            />
          </div>
        </div>

        {/* Primary Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="whatsapp"
            size="md"
            fullWidth
            className="shadow-md hover:shadow-lg text-xs sm:text-sm font-bold tracking-luxury py-2.5"
            leftIcon={<WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />}
          >
            {activeTab === 'appointment' ? 'Reserve Slot on WhatsApp' : 'Get Consultation on WhatsApp'}
          </Button>
        </div>

        {/* Reassurances */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-text-subtle pt-1">
          <span className="flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gold">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
            Instant Reply
          </span>
          <span className="flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gold">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
            Free Consult
          </span>
          <span className="flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gold">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
            Pay at Salon
          </span>
        </div>
      </form>
    </div>
  );
};

export default HeroBookingConsole;
