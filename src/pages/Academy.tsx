import React from 'react';
import { SEO, generateCourseSchema, generateFAQSchema } from '../lib/seo';
import { academyData } from '../data/courses';
import { siteConfig } from '../data/site';
import { buildWhatsAppLink } from '../lib/whatsapp';
import { Container } from '../components/ui/Container';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Accordion } from '../components/ui/Accordion';
import { LaurelDivider } from '../components/ui/LaurelDivider';

export const Academy: React.FC = () => {
  const courseCategoryCards = [
    {
      title: "Professional Hair Courses",
      slug: "hair-courses",
      path: "/academy/hair-courses",
      image: "/images/academy_training.jpg",
      alt: "Hairdressing students learning precision scissor haircutting",
      description: "From foundational trichology to Vidal Sassoon geometry, French balayage, and chemical keratin textures with 80% practical live client practice.",
      badge: "Hairdressing Diplomas",
    },
    {
      title: "Professional Makeup Courses",
      slug: "makeup-courses",
      path: "/academy/makeup-courses",
      image: "/images/gallery_bridal.jpg",
      alt: "Student bridal couture makeup and saree draping",
      description: "Command high-ticket bridal bookings with advance HD airbrush techniques, traditional Nauvari/Gujarati saree draping, and Russian nail art.",
      badge: "Bridal Artistry Diplomas",
    },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Academy', item: `${siteConfig.url}/academy` },
    ],
  };

  const courseSchemas = generateCourseSchema(academyData.courses);
  const faqSchema = generateFAQSchema(academyData.faqs);

  const combinedSchema = [breadcrumbSchema, ...courseSchemas, faqSchema];

  return (
    <>
      <SEO
        title="Hair & Beauty Academy Mumbai | Angels"
        description="Launch an international styling career with Angels Academy in Ghatkopar East. Government-recognized hair and bridal makeup diplomas with 100% placement support."
        canonicalPath="/academy"
        schemaData={combinedSchema}
      />

      <main id="main-content" className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-background">
        {/* Breadcrumbs Navigation */}
        <Container size="lg">
          <Breadcrumbs items={[{ label: 'Academy' }]} />
        </Container>

        {/* Page Hero Header */}
        <section className="text-center mb-14 sm:mb-18">
          <Container size="md">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-luxury text-gold-text mb-3 inline-block">
              Government Recognized & ISO Certified
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text leading-tight mb-4">
              Angels Academy of Hair & Beauty
            </h1>
            <LaurelDivider size="md" />
            <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-light mt-3">
              {academyData.heroDescription}
            </p>
          </Container>
        </section>

        {/* 2 Child Courses Category Cards */}
        <section className="mb-20">
          <Container size="lg">
            <div data-reveal data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {courseCategoryCards.map((category) => (
                <Card
                  key={category.slug}
                  data-card-hover
                  className="overflow-hidden flex flex-col justify-between group shadow-card-light"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div data-reveal="image" className="relative aspect-[16/10] w-full overflow-hidden bg-surface-subtle border-b border-border">
                      <img
                        src={category.image}
                        alt={category.alt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 right-3 bg-dark/90 border border-gold/40 text-[10px] font-bold uppercase tracking-luxury text-gold-light px-2.5 py-0.5 rounded-sm">
                        {category.badge}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-3 group-hover:text-gold-text transition-colors">
                        {category.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 pt-0 border-t border-border/60">
                    <Button
                      as="a"
                      href={category.path}
                      variant="outline"
                      size="md"
                      fullWidth
                      className="min-h-[44px]"
                      rightIcon={
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      }
                    >
                      Explore {category.badge}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Why Learn at Angels */}
        <section className="mb-20 bg-surface-subtle border-y border-border py-16">
          <Container size="lg">
            <SectionHeading
              subtitle="The Academy Advantage"
              title="Why Study at Angels?"
              align="center"
            />

            <div data-reveal data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {academyData.whyLearnPoints.map((point, index) => (
                <Card key={index} data-card-hover className="p-6 flex flex-col justify-between shadow-card-light">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center font-serif text-xl font-bold text-gold-text mb-4">
                      0{index + 1}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-text mb-2.5">
                      {point.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Student Placements Section */}
        <section className="mb-20">
          <Container size="lg">
            <div data-reveal>
              <SectionHeading
                subtitle="Alumni Success Stories"
                title="Graduates Working Across Mumbai"
                description="Over 500+ successful alumni now working in top-tier luxury salons or running independent bridal businesses."
                align="center"
              />
            </div>

            <div data-reveal data-reveal-stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {academyData.placements.map((placement, idx) => (
                <Card key={idx} data-card-hover className="p-6 sm:p-7 flex flex-col justify-between shadow-card-light">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-luxury text-gold-text font-semibold">
                        {placement.batchYear}
                      </span>
                      <span className="text-xs text-text-muted font-mono">
                        Verified Placement
                      </span>
                    </div>

                    <p className="text-sm text-text-muted leading-relaxed italic mb-6">
                      &ldquo;{placement.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h3 className="font-serif text-lg font-bold text-text">
                      {placement.studentName}
                    </h3>
                    <span className="text-xs text-gold-text font-medium block">
                      {placement.placedRole}
                    </span>
                    <span className="text-xs text-text-muted">
                      {placement.salonPlacement}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Master FAQs */}
        <section className="mb-20">
          <Container size="md" data-reveal>
            <SectionHeading
              subtitle="Common Queries"
              title="Frequently Asked Questions"
              align="center"
            />
            <Accordion items={academyData.faqs} />
          </Container>
        </section>

        {/* Closing Action Banner */}
        <section data-reveal className="text-center">
          <Container size="md">
            <div className="p-8 sm:p-12 rounded-sm bg-surface border border-gold/30 shadow-card-light">
              <span className="text-xs uppercase tracking-luxury text-gold-text font-semibold mb-2 block">
                Admissions Now Open
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-3">
                Begin Your Professional Beauty Career
              </h2>
              <p className="text-sm sm:text-base text-text-muted mb-8 leading-relaxed max-w-xl mx-auto">
                Classes are strictly limited to small batches for direct one-on-one mentorship from our master artistic directors.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  as="a"
                  href={buildWhatsAppLink({
                    message: "Hi Angels Academy! I would like to schedule a campus visit and counseling session.",
                  })}
                  target="_blank"
                  variant="whatsapp"
                  size="lg"
                  data-btn-sweep
                  className="w-full sm:w-auto min-h-[48px]"
                >
                  Apply on WhatsApp
                </Button>
                <Button as="a" href="/academy/hair-courses" variant="outline" size="lg" className="w-full sm:w-auto min-h-[48px]">
                  View Hair Courses
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Academy;
