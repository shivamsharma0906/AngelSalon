import React from 'react';
import { SEO } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { LaurelDivider } from '../components/ui/LaurelDivider';
import { siteConfig } from '../data/site';

export const Privacy: React.FC = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | Angels Salon & Academy"
        description="Privacy policy and data protection standards for Angels Salon & Academy, Ghatkopar East, Mumbai."
        canonicalPath="/privacy"
      />

      <main id="main-content" className="pt-28 pb-20 bg-background min-h-screen">
        <Container size="md">
          {/* Header */}
          <div className="text-center mb-10" data-reveal>
            <span className="text-xs uppercase tracking-luxury text-gold-text font-semibold block mb-2">Legal Transparency</span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">Privacy Policy</h1>
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
              This draft policy outlines standard client data handling practices for Angels Salon &amp; Academy. Final legal review by salon counsel is recommended prior to formal execution.
            </p>
          </div>

          {/* Policy Body */}
          <div className="space-y-8 bg-surface border border-border/80 rounded-xl p-6 sm:p-10 shadow-card-light text-text">
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-text">1. Information We Collect</h2>
              <p className="text-sm text-text-muted leading-relaxed">
                When you schedule an appointment, request a styling consultation, or inquire about our academy diploma masterclasses, we may collect your:
              </p>
              <ul className="list-disc pl-5 text-sm text-text-muted space-y-1">
                <li>Full name and preferred contact details</li>
                <li>WhatsApp phone number and mobile contact</li>
                <li>Preferred service, appointment timing, and salon branch</li>
                <li>Hair, scalp, or skin treatment preferences and allergy disclosures</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-text">2. How We Use Your Information</h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Your personal details are used strictly to:
              </p>
              <ul className="list-disc pl-5 text-sm text-text-muted space-y-1">
                <li>Confirm, reschedule, or manage your salon bookings via WhatsApp or phone</li>
                <li>Deliver tailored recommendations from our Master Stylists</li>
                <li>Send course curriculum details and academy admission updates</li>
                <li>Maintain safety standards and treatment history records</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-text">3. WhatsApp Communications &amp; Data Security</h2>
              <p className="text-sm text-text-muted leading-relaxed">
                We respect your personal sanctuary. We never sell, rent, or trade your contact details with unauthorized third-party marketing brokers. Direct WhatsApp messaging is initiated voluntarily by you through our reservation console.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-text">4. Contact Our Concierge</h2>
              <p className="text-sm text-text-muted leading-relaxed">
                If you have questions regarding our privacy practices or wish to update your records, please reach out to our management team:
              </p>
              <div className="p-4 rounded-lg bg-surface-subtle text-xs text-text space-y-1">
                <p><strong>{siteConfig.name}</strong></p>
                <p>Address: 29/843, Shival Nagar, Pant Nagar, Ghatkopar East, Mumbai 400075</p>
                <p>Phone: {siteConfig.contact.phoneDisplay} | WhatsApp: {siteConfig.contact.whatsappNumber}</p>
                <p>Email: {siteConfig.contact.email}</p>
              </div>
            </section>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Privacy;
