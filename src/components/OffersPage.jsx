import React, { useState } from 'react';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import CartSidebar from './CartSidebar';

const offers = [
  { code: 'FIRST20', title: 'First Order Discount', desc: '20% off on your first medicine order. Min cart ₹299.', discount: '20% OFF', expiry: 'Limited time', color: '#e53e3e', category: 'Medicines' },
  { code: 'HEALTH50', title: 'Health Package Deal', desc: '50% off on all lab test packages booked this week.', discount: '50% OFF', expiry: 'Ends Sunday', color: '#3182ce', category: 'Lab Tests' },
  { code: 'SKINCARE30', title: 'Skincare Fiesta', desc: '30% off on all personal care and skincare products.', discount: '30% OFF', expiry: '3 days left', color: '#d53f8c', category: 'Personal Care' },
  { code: 'FREEDEL', title: 'Free Delivery Week', desc: 'Free delivery on all orders above ₹199 this week only.', discount: 'FREE DELIVERY', expiry: '5 days left', color: '#38a169', category: 'All' },
  { code: 'BABY25', title: 'Baby Care Bonanza', desc: '25% off on baby wipes, creams, and hygiene products.', discount: '25% OFF', expiry: '7 days left', color: '#d69e2e', category: 'Baby Care' },
  { code: 'DIAB40', title: 'Diabetic Care Offer', desc: '40% off on glucometers, strips and diabetic kits.', discount: '40% OFF', expiry: '2 days left', color: '#805ad5', category: 'Diabetic Care' },
];

const banners = [
  { title: 'Monsoon Wellness Sale', subtitle: 'Stock up on immunity boosters & vitamins', label: 'Up to 60% OFF', color: 'linear-gradient(135deg, #1a365d, #2b6cb0)', icon: 'ti-cloud-rain' },
  { title: 'Order with Prescription', subtitle: 'Upload Rx and get your medicines delivered', label: 'Same Day Delivery', color: 'linear-gradient(135deg, #1c4532, #276749)', icon: 'ti-file-text' },
  { title: 'Refer & Earn', subtitle: 'Refer a friend, both get ₹100 cashback', label: '₹100 Cashback', color: 'linear-gradient(135deg, #744210, #c05621)', icon: 'ti-gift' },
];

const OffersPage = ({ cart = [], onAddToCart, onChangeQty }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [copied, setCopied] = useState(null);
  const cartCount = cart.reduce((a, b) => a + b.qty, 0);
  const cartSubtotal = cart.reduce((a, b) => a + Number(b.product_price || 0) * b.qty, 0);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="App">
      <SiteHeader searchQuery="" setSearchQuery={() => {}} onSearchSubmit={() => {}} onOpenCart={() => setIsCartOpen(true)} cartCount={cartCount} onOpenPrescription={() => {}} />

      <section style={{ background: 'linear-gradient(135deg, #2d1b69 0%, #c41230 100%)', padding: '56px 24px', textAlign: 'center', color: 'white' }}>
        <div style={{ background: '#f6ad55', color: '#1a1a1a', display: 'inline-block', padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 16 }}>
          🎉 EXCLUSIVE DEALS
        </div>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 42, fontWeight: 800, marginBottom: 12,color: '#e2e8f0' }}>Best Offers & <span style={{ color: '#fbd38d' }}>Coupons</span></h1>
        <p style={{ color: '#e2e8f0', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>Save big on medicines, lab tests, and healthcare products. New deals every week!</p>
      </section>

      {/* Banners */}
      <section style={{ background: '#f8faff', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {banners.map((b, i) => (
              <div key={i} style={{ background: b.color, borderRadius: 16, padding: '28px 24px', color: 'white', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ position: 'absolute', right: -20, top: -20, opacity: 0.15 }}>
                  <i className={`ti ${b.icon}`} style={{ fontSize: 100 }}></i>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>{b.label}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 ,color: '#e2e8f0'}}>{b.title}</h3>
                <p style={{ fontSize: 13, opacity: 0.9, marginBottom: 16 }}>{b.subtitle}</p>
                <button style={{ background: 'white', color: '#000000', border: 'none', padding: '8px 16px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                  Shop Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coupons */}
      <section style={{ background: '#fff', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 28, fontFamily: 'Space Grotesk' }}>Active <span style={{ color: '#e53e3e' }}>Coupon Codes</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {offers.map((offer, i) => (
              <div key={i} style={{ border: `2px dashed ${offer.color}40`, borderRadius: 16, overflow: 'hidden', background: '#fafafa' }}>
                <div style={{ background: offer.color, padding: '16px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 800, fontSize: 20 }}>{offer.discount}</div>
                  <div style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{offer.category}</div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 6 }}>{offer.title}</h3>
                  <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>{offer.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: offer.color + '10', border: `1px dashed ${offer.color}`, padding: '8px 14px', borderRadius: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: offer.color, letterSpacing: 1 }}>{offer.code}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(offer.code)}
                      style={{ background: copied === offer.code ? '#38a169' : offer.color, color: 'white', border: 'none', padding: '9px 18px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}>
                      {copied === offer.code ? '✓ Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 12, color: '#999', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <i className="ti ti-clock" style={{ fontSize: 12 }}></i> {offer.expiry}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onChangeQty={onChangeQty} subtotal={cartSubtotal} onCheckout={() => {}} />
      <Footer onOpenPrescription={() => {}} />
    </div>
  );
};

export default OffersPage;
