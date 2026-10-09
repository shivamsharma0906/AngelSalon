import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO, generateLocalBusinessSchema } from '../lib/seo';
import { siteConfig } from '../data/site';
import { buildFormInquiryLink } from '../lib/whatsapp';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LaurelDivider } from '../components/ui/LaurelDivider';
import { MapPinIcon } from '../components/ui/icons';

interface ContactFormValues {
  name: string;
  phone: string;
  branch: string;
  serviceOrCourse: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  website_bot_check: string; // Honeypot field to block automated spambots
}

interface FormErrors {
  name?: string;
  phone?: string;
  branch?: string;
  serviceOrCourse?: string;
}

/**
 * Normalizes Indian phone numbers into international +91 representation
 */
function normalizeIndianPhone(rawPhone: string): { display: string; cleanDigits: string; isValid: boolean } {
  const digits = rawPhone.replace(/\D/g, '');
  let standard10 = '';

  if (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) {
    standard10 = digits;
  } else if (digits.length === 11 && digits.startsWith('0') && /^[6-9]\d{9}$/.test(digits.slice(1))) {
    standard10 = digits.slice(1);
  } else if (digits.length === 12 && digits.startsWith('91') && /^[6-9]\d{9}$/.test(digits.slice(2))) {
    standard10 = digits.slice(2);
  }

  if (standard10) {
    return {
      display: `+91 ${standard10.slice(0, 5)} ${standard10.slice(5)}`,
      cleanDigits: `+91${standard10}`,
      isValid: true,
    };
  }

  return {
    display: rawPhone,
    cleanDigits: digits,
    isValid: false,
  };
}

/**
 * Lightweight schema-based validation rule definition
 */
interface SchemaFieldRule {
  validate: (val: string, all: ContactFormValues) => boolean;
  message: string;
}

const contactFormSchema: Record<keyof FormErrors, SchemaFieldRule[]> = {
  name: [
    {
      validate: (v) => v.trim().length >= 2,
      message: 'Please provide your full name (minimum 2 characters).',
    },
    {
      validate: (v) => v.trim().length <= 80,
      message: 'Name cannot exceed 80 characters.',
    },
  ],
  phone: [
    {
      validate: (v) => normalizeIndianPhone(v).isValid,
      message: 'Please enter a valid 10-digit Indian mobile number (e.g. 98200 12345).',
    },
  ],
  branch: [
    {
      validate: (v) => v.trim().length > 0,
      message: 'Please choose a salon branch.',
    },
  ],
  serviceOrCourse: [
    {
      validate: (v) => v.trim().length > 0,
      message: 'Please select a service or course interest.',
    },
  ],
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormValues>({
    name: '',
    phone: '',
    branch: 'Ghatkopar East (Flagship Salon & Academy)',
    serviceOrCourse: 'Hair Styling & Balayage',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    notes: '',
    website_bot_check: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Minimum date is today
  const minDate = new Date().toISOString().split('T')[0];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error as user modifies input
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePhoneBlur = () => {
    if (formData.phone.trim()) {
      const normalized = normalizeIndianPhone(formData.phone);
      if (normalized.isValid) {
        setFormData((prev) => ({ ...prev, phone: normalized.display }));
      }
    }
  };

  const validateForm = (): boolean => {
    // 1. Check honeypot field
    if (formData.website_bot_check.trim().length > 0) {
      // Bot detected: silent reject without error indication
      return false;
    }

    const newErrors: FormErrors = {};

    for (const [key, rules] of Object.entries(contactFormSchema) as [keyof FormErrors, SchemaFieldRule[]][]) {
      const val = formData[key] || '';
      for (const rule of rules) {
        if (!rule.validate(val, formData)) {
          newErrors[key] = rule.message;
          break; // Show first failing rule message
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const normalizedPhone = normalizeIndianPhone(formData.phone);

    // Build WhatsApp URL with validated & normalized payload
    const whatsappUrl = buildFormInquiryLink({
      name: formData.name,
      phone: normalizedPhone.cleanDigits,
      branch: formData.branch,
      serviceOrCourse: formData.serviceOrCourse,
      preferredDate: formData.preferredDate || undefined,
      preferredTime: formData.preferredTime || undefined,
      notes: formData.notes || undefined,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 300);
  };

  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      <SEO
        title="Contact & Location | Book on WhatsApp"
        description="Visit Angels Salon & Academy in Ghatkopar East, Mumbai. Find driving directions, opening hours, contact numbers, and send instant booking requests via WhatsApp."
        canonicalPath="/contact"
        schemaData={localBusinessSchema}
      />

      {/* Scoped Google Maps preconnects only for Contact page */}
      <Helmet>
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      <main id="main-content" className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-background">
        {/* Page Header */}
        <section data-reveal className="text-center mb-12 sm:mb-16">
          <Container size="md">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-luxury text-gold-text mb-3 inline-block">
              We Welcome You
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text leading-tight mb-4">
              Contact Us
            </h1>
            <LaurelDivider size="md" />
            <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-light mt-3">
              Visit our flagship salon &amp; academy in Ghatkopar East, reach out directly by phone, or submit an instant WhatsApp appointment request.
            </p>
          </Container>
        </section>

        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Column: Branch Cards & Map */}
            <div data-reveal className="lg:col-span-6 space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-6">
                Our Location
              </h2>

              {siteConfig.branches.map((branch) => (
                <Card data-card-hover key={branch.id} className="p-6 bg-surface border border-border shadow-card-light">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-luxury text-gold-text font-semibold">
                      Main Flagship &amp; Academy
                    </span>
                    <a
                      href={branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gold-text hover:text-gold uppercase tracking-wider font-semibold inline-flex items-center gap-1"
                    >
                      <span>Directions</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-text mb-3">
                    {branch.name}
                  </h3>

                  {/* Storefront Exterior Photo */}
                  <div data-reveal="image" className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-border mb-4 bg-surface-subtle shadow-sm">
                    <img
                      src="/images/salon_outside.jpg"
                      alt="Angels Salon & Academy storefront exterior in Ghatkopar East Mumbai"
                      width={800}
                      height={450}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <address className="not-italic text-sm text-text-muted leading-relaxed mb-4">
                    {branch.address.formatted}
                  </address>

                  <div className="space-y-1.5 text-xs text-text-muted border-t border-border pt-3 mb-4">
                    <p>
                      <strong className="text-text">Hours:</strong> {branch.hours}
                    </p>
                    <p>
                      <strong className="text-text">Phone:</strong>{' '}
                      <a href={`tel:${branch.phoneRaw}`} className="text-gold-text font-medium hover:underline">
                        {branch.phone}
                      </a>
                    </p>
                  </div>

                  {/* Google Maps Embed with Touch-Friendly Directions CTA and Mobile Scroll Protection */}
                  <div
                    className="relative w-full h-56 rounded-xl overflow-hidden border border-border bg-surface group"
                    onClick={() => setIsMapActive(true)}
                  >
                    {!isMapLoaded && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-surface-subtle z-10">
                        <div className="relative mb-2 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-gold/20 animate-ping absolute" />
                          <div className="w-8 h-8 rounded-full bg-surface border border-gold flex items-center justify-center text-gold relative z-10">
                            <MapPinIcon size={16} className="text-gold" />
                          </div>
                        </div>
                        <span className="text-xs text-gold-text font-semibold uppercase tracking-wider">
                          Loading Live Map...
                        </span>
                      </div>
                    )}

                    <iframe
                      src={branch.googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      onLoad={() => setIsMapLoaded(true)}
                      referrerPolicy="strict-origin-when-cross-origin"
                      title={`${branch.name} Map`}
                      className={`w-full h-full grayscale-[20%] contrast-[105%] transition-opacity duration-500 ${
                        isMapLoaded ? 'opacity-100' : 'opacity-0'
                      } ${
                        isMapActive ? 'pointer-events-auto' : 'pointer-events-none md:pointer-events-auto'
                      }`}
                    ></iframe>

                    {/* Mobile Tap-To-Interact Protection Overlay */}
                    {!isMapActive && isMapLoaded && (
                      <div className="md:hidden absolute inset-0 bg-dark/30 flex items-center justify-center cursor-pointer">
                        <span className="bg-surface/95 text-gold-text text-xs font-semibold px-3.5 py-1.5 rounded-full border border-gold/40 shadow-md">
                          Tap to interact with map
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <a
                      href={branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-surface border border-gold/60 text-gold-text hover:bg-gold hover:text-dark text-xs uppercase font-bold tracking-luxury transition-all"
                    >
                      <span>Get Directions on Google Maps</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </Card>
              ))}
            </div>

            {/* Right Column: Send Enquiry Form */}
            <div data-reveal className="lg:col-span-6">
              <div className="bg-surface border border-border rounded-sm p-5 sm:p-8 lg:p-10 shadow-card-light lg:sticky lg:top-28">
                <span className="text-xs uppercase tracking-luxury text-gold-text font-semibold mb-2 block">
                  Priority Scheduling
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-3">
                  Send Appointment Enquiry
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mb-6 sm:mb-8 leading-relaxed">
                  Fill in your details below. Clicking &ldquo;Send Booking Enquiry on WhatsApp&rdquo; will open your pre-formatted booking inquiry directly on WhatsApp with our concierge team.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                  {/* Honeypot field (hidden from assistive technologies and CSS display) */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="website_bot_check">Do not fill this field</label>
                    <input
                      type="text"
                      id="website_bot_check"
                      name="website_bot_check"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website_bot_check}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider text-text font-medium mb-1.5">
                      Your Name <span className="text-gold-text">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Priya Sharma"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`w-full min-h-[48px] bg-surface border rounded-sm px-4 py-3 text-base sm:text-sm text-text placeholder-text-muted focus:outline-none scroll-mt-24 transition-colors ${
                        errors.name ? 'border-red-600 focus:border-red-600' : 'border-input focus:border-gold'
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-red-700 font-medium mt-1.5" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-text font-medium mb-1.5">
                      Phone Number (WhatsApp) <span className="text-gold-text">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      inputMode="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handlePhoneBlur}
                      placeholder="e.g. 98200 12345"
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      className={`w-full min-h-[48px] bg-surface border rounded-sm px-4 py-3 text-base sm:text-sm text-text placeholder-text-muted focus:outline-none scroll-mt-24 transition-colors ${
                        errors.phone ? 'border-red-600 focus:border-red-600' : 'border-input focus:border-gold'
                      }`}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-xs text-red-700 font-medium mt-1.5" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Branch Select */}
                  <div>
                    <label htmlFor="branch" className="block text-xs uppercase tracking-wider text-text font-medium mb-1.5">
                      Preferred Branch <span className="text-gold-text">*</span>
                    </label>
                    <select
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      aria-required="true"
                      aria-invalid={!!errors.branch}
                      aria-describedby={errors.branch ? 'branch-error' : undefined}
                      className="w-full min-h-[48px] bg-surface border border-input rounded-sm px-4 py-3 text-base sm:text-sm text-text focus:outline-none focus:border-gold transition-colors"
                    >
                      <option value="Ghatkopar East (Flagship Salon & Academy)">
                        Ghatkopar East (Flagship Salon &amp; Academy)
                      </option>
                    </select>
                    {errors.branch && (
                      <p id="branch-error" className="text-xs text-red-700 font-medium mt-1.5" role="alert">
                        {errors.branch}
                      </p>
                    )}
                  </div>

                  {/* Service or Course Category Select */}
                  <div>
                    <label htmlFor="serviceOrCourse" className="block text-xs uppercase tracking-wider text-text font-medium mb-1.5">
                      Service / Course Interest <span className="text-gold-text">*</span>
                    </label>
                    <select
                      id="serviceOrCourse"
                      name="serviceOrCourse"
                      value={formData.serviceOrCourse}
                      onChange={handleInputChange}
                      aria-required="true"
                      aria-invalid={!!errors.serviceOrCourse}
                      aria-describedby={errors.serviceOrCourse ? 'service-error' : undefined}
                      className="w-full min-h-[48px] bg-surface border border-input rounded-sm px-4 py-3 text-base sm:text-sm text-text focus:outline-none focus:border-gold transition-colors"
                    >
                      <option value="Director's Haircut & Styling">Director&apos;s Haircut &amp; Styling</option>
                      <option value="French Balayage & Colour">French Balayage &amp; Colour</option>
                      <option value="Keratin / Botox Hair Treatment">Keratin / Botox Hair Treatment</option>
                      <option value="Royal Couture Bridal Package">Royal Couture Bridal Package</option>
                      <option value="Korean Hydra Facial & Skincare">Korean Hydra Facial &amp; Skincare</option>
                      <option value="Russian Gel Nail Art">Russian Gel Nail Art</option>
                      <option value="Academy: Master Hairdressing Diploma">Academy: Master Hairdressing Diploma</option>
                      <option value="Academy: Bridal Makeup Mastery">Academy: Bridal Makeup Mastery</option>
                      <option value="General Consultation">General Consultation</option>
                    </select>
                    {errors.serviceOrCourse && (
                      <p id="service-error" className="text-xs text-red-700 font-medium mt-1.5" role="alert">
                        {errors.serviceOrCourse}
                      </p>
                    )}
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="preferredDate" className="block text-xs uppercase tracking-wider text-text font-medium mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        min={minDate}
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full min-h-[48px] bg-surface border border-input rounded-sm px-3.5 py-2.5 text-base sm:text-sm text-text focus:outline-none focus:border-gold scroll-mt-24 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="preferredTime" className="block text-xs uppercase tracking-wider text-text font-medium mb-1.5">
                        Preferred Time
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full min-h-[48px] bg-surface border border-input rounded-sm px-3.5 py-2.5 text-base sm:text-sm text-text focus:outline-none focus:border-gold transition-colors"
                      >
                        <option value="Morning (10:00 AM - 1:00 PM)">Morning (10 AM - 1 PM)</option>
                        <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1 PM - 5 PM)</option>
                        <option value="Evening (5:00 PM - 8:30 PM)">Evening (5 PM - 8:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes / Special Requests */}
                  <div>
                    <label htmlFor="notes" className="block text-xs uppercase tracking-wider text-text font-medium mb-1.5">
                      Special Requests or Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="e.g. Inquiring about wedding date availability or sensitive scalp care..."
                      className="w-full bg-surface border border-input rounded-sm px-4 py-3 text-base sm:text-sm text-text placeholder-text-muted focus:outline-none focus:border-gold scroll-mt-24 transition-colors"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="whatsapp"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting}
                    data-btn-sweep
                    className="min-h-[48px] text-sm font-bold tracking-luxury py-3.5"
                  >
                    Send Booking Enquiry on WhatsApp
                  </Button>

                  <p className="text-[11px] text-text-muted text-center">
                    Instant confirmation via WhatsApp &bull; No online pre-payment required
                  </p>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Contact;
