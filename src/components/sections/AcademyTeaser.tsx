import React from 'react';
import { academyData } from '../../data/courses';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const AcademyTeaser: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-ink relative overflow-hidden" aria-label="Angels Academy Teaser">
      {/* Background Subtle Ambience Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <Container size="lg">
        <div data-reveal>
          <SectionHeading
            subtitle="Transform Your Passion Into A Career"
            title="Angels Academy of Hair & Beauty"
            description="Government-recognized diplomas, hands-on masterclasses on live clients, and dedicated salon placement support in Mumbai."
            align="center"
          />
        </div>

        {/* 3 Academy Feature Pillars */}
        <div data-reveal data-reveal-stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {academyData.whyLearnPoints.slice(0, 3).map((point, index) => (
            <Card key={index} data-card-hover className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold font-serif font-bold text-lg mb-4">
                  0{index + 1}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-text mb-3">
                  {point.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {point.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center text-xs uppercase tracking-luxury text-gold font-medium">
                <span>Verified Curriculum</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Highlight Banner with Image & Course Snapshot */}
        <div data-reveal data-card-hover className="bg-surface rounded-sm border border-border p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-card-dark">
          <div className="flex-1">
            <Badge variant="gold" className="mb-3">
              Enrolling Next Month's Batch
            </Badge>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-3">
              Master Hairdressing & Bridal Makeup Diplomas
            </h3>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl mb-6">
              Learn trichology, French balayage, precision scissor haircuts, chemical smoothening, and HD bridal draping. Includes a complimentary professional styling kit and ISO certification.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                as="a"
                href="/academy"
                variant="gold"
                size="md"
                data-btn-sweep
                className="w-full sm:w-auto min-h-[48px]"
                rightIcon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                }
              >
                View Courses & Syllabus
              </Button>

              <span className="text-xs text-text-subtle">
                Limited to 10 students per batch for individual attention
              </span>
            </div>
          </div>

          <div data-reveal="image" className="w-full lg:w-72 shrink-0 aspect-[4/3] rounded-sm overflow-hidden border border-border">
            <img
              src="/images/academy_training.jpg"
              alt="Students practicing hair techniques in Angels Academy studio"
              width={400}
              height={300}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
