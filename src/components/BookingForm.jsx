import React, { useState } from 'react';
import { User, Phone as PhoneIcon, Scissors, Calendar, Clock, Sparkles, Check, MessageSquare } from 'lucide-react';

export default function BookingForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: '',
        date: '',
        time: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [submittedData, setSubmittedData] = useState({});

    // Min date is today
    const todayStr = new Date().toISOString().split('T')[0];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error as user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const tempErrors = {};
        
        if (!formData.name.trim() || formData.name.trim().length < 2) {
            tempErrors.name = 'Please enter your name (minimum 2 characters)';
        }

        const cleanPhone = formData.phone.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
            tempErrors.phone = 'Please enter a valid 10-digit mobile number';
        }

        if (!formData.service) {
            tempErrors.service = 'Please select a service interest';
        }

        if (!formData.date) {
            tempErrors.date = 'Select a date';
        } else {
            const selectedDate = new Date(formData.date);
            const currentDate = new Date();
            currentDate.setHours(0,0,0,0);
            if (selectedDate < currentDate) {
                tempErrors.date = 'Select today or a future date';
            }
        }

        if (!formData.time) {
            tempErrors.time = 'Select a time slot';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            
            // Simulate API Request delay
            setTimeout(() => {
                setIsLoading(false);
                setSubmittedData(formData);
                setShowModal(true);
                // Reset form fields
                setFormData({
                    name: '',
                    phone: '',
                    service: '',
                    date: '',
                    time: ''
                });
            }, 1200);
        }
    };

    const formatDisplayDate = (dateStr) => {
        if (!dateStr) return '';
        const dateObj = new Date(dateStr);
        return dateObj.toLocaleDateString('en-IN', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Prefilled WhatsApp Message Details
    const waNumber = '917303312054';
    const waMessage = submittedData.name ? `Hi Angels Salon & Academy! I would like to book a premium appointment request.\n\n*Client Details*:\n👤 *Name*: ${submittedData.name}\n📞 *Phone*: ${submittedData.phone}\n✨ *Service*: ${submittedData.service}\n📅 *Date*: ${formatDisplayDate(submittedData.date)}\n🕒 *Time*: ${submittedData.time}\n\nPlease confirm availability!` : '';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

    return (
        <>
            <section className="booking-section" id="booking">
                <div className="container">
                    <div className="booking-card-wrapper scroll-reveal active">
                        <div className="booking-left-banner">
                            <div className="booking-banner-overlay"></div>
                            <div className="booking-banner-content">
                                <div className="banner-logo">
                                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="25" stroke="#DFAC6C" strokeWidth="1" fill="none"/>
                                        <text x="50" y="55" fontFamily="'Cormorant Garamond', serif" fontSize="22" fill="#DFAC6C" textAnchor="middle">A</text>
                                    </svg>
                                </div>
                                <h3>Reserve Your Angels Experience</h3>
                                <p>Fill out our appointment request form, and our concierge team will reach out within 2 hours to confirm your time. For instant confirmation, you can tap the floating WhatsApp button.</p>
                                
                                <div className="booking-quick-info">
                                    <div className="info-item">
                                        <Clock size={16} />
                                        <span>Response Time: &lt; 2 Hours</span>
                                    </div>
                                    <div className="info-item">
                                        <Sparkles size={16} />
                                        <span>Complimentary Styling Advice Included</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Booking Form Side */}
                        <div className="booking-form-side">
                            <h3 className="form-title">Request Appointment</h3>
                            <p className="form-subtitle">All booking fields are required for tailored scheduling.</p>
                            
                            <form onSubmit={handleSubmit} className="appointment-form" noValidate>
                                {/* Name Field */}
                                <div className={`form-group ${errors.name ? 'invalid' : ''}`}>
                                    <label htmlFor="clientName">Full Name</label>
                                    <div className="input-wrapper">
                                        <User className="input-icon" size={16} />
                                        <input 
                                            type="text" 
                                            id="clientName" 
                                            name="name" 
                                            placeholder="Rahul Gupta" 
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                    </div>
                                    <span className="error-msg">{errors.name}</span>
                                </div>

                                {/* Phone Field */}
                                <div className={`form-group ${errors.phone ? 'invalid' : ''}`}>
                                    <label htmlFor="clientPhone">Phone Number</label>
                                    <div className="input-wrapper">
                                        <PhoneIcon className="input-icon" size={16} />
                                        <input 
                                            type="tel" 
                                            id="clientPhone" 
                                            name="phone" 
                                            placeholder="0987654321" 
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                    </div>
                                    <span className="error-msg">{errors.phone}</span>
                                </div>

                                {/* Service Field */}
                                <div className={`form-group ${errors.service ? 'invalid' : ''}`}>
                                    <label htmlFor="clientService">Service / Inquiry Interest</label>
                                    <div className="input-wrapper">
                                        <Scissors className="input-icon" size={16} />
                                        <select 
                                            id="clientService" 
                                            name="service" 
                                            value={formData.service}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="" disabled>Select service category</option>
                                            <option value="Hair Styling & Design">Hair Design & Styling</option>
                                            <option value="Advanced Skincare Facial">Advanced Skincare</option>
                                            <option value="Flawless HD Makeup">Flawless Makeup Artistry</option>
                                            <option value="Luxury Nail Art extensions">Luxury Nail Artistry</option>
                                            <option value="Bridal Couture Styling">Bridal Couture Style</option>
                                            {/* <option value="Angels Academy Courses">Angels Academy Course Info</option> */}
                                        </select>
                                    </div>
                                    <span className="error-msg">{errors.service}</span>
                                </div>

                                {/* Date & Time Row */}
                                <div className="form-row">
                                    <div className={`form-group ${errors.date ? 'invalid' : ''}`}>
                                        <label htmlFor="clientDate">Preferred Date</label>
                                        <div className="input-wrapper">
                                            <Calendar className="input-icon" size={16} />
                                            <input 
                                                type="date" 
                                                id="clientDate" 
                                                name="date" 
                                                min={todayStr}
                                                value={formData.date}
                                                onChange={handleInputChange}
                                                required 
                                            />
                                        </div>
                                        <span className="error-msg">{errors.date}</span>
                                    </div>
                                    <div className={`form-group ${errors.time ? 'invalid' : ''}`}>
                                        <label htmlFor="clientTime">Preferred Time</label>
                                        <div className="input-wrapper">
                                            <Clock className="input-icon" size={16} />
                                            <select 
                                                id="clientTime" 
                                                name="time" 
                                                value={formData.time}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="" disabled>Select time slot</option>
                                                <option value="09:30 AM - 11:00 AM">09:30 AM - 11:00 AM</option>
                                                <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                                                <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                                                <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                                                <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                                                <option value="07:00 PM - 09:00 PM">07:00 PM - 09:00 PM</option>
                                            </select>
                                        </div>
                                        <span className="error-msg">{errors.time}</span>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-gold btn-full btn-large" disabled={isLoading}>
                                    {!isLoading ? (
                                        <span className="btn-text">Send Booking Request</span>
                                    ) : (
                                        <>
                                            <span className="btn-text" style={{ marginRight: '10px' }}>Scheduling Request...</span>
                                            <div className="btn-spinner"></div>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Confirmation Success Modal */}
            {showModal && (
                <div className="booking-modal-overlay open" onClick={() => setShowModal(false)}>
                    <div className="booking-success-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="success-icon-wrapper">
                            <Check size={28} />
                        </div>
                        <h3 className="success-modal-title">Appointment Request Sent</h3>
                        <p className="success-modal-text">
                            Thank you, <strong>{submittedData.name}</strong>. We have received your booking request for <span>{submittedData.service}</span> on <span>{formatDisplayDate(submittedData.date)}</span> at <span>{submittedData.time}</span>.
                        </p>
                        
                        <p className="success-modal-action-text">For immediate, priority confirmation, send your details to our team via WhatsApp instantly:</p>
                        
                        <div className="success-modal-actions">
                            <a 
                                href={waUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-whatsapp-success btn-full"
                            >
                                <MessageSquare className="btn-icon" size={18} /> Confirm Booking on WhatsApp
                            </a>
                            <button 
                                type="button" 
                                className="btn btn-outline-dark btn-full" 
                                onClick={() => setShowModal(false)}
                            >
                                Return to Page
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
