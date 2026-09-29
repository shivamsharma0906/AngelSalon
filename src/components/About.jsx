import React from 'react';
import { ShieldCheck, Award, Gem, Heart } from 'lucide-react';

export default function About() {
    const trustPoints = [
        {
            icon: ShieldCheck,
            title: "Uncompromised Hygiene",
            desc: "We maintain surgical-grade sterilization of styling tools, single-use disposable gowns, and rigorous sanitization of stations after every client visit."
        },
        {
            icon: Award,
            title: "Elite Certified Team",
            desc: "Our stylists, therapists, and makeup designers are certified by international beauty institutions and undergo weekly skill-refinement training."
        },
        {
            icon: Gem,
            title: "Premium Product Partner",
            desc: "We exclusively utilize world-leading luxury brands including L'Oréal Professionnel, Kérastase, Olaplex, Dermalogica, and MAC."
        },
        {
            icon: Heart,
            title: "Inclusive & Empowering",
            desc: "Proudly women-owned, and a safe, welcoming, LGBTQ+ friendly space where every client is honored and pampered with absolute respect."
        }
    ];

    return (
        <section className="about-section" id="about">
            <div className="container">
                <div className="about-grid">
                    {/* Image Side */}
                    <div className="about-image-side scroll-reveal active">
                        <div className="about-image-wrapper">
                            <img src="images/about_salon.png" alt="High-end hair styling at Angels Salon" className="about-main-img" />
                            <div className="about-image-overlay-border"></div>
                            <div className="about-experience-badge">
                                <span className="badge-number">10+</span>
                                <span className="badge-text">Years of Excellence</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="about-content-side scroll-reveal active delay-1">
                        <span className="section-subtitle-left">Our Philosophy</span>
                        <h2 className="section-title-left">Crafting Confidence, One Detail at a Time</h2>
                        <p className="about-paragraph">Founded on the principle that beauty is a personal form of art, Angels Salon & Academy has established itself as the pinnacle of luxury care in Ghatkopar East, Mumbai. Our space is not merely a salon; it is an sanctuary where clients receive dedicated, bespoke attention from the region's finest stylists.</p>
                        <p className="about-paragraph text-highlight">"We believe beauty services should be a holistic, restorative ritual. Our team uses styling as a medium to express individuality, ensuring that every guest walks out radiating confidence."</p>
                        
                        <div className="signature-block">
                            <div className="signature-text">The Angels Directors</div>
                            <div className="signature-title">Angels Salon & Academy</div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Grid */}
                <div className="why-choose-us-container">
                    <div className="why-header scroll-reveal active">
                        <h3 className="why-title">Why the Angels Experience is Unmatched</h3>
                        <div className="gold-divider-small"></div>
                    </div>
                    
                    <div className="why-grid">
                        {trustPoints.map((point, index) => {
                            const IconComponent = point.icon;
                            return (
                                <div className="why-card scroll-reveal active" key={index}>
                                    <div className="why-icon-circle">
                                        <IconComponent size={24} />
                                    </div>
                                    <h4>{point.title}</h4>
                                    <p>{point.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
