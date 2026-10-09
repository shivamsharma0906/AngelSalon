import React from 'react';
import { useParams } from 'react-router-dom';
import { getCourseCategoryBySlug } from '../../data/courses';
import { siteConfig } from '../../data/site';
import { buildCourseEnquiryLink, buildWhatsAppLink } from '../../lib/whatsapp';
import { SEO, generateCourseSchema, generateFAQSchema } from '../../lib/seo';
import { Container } from '../../components/ui/Container';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Accordion } from '../../components/ui/Accordion';
import { LaurelDivider } from '../../components/ui/LaurelDivider';
import NotFound from '../NotFound';

export const CourseCategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <NotFound />;
  }

  const category = getCourseCategoryBySlug(slug);

  if (!category) {
    return <NotFound />;
  }

  const whatsAppGeneralUrl = buildWhatsAppLink({
    message: `Hello Angels Academy! I am interested in enrolling in your "${category.name}". Could you please share the upcoming batch schedule and fee structure?`,
  });

  // Structured Data: BreadcrumbList + Course schemas + FAQPage
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Academy', item: `${siteConfig.url}/academy` },
      { '@type': 'ListItem', position: 3, name: category.name, item: `${siteConfig.url}/academy/${category.slug}` },
    ],
  };

  const courseSchemas = generateCourseSchema(category.courses);
  const faqSchema = generateFAQSchema(category.faqs);

  const combinedSchema = [breadcrumbSchema, ...courseSchemas, faqSchema];

  return (
    <>
      <SEO
        title={category.seoTitle}
        description={category.seoDescription}
        canonicalPath={`/academy/${category.slug}`}
        schemaData={combinedSchema}
      />

      <main id="main-content" className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-background">
        {/* Breadcrumbs Navigation */}
        <Container size="lg">
          <Breadcrumbs
            items={[
              { label: 'Academy', path: '/academy' },
              { label: category.name },
            ]}
          />
        </Container>

        {/* Hero Header */}
        <section className="mb-16 text-center">
          <Container size="md">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-luxury text-gold-text mb-3 inline-block">
              Government Recognized Diploma Programs
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text leading-tight mb-4">
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
                variant="whatsapp"
                size="md"
              >
                Inquire on WhatsApp
              </Button>
              <Button as="a" href="#comparison" variant="outline" size="md">
                Compare Curriculum Table
              </Button>
            </div>
          </Container>
        </section>

        {/* Course Cards List */}
        <section className="mb-20">
          <Container size="lg">
            <div data-reveal data-reveal-stagger className="space-y-8">
              {category.courses.map((course) => {
                const courseWaUrl = buildCourseEnquiryLink(course.name);

                return (
                  <div
                    key={course.id}
                    data-card-hover
                    className="bg-surface border border-border hover:border-gold/50 rounded-sm p-6 sm:p-10 transition-all duration-300 shadow-card-dark"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6 pb-6 border-b border-border">
                      <div className="max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2.5 mb-3">
                          <Badge variant="gold">{course.level}</Badge>
                          <span className="text-xs text-text-muted uppercase tracking-wider">
                            ⏱ {course.duration}
                          </span>
                          {course.badge && (
                            <span className="bg-gold text-text text-[10px] font-bold uppercase tracking-luxury px-2 py-0.5 rounded-full">
                              {course.badge}
                            </span>
                          )}
                        </div>

                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-3">
                          {course.name}
                        </h2>

                        <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                          {course.overview}
                        </p>
                      </div>

                      {/* Course Fee Card */}
                      <div className="shrink-0 flex flex-col sm:items-end bg-surface-elevated p-5 rounded-sm border border-border/80">
                        <span className="text-xs uppercase tracking-luxury text-text-muted mb-1">
                          Total Course Fee
                        </span>
                        <span className="font-serif text-3xl sm:text-4xl font-bold text-gold mb-1">
                          {course.fee}
                        </span>
                        {course.feeNote && (
                          <span className="text-xs text-text-subtle mb-4 sm:text-right">
                            {course.feeNote}
                          </span>
                        )}

                        <Button
                          as="a"
                          href={courseWaUrl}
                          target="_blank"
                          variant="whatsapp"
                          size="md"
                          fullWidth
                        >
                          Enquire on WhatsApp
                        </Button>
                      </div>
                    </div>

                    {/* Syllabus Highlights & Certification Inclusions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-text mb-3 flex items-center gap-2">
                          <span className="text-gold">✦</span> Core Syllabus Modules
                        </h3>
                        <ul className="space-y-2 text-text-muted">
                          {course.syllabusHighlights.map((topic, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="text-gold text-xs mt-1">▪</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-border md:pl-6 pt-4 md:pt-0">
                        <div>
                          <h3 className="font-serif text-lg font-bold text-text mb-3 flex items-center gap-2">
                            <span className="text-gold">✦</span> Certification & Inclusions
                          </h3>
                          <p className="text-text-muted mb-3">
                            <strong className="text-text block mb-1">Certification:</strong>
                            {course.certificateInfo}
                          </p>
                          <p className="text-text-muted mb-3">
                            <strong className="text-text block mb-1">Studio Practice:</strong>
                            {course.practicalTrainingHours}
                          </p>
                          {course.includesKit && (
                            <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold bg-gold/10 px-3 py-1 rounded-sm border border-gold/30">
                              ✓ Professional Student Tool Kit Included Free
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Course Comparison Table (Scrolls in container on mobile) */}
        <section className="mb-20" id="comparison" data-reveal>
          <Container size="lg">
            <SectionHeading
              subtitle="Curriculum Breakdown"
              title="Compare Program Features"
              description="Review side-by-side training depth, tool inclusions, and career placement support."
              align="center"
            />

            <div className="relative rounded-sm border border-border bg-surface shadow-card-light overflow-hidden">
              <div className="w-full overflow-x-auto no-scrollbar scroll-smooth">
                <table className="w-full text-left text-sm border-collapse min-w-[540px]">
                  <thead>
                    <tr className="border-b border-border bg-surface-subtle">
                      <th scope="col" className="p-4 sm:p-5 font-serif text-base text-gold-text uppercase tracking-wider">
                        Course Features
                      </th>
                      <th scope="col" className="p-4 sm:p-5 font-serif text-base text-text font-bold">
                        {category.comparisonTable.courseAName}
                      </th>
                      <th scope="col" className="p-4 sm:p-5 font-serif text-base text-text font-bold">
                        {category.comparisonTable.courseBName}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {category.comparisonTable.rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface-elevated/50 transition-colors">
                        <td className="p-4 sm:p-5 font-medium text-text">
                          {row.feature}
                        </td>
                        <td className="p-4 sm:p-5 text-text-muted">
                          {row.courseA}
                        </td>
                        <td className="p-4 sm:p-5 text-text-muted">
                          {row.courseB}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Subtle edge fade indicator for horizontal scroll on phones */}
              <div className="pointer-events-none md:hidden absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-surface to-transparent" />
            </div>

            <div className="md:hidden flex items-center justify-center gap-1.5 text-[11px] text-text-subtle mt-2">
              <span>← Swipe table horizontally to compare →</span>
            </div>
          </Container>
        </section>

        {/* Student Work Gallery */}
        <section className="mb-20" data-reveal>
          <Container size="lg">
            <SectionHeading
              subtitle="Student Portfolios"
              title="Real Student Transformations"
              description="Supervised live client practical work completed by our diploma students."
              align="center"
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6" data-reveal-stagger>
              {category.studentWorkGallery.map((item, idx) => (
                <div key={idx} data-card-hover className="group aspect-square rounded-sm overflow-hidden border border-border bg-surface relative">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-2.5 sm:p-4 flex items-end">
                    <span className="text-[11px] sm:text-xs font-semibold text-text truncate">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQs */}
        <section className="mb-20" data-reveal>
          <Container size="md">
            <SectionHeading
              subtitle="Course Admissions"
              title="Frequently Asked Questions"
              align="center"
            />
            <Accordion items={category.faqs} />
          </Container>
        </section>

        {/* Related Programs & Back Link */}
        <section className="mb-12" data-reveal>
          <Container size="lg">
            <div className="p-8 sm:p-10 rounded-sm bg-surface border border-border flex flex-col md:flex-row items-center justify-between gap-6" data-card-hover>
              <div>
                <span className="text-xs uppercase tracking-luxury text-gold font-semibold mb-1 block">
                  Angels Academy of Hair & Beauty
                </span>
                <h3 className="font-serif text-2xl font-bold text-text">
                  Need Personalized Career Counseling?
                </h3>
                <p className="text-xs sm:text-sm text-text-muted mt-1">
                  Speak directly with our Academy Director to inspect the classroom and choose the best path.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button as="a" href="/academy" variant="outline" size="sm">
                  ← Academy Overview
                </Button>
                <Button
                  as="a"
                  href={whatsAppGeneralUrl}
                  target="_blank"
                  variant="gold"
                  size="sm"
                  data-btn-sweep
                >
                  Speak with Counselor
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default CourseCategoryPage;
