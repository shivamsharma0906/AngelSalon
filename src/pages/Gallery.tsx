import React, { useState, useMemo } from 'react';
import { SEO } from '../lib/seo';
import { siteConfig } from '../data/site';
import {
  galleryItems,
  galleryFilters,
  GalleryCategory,
  GalleryItem,
} from '../data/gallery';
import { Container } from '../components/ui/Container';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Lightbox } from '../components/ui/Lightbox';
import { LaurelDivider } from '../components/ui/LaurelDivider';
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon';
import { buildWhatsAppLink } from '../lib/whatsapp';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Compute category item counts dynamically
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: galleryItems.length };
    galleryItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter gallery items by active category and search query
  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.serviceRendered && item.serviceRendered.toLowerCase().includes(q)) ||
        (item.clientStory && item.clientStory.toLowerCase().includes(q)) ||
        item.categoryLabel.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  // Open Lightbox handler
  const handleOpenLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsLightboxOpen(true);
  };

  // Structured Data for SEO
  const gallerySchema = useMemo(() => {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Style Gallery',
          item: `${siteConfig.url}/style-gallery`,
        },
      ],
    };

    const imageGallerySchema = {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'Angels Salon & Academy Style Gallery',
      description:
        'Curated authentic portfolio of real client haircuts, balayage hair colour, bridal couture, Russian gel nails, and salon ambiance in Ghatkopar East, Mumbai.',
      url: `${siteConfig.url}/style-gallery`,
      publisher: {
        '@type': 'BeautySalon',
        name: siteConfig.name,
        url: siteConfig.url,
      },
      image: galleryItems.map((item) => ({
        '@type': 'ImageObject',
        contentUrl: `${siteConfig.url}${item.image}`,
        name: item.title,
        caption: item.description,
        description: item.clientStory || item.description,
      })),
    };

    return [breadcrumbSchema, imageGallerySchema];
  }, []);

  return (
    <>
      <SEO
        title="Style Gallery & Real Client Transformations | Angels Salon Mumbai"
        description="Browse all 20 authentic transformations from Angels Salon & Academy in Ghatkopar East: French balayage, haircuts, glass smoothening, bridal couture, Russian nails & special privileges."
        canonicalPath="/style-gallery"
        schemaData={gallerySchema}
      />

      <main id="main-content" className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-background">
        {/* Breadcrumbs Navigation */}
        <Container size="lg">
          <Breadcrumbs items={[{ label: 'Style Gallery' }]} />
        </Container>

        {/* Hero Section */}
        <section className="text-center mb-10 sm:mb-14">
          <Container size="md">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-luxury text-gold-text mb-3 inline-block">
              Authentic Artistry & Client Portfolios
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text leading-tight mb-4">
              Style Gallery
            </h1>
            <LaurelDivider size="md" />
            <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-light mt-3">
              Explore 20 authentic photographs from our Ghatkopar East salon: signature haircuts, mirror-like smoothing, vibrant balayage, royal bridal styling, gel nail extensions, and verified salon privileges.
            </p>

            {/* Trust Highlights Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs text-text-muted">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border shadow-sm">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0"></span>
                <span>20 Real Photographs</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border shadow-sm">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0"></span>
                <span>Verified Client Work</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border shadow-sm">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0"></span>
                <span>Pant Nagar, Ghatkopar East</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border shadow-sm">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0"></span>
                <span>WhatsApp Direct Booking</span>
              </span>
            </div>
          </Container>
        </section>

        {/* Category Filter Tabs & Quick Search */}
        <section className="mb-10 sm:mb-12">
          <Container size="lg">
            <div className="bg-surface border border-border rounded-sm p-4 sm:p-6 shadow-card-light">
              {/* Category Pills Bar */}
              <div
                className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
                role="tablist"
                aria-label="Gallery category filters"
              >
                {galleryFilters.map((filter) => {
                  const isActive = activeCategory === filter.id;
                  const count = categoryCounts[filter.id] || 0;

                  return (
                    <button
                      key={filter.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(filter.id)}
                      className={`whitespace-nowrap px-4 py-2 text-xs sm:text-sm font-medium rounded-sm transition-all duration-200 flex items-center gap-2 shrink-0 min-h-[44px] ${
                        isActive
                          ? 'bg-gold text-text font-bold shadow-sm border border-gold'
                          : 'bg-surface text-text-muted hover:text-text hover:border-gold/40 border border-border'
                      }`}
                    >
                      <span>{filter.label}</span>
                      <span
                        className={`text-[11px] px-1.5 py-0.5 rounded-full font-mono ${
                          isActive
                            ? 'bg-surface text-text font-bold shadow-sm'
                            : 'bg-surface-subtle text-text-muted border border-border'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sub-bar: Search Input & Result Count Indicator */}
              <div className="mt-4 pt-4 border-t border-border/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-muted/70">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by haircut, balayage, nails, offer..."
                    className="w-full bg-surface border border-input rounded-sm pl-9 pr-8 py-2 text-xs sm:text-sm text-text placeholder-text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors min-h-[44px]"
                    aria-label="Search gallery items"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-2 px-2 text-text-muted hover:text-gold flex items-center justify-center text-xs"
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="text-xs text-text-muted flex items-center justify-between sm:justify-end gap-2 shrink-0">
                  <span>
                    Showing <strong className="text-gold-text font-bold">{filteredItems.length}</strong> of{' '}
                    {galleryItems.length} items
                  </span>
                  {(activeCategory !== 'all' || searchQuery) && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory('all');
                        setSearchQuery('');
                      }}
                      className="text-xs text-gold-text underline hover:text-gold ml-2 transition-colors cursor-pointer font-medium"
                    >
                      Reset filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Gallery Grid Section with Full Details on Every Card */}
        <section className="mb-20">
          <Container size="lg">
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 px-4 bg-surface border border-border rounded-sm">
                <p className="font-serif text-xl text-text mb-2">No matching transformations found</p>
                <p className="text-sm text-text-muted mb-6">
                  Try adjusting your search query or selecting a different category tab.
                </p>
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                >
                  View All 20 Works
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredItems.map((item) => {
                  const itemWhatsAppUrl = buildWhatsAppLink({
                    message: `Hi Angels Salon! I saw the "${item.title}" in your Style Gallery (${
                      item.serviceRendered || item.categoryLabel
                    }). Could you please share more details and available appointment slots?`,
                  });

                  return (
                    <Card
                      key={item.id}
                      data-card-hover
                      className="overflow-hidden flex flex-col justify-between group border border-border/80 hover:border-gold/50 transition-all duration-300 bg-surface shadow-card-light"
                    >
                      <div>
                        {/* Interactive Image Frame */}
                        <div
                          className="relative aspect-square w-full overflow-hidden bg-surface-subtle cursor-pointer group/img"
                          onClick={() => handleOpenLightbox(item)}
                          role="button"
                          tabIndex={0}
                          aria-label={`Open fullscreen view for ${item.title}`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleOpenLightbox(item);
                            }
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.alt}
                            width={item.width}
                            height={item.height}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                          />

                          {/* Dark Vignette Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                          {/* Category Tag (Top Left) */}
                          <div className="absolute top-3 left-3 bg-surface/95 backdrop-blur-md border border-border text-[10.5px] font-bold uppercase tracking-wider text-gold-text px-2.5 py-1 rounded-sm shadow-md pointer-events-none">
                            {item.categoryLabel}
                          </div>

                          {/* Zoom Expand Button (Top Right) */}
                          <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface/90 border border-border text-text-muted hover:text-gold hover:border-gold transition-colors flex items-center justify-center shadow-md">
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <polyline points="9 21 3 21 3 15"></polyline>
                              <line x1="21" y1="3" x2="14" y2="10"></line>
                              <line x1="3" y1="21" x2="10" y2="14"></line>
                            </svg>
                          </div>
                        </div>

                        {/* Card Details Body */}
                        <div className="p-5 sm:p-6">
                          {/* Service Rendered Badge */}
                          {item.serviceRendered && (
                            <div className="mb-2.5">
                              <span className="inline-block text-[10.5px] font-semibold uppercase tracking-wider text-gold bg-gold/10 border border-gold/25 px-2.5 py-0.5 rounded-sm">
                                {item.serviceRendered}
                              </span>
                            </div>
                          )}

                          {/* Title */}
                          <h2 className="font-serif text-lg sm:text-xl font-bold text-text mb-2.5 group-hover:text-gold transition-colors leading-snug">
                            {item.title}
                          </h2>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4 line-clamp-3">
                            {item.description}
                          </p>

                          {/* Client Story / Stylist Note Block */}
                          {item.clientStory && (
                            <div className="p-3 rounded-sm bg-surface-elevated/70 border border-border/80 text-xs text-text-muted mb-2">
                              <div className="flex items-center gap-1.5 text-gold text-[10.5px] font-bold uppercase tracking-wider mb-1">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                                <span>Stylist Story & Details</span>
                              </div>
                              <p className="italic leading-relaxed text-text-muted/90">
                                &ldquo;{item.clientStory}&rdquo;
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Action Buttons (Bottom) */}
                      <div className="p-5 sm:p-6 pt-0 border-t border-border/60 mt-3 grid grid-cols-2 gap-2.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenLightbox(item)}
                          className="w-full text-xs font-semibold min-h-[42px] px-2"
                          leftIcon={
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="11" cy="11" r="8"></circle>
                              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                              <line x1="11" y1="8" x2="11" y2="14"></line>
                              <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                          }
                        >
                          Fullscreen
                        </Button>

                        <Button
                          as="a"
                          href={itemWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="gold"
                          size="sm"
                          className="w-full text-xs font-bold min-h-[42px] px-2 shadow-gold-sm"
                          leftIcon={<WhatsAppIcon className="w-3.5 h-3.5 fill-current" />}
                        >
                          Inquire
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </Container>
        </section>

        {/* Closing VIP Consultation Banner */}
        <section className="text-center" data-reveal>
          <Container size="md">
            <div
              className="p-8 sm:p-12 rounded-sm bg-surface border border-gold/30 shadow-card-dark relative overflow-hidden"
              data-card-hover
            >
              {/* Subtle Decorative Gold Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

              <span className="text-xs uppercase tracking-luxury text-gold font-semibold mb-2 block">
                Inspired By Our Salon Work?
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-3">
                Let Us Craft Your Signature Look
              </h2>
              <LaurelDivider size="sm" />
              <p className="text-sm sm:text-base text-text-muted mb-8 leading-relaxed max-w-xl mx-auto font-light mt-3">
                Show any photo or offer from this style gallery to our stylists on WhatsApp or during your consultation in Pant Nagar, Ghatkopar East. We customize every cut, colour formula, and bridal silhouette to you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  as="a"
                  href={buildWhatsAppLink({
                    message:
                      'Hi Angels Salon! I was browsing your Style Gallery and would love to book a personal consultation with a senior stylist.',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto shadow-gold-sm min-h-[48px]"
                  leftIcon={<WhatsAppIcon className="w-4 h-4 fill-current" />}
                >
                  Book on WhatsApp
                </Button>
                <Button
                  as="a"
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto min-h-[48px]"
                >
                  Call {siteConfig.contact.phoneDisplay}
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Accessible Fullscreen Lightbox Modal */}
        <Lightbox
          item={selectedItem}
          items={filteredItems}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          onNavigate={(item) => setSelectedItem(item)}
        />
      </main>
    </>
  );
};

export default Gallery;
