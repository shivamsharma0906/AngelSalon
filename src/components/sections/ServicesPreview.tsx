import React, { useState } from 'react';
import { serviceCategoriesData, ServiceCategoryDetail } from '../../data/services';
import { buildWhatsAppLink } from '../../lib/whatsapp';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Carousel } from '../Carousel';

export const ServicesPreview: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'hair' | 'skin' | 'beauty'>('all');

  const categories = serviceCategoriesData;

  const filteredCategories = categories.filter((cat) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'hair') {
      return ['womens-haircut-and-style', 'womens-hair-colour', 'hair-treatments', 'hair-extensions', 'mens-services'].includes(cat.slug);
    }
    if (selectedFilter === 'skin') {
      return ['skin-care'].includes(cat.slug);
    }
    if (selectedFilter === 'beauty') {
      return ['bridal-makeup', 'nails'].includes(cat.slug);
    }
    return true;
  });

  const renderCategoryCard = (category: ServiceCategoryDetail) => {
    const minPrice = category.services.length > 0
      ? category.services.reduce((lowest, s) => {
          const num = parseInt(s.startingPrice.replace(/\D/g, ''), 10) || 999999;
          return num < lowest ? num : lowest;
        }, 999999)
      : null;

    const categoryBookUrl = buildWhatsAppLink({
      message: `Hi Angels Salon! I would like to book an appointment for "${category.name}". Could you share available slots?`,
    });

    return (
      <Card
        data-card-hover
        className="h-full overflow-hidden flex flex-col justify-between group border-border hover:border-gold/60 transition-all duration-300 w-full"
      >
        <div>
          {/* Category Image Cover */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface border-b border-border">
            <img
              src={category.overviewImage}
              alt={`${category.name} at Angels Salon`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

            {/* Services Count Badge */}
            <div className="absolute top-3 left-3 bg-ink/80 backdrop-blur-sm border border-gold/40 text-[10px] uppercase tracking-luxury text-gold font-bold px-2 py-0.5 rounded-sm">
              {category.services.length} Rituals
            </div>

            {/* Starting Price Pill */}
            {minPrice && minPrice < 999999 && (
              <div className="absolute bottom-3 right-3 bg-surface/90 backdrop-blur-sm border border-border text-[11px] font-semibold text-text px-2.5 py-1 rounded-full">
                From <span className="text-gold font-bold">₹{minPrice.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="p-5">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-text mb-2 group-hover:text-gold transition-colors">
              {category.name}
            </h3>
            <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-4">
              {category.shortDescription}
            </p>

            {/* Featured items */}
            <div className="space-y-1 text-[11px] text-text-subtle pt-2 border-t border-border/60">
              <span className="text-gold font-medium block">Signature Treatments:</span>
              <p className="line-clamp-2 italic">
                {category.services.slice(0, 3).map((s) => s.name).join(' • ')}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 pt-0 grid grid-cols-2 gap-2 border-t border-border/40 mt-3">
          <Button
            as="a"
            href={`/services/${category.slug}`}
            variant="outline"
            size="sm"
            fullWidth
            className="min-h-[44px] text-xs font-semibold"
          >
            View Menu
          </Button>
          <Button
            as="a"
            href={categoryBookUrl}
            target="_blank"
            variant="gold"
            size="sm"
            fullWidth
            className="min-h-[44px] text-xs font-bold"
          >
            Book
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-ink relative" aria-label="Featured Salon Services & Categories">
      {/* Background Ambience */}
      <div className="hidden md:block absolute top-1/2 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <Container size="lg">
        <div data-reveal>
          <SectionHeading
            subtitle="Haute Coiffure & Beauty Rituals"
            title="Signature Salon Disciplines"
            description="Every treatment is executed with Vidal Sassoon geometry, single-use sterilized instruments, and authentic international formulations."
            align="center"
          />
        </div>

        {/* Filter Pills */}
        <div data-reveal className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {[
            { id: 'all', label: 'All Disciplines' },
            { id: 'hair', label: 'Hair, Cut & Colour' },
            { id: 'skin', label: 'Skin & Aesthetics' },
            { id: 'beauty', label: 'Bridal & Nails' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFilter(tab.id as 'all' | 'hair' | 'skin' | 'beauty')}
              className={`min-h-[40px] px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all ${
                selectedFilter === tab.id
                  ? 'bg-gold text-ink font-bold shadow-gold-sm'
                  : 'bg-surface border border-border text-text-muted hover:text-text hover:border-gold/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile (<md): Carousel */}
        <div data-reveal className="md:hidden">
          <Carousel
            label="Service categories preview"
            slideClassName="w-[82vw] xs:w-[78vw] sm:w-[320px] shrink-0 snap-start flex flex-col"
          >
            {filteredCategories.map((category) => (
              <div key={category.slug} className="h-full">
                {renderCategoryCard(category)}
              </div>
            ))}
          </Carousel>
        </div>

        {/* Desktop (md+): Responsive 4-Column Grid */}
        <div
          data-reveal
          data-reveal-stagger
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6"
        >
          {filteredCategories.map((category) => (
            <div key={category.slug} className="flex flex-col">
              {renderCategoryCard(category)}
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center px-4 sm:px-0">
          <Button
            as="a"
            href="/services"
            variant="surface"
            size="md"
            fullWidth
            className="sm:w-auto border-gold/40 hover:border-gold shadow-gold-sm min-h-[48px] px-6 sm:px-8 text-center"
          >
            <span className="sm:hidden">View Full Services &amp; Pricing</span>
            <span className="hidden sm:inline">Explore Complete Services Directory (All Pricing)</span>
            <span className="ml-2">→</span>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default ServicesPreview;
