import React, { useState, useEffect } from 'react';
import { Phone, X, Menu } from 'lucide-react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
        if (!isDrawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const handleLinkClick = () => {
        setIsDrawerOpen(false);
        document.body.style.overflow = '';
    };

    return (
        <>
            {/* Header Navigation */}
            <header className={`main-header ${isScrolled ? 'scrolled' : ''}`} id="header">
                <div className="header-container">
                    <a href="#home" className="logo-link" aria-label="Angels Salon & Academy Home">
                        <div className="logo-wrapper">
                            <img src="/logo.jpg" alt="Angels Salon & Academy Logo" className="logo-img" />
                        </div>
                    </a>

                    {/* Desktop Navigation Links */}
                    <nav className="desktop-nav" aria-label="Desktop Navigation">
                        <ul className="nav-list">
                            <li><a href="#home" className="nav-item">Home</a></li>
                            <li><a href="#services" className="nav-item">Services</a></li>
                            <li><a href="#about" className="nav-item">About</a></li>
                            <li><a href="#gallery" className="nav-item">Gallery</a></li>
                            <li><a href="#reviews" className="nav-item">Reviews</a></li>
                            <li><a href="#contact" className="nav-item">Contact</a></li>
                        </ul>
                    </nav>

                    {/* Quick Contacts & Call Actions */}
                    <div className="header-actions">
                        <a href="tel:07303312054" className="header-phone" aria-label="Call Angels Salon">
                            <Phone className="phone-icon" size={14} />
                            <span>073033 12054</span>
                        </a>
                        <a href="#booking" className="btn btn-gold header-cta">Book Appointment</a>
                        
                        <button 
                            className={`mobile-toggle ${isDrawerOpen ? 'open' : ''}`} 
                            aria-label="Toggle Navigation Menu" 
                            aria-expanded={isDrawerOpen}
                            onClick={toggleDrawer}
                        >
                            <span className="hamburger-bar"></span>
                            <span className="hamburger-bar"></span>
                            <span className="hamburger-bar"></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer Menu */}
            <div className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`} aria-hidden={!isDrawerOpen}>
                <div className="drawer-header">
                    <span className="drawer-title">MENU</span>
                    <button className="drawer-close" aria-label="Close Menu" onClick={toggleDrawer}>
                        <X size={20} />
                    </button>
                </div>
                <nav className="mobile-nav" aria-label="Mobile Navigation">
                    <ul className="mobile-nav-list">
                        <li><a href="#home" className="mobile-nav-item" onClick={handleLinkClick}>Home</a></li>
                        <li><a href="#services" className="mobile-nav-item" onClick={handleLinkClick}>Services</a></li>
                        <li><a href="#about" className="mobile-nav-item" onClick={handleLinkClick}>About Us</a></li>
                        <li><a href="#gallery" className="mobile-nav-item" onClick={handleLinkClick}>Gallery</a></li>
                        <li><a href="#reviews" className="mobile-nav-item" onClick={handleLinkClick}>Reviews</a></li>
                        <li><a href="#contact" className="mobile-nav-item" onClick={handleLinkClick}>Contact & Location</a></li>
                    </ul>
                </nav>
                <div className="drawer-footer">
                    <a href="tel:07303312054" className="drawer-phone">
                        <Phone size={16} />
                        073033 12054
                    </a>
                    <a href="#booking" className="btn btn-gold drawer-cta" onClick={handleLinkClick}>Book Appointment</a>
                </div>
            </div>
            
            {/* Drawer Overlay */}
            <div 
                className={`drawer-overlay ${isDrawerOpen ? 'active' : ''}`} 
                onClick={toggleDrawer}
            ></div>
        </>
    );
}
