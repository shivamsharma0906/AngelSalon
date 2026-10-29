import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { ArrowRightIcon } from '../ui/icons';
import { FramedImage } from '../ui/FramedImage';

export const AcademyTeaser: React.FC = () => {
  const whatsAppInquiryUrl = `https://wa.me/917303312054?text=${encodeURIComponent(
    "Hi Angel Academy! I am interested in your professional diplomas (Hairdressing / Bridal Makeup). Could you please share the upcoming batch dates and syllabus?"
  )}`;

  return (
    <Section id="academy" tone="surface" className="py-20 sm:py-28 border-t border-border" aria-label="Angel Academy of Hair & Beauty">
      <Container size="lg">
        {/* Lustre Section Header */}
        <div data-reveal className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-text mb-4 leading-tight tracking-tight">
            Master the craft at <br className="hidden sm:inline" />
            <span className="italic">Angel Academy.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-xl mx-auto">
            Hands-on hairdressing, bridal couture makeup, and cosmetology diplomas with 80% practical training on live models in our Mumbai flagship atelier.
          </p>
        </div>

        {/* Dual Course Showcase + Architectural Studio Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto mb-16">
          
          {/* Left Column: 2 Lustre Course Diploma Cards */}
          <div data-reveal className="lg:col-span-7 space-y-6">
            
            {/* Diploma 1: Hairdressing */}
            <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[28px] bg-background/50 border border-border hover:border-gold/50 transition-all duration-300 shadow-lustre-sm group">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-gold-text">
                  Hairdressing Diploma · 4 Months
                </span>
                <span className="text-xs font-bold text-text bg-surface px-3 py-1 rounded-full border border-border shadow-sm">
                  ₹45,000 (EMI Available)
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-2 group-hover:text-gold-text transition-colors">
                Comprehensive Hairdressing Course
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4">
                Master classical & contemporary Vidal Sassoon geometry, advanced balayage lightening, keratin chemistry, botox smoothing, and salon management with live client sessions.
              </p>

              <div className="flex flex-wrap items-center justify-between pt-4 border-t border-border/80 gap-3">
                <div className="flex items-center gap-2 text-xs text-text font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Government Recognized Certification · Free Professional Tool Kit</span>
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

            {/* Diploma 2: Bridal Makeup */}
            <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[28px] bg-background/50 border border-border hover:border-gold/50 transition-all duration-300 shadow-lustre-sm group">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-gold-text">
                  Bridal Artistry · 2 Months
                </span>
                <span className="text-xs font-bold text-text bg-surface px-3 py-1 rounded-full border border-border shadow-sm">
                  ₹35,000 (EMI Available)
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-2 group-hover:text-gold-text transition-colors">
                Professional Bridal Makeup Mastery
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

          {/* Right Column: Architectural Lustre Arched Image using FramedImage */}
          <div data-reveal="image" className="lg:col-span-5">
            <FramedImage
              src="/images/real/interior_studio_floor.webp"
              alt="Angel Academy hands-on styling atelier and student live model practice in Ghatkopar East"
              focalPoint="50% 45%"
              aspectRatio="aspect-[4/5]"
              radius="arch-tall"
              border="gold"
              width={1200}
              height={1600}
            />
          </div>

        </div>

        {/* Action Bar */}
        <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <a
            href={whatsAppInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-dark text-text-inverse hover:bg-gold-text text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-md"
          >
            <WhatsAppIcon size={16} className="fill-current text-gold shrink-0" />
            <span>Apply for Upcoming Batch</span>
          </a>

          <Link
            to="/academy"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-surface border border-border hover:border-gold/60 text-text hover:text-gold-text text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lustre-sm"
          >
            <span>Explore All Academy Courses</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default AcademyTeaser;
