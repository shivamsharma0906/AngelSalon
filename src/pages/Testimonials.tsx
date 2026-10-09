import React, { useState, useMemo } from 'react';
import { SEO } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon';
import { googleSummary, googleReviews } from '../data/reviews';
import { siteConfig } from '../data/site';
import { buildWhatsAppLink } from '../lib/whatsapp';
import { featuredResults, testimonialFAQs } from '../data/testimonialsData';
import { GoogleReviewCard } from '../components/sections/GoogleReviews';

export const Testimonials: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  // Structured Schema.org data: Breadcrumbs and FAQPage only (no self-serving AggregateRating or Review schema)
  const testimonialsSchema = useMemo(() => {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Testimonials',
          item: `${siteConfig.url}/testimonials`,
        },
      ],
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: testimonialFAQs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    return [breadcrumbSchema, faqSchema];
  }, []);

  return (
    <>
      <SEO
        title="Client Reviews & Ratings | Angels Salon & Academy Ghatkopar East"
        description="Read honest Google reviews from clients of Angels Salon & Academy in Ghatkopar East, Mumbai. Haircuts, hair colour, smoothing treatments and skin care rated 4.7 on Google."
        canonicalPath="/testimonials"
        schemaData={testimonialsSchema}
      />

      <main id="main-content" className="pt-28 pb-16 sm:pt-36 sm:pb-24 bg-background min-h-screen">
        {/* 1. Page Header (Quiet, spacious, sentence case) */}
        <section className="mb-16 sm:mb-24 text-left" aria-label="Page header">
          <Container size="lg">
            <div className="max-w-2xl">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-text mb-4 tracking-tight leading-[1.1]">
                What our clients say
              </h1>
              <p className="text-base sm:text-lg text-text-muted font-light leading-relaxed mb-4">
                Honest feedback from clients who visit our salon in Ghatkopar East.
              </p>
              <p className="text-sm text-text-muted font-normal">
                <a
                  href={googleSummary.reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-text hover:text-gold hover:underline font-medium inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-sm"
                >
                  <span>★ {googleSummary.rating} on Google from {googleSummary.count} reviews</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <span className="mx-2 text-border">·</span>
                <span>Rating as of 29 September 2026</span>
              </p>
            </div>
          </Container>
        </section>

        {/* 2. Featured Results (3 Real Client Stories with Large Photos) */}
        <section className="mb-20 sm:mb-28" aria-label="Featured client stories">
          <Container size="lg">
            <div className="mb-10 sm:mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-text mb-2 tracking-tight">
                Featured client stories
              </h2>
              <p className="text-sm sm:text-base text-text-muted font-light">
                Appointments photographed on our salon floor in Pant Nagar.
              </p>
            </div>

            <div className="space-y-16 sm:space-y-20">
              {featuredResults.map((item, idx) => {
                const matchedReview = googleReviews.find((r) => r.id === item.reviewId);
                const reviewText = matchedReview?.text || '';
                const isEven = idx % 2 === 1;

                return (
                  <article
                    key={item.id}
                    className={`flex flex-col ${
                      isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                    } items-center gap-8 lg:gap-14 pb-16 sm:pb-20 border-b border-border/40 last:border-b-0 last:pb-0`}
                  >
                    {/* Large Real Photo */}
                    <div className="w-full md:w-5/12 lg:w-5/12 shrink-0">
                      <div className="aspect-[4/5] rounded-sm overflow-hidden border border-line bg-surface">
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          width={600}
                          height={750}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>

                    {/* Editorial Content */}
                    <div className="w-full md:w-7/12 lg:w-7/12 text-left">
                      <span className="text-xs uppercase tracking-luxury text-gold font-medium block mb-3">
                        {item.service}
                      </span>

                      <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-text leading-relaxed font-normal mb-6 italic">
                        “{reviewText}”
                      </blockquote>

                      <div className="mb-6">
                        <div className="font-sans font-semibold text-base text-text">
                          {item.clientName}
                        </div>
                        <div className="text-xs text-text-muted mt-0.5">
                          Google review · Ghatkopar East
                        </div>
                      </div>

                      <a
                        href={buildWhatsAppLink({ message: item.whatsappMessage })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs uppercase tracking-luxury text-gold hover:text-gold-soft font-semibold inline-flex items-center gap-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-sm"
                      >
                        <span>Book this service</span>
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        {/* 3. All Reviews Directory */}
        <section
          className="py-16 sm:py-24 bg-surface border-y border-border/40"
          aria-label="Google reviews directory"
        >
          <Container size="lg">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-xs uppercase tracking-luxury text-gold font-medium block mb-3">
                Google Business Profile
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-text mb-3 tracking-tight">
                Recent Google reviews
              </h2>
              <p className="text-sm sm:text-base text-muted max-w-lg mx-auto font-light leading-relaxed">
                Unedited reviews submitted by clients on our Google Business Profile.
              </p>
            </div>

            {/* 2-Column Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {googleReviews.map((review) => (
                <div key={review.id} className="h-full">
                  <GoogleReviewCard review={review} />
                </div>
              ))}
            </div>

            {/* Read all on Google Link */}
            <div className="text-center mt-12 sm:mt-16">
              <a
                href={googleSummary.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 text-xs uppercase tracking-luxury font-semibold rounded-sm border border-gold-line text-gold-text hover:bg-gold/10 hover:border-gold transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              >
                <span>Read all {googleSummary.count} reviews on Google Maps</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Container>
        </section>

        {/* 4. Asking for Reviews (Plain, Honest Paragraph and One Button) */}
        <section className="py-16 sm:py-24 bg-surface-subtle border-b border-border" aria-label="Review invitation">
          <Container size="md" className="text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-text mb-4 tracking-tight">
              Visited us recently?
            </h2>
            <p className="text-base text-text-muted max-w-lg mx-auto font-light leading-relaxed mb-8">
              If you have visited Angels Salon recently, please consider leaving a review on Google. Your feedback helps our stylists and helps neighbours in Ghatkopar East know what to expect.
            </p>
            <a
              href={googleSummary.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 text-xs uppercase tracking-luxury font-semibold rounded-sm bg-gold text-text hover:bg-gold-soft transition-all duration-200 shadow-sm"
            >
              <span>Review us on Google</span>
              <span aria-hidden="true">↗</span>
            </a>
          </Container>
        </section>

        {/* 5. Salon FAQs (Plain Accordion with Schema) */}
        <section className="py-16 sm:py-24 bg-background border-b border-border" aria-label="Frequently asked questions">
          <Container size="md">
            <div className="text-left mb-10 sm:mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-text mb-2 tracking-tight">
                Frequently asked questions
              </h2>
              <p className="text-sm sm:text-base text-text-muted font-light">
                Common questions about appointments, consultations, and salon policies.
              </p>
            </div>

            <div className="space-y-3">
              {testimonialFAQs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;

                return (
                  <div
                    key={idx}
                    className="border border-border/70 rounded-sm bg-surface overflow-hidden transition-colors shadow-card-light"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-base sm:text-lg font-normal text-text">
                        {faq.question}
                      </span>
                      <span
                        className="text-gold-text text-sm font-medium transition-transform duration-200 shrink-0 select-none"
                        aria-hidden="true"
                      >
                        {isOpen ? '—' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-text-muted leading-relaxed font-light border-t border-border/50 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* 6. Closing Booking Link */}
        <section className="py-16 sm:py-24 text-center bg-surface-subtle" aria-label="Book an appointment">
          <Container size="md">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-text mb-3 tracking-tight">
              Ready to book your appointment?
            </h2>
            <p className="text-sm sm:text-base text-text-muted font-light mb-8 max-w-md mx-auto leading-relaxed">
              Appointments and consultations are available daily from 9:30 AM to 9:00 PM at our Pant Nagar salon.
            </p>
            <Button
              as="a"
              href={buildWhatsAppLink({
                message: 'Hi Angels Salon! I would like to book an appointment.',
              })}
              target="_blank"
              rel="noopener noreferrer"
              variant="gold"
              size="md"
              leftIcon={<WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />}
              className="min-h-[48px] px-8 text-xs uppercase tracking-luxury font-semibold shadow-gold-sm"
            >
              Book on WhatsApp
            </Button>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Testimonials;
