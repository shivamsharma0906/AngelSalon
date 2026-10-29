import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

const FAQS = [
  {
    q: 'How do I schedule an appointment or consultation?',
    a: 'You can book directly by tapping our WhatsApp concierge button (+91 73033 12054) or by calling us at 073033 12054. We confirm available time slots instantly and provide personalized pre-visit recommendations.',
  },
  {
    q: 'What is the difference between Keratin, Botox, and Nanoplastia?',
    a: 'Keratin aligns and seals unruly cuticles for 3–4 months; Hair Botox deeply nourishes and repairs split, heat-damaged hair with amino acids; while Nanoplastia is our formaldehyde-free, organic acid treatment that delivers maximum mirror-glass shine and straightening for up to 6 months.',
  },
  {
    q: 'Are your hair colours and chemical products genuine?',
    a: 'Strictly 100% authentic. We partner directly with authorized distributors for global brands including L’Oréal Professionnel, Schwarzkopf, and Matrix, ensuring zero counterfeit or diluted formulas in our salon.',
  },
  {
    q: 'What are your salon opening hours and address in Mumbai?',
    a: 'We are open daily from 9:30 AM to 9:00 PM, Monday through Sunday (including public holidays). We are conveniently located at 29/843, Shival Nagar, Pant Nagar, Ghatkopar East, Mumbai 400075 (beside Kirti Computer Institute).',
  },
  {
    q: 'Do I need prior experience to join the Angels Academy diplomas?',
    a: 'No prior experience is necessary. Our Comprehensive Hairdressing and Bridal Makeup diplomas begin from foundational trichology, shear handling, and color theory, progressing to live-model salon practice.',
  },
  {
    q: 'Are live models and tool kits provided for academy students?',
    a: 'Yes. Every student receives a professional styling kit (including Japanese shears or HD makeup tools) and practices on 100+ supervised live client models with 100% interview placement support.',
  },
];

export const LustreFAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <Section tone="surface" className="py-20 sm:py-28 border-t border-border" aria-label="Frequently Asked Questions">
      <Container size="lg">
        {/* Lustre Section Header */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 border border-border shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold-text font-semibold">
              Got Questions?
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-text mb-4 leading-tight tracking-tight">
            Have questions? <br className="hidden sm:inline" />
            <span className="italic">We’ve got answers.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-lg mx-auto">
            Everything you need to know about reservations, customized consultations, aftercare, and academy enrollment.
          </p>
        </div>

        {/* Clean Luxury Accordion */}
        <div data-reveal className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="rounded-[20px] sm:rounded-[24px] bg-background/50 border border-border overflow-hidden transition-colors duration-300 hover:border-gold/50"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-text leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-border flex items-center justify-center shrink-0 transition-transform duration-300 bg-surface ${
                      isOpen ? 'rotate-45 border-gold bg-gold text-dark' : 'text-text'
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-sm sm:text-base text-text-muted leading-relaxed pt-2 border-t border-border/80">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Assistance Pill */}
        <div data-reveal className="text-center mt-12 sm:mt-16">
          <p className="text-xs sm:text-sm text-text-muted mb-3">
            Have a specific hair, skin, or course inquiry?
          </p>
          <a
            href="https://wa.me/917303312054?text=Hi%20Angels%20Salon!%20I%20have%20a%20question%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-dark text-text-inverse hover:bg-gold-text text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-sm"
          >
            <span>Ask Us Directly on WhatsApp</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </Container>
    </Section>
  );
};

export default LustreFAQ;
