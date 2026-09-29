import React from 'react';
import { SEO } from '../lib/seo';
import { GoogleReviews } from '../components/sections/GoogleReviews';
import { buildWhatsAppLink } from '../lib/whatsapp';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

export const Testimonials: React.FC = () => {
  return (
    <>
      <SEO
        title="Google Reviews & Client Accolades | Angels Salon & Academy Mumbai"
        description="Read selected verified client reviews from our Google Business Profile for Angels Salon & Academy, Ghatkopar East, Mumbai."
        canonicalPath="/testimonials"
      />

      <main id="main-content" className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-ink">
        {/* All 10 Google Reviews in Masonry Grid */}
        <GoogleReviews mode="grid" />

        {/* Closing Action Banner */}
        <section className="text-center mt-16 sm:mt-20" data-reveal>
          <Container size="md">
            <div className="p-8 sm:p-12 rounded-2xl bg-surface/90 border border-gold/30 shadow-card-dark" data-card-hover>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-3">
                Experience Verified Excellence
              </h2>
              <p className="text-sm sm:text-base text-text-muted mb-6 leading-relaxed max-w-xl mx-auto font-light">
                Join hundreds of satisfied clients in Ghatkopar East. Reserve your appointment with our senior directors via WhatsApp concierge.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  as="a"
                  href={buildWhatsAppLink({
                    message: "Hi Angels Salon! I was reading your Google reviews and would love to book an appointment.",
                  })}
                  target="_blank"
                  variant="whatsapp"
                  size="lg"
                  className="w-full sm:w-auto min-h-[48px]"
                >
                  Book on WhatsApp
                </Button>
                <Button
                  as="a"
                  href="/services"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto min-h-[48px]"
                >
                  Explore Services
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Testimonials;
