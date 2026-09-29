import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

interface TransformationItem {
  id: string;
  title: string;
  category: string;
  artist: string;
  timeTaken: string;
  productsUsed: string;
  clientStory: string;
  result: string;
  image: string;
}

const transformations: TransformationItem[] = [
  {
    id: 'balayage-latte',
    title: 'Warm Caramel French Balayage',
    category: 'Hair Color & Lightening',
    artist: 'Master Color Director',
    timeTaken: '3.5 Hours',
    productsUsed: "L'Oréal Professionnel Metal Detox + Olaplex No. 1 & 2",
    clientStory: 'Client had uneven box-dye dark pigment and requested a low-maintenance, dimensional sun-kissed look that flatters Indian warm undertones.',
    result: 'Seamless root-melt blending into creamy caramel ribbons with 100% preserved fiber integrity and zero brassiness.',
    image: '/images/gallery_balayage.jpg',
  },
  {
    id: 'botoplex-cure',
    title: 'Protein Botoplex Bond Reconstruction',
    category: 'Hair Treatment',
    artist: 'Senior Texture Specialist',
    timeTaken: '2 Hours',
    productsUsed: 'Formaldehyde-Free Protein Nano-Infusion + Nashi Argan Elixir',
    clientStory: 'Severe humidity puffiness, chemical dryness from frequent heat styling, and split ends requiring daily ironing.',
    result: 'High-gloss silk hair with natural bounce and zero frizz, cutting morning blow-dry styling time by 80%.',
    image: '/images/hair_service.jpg',
  },
  {
    id: 'skeyndor-peel',
    title: 'Skeyndor Dermapeel Pro Luminous Ritual',
    category: 'Aesthetic Skincare',
    artist: 'Certified Skeyndor Aesthetician',
    timeTaken: '75 Minutes',
    productsUsed: 'Skeyndor Sequential Peel (AHA/BHA/Biological) + Hyaluronic Mask',
    clientStory: 'Post-summer pigmentation, dull complexion, and congested skin before an important family wedding.',
    result: 'Glass-skin glow with refined pore texture, visible reduction in dark spots, and intense 24-hour hydration.',
    image: '/images/skin_service.jpg',
  },
  {
    id: 'bridal-glam',
    title: 'Couture HD Royal Bridal Makeover',
    category: 'Bridal Artistry',
    artist: 'Bridal Creative Director',
    timeTaken: '3.5 Hours',
    productsUsed: 'Airbrush HD Base + Waterproof Setting + Handcrafted Hair Flowers',
    clientStory: 'Requested a royal heritage bridal look with flawless, sweatproof 16-hour coverage and sculpted hair architecture.',
    result: 'Glowing camera-ready finish that photographed flawlessly through day and evening rituals with zero creasing.',
    image: '/images/bridal_service.jpg',
  },
];

export const TransformationShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(transformations[0].id);

  const activeItem = transformations.find((t) => t.id === activeTab) || transformations[0];


  return (
    <section className="py-16 sm:py-24 bg-ink relative overflow-hidden" aria-label="Real Client Transformations">
      {/* Golden backdrop accent - disabled on mobile for GPU performance */}
      <div className="hidden md:block absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <Container size="lg">
        <div data-reveal>
          <SectionHeading
            subtitle="Real Hair & Skin Proof"
            title="Master Transformations"
            description="Witness the transformative power of bespoke technique, international formulations, and uncompromising salon artistry."
            align="center"
          />
        </div>

        {/* Tab Selector - Swipeable on mobile with 44px touch targets */}
        <div data-reveal className="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 py-1 pr-8 sm:pr-0">
          {transformations.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`shrink-0 min-h-[44px] px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all ${
                activeTab === item.id
                  ? 'bg-gold text-ink shadow-gold-sm'
                  : 'bg-surface border border-border text-text-muted hover:text-text hover:border-gold/40'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Transformation Showcase Card */}
        <div data-reveal data-card-hover className="bg-surface border border-border hover:border-gold/40 rounded-2xl overflow-hidden shadow-2xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Image Preview */}
            <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[460px] bg-ink overflow-hidden">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.endsWith('/images/hero_bg.jpg')) {
                    target.src = '/images/hero_bg.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute top-4 left-4 bg-ink/90 border border-gold/40 px-3 py-1 rounded-full text-[11px] font-bold text-gold uppercase tracking-luxury">
                {activeItem.category}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-text">
                <span className="bg-surface/90 px-3 py-1 rounded-full border border-border">Stylist: {activeItem.artist}</span>
                <span className="bg-gold/20 text-gold font-bold px-3 py-1 rounded-full border border-gold/40">Duration: {activeItem.timeTaken}</span>
              </div>
            </div>

            {/* Case Study Details */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-luxury text-gold font-bold block mb-1">
                  Artistry Case Study
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-4">
                  {activeItem.title}
                </h3>

                <div className="space-y-4 mb-8">
                  {/* The Challenge */}
                  <div className="p-3.5 rounded-xl bg-ink/60 border border-border">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-text-subtle block mb-1">
                      Client Consultation & Challenge:
                    </span>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-light">
                      {activeItem.clientStory}
                    </p>
                  </div>

                  {/* The Result */}
                  <div className="p-3.5 rounded-xl bg-gold/10 border border-gold/30">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold block mb-1">
                      The Angels Transformation Result:
                    </span>
                    <p className="text-xs sm:text-sm text-text leading-relaxed font-medium">
                      {activeItem.result}
                    </p>
                  </div>

                  {/* Formulations */}
                  <div className="text-xs text-text-subtle">
                    <span className="font-bold text-text-muted">Formulations & Bond Builders: </span>
                    <span className="italic">{activeItem.productsUsed}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-border/60">
                <Button
                  as="a"
                  href="/contact"
                  variant="gold"
                  size="md"
                  fullWidth
                  className="shadow-gold-sm font-bold min-h-[48px]"
                >
                  Book an Appointment
                </Button>

                <Button
                  as="a"
                  href="/style-gallery"
                  variant="outline"
                  size="md"
                  fullWidth
                  className="sm:w-auto text-xs min-h-[48px]"
                >
                  View Lookbook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TransformationShowcase;
