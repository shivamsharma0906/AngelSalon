import React, { useState, useEffect } from 'react';
import { serviceCategoriesData } from '../../data/services';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Button } from './Button';

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultBranch?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Hair Styling & Finish',
  defaultBranch = 'Ghatkopar East (Pant Nagar)',
}) => {
  const [selectedService, setSelectedService] = useState(defaultService);
  const [selectedBranch, setSelectedBranch] = useState(defaultBranch);
  const [dateType, setDateType] = useState<'today' | 'tomorrow' | 'custom'>('today');
  const [customDate, setCustomDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (10:00 AM – 1:00 PM)');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  // Synchronize default props
  useEffect(() => {
    if (defaultService) setSelectedService(defaultService);
    if (defaultBranch) setSelectedBranch(defaultBranch);
  }, [defaultService, defaultBranch]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const savedTop = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedTop}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, savedTop);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Flatten service offerings with starting prices
  const servicesList = serviceCategoriesData.flatMap((cat) =>
    cat.services.map((s) => ({
      name: s.name,
      category: cat.name,
      price: s.startingPrice,
    }))
  );

  const handleConfirmOnWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate =
      dateType === 'today'
        ? 'Today (Immediate Confirmation)'
        : dateType === 'tomorrow'
          ? 'Tomorrow'
          : customDate || 'Flexible / Next Available';

    const message =
      `*ANGELS SALON & ACADEMY - VIP BOOKING REQUEST*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Client Name*: ${guestName.trim() || 'Guest'}\n` +
      `📞 *Client Phone*: ${guestPhone.trim() || 'Not specified'}\n` +
      `✂️ *Selected Service*: ${selectedService}\n` +
      `📍 *Preferred Sanctuary*: ${selectedBranch}\n` +
      `🗓️ *Preferred Date*: ${formattedDate}\n` +
      `⏰ *Preferred Time Window*: ${timeSlot}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Please confirm slot availability. Thank you!`;

    const url = `https://wa.me/917303312054?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book Appointment"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-dark/80 backdrop-blur-md animate-fade-in"
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-surface border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-card-light overflow-hidden max-h-[90vh] max-h-[90dvh] overflow-y-auto overscroll-contain">
        {/* Top gold glow bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Close Button (44x44px touch target) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 rounded-full bg-surface-subtle border border-border text-text-muted hover:text-gold hover:border-gold transition-colors flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-gold"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="mb-5 sm:mb-6 pr-8">
          <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-gold-text font-bold block mb-1">
            Instant VIP Confirmation
          </span>
          <h2 className="font-serif text-xl sm:text-3xl font-bold text-text">
            Book Your Appointment
          </h2>
          <p className="text-xs sm:text-sm text-text-muted mt-1 font-light">
            Zero advance deposit required • Pay directly at the salon
          </p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleConfirmOnWhatsApp} className="space-y-4">
          {/* Service Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-text font-semibold mb-1.5">
              1. Select Service / Ritual
            </label>
            <div className="relative">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full min-h-[48px] bg-surface border border-input hover:border-gold focus:border-gold rounded-xl px-3.5 py-3 text-base sm:text-sm text-text appearance-none cursor-pointer focus:outline-none pr-8 transition-colors"
              >
                {servicesList.map((s, i) => (
                  <option key={i} value={s.name} className="bg-surface text-text">
                    {s.name} ({s.price})
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                ▼
              </div>
            </div>
          </div>

          {/* Branch Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-text font-semibold mb-1.5">
              2. Preferred Sanctuary
            </label>
            <div className="relative">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full min-h-[48px] bg-surface border border-input hover:border-gold focus:border-gold rounded-xl px-3.5 py-3 text-base sm:text-sm text-text appearance-none cursor-pointer focus:outline-none pr-8 transition-colors"
              >
                <option value="Ghatkopar East (Pant Nagar)" className="bg-surface text-text">
                  📍 Ghatkopar East (Near Kirti Computer Institute)
                </option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                ▼
              </div>
            </div>
          </div>

          {/* Date Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-text font-semibold mb-1.5">
              3. Select Date
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDateType('today')}
                className={`min-h-[44px] py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border text-center transition-all ${dateType === 'today'
                    ? 'bg-gold/20 border-gold text-gold-text font-bold shadow-sm'
                    : 'bg-surface-subtle border-border text-text-muted hover:border-gold/40'
                  }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setDateType('tomorrow')}
                className={`min-h-[44px] py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border text-center transition-all ${dateType === 'tomorrow'
                    ? 'bg-gold/20 border-gold text-gold-text font-bold shadow-sm'
                    : 'bg-surface-subtle border-border text-text-muted hover:border-gold/40'
                  }`}
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => setDateType('custom')}
                className={`min-h-[44px] py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border text-center transition-all ${dateType === 'custom'
                    ? 'bg-gold/20 border-gold text-gold-text font-bold shadow-sm'
                    : 'bg-surface-subtle border-border text-text-muted hover:border-gold/40'
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
                className="mt-2 w-full min-h-[48px] bg-surface border border-input rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-text focus:outline-none focus:ring-1 focus:ring-gold"
                required={dateType === 'custom'}
              />
            )}
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-text font-semibold mb-1.5">
              4. Preferred Time Window
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'morn', label: '10 AM - 1 PM', full: 'Morning (10:00 AM – 1:00 PM)' },
                { id: 'aft', label: '1 PM - 5 PM', full: 'Afternoon (1:00 PM – 5:00 PM)' },
                { id: 'eve', label: '5 PM - 9 PM', full: 'Evening (5:00 PM – 9:00 PM)' },
              ].map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setTimeSlot(slot.full)}
                  className={`min-h-[44px] py-2 px-2 text-xs font-medium rounded-xl border text-center transition-all ${timeSlot === slot.full
                      ? 'bg-gold/20 border-gold text-gold-text font-bold shadow-sm'
                      : 'bg-surface-subtle border-border text-text-muted hover:border-gold/40'
                    }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-text-subtle mb-1">
                Your Name (Optional)
              </label>
              <input
                type="text"
                autoComplete="name"
                placeholder="e.g. Priya Sharma"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full min-h-[48px] bg-surface border border-input focus:border-gold rounded-xl px-3.5 py-3 text-base sm:text-sm text-text focus:outline-none scroll-mt-20"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-text-subtle mb-1">
                WhatsApp Phone
              </label>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="e.g. 98765 43210"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="w-full min-h-[48px] bg-surface border border-input focus:border-gold rounded-xl px-3.5 py-3 text-base sm:text-sm text-text focus:outline-none scroll-mt-20"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="whatsapp"
              size="lg"
              fullWidth
              className="min-h-[48px] shadow-md hover:shadow-lg text-sm font-bold tracking-luxury py-3.5"
              leftIcon={<WhatsAppIcon className="w-5 h-5 fill-current" />}
            >
              Confirm Appointment on WhatsApp
            </Button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-text-subtle pt-1 text-center sm:text-left">
            <span>✓ Instant Confirmation</span>
            <span>✓ Free Consultation</span>
            <span>✓ Pay at Salon</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
