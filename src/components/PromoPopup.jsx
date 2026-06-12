import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Popup.css';

const PROMO_OFFERS = [
  {
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    badge: '🔥 Today Only',
    title: 'Up to <span>60% OFF</span> on Medicines',
    desc: 'Stock up on your daily essentials and prescription medicines at unbeatable prices. Limited period offer — shop now before stocks run out!',
    cta: 'Shop Offers Now',
  },
  {
    img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80',
    badge: '🧬 New Arrivals',
    title: 'Premium <span>Wellness Kits</span> Are Here',
    desc: 'Doctor-curated health kits for immunity, diabetes care, and weight management. Delivered to your door, fast.',
    cta: 'Explore Wellness',
  },
  {
    img: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=800&q=80',
    badge: '💊 Prescription Upload',
    title: 'Order with <span>Prescription</span> — Easy & Safe',
    desc: 'Upload your doctor\'s prescription and get verified medicines delivered in under 4 hours. Safe, authentic, and affordable.',
    cta: 'View All Deals',
  },
];

const STORAGE_KEY = 'sgn_popup_dismissed';

function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const [noShow, setNoShow] = useState(false);
  const navigate = useNavigate();

  const offer = PROMO_OFFERS[Math.floor(Math.random() * PROMO_OFFERS.length)];

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    setVisible(false);
    if (noShow) sessionStorage.setItem(STORAGE_KEY, '1');
  };

  const goToOffers = () => {
    close();
    navigate('/offers');
  };

  if (!visible) return null;

  return (
    <div className="promo-popup-overlay" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="promo-popup">
        <button className="promo-popup-close" onClick={close} aria-label="Close">
          <i className="ti ti-x"></i>
        </button>

        <img
          src={offer.img}
          alt="Offer"
          className="promo-popup-img"
          onClick={goToOffers}
        />

        <div className="promo-popup-body">
          <div className="promo-popup-badge">
            <i className="ti ti-sparkles"></i>
            {offer.badge}
          </div>

          <h2
            className="promo-popup-title"
            dangerouslySetInnerHTML={{ __html: offer.title }}
          />

          <p className="promo-popup-desc">{offer.desc}</p>

          <div className="promo-popup-actions">
            <button className="promo-popup-cta" onClick={goToOffers}>
              <i className="ti ti-tag"></i>
              {offer.cta}
            </button>
            <button className="promo-popup-dismiss" onClick={close}>
              Maybe Later
            </button>
          </div>

          <label className="promo-popup-noshow">
            <input
              type="checkbox"
              checked={noShow}
              onChange={(e) => setNoShow(e.target.checked)}
            />
            Don't show this session
          </label>
        </div>
      </div>
    </div>
  );
}

export default PromoPopup;
