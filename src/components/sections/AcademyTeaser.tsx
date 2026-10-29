import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { ArrowRightIcon } from '../ui/icons';

export const AcademyTeaser: React.FC = () => {
  const whatsAppInquiryUrl = `https://wa.me/917303312054?text=${encodeURIComponent(
    "Hi Angels Academy! I am interested in your professional diplomas (Hairdressing / Bridal Makeup). Could you please share the upcoming batch dates and syllabus?"
  )}`;

  return (
    <Section id="academy" tone="surface" className="py-20 sm:py-28 border-t border-border" aria-label="Angels Academy of Hair & Beauty">
      <Container size="lg">
        {/* Lustre Section Header */}
        <div data-reveal className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 border border-border shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold-text font-semibold">
              Professional Education
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-text mb-4 leading-tight tracking-tight">
            Master the craft at <br className="hidden sm:inline" />
            <span className="italic">Angels Academy.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-xl mx-auto">
            Hands-on hairdressing, bridal couture makeup, and cosmetology diplomas with 80% practical training on live models in our Mumbai flagship atelier.
          </p>
        </div>

        {/* Dual Course Showcase + Architectural Studio Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto mb-16">
          
          {/* Left Column: 2 Course Cards */}
          <div data-reveal className="lg:col-span-7 space-y-6">
            
            {/* Course 1: Professional Hairdressing Diploma */}
            <div className="p-7 sm:p-8 rounded-[24px] sm:rounded-[28px] bg-background/50 border border-border hover:border-gold/50 shadow-lustre-sm transition-all duration-300">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-0.5 rounded-full bg-gold/15 text-gold-text">
                  Hairdressing Diploma · 3 to 6 Months
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-text">
                  ₹45,000 <span className="text-xs font-sans text-text-muted font-normal">(0% EMI)</span>
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-text mb-2">
                Comprehensive Diploma in Hairdressing
              </h3>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4">
                Trichology, Vidal Sassoon haircut geometry, French balayage, chemical texture (Nanoplastia, Keratin), and client consultations with 240+ hours practical studio work.
              </p>

              <div className="flex flex-wrap items-center justify-between pt-4 border-t border-border/80 gap-3">
                <div className="flex items-center gap-2 text-xs text-text font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Includes Japanese Shears Kit & Live Models</span>
                </div>

                <Link
                  to="/academy/hair-courses"
                  className="text-xs uppercase tracking-wider font-semibold text-text hover:text-gold transition-colors inline-flex items-center gap-1"
                >
                  <span>Syllabus</span>
                  <ArrowRightIcon size={12} />
                </Link>
              </div>
            </div>

            {/* Course 2: Bridal Couture & HD Makeup Mastery */}
            <div className="p-7 sm:p-8 rounded-[24px] sm:rounded-[28px] bg-background/50 border border-border hover:border-gold/50 shadow-lustre-sm transition-all duration-300">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-0.5 rounded-full bg-gold/15 text-gold-text">
                  Bridal Artistry · 6 Weeks Intensive
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-text">
                  ₹35,000 <span className="text-xs font-sans text-text-muted font-normal">(Kit Included)</span>
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-text mb-2">
                Advance Bridal Couture & HD Makeup
              </h3>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4">
                Command high-ticket bridal bookings with HD airbrush mechanics, traditional Nauvari & Gujarati saree draping, bridal hair ornamentation, and professional portfolio shoot.
              </p>

              <div className="flex flex-wrap items-center justify-between pt-4 border-t border-border/80 gap-3">
                <div className="flex items-center gap-2 text-xs text-text font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Max 8 Students Per Batch · 100% Placement Support</span>
                </div>

                <Link
                  to="/academy/makeup-courses"
                  className="text-xs uppercase tracking-wider font-semibold text-text hover:text-gold transition-colors inline-flex items-center gap-1"
                >
                  <span>Syllabus</span>
                  <ArrowRightIcon size={12} />
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Lustre Arched Image */}
          <div data-reveal="image" className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full rounded-t-[180px] rounded-b-[28px] overflow-hidden border border-border shadow-lustre-md bg-dark group">
              <img
                src="/images/real/interior_studio_floor.webp"
                alt="Angels Academy hands-on styling atelier and student live model practice in Ghatkopar East"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-full bg-surface/90 backdrop-blur-md border border-border shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-serif text-base font-bold text-text leading-none mb-0.5">Live Model Atelier</p>
                  <p className="text-xs text-text-muted leading-none">Pant Nagar Flagship Studio</p>
                </div>
                <span className="text-xs font-bold text-gold-text">80% Practical</span>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons & Academy Metrics */}
        <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <a
            href={whatsAppInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-dark text-text-inverse hover:bg-gold-text text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-sm active:scale-95"
          >
            <WhatsAppIcon size={16} className="fill-current text-gold shrink-0" />
            <span>Inquire About Academy Admissions</span>
          </a>

          <Link
            to="/academy"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-surface border border-border hover:border-gold/60 text-text hover:text-gold-text text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-sm"
          >
            <span>Explore All Academy Diplomas</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default AcademyTeaser;
