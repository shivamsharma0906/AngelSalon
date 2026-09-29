import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        { src: 'images/gallery_hair.png', title: 'Glossy Precision Styling', category: 'HAIR ARTISTRY' },
        { src: 'images/gallery_nails.png', title: 'Luxury Gold Chrome Accents', category: 'NAIL ART' },
        { src: 'images/gallery_makeup.png', title: 'HD Flawless Glow', category: 'MAKEUP' },
        { src: 'images/gallery_bridal.png', title: 'Royal Couture Bridal Transform', category: 'BRIDAL COUTURE' },
        { src: 'images/gallery_interior.png', title: 'Modern Luxury Washing Bays', category: 'SALON SPACE' },
        { src: 'images/gallery_skincare.png', title: 'Aesthetic Rejuvenation therapy', category: 'SKIN CARE' }
    ];

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setIsOpen(false);
        document.body.style.overflow = '';
    };

    const nextImage = (e) => {
        if (e) e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        if (e) e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <section className="gallery-section" id="gallery">
            <div className="container">
                <div className="section-header scroll-reveal active">
                    <span className="section-subtitle">Visual Portfolio</span>
                    <h2 className="section-title">A Glimpse of Perfection</h2>
                    <div className="gold-divider"></div>
                    <p className="section-description">Explore real transformations, high-end nail styling, master bridal makeovers, and the premium workspace at Angels Salon & Academy.</p>
                </div>

                {/* Gallery Grid */}
                <div className="gallery-grid">
                    {images.map((img, idx) => (
                        <div 
                            className="gallery-item scroll-reveal active" 
                            key={idx}
                            onClick={() => openLightbox(idx)}
                        >
                            <img src={img.src} alt={img.title} className="gallery-img" />
                            <div className="gallery-overlay">
                                <div className="gallery-overlay-content">
                                    <span className="gallery-cat">{img.category}</span>
                                    <h4 className="gallery-item-title">{img.title}</h4>
                                    <div className="view-icon">
                                        <Maximize2 size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Lightbox Gallery Modal */}
            {isOpen && (
                <div 
                    className="lightbox open" 
                    role="dialog" 
                    aria-modal="true"
                    onClick={closeLightbox}
                >
                    <button className="lightbox-close" aria-label="Close Lightbox" onClick={closeLightbox}>
                        <X size={24} />
                    </button>
                    <button className="lightbox-prev" aria-label="Previous Image" onClick={prevImage}>
                        <ChevronLeft size={24} />
                    </button>
                    <button className="lightbox-next" aria-label="Next Image" onClick={nextImage}>
                        <ChevronRight size={24} />
                    </button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img 
                            src={images[currentIndex].src} 
                            alt={images[currentIndex].title} 
                            className="lightbox-img" 
                        />
                        <div className="lightbox-caption">
                            <span className="lightbox-cat">{images[currentIndex].category}</span>
                            <h4 className="lightbox-title">{images[currentIndex].title}</h4>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
