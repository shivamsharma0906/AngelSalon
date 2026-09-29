import React from 'react';

export default function Hero() {
    return (
        <section className="hero-section velvet-grain" id="home">
            <div className="hero-bg" style={{ backgroundImage: "url('images/hero_bg.png')" }}></div>
            <div className="hero-overlay"></div>
            <div className="hero-container">
                {/* Gold Seal of Excellence Medallion */}
                <div className="seal-of-excellence foil-card">
                    <div className="seal-inner">
                        <svg className="seal-wreath" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path d="M35,75 C25,70 18,55 22,40 C24,33 29,26 36,20 C34,26 33,32 34,39 C30,41 27,45 27,50 C27,55 30,59 34,61 C35,66 38,71 42,75 Z" fill="rgba(10, 10, 10, 0.1)"/>
                            <path d="M65,75 C75,70 82,55 78,40 C76,33 71,26 64,20 C66,26 67,32 66,39 C70,41 73,45 73,50 C73,55 70,59 66,61 C65,66 62,71 58,75 Z" fill="rgba(10, 10, 10, 0.1)"/>
                            <circle cx="50" cy="50" r="38" stroke="rgba(10, 10, 10, 0.15)" strokeWidth="1" fill="none" strokeDasharray="3,3" />
                        </svg>
                        <div className="seal-content">
                            <span className="seal-rating">4.7★</span>
                            <span className="seal-reviews">598 Reviews</span>
                        </div>
                    </div>
                </div>

                <div className="hero-content scroll-reveal active">
                    {/* Large Laurel Wreath Monogram Logo */}
                    <div className="hero-monogram-container">
                        <svg className="hero-monogram animated-monogram" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path className="draw-path laurel-left" d="M35,75 C25,70 18,55 22,40 C24,33 29,26 36,20 C34,26 33,32 34,39 C30,41 27,45 27,50 C27,55 30,59 34,61 C35,66 38,71 42,75 Z" stroke="url(#heroGoldGradient)" strokeWidth="1.5" fill="none"/>
                            <path className="draw-path laurel-right" d="M65,75 C75,70 82,55 78,40 C76,33 71,26 64,20 C66,26 67,32 66,39 C70,41 73,45 73,50 C73,55 70,59 66,61 C65,66 62,71 58,75 Z" stroke="url(#heroGoldGradient)" strokeWidth="1.5" fill="none"/>
                            <circle className="draw-path inner-circle" cx="50" cy="50" r="14" stroke="url(#heroGoldGradient)" strokeWidth="1.5" fill="none"/>
                            <text className="fade-text" x="50" y="56" fontFamily="'Cormorant Garamond', serif" fontWeight="700" fontSize="18" fill="url(#heroGoldGradient)" textAnchor="middle">A</text>
                            <defs>
                                <linearGradient id="heroGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FCE0AD" />
                                    <stop offset="50%" stopColor="#DFAC6C" />
                                    <stop offset="100%" stopColor="#C68B45" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <h1 className="hero-title">Where Luxury Meets Artistry</h1>
                    <p className="hero-subtitle">Step into a world of exquisite pampering. Mumbai's high-end beauty destination in Ghatkopar East, dedicated to revealing your inner radiance through tailored styling and expert care.</p>
                    <div className="hero-actions">
                        <a href="#booking" className="btn btn-gold btn-large">Book Exclusive Experience</a>
                        <a href="#services" className="btn btn-outline btn-large">Explore Services</a>
                    </div>
                </div>
                
                {/* Quick features row */}
                <div className="hero-features scroll-reveal active delay-1">
                    <div className="hero-feature-item">
                        <span className="feature-num">598+</span>
                        <span className="feature-label">Google Reviews (4.7★)</span>
                    </div>
                    <div className="hero-feature-divider"></div>
                    <div className="hero-feature-item">
                        <span className="feature-num">15+</span>
                        <span className="feature-label">Master Stylists</span>
                    </div>
                    <div className="hero-feature-divider"></div>
                    <div className="hero-feature-item">
                        <span className="feature-num">100%</span>
                        <span className="feature-label">Premium Int'l Products</span>
                    </div>
                </div>
            </div>
            <div className="hero-scroll-indicator">
                <span className="scroll-text">Scroll to Discover</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    );
}
