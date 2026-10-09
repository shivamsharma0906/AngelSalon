import React, { useState } from 'react';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

interface Recommendation {
  title: string;
  category: string;
  duration: string;
  price: string;
  description: string;
  benefits: string[];
  image: string;
}

interface QuizOption {
  id: string;
  label: string;
  category: string;
  image: string;
  rec: Recommendation;
}

const quizOptions: QuizOption[] = [
  {
    id: 'frizz-repair',
    label: 'Tame Frizz & Glass Hair Shine',
    category: 'Hair Treatment',
    image: '/images/real/client_straight_glass.jpg',
    rec: {
      title: 'Protein Botoplex Smoothing Treatment',
      category: 'Advanced Hair Restoration',
      duration: '2h 00m',
      price: '₹7,000',
      description: 'Formaldehyde-free luxury protein infusion that repairs internal bonds, restores elasticity, and delivers mirror-like smooth hair for up to 5 months.',
      benefits: ['100% Frizz Elimination', 'Intense Keratin Moisture', 'Heat & Humidity Resistant'],
      image: '/images/real/client_straight_glass.jpg',
    },
  },
  {
    id: 'balayage-color',
    label: 'French Balayage & Dimensional Color',
    category: 'Hair Colour',
    image: '/images/real/client_ruby_layers.jpg',
    rec: {
      title: 'Couture French Balayage with Olaplex',
      category: 'Precision Color Artistry',
      duration: '3h 00m',
      price: 'From ₹4,000',
      description: 'Hand-painted seamless color transitions customized to your skin tone and bone structure, protected with authentic Olaplex bond multiplier.',
      benefits: ['Zero Harsh Demarcation Lines', 'Natural Sun-Kissed Dimension', 'Bond-Strengthening Technology'],
      image: '/images/real/client_ruby_layers.jpg',
    },
  },
  {
    id: 'skin-glow',
    label: 'Glass Skin & Tan Removal',
    category: 'Skeyndor Skin',
    image: '/images/gallery_skincare.jpg',
    rec: {
      title: 'Skeyndor Dermapeel Pro Facial',
      category: 'Spanish Clinical Skincare',
      duration: '1h 15m',
      price: '₹3,500',
      description: 'Multi-layer progressive acid peel combined with hyaluronic infusion that removes deep tanning, minimizes pores, and imparts instant luminous radiance.',
      benefits: ['Instant Luminous Glow', 'Pigmentation & Tan Reduction', 'Deep Cellular Renewal'],
      image: '/images/gallery_skincare.jpg',
    },
  },
  {
    id: 'bridal-couture',
    label: 'Bridal Makeover & HD Glamour',
    category: 'Bridal Artistry',
    image: '/images/gallery_bridal.jpg',
    rec: {
      title: 'Haute Couture HD Bridal Experience',
      category: 'Luxury Bridal & Hair Styling',
      duration: '3h 30m',
      price: 'From ₹15,000',
      description: 'Editorial long-wear HD makeup, traditional or contemporary hair architecture, saree/dupatta draping, and complimentary pre-bridal skin prep.',
      benefits: ['Sweatproof & Tearproof 16h Wear', 'Bespoke Jewelry & Dupatta Styling', 'Dedicated Senior Artist VIP Room'],
      image: '/images/gallery_bridal.jpg',
    },
  },
  {
    id: 'hair-extensions',
    label: 'Instant Length & Mega Volume',
    category: 'Hair Extensions',
    image: '/images/real/client_vcut_straight.jpg',
    rec: {
      title: '100% Virgin Remy Hair Extensions',
      category: 'Luxury Volumizing Artistry',
      duration: '1h 00m',
      price: '₹10,000',
      description: 'Seamless microbead or tape-in extensions made with ethically sourced 100% human hair, colored and trimmed to blend imperceptibly.',
      benefits: ['Instantly Doubles Hair Density', 'Natural Movement & Styling Flexibility', 'Reusable for Up to 12 Months'],
      image: '/images/real/client_vcut_straight.jpg',
    },
  },
  {
    id: 'academy-career',
    label: 'Become a Vidal Sassoon Stylist',
    category: 'Salon Academy',
    image: '/images/academy_training.jpg',
    rec: {
      title: 'Comprehensive Master Diploma in Hairdressing',
      category: 'Professional Academy Certification',
      duration: '3 to 6 Months',
      price: 'Scholarship Available',
      description: 'Govt. and internationally recognized certification covering geometric precision haircutting, balayage formulation, salon management, and live client hands-on training.',
      benefits: ['100% Placement Assistance', 'Live Client Models Daily', 'Complete Professional Salon Kit'],
      image: '/images/academy_training.jpg',
    },
  },
];

export const BeautyQuiz: React.FC = () => {
  const [selectedId, setSelectedId] = useState(quizOptions[0].id);

  const activeOption = quizOptions.find((opt) => opt.id === selectedId) || quizOptions[0];
  const rec = activeOption.rec;

  const buildQuizWaUrl = (recommendation: Recommendation) => {
    const text = `Hi Angels Salon! I would like to book the *${recommendation.title}* (${recommendation.price}) at your Ghatkopar East salon.\n\n` +
      `✨ *Service*: ${recommendation.title}\n` +
      `💎 *Category*: ${recommendation.category}\n` +
      `⏱️ *Estimated Duration*: ${recommendation.duration}\n\n` +
      `Please let me know available appointment slots!`;
    return `https://wa.me/917303312054?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="py-16 sm:py-24 bg-surface/40 border-y border-border/80 relative overflow-hidden" aria-label="Treatment Matcher">
      <Container size="lg">
        {/* Header - Clean Editorial Text without any pill badge box */}
        <div data-reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <p className="text-xs uppercase tracking-luxury text-gold font-bold mb-2">
            Bespoke Treatment Selection
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-text tracking-tight mb-4">
            Find Your Ideal Experience
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-light">
            Select your preferred beauty ritual to view treatment details, duration, formulations, and book directly.
          </p>
        </div>

        {/* Goal Selector Grid - Real Images in ALL 6 Cards */}
        <div data-reveal data-reveal-stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {quizOptions.map((opt) => {
            const isSelected = opt.id === selectedId;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedId(opt.id)}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col group overflow-hidden ${
                  isSelected
                    ? 'bg-surface border-gold shadow-gold-sm ring-1 ring-gold'
                    : 'bg-surface/80 border-border hover:border-gold/50 text-text-muted hover:text-text'
                }`}
              >
                {/* Real Photo Thumbnail */}
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-2.5 bg-ink">
                  <img
                    src={opt.image}
                    alt={opt.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                </div>

                <span className={`text-xs font-semibold leading-tight mb-1 ${isSelected ? 'text-gold' : 'text-text'}`}>
                  {opt.label}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-text-subtle font-medium">
                  {opt.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Matched Recommendation Card - Clean, High-End Presentation */}
        <div data-reveal data-card-hover className="max-w-4xl mx-auto bg-surface border border-border hover:border-gold/40 rounded-2xl overflow-hidden shadow-2xl transition-all">
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            {/* Left: Treatment Visual */}
            <div className="md:col-span-5 relative min-h-[280px] md:min-h-full overflow-hidden bg-ink">
              <img
                src={rec.image}
                alt={rec.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-text">
                <span className="bg-surface/90 px-2.5 py-1 rounded-md border border-border">⏱️ {rec.duration}</span>
                <span className="bg-gold text-text font-bold px-3 py-1 rounded-md">{rec.price}</span>
              </div>
            </div>

            {/* Right: Treatment Details & 1-Tap CTA */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-luxury text-gold font-bold block mb-1">
                  {rec.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-3">
                  {rec.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6 font-light">
                  {rec.description}
                </p>

                {/* Key Benefits */}
                <div className="space-y-2 mb-8">
                  {rec.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-text">
                      <span className="w-4 h-4 rounded-full bg-gold/20 text-gold flex items-center justify-center text-[10px] font-bold shrink-0">
                        ✓
                      </span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Pure WhatsApp Booking, Zero Coupon Codes */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-border/70">
                <Button
                  as="a"
                  href={buildQuizWaUrl(rec)}
                  target="_blank"
                  variant="whatsapp"
                  size="md"
                  fullWidth
                  className="shadow-gold-sm font-bold min-h-[48px]"
                  leftIcon={<WhatsAppIcon className="w-5 h-5 fill-current" />}
                >
                  Book on WhatsApp
                </Button>

                <Button
                  as="a"
                  href="/services"
                  variant="outline"
                  size="md"
                  fullWidth
                  className="sm:w-auto text-xs min-h-[48px]"
                >
                  View All Rates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BeautyQuiz;
