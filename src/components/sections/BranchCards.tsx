import React from 'react';
import { siteConfig } from '../../data/site';
import { buildBranchVisitLink } from '../../lib/whatsapp';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const BranchCards: React.FC = () => {
  const branch = siteConfig.branches[0];
  const whatsAppUrl = buildBranchVisitLink(branch?.name || 'Ghatkopar East');

  if (!branch) return null;

  return (
    <section className="py-16 sm:py-24 bg-surface border-y border-border" aria-label="Our Salon Location in Mumbai">
      <Container size="lg">
        <div data-reveal>
          <SectionHeading
            subtitle="Location & Hours"
            title="Visit Our Mumbai Sanctuary"
            description="Experience personalized hospitality and master artistry at our flagship salon & academy in Ghatkopar East, Mumbai."
            align="center"
          />
        </div>

        <div className="max-w-5xl mx-auto">
          <Card data-reveal data-card-hover className="overflow-hidden border-border hover:border-gold/60 transition-all duration-300 p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              
              {/* Left Column: Details & Real Exterior */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  {/* Top Badge & Branch Title */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <Badge variant="gold">
                      Main Flagship & Academy
                    </Badge>

                    <a
                      href={branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] text-xs uppercase tracking-luxury text-gold hover:text-gold-soft font-semibold inline-flex items-center gap-1"
                    >
                      <span>Get Directions</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-4">
                    {branch.name}
                  </h3>

                  {/* Real Storefront Exterior Photo */}
                  <div data-reveal="image" className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border mb-5 bg-ink group shadow-md">
                    <img
                      src="/images/salon_outside.jpg"
                      alt={`${branch.name} storefront entrance in Mumbai`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2.5 left-2.5 bg-ink/90 backdrop-blur-sm border border-gold/40 text-[10px] text-gold font-bold px-2.5 py-0.5 rounded-sm uppercase tracking-wider">
                      Salon Exterior & Entrance
                    </span>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3 text-text-muted mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold shrink-0 mt-0.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <p className="text-sm leading-relaxed text-text">
                      {branch.address.formatted}
                    </p>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3 text-text-muted mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold shrink-0 mt-0.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <div className="text-sm">
                      <span className="font-semibold text-text block mb-1">
                        {branch.hours}
                      </span>
                      <ul className="text-xs text-text-subtle space-y-0.5">
                        {branch.hoursDetail.map((detail, idx) => (
                          <li key={idx}>
                            {detail.days}: <span className="text-text-muted">{detail.time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 text-text-muted mb-6">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold shrink-0">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <a
                      href={`tel:${branch.phoneRaw}`}
                      className="text-sm text-text hover:text-gold transition-colors font-medium min-h-[44px] inline-flex items-center"
                    >
                      {branch.phone}
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border">
                  <Button
                    as="a"
                    href={whatsAppUrl}
                    target="_blank"
                    variant="outline"
                    size="md"
                    fullWidth
                    className="min-h-[48px]"
                  >
                    Message Us
                  </Button>

                  <Button
                    as="a"
                    href={`tel:${branch.phoneRaw}`}
                    variant="outline"
                    size="md"
                    fullWidth
                    className="min-h-[48px]"
                    leftIcon={
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    }
                  >
                    Call Salon
                  </Button>
                </div>
              </div>

              {/* Right Column: Full-Height Interactive Google Map */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="relative w-full h-[320px] sm:h-[400px] lg:h-full min-h-[320px] lg:min-h-[440px] rounded-xl overflow-hidden border border-border bg-ink shadow-lg">
                  <iframe
                    src={branch.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title={`${branch.name} Map`}
                    className="w-full h-full grayscale-[20%] contrast-[105%] hover:grayscale-0 transition-all duration-500"
                  ></iframe>
                </div>
              </div>

            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
};
