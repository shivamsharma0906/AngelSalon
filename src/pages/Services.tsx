import React from 'react';
import { SEO, generateLocalBusinessSchema } from '../lib/seo';
import { serviceCategoriesData } from '../data/services';
import { buildWhatsAppLink } from '../lib/whatsapp';
import { Container } from '../components/ui/Container';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LaurelDivider } from '../components/ui/LaurelDivider';
import { SpecialOffers } from '../components/sections/SpecialOffers';

export const Services: React.FC = () => {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      <SEO
        title="Luxury Salon Services & Menu | Angels Mumbai"
        description="Explore our complete menu of precision haircuts, French balayage, executive barbering, keratin smoothing, and bridal couture at Angels Salon Mumbai."
        canonicalPath="/services"
        schemaData={localBusinessSchema}
      />

      <main id="main-content" className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-background">
        {/* Breadcrumbs Navigation */}
        <Container size="lg">
          <Breadcrumbs items={[{ label: 'Services' }]} />
        </Container>

        {/* Page Hero Header */}
        <section className="text-center mb-14 sm:mb-18">
          <Container size="md">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-luxury text-gold-text mb-3 inline-block">
              Haute Coiffure & Beauty Rituals
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text leading-tight mb-4">
              Our Salon Services
            </h1>
            <LaurelDivider size="md" />
            <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-light mt-3">
              Every appointment is a restorative ritual. Explore our specialized services below to discover detailed menus, pricing, process guides, and real transformations.
            </p>
          </Container>
        </section>

        {/* 8 Child Category Overview Cards Grid */}
        <section className="mb-20 sm:mb-24">
          <Container size="lg">
            <div data-reveal data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {serviceCategoriesData.map((cat) => (
                <Card
                  key={cat.slug}
                  data-card-hover
                  className="overflow-hidden flex flex-col justify-between group shadow-card-light border border-gold-line/40 hover:border-gold transition-all duration-300 h-full"
                >
                  <div className="flex flex-col flex-1">
                    {/* Category Cover Image Frame */}
                    <div className="relative aspect-[16/10] sm:aspect-[3/2] w-full overflow-hidden bg-surface-subtle border-b border-border">
                      <img
                        src={cat.overviewImage}
                        alt={`${cat.name} at Angels Salon Mumbai`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-sm border border-gold-line/40 text-[11px] font-medium text-gold shadow-sm">
                        {cat.services.length} Treatments
                      </div>
                    </div>

                    {/* Card Content with Clear Typographic Hierarchy */}
                    <div className="p-6 sm:p-7 flex flex-col flex-1">
                      <div className="mb-3">
                        <span className="text-[11px] font-semibold uppercase tracking-luxury text-gold-text block mb-1.5">
                          Salon Category
                        </span>
                        <h2 className="font-serif text-2xl font-bold text-text group-hover:text-gold transition-colors tracking-tight">
                          {cat.name}
                        </h2>
                      </div>

                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-2 mb-5">
                        {cat.shortDescription}
                      </p>

                      {/* Featured Treatments Pills */}
                      <div className="mt-auto pt-4 border-t border-border/60">
                        <span className="text-[11px] uppercase tracking-luxury text-gold-text font-semibold block mb-2">
                          Popular Services
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.services.slice(0, 3).map((s) => (
                            <span
                              key={s.id}
                              className="text-[11px] sm:text-xs px-2.5 py-1 rounded-sm bg-surface-subtle border border-border text-text font-normal truncate max-w-full"
                            >
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-6 pt-0 sm:p-7 sm:pt-0">
                    <Button
                      as="a"
                      href={`/services/${cat.slug}`}
                      variant="gold"
                      size="md"
                      fullWidth
                      className="min-h-[46px] text-xs uppercase tracking-luxury font-semibold shadow-gold-sm hover:shadow-gold-md"
                      rightIcon={
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      }
                    >
                      Explore Menu &amp; Pricing
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Special Offers Section */}
        <SpecialOffers className="mb-20" />

        {/* Personalized Consultation Callout */}
        <section data-reveal className="text-center">
          <Container size="md">
            <div className="p-8 sm:p-12 rounded-sm bg-surface border border-gold/30 shadow-card-light">
              <span className="text-xs uppercase tracking-luxury text-gold-text font-semibold mb-2 block">
                Complimentary Styling Advice
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-3">
                Unsure Which Service Suits You?
              </h2>
              <p className="text-sm sm:text-base text-text-muted mb-8 leading-relaxed max-w-xl mx-auto">
                Our master stylists provide one-on-one scalp, texture, and facial contour evaluations to design your tailored transformation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  as="a"
                  href={buildWhatsAppLink({
                    message: "Hi Angels Salon! I would like to schedule a personal hair & beauty consultation.",
                  })}
                  target="_blank"
                  variant="whatsapp"
                  size="lg"
                  data-btn-sweep
                  className="w-full sm:w-auto min-h-[48px]"
                >
                  Book on WhatsApp
                </Button>
                <Button as="a" href="/contact" variant="outline" size="lg" className="w-full sm:w-auto min-h-[48px]">
                  Visit Our Salon
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Services;
