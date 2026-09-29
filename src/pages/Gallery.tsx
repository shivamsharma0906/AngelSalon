import React from 'react';
import { SEO } from '../lib/seo';
import { siteConfig } from '../data/site';
import { Container } from '../components/ui/Container';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LaurelDivider } from '../components/ui/LaurelDivider';

export const Gallery: React.FC = () => {
  const gallerySections = [
    {
      title: "Recent Work & Transformations",
      path: "/style-gallery/recent-work",
      image: "/images/gallery_hair.jpg",
      alt: "Recent client hair transformation preview",
      description: "Signature client case studies with detailed before-and-after notes, cut architecture, and colour formulation stories.",
      badge: "Case Studies",
    },
    {
      title: "Portfolio Pictures & Looks",
      path: "/style-gallery/pictures",
      image: "/images/hero_bg.jpg",
      alt: "Curated high-resolution portfolio photos",
      description: "Our comprehensive, high-resolution photo archive filterable across Hair, French Balayage, Bridal Couture, Nails, and Ambiance.",
      badge: "Photo Archive",
    },
    {
      title: "Videos & Reels",
      path: "/style-gallery/videos",
      image: "/images/gallery_bridal.jpg",
      alt: "Styling and masterclass video reels",
      description: "Step inside our salon and academy through video tutorials, balayage freehand painting reels, and student live model classes.",
      badge: "Motion & Reels",
    },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Style Gallery', item: `${siteConfig.url}/style-gallery` },
    ],
  };

  return (
    <>
      <SEO
        title="Style Gallery Overview | Angels Salon Mumbai"
        description="Explore our visual archives: Recent Work, Portfolio Pictures, and Styling Videos at Angels Salon & Academy Mumbai."
        canonicalPath="/style-gallery"
        schemaData={breadcrumbSchema}
      />

      <main id="main-content" className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-ink">
        {/* Breadcrumbs Navigation */}
        <Container size="lg">
          <Breadcrumbs items={[{ label: 'Style Gallery' }]} />
        </Container>

        {/* Page Hero Header */}
        <section className="text-center mb-14 sm:mb-18">
          <Container size="md">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-luxury text-gold mb-3 inline-block">
              Visual Excellence & Artistry
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text leading-tight mb-4">
              Style Gallery
            </h1>
            <LaurelDivider size="md" />
            <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-light mt-3">
              Immerse yourself in our creative sanctuary. Browse signature client transformations, high-resolution photo archives, and behind-the-scenes video masterclasses.
            </p>
          </Container>
        </section>

        {/* 3 Child Cards Grid */}
        <section className="mb-20">
          <Container size="lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-reveal-stagger>
              {gallerySections.map((sec) => (
                <Card
                  key={sec.path}
                  data-card-hover
                  className="overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-ink border-b border-border">
                      <img
                        src={sec.image}
                        alt={sec.alt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 right-3 bg-ink/90 border border-gold/40 text-[10px] font-bold uppercase tracking-luxury text-gold px-2.5 py-0.5 rounded-sm">
                        {sec.badge}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="font-serif text-2xl font-bold text-text mb-2.5 group-hover:text-gold transition-colors">
                        {sec.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4">
                        {sec.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-border/60">
                    <Button
                      as="a"
                      href={sec.path}
                      variant="outline"
                      size="sm"
                      fullWidth
                      rightIcon={
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      }
                    >
                      Explore {sec.badge}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Closing Action Banner */}
        <section className="text-center" data-reveal>
          <Container size="md">
            <div className="p-8 sm:p-12 rounded-sm bg-surface border border-gold/30 shadow-card-dark" data-card-hover>
              <span className="text-xs uppercase tracking-luxury text-gold font-semibold mb-2 block">
                Inspired By What You See?
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-3">
                Let Us Craft Your Signature Look
              </h2>
              <p className="text-sm sm:text-base text-text-muted mb-8 leading-relaxed max-w-xl mx-auto">
                Bring any photo from our style gallery to your appointment. Our artistic directors will customize the cut and colour to your natural features.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  as="a"
                  href="/contact"
                  variant="gold"
                  size="lg"
                >
                  Book an Appointment
                </Button>
                <Button as="a" href="/services" variant="outline" size="lg">
                  Explore Services & Pricing
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Gallery;
