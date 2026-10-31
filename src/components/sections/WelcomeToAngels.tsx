import React from 'react';
import { homeData } from '../../data/home';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { buildWhatsAppLink } from '../../lib/whatsapp';

export const WelcomeToAngels: React.FC = () => {
  const { welcome } = homeData;

  const whatsAppBookingUrl = buildWhatsAppLink({
    message: "Hi Angel Salon & Academy! I would like to book an appointment. Could you please share available slots?",
  });

  if (!welcome || !welcome.verified || welcome.paragraphs.length === 0) {
    return null;
  }

  return (
    <Section tone="surface" className="py-16 sm:py-24 border-t border-border overflow-hidden" aria-label="About Angel Salon & Academy">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Editorial Copy Column */}
          <div data-reveal className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Lustre Signature Dash Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="w-5 sm:w-6 h-[1.5px] bg-gold-text"></span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-text font-semibold">
                ABOUT ANGEL
              </span>
            </div>

            {/* Headline matching Lustre editorial phrasing */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-text leading-[1.18] tracking-tight mb-4 sm:mb-5">
              A modern studio for hair <br className="hidden sm:inline" />
              that feels like you.
            </h2>

            {/* Editorial Body Text */}
            <p className="text-sm sm:text-base text-text-muted font-normal leading-relaxed mb-6 sm:mb-8 max-w-xl">
              At Angel Salon &amp; Academy, great hair starts with listening. Our stylists combine thoughtful consultation with refined technique to create cuts, colour and styling tailored to your texture, lifestyle and identity.
            </p>

            {/* Outlined Action CTA */}
            <a
              href={whatsAppBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-dark/60 text-text hover:bg-dark hover:text-text-inverse text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 shadow-lustre-sm active:scale-95 mb-2 lg:mb-0"
            >
              <span>Book Appointment</span>
              <span aria-hidden="true" className="text-base leading-none">→</span>
            </a>
          </div>

          {/* Arched Mirror Photo with Overlapping Circular Stylist Photo */}
          <div data-reveal="image" className="lg:col-span-6 relative w-full max-w-sm sm:max-w-md mx-auto pt-4 lg:pt-0">
            {/* Main Arched Photo Frame */}
            <div className="relative w-full aspect-[4/4.8] rounded-t-[180px] sm:rounded-t-[220px] rounded-b-[24px] overflow-hidden bg-surface-subtle shadow-xl border border-border/60">
              <img
                src="/images/real/interior_wash_lounge.webp"
                alt="Angel Salon & Academy tranquil wash lounge and luxury styling studio"
                width={1200}
                height={1600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 40%' }}
              />
            </div>

            {/* Overlapping Circular Hair Styling Photo */}
            <div
              className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 w-28 h-28 sm:w-36 sm:h-36 rounded-full border-[5px] sm:border-[6px] border-white shadow-xl overflow-hidden bg-surface pointer-events-none select-none transition-transform duration-300 hover:scale-105"
              aria-hidden="true"
            >
              <img
                src="/images/real/client_haircut_styling_ritual.webp"
                alt="Client styling ritual at vanity mirror"
                width={200}
                height={200}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 30%' }}
              />
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
};

export default WelcomeToAngels;
