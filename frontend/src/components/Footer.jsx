import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        
        {/* Brand Column */}
        <div className="footer-col">
          <h3 className="footer-logo">TalentScout<span className="logo-accent">AI</span></h3>
          <p className="footer-desc">
            Empowering recruitment teams with intelligent, unbiased, and efficient hiring automation.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a href="#" aria-label="GitHub"><Github size={20} /></a>
          </div>
        </div>

        {/* Links Column */}
        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Case Studies</a></li>
            <li><a href="#">API Access</a></li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="footer-col">
          <h4>Customer Support</h4>
          <ul className="contact-list">
            <li>
              <Mail size={16} /> 
              <span>support@talentscout.ai</span>
            </li>
            <li>
              <Phone size={16} /> 
              <span>+1 (555) 123-4567</span>
            </li>
            <li>
              <MapPin size={16} /> 
              <span>123 AI Boulevard, Tech City</span>
            </li>
          </ul>
        </div>

      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 TalentScout AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
