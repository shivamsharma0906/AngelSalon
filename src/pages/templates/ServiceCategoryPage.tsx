import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getServiceCategoryBySlug } from '../../data/services';
import { siteConfig } from '../../data/site';
import { buildWhatsAppLink } from '../../lib/whatsapp';
import { SEO, generateFAQSchema } from '../../lib/seo';
import { Container } from '../../components/ui/Container';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';
import { Accordion } from '../../components/ui/Accordion';
import { LaurelDivider } from '../../components/ui/LaurelDivider';
import { WhatsAppIcon } from '../../components/ui/WhatsAppIcon';
import NotFound from '../NotFound';

export const ServiceCategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState('');

  if (!slug) {
    return <NotFound />;
  }

  const category = getServiceCategoryBySlug(slug);

  if (!category) {
    return <NotFound />;
  }

  const filteredServices = searchQuery.trim()
    ? category.services.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : category.services;

  const whatsAppGeneralUrl = buildWhatsAppLink({
    message: `Hi Angel Salon! I would like to inquire about booking services in "${category.name}". Could you please share available slots?`,
  });

  // Structured Data: Service + BreadcrumbList + FAQPage
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` },
      { '@type': 'ListItem', position: 3, name: category.name, item: `${siteConfig.url}/services/${category.slug}` },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: category.name,
    name: category.name,
    description: category.shortDescription,
    provider: {
      '@type': 'HairSalon',
      name: siteConfig.name,
      telephone: siteConfig.contact.phoneDisplay,
      address: siteConfig.branches[0].address.formatted,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${category.name} Services`,
      itemListElement: category.services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.description,
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'INR',
          minPrice: s.startingPrice.replace(/\D/g, ''),
        },
      })),
    },
  };

  const faqSchema = generateFAQSchema(category.faqs);

  const combinedSchema = [breadcrumbSchema, serviceSchema, faqSchema];

  return (
    <>
      <SEO
        title={category.seoTitle}
        description={category.seoDescription}
        canonicalPath={`/services/${category.slug}`}
        schemaData={combinedSchema}
      />

      <main id="main-content" className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-background">
        {/* Breadcrumbs Navigation */}
        <Container size="lg">
          <Breadcrumbs
            items={[
              { label: 'Services', path: '/services' },
              { label: category.name },
            ]}
          />
        </Container>

        {/* Hero Header */}
        <section className="mb-16 text-center">
          <Container size="md">
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-text leading-tight mb-4">
              {category.name}
            </h1>
            <LaurelDivider size="md" />
            <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-light mt-3">
              {category.heroIntro}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                as="a"
                href={whatsAppGeneralUrl}
                target="_blank"
                variant="gold"
                size="md"
                leftIcon={<WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />}
                className="rounded-full shadow-lustre-sm"
              >
                Book {category.name} on WhatsApp
              </Button>
              <Button as="a" href="/contact" variant="outline" size="md" className="rounded-full">
                Salon Directions &amp; Hours
              </Button>
            </div>
          </Container>
        </section>

        {/* Services Menu Grid */}
        <section className="mb-20">
          <Container size="lg">
            <div data-reveal className="mb-10 text-center max-w-xl mx-auto">
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-text tracking-tight">
                Treatment Offerings &amp; Pricing
              </h2>
              <p className="text-sm text-text-muted mt-2 font-light">
                Official transparent rates. Complimentary diagnostic with every appointment.
              </p>

              {category.services.length > 4 && (
                <div className="mt-6 relative max-w-md mx-auto">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search within ${category.name}...`}
                    className="w-full min-h-[44px] bg-surface border border-border rounded-full px-4 py-2.5 pl-10 text-base sm:text-sm text-text placeholder-text-muted focus:outline-none focus:border-gold transition-colors shadow-sm"
                  />
                  <svg
                    className="absolute left-3.5 top-3.5 text-text-muted w-4 h-4 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" strokeWidth="2"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2"></line>
                  </svg>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="w-11 h-11 absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center text-xs text-text-muted hover:text-gold"
                      aria-label="Clear search"
                    >
                      Clear
                    </button>
                  )}
                </div>
              )}
            </div>

            {filteredServices.length === 0 ? (
              <div className="text-center py-12 text-text-muted">
                <p>No services found matching "{searchQuery}".</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-gold text-sm underline hover:text-gold-soft"
                >
                  View all {category.services.length} services
                </button>
              </div>
            ) : (
              <div data-reveal data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {filteredServices.map((service) => {
                  const serviceWaUrl = buildWhatsAppLink({
                    message: `Hi Angel Salon! I would like to book the "${service.name}" treatment (${service.startingPrice}). Could you please share available slots?`,
                  });

                  return (
                    <div
                      key={service.id}
                      data-card-hover
                      className="rounded-[24px] sm:rounded-[28px] bg-surface border border-border hover:border-gold/60 p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 shadow-lustre-sm hover:shadow-lustre-md"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-surface-subtle text-text-muted border border-border">
                            ⏱ {service.duration}
                          </span>
                          <span className="font-serif text-2xl font-bold text-gold-text tracking-tight">
                            {service.startingPrice}
                          </span>
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-text mb-2 group-hover:text-gold-text transition-colors tracking-tight">
                          {service.name}
                        </h3>

                        <p className="text-sm text-text-muted leading-relaxed mb-4">
                          {service.description}
                        </p>

                        <ul className="space-y-1.5 mb-6 text-xs text-text-muted">
                          {service.highlights.map((hl, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="text-gold-text font-bold">✓</span>
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center gap-3">
                        <Button
                          as="a"
                          href={serviceWaUrl}
                          target="_blank"
                          variant="gold"
                          size="sm"
                          fullWidth
                          className="rounded-full shadow-lustre-sm"
                          leftIcon={<WhatsAppIcon className="w-3.5 h-3.5 fill-current shrink-0" />}
                        >
                          Book Treatment
                        </Button>
                        <Button
                          as="a"
                          href="/contact"
                          variant="outline"
                          size="sm"
                          fullWidth
                          className="rounded-full"
                        >
                          Check Availability
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </section>

        {/* Process / What to Expect */}
        <section className="mb-20 bg-surface border-y border-border py-16">
          <Container size="lg">
            <SectionHeading
              subtitle="The Angel Protocol"
              title="What to Expect During Your Appointment"
              description="A calibrated luxury journey executed with single-use sanitation and bespoke care."
              align="center"
            />

            <div data-reveal data-reveal-stagger className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {category.processSteps.map((step) => (
                <div key={step.step} data-card-hover className="p-4 sm:p-6 bg-surface border border-border rounded-[20px] sm:rounded-[24px] shadow-lustre-sm hover:border-gold/50 transition-all">
                  <span className="font-serif text-2xl sm:text-3xl font-normal text-gold-text block mb-1 sm:mb-2">
                    {step.step}
                  </span>
                  <h3 className="font-serif text-sm sm:text-lg font-bold text-text mb-1 sm:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 4-Image Category Transformation Gallery */}
        <section className="mb-20">
          <Container size="lg">
            <div data-reveal>
              <SectionHeading
                subtitle="Real Results"
                title={`${category.name} Transformations`}
                description="Real captures of client styling and salon transformations."
                align="center"
              />
            </div>

            <div data-reveal data-reveal-stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {category.galleryImages.map((img, idx) => (
                <div key={idx} data-reveal="image" className="group aspect-square rounded-[20px] sm:rounded-[24px] overflow-hidden border border-gold/40 hover:border-gold bg-surface-subtle relative shadow-lustre-sm transition-all">
                  <img
                    src={img.image}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Category FAQs */}
        <section className="mb-20" data-reveal>
          <Container size="md">
            <SectionHeading
              subtitle="Common Inquiries"
              title="Frequently Asked Questions"
              align="center"
            />
            <Accordion items={category.faqs} />
          </Container>
        </section>

        {/* Related Categories & Parent Link */}
        <section className="mb-12" data-reveal>
          <Container size="lg">
            <div className="p-8 sm:p-10 rounded-[28px] bg-surface border border-gold/30 hover:border-gold/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lustre-sm transition-colors" data-card-hover>
              <div>
                <h3 className="font-serif text-2xl font-bold text-text">
                  Looking for Other Hair &amp; Beauty Care?
                </h3>
                <p className="text-xs sm:text-sm text-text-muted mt-1">
                  Discover our full suite of luxury salon services or consult with our master directors.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button as="a" href="/services" variant="outline" size="sm" className="rounded-full">
                  &larr; All Services
                </Button>
                <Button
                  as="a"
                  href={whatsAppGeneralUrl}
                  target="_blank"
                  variant="gold"
                  size="sm"
                  data-btn-sweep
                  className="rounded-full shadow-lustre-sm"
                >
                  Consult on WhatsApp
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default ServiceCategoryPage;
