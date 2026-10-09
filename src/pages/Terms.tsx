import React from 'react';
import { SEO } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { LaurelDivider } from '../components/ui/LaurelDivider';
import { siteConfig } from '../data/site';

export const Terms: React.FC = () => {
  return (
    <>
      <SEO
        title="Terms & Conditions | Angels Salon & Academy"
        description="Terms of service, booking policies, and academy enrollment guidelines for Angels Salon & Academy Mumbai."
        canonicalPath="/terms"
      />

      <main id="main-content" className="pt-28 pb-20 bg-background min-h-screen">
        <Container size="md">
          {/* Header */}
          <div className="text-center mb-10" data-reveal>
            <span className="text-xs uppercase tracking-luxury text-gold-text font-semibold block mb-2">Service Agreement</span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">Terms &amp; Conditions</h1>
            <div className="flex justify-center mb-4">
              <LaurelDivider size="md" />
            </div>
            <p className="text-xs text-text-muted">Last Updated: October 2026</p>
          </div>

          {/* Legal Notice Banner */}
          <div className="p-4 mb-8 rounded-lg bg-surface border-2 border-dashed border-gold text-center">
            <span className="text-xs uppercase tracking-wider font-bold text-gold-text block mb-1">
              [OWNER / LEGAL REVIEW REQUIRED]
            </span>
            <p className="text-xs text-text-muted">
              These terms set forth standard salon service protocols, appointment expectations, and academy course policies for Angels Salon &amp; Academy. Final review and formalization by business ownership is recommended.
            </p>
          </div>

          {/* Terms Body */}
          <div className="space-y-8 bg-surface border border-border/80 rounded-xl p-6 sm:p-10 shadow-card-light text-text">
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-text">1. Appointment Reservations &amp; Punctuality</h2>
              <p className="text-sm text-text-muted leading-relaxed">
                We value your time and allocate dedicated stylist hours for every guest. We request that clients arrive 10 minutes prior to scheduled appointments. In the event of delays exceeding 15 minutes, service sequencing may be adjusted to protect subsequent bookings.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-text">2. Cancellations &amp; Rescheduling</h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Should you need to reschedule your styling session or bridal trial, please notify our front desk at least 4 hours in advance via WhatsApp or phone call so our stylists may accommodate waitlisted guests.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-text">3. Chemical Treatments &amp; Allergy Disclosures</h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Client wellbeing is our highest priority. Clients undergoing advanced chemical processes (e.g., Nanoplastia, Botoplex, French Balayage, or high-lift tints) are required to inform their master stylist of prior chemical treatments, known skin sensitivities, or scalp conditions. Patch tests are available upon request.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-text">4. Academy Enrollment &amp; Certification</h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Enrollment into professional diploma masterclasses requires adherence to academy attendance thresholds and practical examination standards. Certificates are awarded upon successful completion of required coursework and live model evaluations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-text">5. Governing Law &amp; Inquiries</h2>
              <p className="text-sm text-text-muted leading-relaxed">
                These terms are governed by the applicable laws of Maharashtra, India. For inquiries regarding policies, please contact:
              </p>
              <div className="p-4 rounded-lg bg-surface-subtle text-xs text-text space-y-1">
                <p><strong>{siteConfig.name}</strong></p>
                <p>Address: 29/843, Shival Nagar, Pant Nagar, Ghatkopar East, Mumbai 400075</p>
                <p>Phone: {siteConfig.contact.phoneDisplay} | Email: {siteConfig.contact.email}</p>
              </div>
            </section>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Terms;
