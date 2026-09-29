import React from 'react';
import { MapPin, Clock, PhoneCall, ArrowUpRight } from 'lucide-react';

export default function Contact() {
    return (
        <section className="contact-section" id="contact">
            <div className="container">
                <div className="section-header scroll-reveal active">
                    <span className="section-subtitle">Visit Us</span>
                    <h2 className="section-title">Directions & Contact</h2>
                    <div className="gold-divider"></div>
                </div>

                <div className="contact-grid">
                    {/* Info Column */}
                    <div className="contact-info-column scroll-reveal active">
                        {/* Address Card */}
                        <div className="contact-detail-card">
                            <div className="detail-icon">
                                <MapPin size={20} />
                            </div>
                            <div className="detail-content">
                                <h4>Salon Address</h4>
                                <p>29/843, Shival Nagar, Pant Nagar,<br />Ghatkopar East, Mumbai, Maharashtra 400075</p>
                                <a 
                                    href="https://www.google.com/maps/place/Angel+salon+%26+Academy/@19.0850718,72.9121454,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c7a56b0b4e27:0x2f5182fec860269a!8m2!3d19.0850718!4d72.9121454!16s%2Fg%2F11rl9hc09h!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="details-link"
                                >
                                    Get Driving Directions <ArrowUpRight size={14} style={{ marginLeft: '4px' }} />
                                </a>
                            </div>
                        </div>

                        {/* Hours Card */}
                        <div className="contact-detail-card">
                            <div className="detail-icon">
                                <Clock size={20} />
                            </div>
                            <div className="detail-content">
                                <h4>Opening Hours</h4>
                                <p><strong>Open Daily:</strong> 9:30 AM – 9:00 PM</p>
                                <p className="special-note">All days of the week, including Sundays.</p>
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className="contact-detail-card">
                            <div className="detail-icon">
                                <PhoneCall size={20} />
                            </div>
                            <div className="detail-content">
                                <h4>Call & Connect</h4>
                                <p><strong>Primary Line:</strong> <a href="tel:07303312054" className="tel-link">073033 12054</a></p>
                                <p><strong>WhatsApp Inquiry:</strong> <a href="https://wa.me/917303312054" className="tel-link">073033 12054</a></p>
                            </div>
                        </div>
                    </div>

                    {/* Map Column */}
                    <div className="contact-map-column scroll-reveal active delay-1">
                        <div className="map-wrapper">
                            {/* Embedded Google Map */}
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.811802958434!2d72.9121454!3d19.0850718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7a56b0b4e27%3A0x2f5182fec860269a!2sAngel&#39;s%20Salon%20%26%20Academy!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Angels Salon & Academy Location Map"
                                className="google-map-iframe"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
