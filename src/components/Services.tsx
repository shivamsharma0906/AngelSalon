import React, { useState } from 'react';

interface ServiceCategory {
  name: string;
  title: string;
  desc: string;
  image: string;
  items: string[];
}

export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const categories: ServiceCategory[] = [
    {
      name: "Hair Design",
      title: "Couture Hair Artistry",
      desc: "Our master designers treat hair as a canvas. From high-fashion precision cuts to bespoke global color transformations and restorative sciences, we create hair that commands attention.",
      image: "/images/gallery_hair.png",
      items: [
        "Bespoke Precision Couture Cut & Blowdry",
        "French Balayage & Customized Highlights",
        "Luxury Global Rich Color Melt",
        "Olaplex Bond Rebuilding & Keratin Infusion",
        "Custom Hair Extensions & Volumizing Treatments"
      ]
    },
    {
      name: "Skincare",
      title: "Advanced Clinical Skincare",
      desc: "Ditch the generic facial. We offer advanced skin therapies combining medical-grade technology with premium botanicals to restore cellular glow, firmness, and absolute hydration.",
      image: "/images/gallery_skincare.png",
      items: [
        "Dermalogica Custom Signature Facials",
        "Advanced Multi-Stage Hydrafacial Systems",
        "Microdermabrasion & Skin Resurfacing",
        "Anti-Aging Collagen Boost Treatments",
        "Targeted Acne Clarifying Treatments"
      ]
    },
    {
      name: "Makeup",
      title: "Flawless HD & Airbrush Makeup",
      desc: "Whether you are walking a red carpet, attending a high-society gala, or want a sophisticated glow for an evening out, our artists design long-wear, camera-ready makeup.",
      image: "/images/gallery_makeup.png",
      items: [
        "High-Definition Camera-Ready Makeup",
        "Premium Airbrush Luxury Styling",
        "Red Carpet & Gala Evening Glamour",
        "Personalized Beauty Profile & Styling",
        "Lash Styling & Precise Eye Artistry"
      ]
    },
    {
      name: "Nail Art",
      title: "Luxury Nail Extensions & Artistry",
      desc: "Turn your hands into masterpieces. Our nail bar combines meticulous hygienic grooming with high-fashion extensions, custom chrome pigments, and hand-painted nail designs.",
      image: "/images/gallery_nails.png",
      items: [
        "Sculpted Gel & Acrylic Extensions",
        "Bespoke Hand-Painted Nail Art & Jewels",
        "Luxury Spas (Pedicure & Manicure)",
        "Chrome, Matte, & Metallic Leaf Finishes",
        "Nail Health Restoration & Strengthening"
      ]
    },
    {
      name: "Bridal",
      title: "Royal Bridal Couture Styling",
      desc: "Our crowning specialty. We handle complete bridal looks, aligning hair design, glowing HD makeup, and intricate saree/dupatta draping into a seamless masterpiece for your special day.",
      image: "/images/gallery_bridal.png",
      items: [
        "Royal Bridal Styling & Transformations",
        "Pre-Wedding Trial & Makeup Coordination",
        "Luxury Haldi, Mehendi, & Reception Looks",
        "High-Fashion Saree & Dupatta Draping",
        "Bridal Party Styling Packages"
      ]
    }
  ];

  const currentCategory = categories[activeTab];

  return (
    <section className="services-section py-16 bg-surface" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 scroll-reveal active">
          <span className="text-xs uppercase tracking-luxury text-gold font-semibold block mb-2">Bespoke Experiences</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">The Art of Self-Care</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
          <p className="text-text-muted max-w-2xl mx-auto text-sm sm:text-base">
            Select a category below to explore our luxury menu. We avoid generic templates, designing custom beauty rituals for each client.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={cat.name}
              type="button"
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all min-h-[44px] ${
                activeTab === idx
                  ? 'bg-gold text-text shadow-sm'
                  : 'bg-surface border border-border text-text-muted hover:border-gold hover:text-text'
              }`}
              onClick={() => setActiveTab(idx)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-surface border border-border/80 rounded-2xl p-6 sm:p-10 shadow-lg">
          <div>
            <span className="text-xs uppercase tracking-luxury text-gold font-semibold block mb-2">
              {currentCategory.name}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-4">
              {currentCategory.title}
            </h3>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-6">
              {currentCategory.desc}
            </p>
            <ul className="space-y-3 mb-8">
              {currentCategory.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#reserve"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold text-text font-bold text-xs uppercase tracking-luxury hover:bg-gold-hover transition-all min-h-[44px]"
            >
              Book Consultation
            </a>
          </div>
          <div className="rounded-xl overflow-hidden border border-border/60 aspect-[4/3] bg-surface">
            <img
              src={currentCategory.image}
              alt={currentCategory.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to real image if specific illustration is unavailable
                (e.target as HTMLImageElement).src = '/images/real/salon_outside.jpg';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
