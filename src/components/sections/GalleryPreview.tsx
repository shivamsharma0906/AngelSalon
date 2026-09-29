import React, { useState } from 'react';
import { galleryItems, GalleryItem } from '../../data/gallery';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Lightbox } from '../ui/Lightbox';

export const GalleryPreview: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Take the 6 real client transformation works from the top of galleryItems
  const previewItems = galleryItems.slice(0, 6);

  const handleOpenLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsLightboxOpen(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-surface border-y border-border relative" aria-label="Real Client Transformations">
      <Container size="lg">
        <div data-reveal>
          <SectionHeading
            subtitle="Real Transformations at Angels Salon"
            title="Masterpieces & Client Artistry"
            description="Authentic client captures photographed in our Ghatkopar East salon chair. Zero stock photos, pure craftsmanship."
            align="center"
          />
        </div>

        {/* 6 Real Client Transformations Grid */}
        <div data-reveal data-reveal-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {previewItems.map((item, idx) => {

            return (
              <div
                key={item.id}
                data-card-hover
                className="group rounded-2xl overflow-hidden bg-ink border border-border hover:border-gold/60 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Image Frame with Click to Enlarge */}
                  <div
                    onClick={() => handleOpenLightbox(item)}
                    className="relative aspect-square w-full overflow-hidden bg-surface cursor-pointer border-b border-border"
                    title="Click to view full photo"
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60" />

                    {/* Case Badge */}
                    <div className="absolute top-3 left-3 bg-ink/90 backdrop-blur-sm border border-gold/40 text-[10px] uppercase tracking-luxury font-bold text-gold px-2.5 py-1 rounded-sm shadow-md">
                      Client Look #{idx + 1}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-ink/80 backdrop-blur-sm border border-border text-[10px] text-text-muted px-2 py-0.5 rounded-sm flex items-center gap-1">
                      <svg className="w-3 h-3 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </svg>
                      <span>Enlarge</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <span className="text-[11px] uppercase tracking-luxury text-gold font-semibold mb-1 block">
                      {item.categoryLabel}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-text mb-2 group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-2 mb-3">
                      {item.description}
                    </p>
                    {item.serviceRendered && (
                      <div className="text-[11px] text-gold font-medium bg-surface/80 border border-gold/20 px-2.5 py-1 rounded-md inline-block">
                        ✨ Service: {item.serviceRendered}
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct Action */}
                <div className="p-6 pt-0 border-t border-border/60">
                  <Button
                    as="a"
                    href="/services"
                    variant="outline"
                    size="md"
                    fullWidth
                    className="min-h-[44px]"
                  >
                    View Services &amp; Pricing
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center px-4 sm:px-0">
          <Button
            as="a"
            href="/style-gallery"
            variant="outline"
            size="lg"
            fullWidth
            className="sm:w-auto min-h-[48px] text-center"
            rightIcon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            }
          >
            <span className="sm:hidden">View Full Gallery</span>
            <span className="hidden sm:inline">Explore Complete Portfolio & Filter by Category</span>
          </Button>
        </div>
      </Container>

      {/* Accessible Lightbox Modal */}
      <Lightbox
        item={selectedItem}
        items={previewItems}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(newItem) => setSelectedItem(newItem)}
      />
    </section>
  );
};

export default GalleryPreview;
