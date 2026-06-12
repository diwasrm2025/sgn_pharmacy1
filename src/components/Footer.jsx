import React, { useState } from 'react';
import appLogo from "../assets/images/logo.png";
import '../styles/Footer.css';

const Footer = ({ onOpenPrescription }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <a className="logo-wrap" href="#home" onClick={(e) => handleNavClick(e, 'home')} style={{ marginBottom: '16px' }}>
              <img src={appLogo} alt='Logo' height={'70px'}/>
            </a>
            <p>Your trusted neighborhood health companion. We provide 100% authentic medicines, vitamins, baby care, and skincare products delivered straight to your door with utmost care.</p>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Facebook">
                <i className="ti ti-brand-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram">
                <i className="ti ti-brand-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Twitter">
                <i className="ti ti-brand-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn">
                <i className="ti ti-brand-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4>Shop & Services</h4>
            <ul>
              <li><a href="#medicines" onClick={(e) => handleNavClick(e, 'medicines')}>Medicines</a></li>
              <li><a href="#categories" onClick={(e) => handleNavClick(e, 'categories')}>Categories</a></li>
              <li><a href="#deals" onClick={(e) => handleNavClick(e, 'deals')}>Amazing Deals</a></li>
              <li><a href="#upload-rx" onClick={(e) => { e.preventDefault(); onOpenPrescription(); }}>Upload Prescription</a></li>
            </ul>
          </div>

          {/* Care & Support Column */}
          <div className="footer-col">
            <h4>Help & Support</h4>
            <ul>
              <li><a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>FAQs</a></li>
              <li><a href="#contact" onClick={(e) => e.preventDefault()}>Contact Us</a></li>
              <li><a href="#terms" onClick={(e) => e.preventDefault()}>Terms & Conditions</a></li>
              <li><a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for exclusive health tips, wellness discounts, and seasonal offers.</p>
            
            {!subscribed ? (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                  <i className="ti ti-send"></i>
                </button>
              </form>
            ) : (
              <div className="subscribed-msg">
                <i className="ti ti-circle-check"></i> Thanks for subscribing!
              </div>
            )}
          </div>
        </div>

        {/* Bottom footer */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SGN Pharmacy Pvt Ltd. All rights reserved. Registered Pharmacist Licence: DL-XXXXXX.</p>
          
          <div className="footer-payments">
            <i className="ti ti-brand-visa" title="Visa"></i>
            <i className="ti ti-brand-mastercard" title="Mastercard"></i>
            <i className="ti ti-credit-card" title="RuPay Card"></i>
            <i className="ti ti-device-mobile" title="UPI Apps"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
