import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="container">
                <div className="footer-top">
                    {/* Branding column */}
                    <div className="footer-col footer-brand">
                        <div className="footer-logo-wrapper">
                            <img src="/logo.jpg" alt="Angels Salon & Academy Logo" className="footer-logo-img" />
                        </div>
                        <p className="footer-about-text">Delivering professional beauty styling and government-recognized courses in Mumbai. Your premier destination for elegance.</p>
                    </div>

                    {/* Navigation Column */}
                    <div className="footer-col">
                        <h4 className="footer-title">Quick Navigation</h4>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#services">Our Services</a></li>
                            <li><a href="#about">About Philosophy</a></li>
                            <li><a href="#gallery">Portfolio Gallery</a></li>
                            <li><a href="#reviews">Google Reviews</a></li>
                        </ul>
                    </div>

                    {/* Contact column */}
                    <div className="footer-col">
                        <h4 className="footer-title">Salon Contact</h4>
                        <p className="footer-contact-item">
                            <MapPin size={16} /> 29/843, Shival Nagar, Pant Nagar, Ghatkopar East, Mumbai 400075
                        </p>
                        <p className="footer-contact-item">
                            <Phone size={16} /> 073033 12054
                        </p>
                        <p className="footer-contact-item">
                            <Mail size={16} /> info@angelssalon.com
                        </p>
                    </div>

                    {/* Social and Hours Column */}
                    <div className="footer-col">
                        <h4 className="footer-title">Follow Our Artistry</h4>
                        <div className="footer-socials">
                            <a 
                                href="https://www.instagram.com/angelsalon_ghatkopar?igsh=MTY4M2pxcWNheHRsOA%3D%3D" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="social-link" 
                                aria-label="Instagram Page"
                            >
                                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="social-icon">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>

                            <a 
                                href="https://www.facebook.com/people/Angel-Salon-Academy/100069843930101/?ref=NONE_xav_ig_profile_page_web#" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="social-link" 
                                aria-label="Facebook Page"
                            >
                                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="social-icon">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                        </div>
                        <p className="footer-hours-note">Open all days: 9:30 AM to 9:00 PM</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 Angels Salon & Academy. All Rights Reserved. Designed for elegance.</p>
                    <div className="footer-bottom-links">
                        <a href="#header">Privacy Policy</a>
                        <span>|</span>
                        <a href="#header">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
