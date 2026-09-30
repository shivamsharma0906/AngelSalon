import React, { useState } from 'react';
import { galleryItems, GalleryItem } from '../../data/gallery';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Lightbox } from '../ui/Lightbox';
import { ArrowRightIcon } from '../ui/icons';

export const OurWork: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Filter only real client transformation photos (never stock/filler)
  const realPhotos = galleryItems
    .filter((item) => item.image.startsWith('/images/real/client_'))
    .slice(0, 9);

  if (realPhotos.length === 0) {
    return null;
  }

  const handleOpenLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <Section tone="surface" className="py-16 sm:py-24 border-y border-gold/25" aria-label="Our Real Salon Work">
        <Container size="lg">
          
          {/* Section Header */}
          <div data-reveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-[12px] uppercase tracking-wider text-gold font-semibold block mb-2">
              Client Transformations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
              Our Work
            </h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mb-4" />
            <p className="text-base text-muted font-normal leading-relaxed">
              Photographed in our Ghatkopar East salon chair. Authentic hair styling, balayage, and clinical skincare crafted for real clients.
            </p>
          </div>

          {/* Photos: Mobile swipe row with scroll-snap & next-card peek; Desktop grid */}
          <div
            data-reveal
            data-reveal-stagger
            className="scroll-snap-x gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 pb-4 md:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {realPhotos.map((item) => (
              <div
                key={item.id}
                className="w-[82vw] xs:w-[78vw] sm:w-[320px] md:w-auto scroll-snap-align-start shrink-0 flex flex-col"
              >
                <div
                  onClick={() => handleOpenLightbox(item)}
                  className="group relative aspect-square w-full rounded-[4px] overflow-hidden bg-raised border border-gold/30 hover:border-gold transition-all duration-300 cursor-pointer shadow-md"
                  role="button"
                  tabIndex={0}
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
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-[12px] uppercase tracking-wider text-gold font-semibold block mb-1">
                      {item.categoryLabel}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-text line-clamp-1 group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe Hint (Mobile) */}
          <div className="md:hidden flex items-center justify-center gap-1 text-[12px] text-muted mt-3">
            <span>← Swipe for more transformations →</span>
          </div>

          {/* Action Link */}
          <div className="mt-10 sm:mt-14 flex justify-center">
            <Button
              as="a"
              href="/style-gallery"
              variant="outline"
              size="md"
              className="min-h-[48px] border-gold-line text-gold hover:border-gold px-8 py-3 text-sm uppercase tracking-wider font-semibold rounded-[4px]"
              rightIcon={<ArrowRightIcon size={16} />}
            >
              View All Styles
            </Button>
          </div>

        </Container>
      </Section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <Lightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          item={selectedItem}
          items={realPhotos}
          onNavigate={(item) => setSelectedItem(item)}
        />
      )}
    </>
  );
};

export default OurWork;
