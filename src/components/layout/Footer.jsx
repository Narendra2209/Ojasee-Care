import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const handleWhatsApp = () => {
        // Redirect logic handled in Contact page or global context, but simple link here
        window.open(`https://wa.me/919876543210`, '_blank');
    };

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-section brand">
                    <div className="footer-brand-header">
                        <img src="/images/logo.png" alt="Ojasee Care" className="footer-logo-img" />
                        <h2 className="footer-logo">Ojasee Care</h2>
                    </div>
                    <p className="footer-tagline">Powered by Plants. Proven by Results.</p>
                    <div className="social-icons">
                        <a href="https://www.instagram.com/ojasee.care?igsh=cno5cTJxMmY3Ym9l" target="_blank" rel="noopener noreferrer"><Instagram size={24} /></a>
                        <a href="#"><Facebook size={24} /></a>
                        <a href="#"><Twitter size={24} /></a>
                    </div>
                </div>

                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/products?category=Men">Men's Care</a></li>
                        <li><a href="/products?category=Women">Women's Care</a></li>
                        <li><a href="/offers">Offers</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <div className="contact-item">
                        <MapPin size={18} />
                        <span>123 Ayurvedic Lane, Green City, India</span>
                    </div>
                    <div className="contact-item">
                        <Phone size={18} />
                        <span>+91 98765 43210</span>
                    </div>
                    <div className="contact-item">
                        <Mail size={18} />
                        <span>support@ojaseecare.com</span>
                    </div>
                    <button className="whatsapp-btn" onClick={handleWhatsApp}>
                        <MessageCircle size={18} />
                        Chat on WhatsApp
                    </button>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Ojasee Care. All rights reserved.</p>
                <div style={{ marginTop: '10px', fontSize: '0.8rem', opacity: 0.7 }}>
                    <a href="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>Owner Login</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
