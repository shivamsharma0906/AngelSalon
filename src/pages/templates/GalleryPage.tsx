import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { galleryItems, galleryFilters, videosData, GalleryCategory, GalleryItem } from '../../data/gallery';
import { siteConfig } from '../../data/site';

import { SEO, generateVideoSchema } from '../../lib/seo';
import { Container } from '../../components/ui/Container';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Lightbox } from '../../components/ui/Lightbox';
import { YouTubeFacade } from '../../components/ui/YouTubeFacade';
import { LaurelDivider } from '../../components/ui/LaurelDivider';
import NotFound from '../NotFound';

export const GalleryPage: React.FC = () => {
  const { variant } = useParams<{ variant: string }>();

  // State for Pictures variant
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Validate variant
  if (!variant || !['recent-work', 'pictures', 'videos'].includes(variant)) {
    return <NotFound />;
  }

  // Variant Configuration
  const variantConfig = {
    'recent-work': {
      title: 'Recent Work & Transformations',
      subtitle: 'Fresh Client Artistry',
      intro: 'Explore signature before-and-after moments, balayage refinements, and bespoke haircuts completed recently in our Ghatkopar East salon.',
      seoTitle: 'Recent Transformations & Work | Angels Salon Mumbai',
      seoDescription: 'View recent hair transformations, balayage results, and bridal styling completed at Angels Salon in Ghatkopar East, Mumbai.',
    },
    'pictures': {
      title: 'Portfolio Pictures & Looks',
      subtitle: 'Curated High-Resolution Stills',
      intro: 'Filter through our comprehensive visual archive of precision layering, vibrant colours, royal bridal looks, and salon ambiance.',
      seoTitle: 'Portfolio Photos & Looks | Angels Salon Mumbai',
      seoDescription: 'High-resolution photo portfolio of luxury haircuts, hair colours, bridal couture, and nail art at Angels Salon Mumbai.',
    },
    'videos': {
      title: 'Styling Videos & Masterclasses',
      subtitle: 'Motion & Technique Showcase',
      intro: 'Watch behind-the-scenes balayage placements, bridal draping step-by-steps, and academy student practical walkthroughs.',
      seoTitle: 'Hair & Bridal Videos & Tutorials | Angels Salon',
      seoDescription: 'Watch hair tutorials, balayage transformations, and academy live demos from Angels Salon & Academy Mumbai.',
    },
  }[variant as 'recent-work' | 'pictures' | 'videos'];

  // Filtered pictures for 'pictures' variant
  const filteredPictures = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter((i) => i.category === activeFilter);

  // Curated recent work (takes 6 items with stories)
  const recentWorkItems = galleryItems.slice(0, 6);

  // Structured Data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Style Gallery', item: `${siteConfig.url}/style-gallery` },
      { '@type': 'ListItem', position: 3, name: variantConfig.title, item: `${siteConfig.url}/style-gallery/${variant}` },
    ],
  };

  const schemaData = variant === 'videos'
    ? [breadcrumbSchema, ...generateVideoSchema(videosData)]
    : breadcrumbSchema;

  return (
    <>
      <SEO
        title={variantConfig.seoTitle}
        description={variantConfig.seoDescription}
        canonicalPath={`/style-gallery/${variant}`}
        schemaData={schemaData}
      />

      <main id="main-content" className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-ink">
        {/* Breadcrumbs Navigation */}
        <Container size="lg">
          <Breadcrumbs
            items={[
              { label: 'Style Gallery', path: '/style-gallery' },
              { label: variantConfig.title },
            ]}
          />
        </Container>

        {/* Page Hero Header */}
        <section className="mb-12 sm:mb-16 text-center">
          <Container size="md">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-luxury text-gold mb-3 inline-block">
              {variantConfig.subtitle}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text leading-tight mb-4">
              {variantConfig.title}
            </h1>
            <LaurelDivider size="md" />
            <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-light mt-3">
              {variantConfig.intro}
            </p>
          </Container>
        </section>

        {/* 1. VARIANT: RECENT WORK (Curated Transformation Grid with Case Notes) */}
        {variant === 'recent-work' && (
          <section className="mb-20">
            <Container size="lg">
              <div data-reveal data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentWorkItems.map((item, idx) => (
                  <Card key={item.id} data-card-hover className="overflow-hidden flex flex-col justify-between group">
                    <div>
                      {/* Image Frame */}
                      <div
                        data-reveal="image"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsLightboxOpen(true);
                        }}
                        className="relative aspect-square w-full overflow-hidden bg-ink cursor-pointer border-b border-border"
                      >
                        <img
                          src={item.image}
                          alt={item.alt}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 bg-ink/80 backdrop-blur-sm border border-gold/40 text-[10px] uppercase tracking-luxury font-bold text-gold px-2.5 py-1 rounded-sm">
                          Case Study #{idx + 1}
                        </div>
                      </div>

                      {/* Content & Transformation Notes */}
                      <div className="p-6">
                        <span className="text-xs uppercase tracking-luxury text-gold font-semibold mb-1 block">
                          {item.categoryLabel}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-text mb-2">
                          {item.title}
                        </h3>
                        {item.clientStory && (
                          <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4 italic">
                            "{item.clientStory}"
                          </p>
                        )}
                        {item.serviceRendered && (
                          <div className="text-xs text-text-subtle border-t border-border/80 pt-3">
                            <strong className="text-text font-medium">Service Executed:</strong> {item.serviceRendered}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <Button
                        as="a"
                        href="/services"
                        variant="outline"
                        size="sm"
                        fullWidth
                      >
                        View Similar Services
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* 2. VARIANT: PICTURES (Filterable Masonry with Lightbox) */}
        {variant === 'pictures' && (
          <section className="mb-20">
            <Container size="lg">
              {/* Category Filter Pills (min 40px touch targets) */}
              <div data-reveal className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-8 sm:mb-10 gap-2 sm:gap-2.5 no-scrollbar">
                {galleryFilters.map((filter) => {
                  const isActive = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setActiveFilter(filter.id)}
                      className={`min-h-[40px] shrink-0 px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm uppercase tracking-luxury font-medium rounded-full transition-all duration-200 border ${
                        isActive
                          ? 'bg-gold text-ink font-bold border-gold shadow-gold-sm'
                          : 'bg-surface text-text-muted border-border hover:text-text hover:border-gold/40'
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>

              {/* Grid: 2-Column on Mobile, 3-Column on Desktop */}
              <div data-reveal data-reveal-stagger className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                {filteredPictures.map((item) => (
                  <div
                    key={item.id}
                    data-card-hover
                    onClick={() => {
                      setSelectedItem(item);
                      setIsLightboxOpen(true);
                    }}
                    className="group relative aspect-square rounded-sm overflow-hidden bg-surface cursor-pointer border border-border hover:border-gold/60 transition-all duration-300 shadow-card-dark"
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Touch-Friendly Caption Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent opacity-90 sm:opacity-80 sm:group-hover:opacity-100 transition-opacity p-2.5 sm:p-5 flex flex-col justify-end">
                      <span className="text-[9.5px] sm:text-xs uppercase tracking-luxury text-gold font-semibold mb-0.5 sm:mb-1 truncate">
                        {item.categoryLabel}
                      </span>
                      <h3 className="font-serif text-xs sm:text-xl font-bold text-text mb-0.5 sm:mb-1 truncate">
                        {item.title}
                      </h3>
                      <p className="hidden sm:block text-xs text-text-muted line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-2 hidden sm:flex items-center text-xs text-gold gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="font-semibold uppercase tracking-wider">Tap to View Full Size</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <polyline points="9 21 3 21 3 15"></polyline>
                          <line x1="21" y1="3" x2="14" y2="10"></line>
                          <line x1="3" y1="21" x2="10" y2="14"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* 3. VARIANT: VIDEOS (High-Performance YouTube Facade Grid) */}
        {variant === 'videos' && (
          <section className="mb-20">
            <Container size="lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videosData.map((video) => (
                  <YouTubeFacade key={video.id} video={video} />
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Bottom Navigation between Gallery Variants */}
        <section className="mt-12">
          <Container size="lg">
            <div className="p-8 sm:p-10 rounded-sm bg-surface border border-border flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-luxury text-gold font-semibold mb-1 block">
                  Style Gallery Navigation
                </span>
                <h3 className="font-serif text-2xl font-bold text-text">
                  Switch Visual Formats
                </h3>
                <p className="text-xs sm:text-sm text-text-muted mt-1">
                  Explore our photo portfolio, client case studies, or educational video reels.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button as="a" href="/style-gallery/recent-work" variant={variant === 'recent-work' ? 'gold' : 'outline'} size="sm">
                  Recent Work
                </Button>
                <Button as="a" href="/style-gallery/pictures" variant={variant === 'pictures' ? 'gold' : 'outline'} size="sm">
                  Pictures
                </Button>
                <Button as="a" href="/style-gallery/videos" variant={variant === 'videos' ? 'gold' : 'outline'} size="sm">
                  Videos
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* Accessible Lightbox Modal */}
      <Lightbox
        item={selectedItem}
        items={variant === 'recent-work' ? recentWorkItems : filteredPictures}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(newItem) => setSelectedItem(newItem)}
      />
    </>
  );
};

export default GalleryPage;
