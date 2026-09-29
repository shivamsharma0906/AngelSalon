import React, { useState } from 'react';
import { Scissors, Sparkles, Wand2, Palette, Crown, CheckCircle } from 'lucide-react';

export default function Services() {
    const [activeTab, setActiveTab] = useState(0);

    const categories = [
        {
            icon: Scissors,
            name: "Hair Design",
            title: "Couture Hair Artistry",
            desc: "Our master designers treat hair as a canvas. From high-fashion precision cuts to bespoke global color transformations and restorative sciences, we create hair that commands attention.",
            image: "images/gallery_hair.png",
            items: [
                "Bespoke Precision Couture Cut & Blowdry",
                "French Balayage & Customized Highlights",
                "Luxury Global Rich Color Melt",
                "Olaplex Bond Rebuilding & Keratin Infusion",
                "Custom Hair Extensions & Volumizing Treatments"
            ]
        },
        {
            icon: Sparkles,
            name: "Skincare",
            title: "Advanced Clinical Skincare",
            desc: "Ditch the generic facial. We offer advanced skin therapies combining medical-grade technology with premium botanicals to restore cellular glow, firmness, and absolute hydration.",
            image: "images/gallery_skincare.png",
            items: [
                "Dermalogica Custom Signature Facials",
                "Advanced Multi-Stage Hydrafacial Systems",
                "Microdermabrasion & Skin Resurfacing",
                "Anti-Aging Collagen Boost Treatments",
                "Targeted Acne Clarifying Treatments"
            ]
        },
        {
            icon: Wand2,
            name: "Makeup",
            title: "Flawless HD & Airbrush Makeup",
            desc: "Whether you are walking a red carpet, attending a high-society gala, or want a sophisticated glow for an evening out, our artists design long-wear, camera-ready makeup.",
            image: "images/gallery_makeup.png",
            items: [
                "High-Definition Camera-Ready Makeup",
                "Premium Airbrush Luxury Styling",
                "Red Carpet & Gala Evening Glamour",
                "Personalized Beauty Profile & Styling",
                "Lash Styling & Precise Eye Artistry"
            ]
        },
        {
            icon: Palette,
            name: "Nail Art",
            title: "Luxury Nail Extensions & Artistry",
            desc: "Turn your hands into masterpieces. Our nail bar combines meticulous hygienic grooming with high-fashion extensions, custom chrome pigments, and hand-painted nail designs.",
            image: "images/gallery_nails.png",
            items: [
                "Sculpted Gel & Acrylic Extensions",
                "Bespoke Hand-Painted Nail Art & Jewels",
                "Luxury Spas (Pedicure & Manicure)",
                "Chrome, Matte, & Metallic Leaf Finishes",
                "Nail Health Restoration & Strengthening"
            ]
        },
        {
            icon: Crown,
            name: "Bridal",
            title: "Royal Bridal Couture Styling",
            desc: "Our crowning specialty. We handle complete bridal looks, aligning hair design, glowing HD makeup, and intricate saree/dupatta draping into a seamless masterpiece for your special day.",
            image: "images/gallery_bridal.png",
            items: [
                "Royal Bridal Styling & Transformations",
                "Pre-Wedding Trial & Makeup Coordination",
                "Luxury Haldi, Mehendi, & Reception Looks",
                "High-Fashion Saree & Dupatta Draping",
                "Bridal Party Styling Packages"
            ]
        }
    ];

    return (
        <section className="services-section" id="services">
            <div className="container">
                <div className="section-header scroll-reveal active">
                    <span className="section-subtitle">Bespoke Experiences</span>
                    <h2 className="section-title">The Art of Self-Care</h2>
                    <div className="gold-divider"></div>
                    <p className="section-description">Select a category below to explore our luxury menu. We avoid generic templates, designing custom beauty rituals for each client.</p>
                </div>

                {/* Tab Navigation */}
                <div className="services-tab-nav">
                    {categories.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={idx}
                                className={`services-tab-btn ${activeTab === idx ? 'active' : ''}`}
                                onClick={() => setActiveTab(idx)}
                            >
                                <Icon size={18} className="tab-btn-icon" />
                                <span>{cat.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content Display */}
                <div className="services-tab-content">
                    {categories.map((cat, idx) => {
                        if (idx !== activeTab) return null;
                        return (
                            <div className="services-tab-pane" key={idx}>
                                <div className="services-pane-info">
                                    <h3 className="pane-title">{cat.title}</h3>
                                    <p className="pane-desc">{cat.desc}</p>
                                    <div className="pane-divider"></div>
                                    <ul className="pane-list">
                                        {cat.items.map((item, itemIdx) => (
                                            <li key={itemIdx}>
                                                <CheckCircle className="pane-list-icon" size={16} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pane-actions">
                                        <a href="#booking" className="btn btn-gold btn-large shimmer-btn">Book This Experience</a>
                                    </div>
                                </div>
                                <div className="services-pane-visual">
                                    <div className="pane-image-wrapper">
                                        <img src={cat.image} alt={cat.title} className="pane-image" />
                                        <div className="pane-image-border-gold"></div>
                                        <div className="pane-image-border-rose"></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
