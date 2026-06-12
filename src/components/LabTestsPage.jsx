import React, { useState } from 'react';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import CartSidebar from './CartSidebar';
import PrescriptionModal from './PrescriptionModal';

const labTests = [
  { id: 1, name: 'Full Body Checkup', tests: '88 tests', price: 1499, mrp: 2999, discount: 50, tag: 'POPULAR', color: '#e53e3e', icon: 'ti-activity' },
  { id: 2, name: 'Diabetes Care Package', tests: '12 tests', price: 649, mrp: 1299, discount: 50, tag: 'BESTSELLER', color: '#dd6b20', icon: 'ti-droplet' },
  { id: 3, name: 'Basic Health Checkup', tests: '42 tests', price: 499, mrp: 999, discount: 50, tag: null, color: '#38a169', icon: 'ti-heart-rate' },
  { id: 4, name: 'Aarogyam Checkup + Vitamins', tests: '64 tests', price: 2099, mrp: 3999, discount: 47, tag: 'COMPREHENSIVE', color: '#3182ce', icon: 'ti-star' },
  { id: 5, name: 'Thyroid Function Test', tests: '3 tests', price: 299, mrp: 599, discount: 50, tag: null, color: '#805ad5', icon: 'ti-microscope' },
  { id: 6, name: 'Kidney Function Test', tests: '8 tests', price: 349, mrp: 699, discount: 50, tag: null, color: '#2b6cb0', icon: 'ti-pill' },
  { id: 7, name: 'Liver Profile Test', tests: '11 tests', price: 449, mrp: 849, discount: 47, tag: null, color: '#c05621', icon: 'ti-clipboard-list' },
  { id: 8, name: "Women's Wellness Package", tests: '38 tests', price: 899, mrp: 1799, discount: 50, tag: 'WOMEN', color: '#d53f8c', icon: 'ti-heart' },
];

const healthConcerns = [
  { label: 'Full Body', icon: 'ti-activity', color: '#e53e3e' },
  { label: 'Vitamins', icon: 'ti-sun', color: '#d69e2e' },
  { label: 'Diabetes', icon: 'ti-droplet', color: '#dd6b20' },
  { label: 'Women Care', icon: 'ti-heart', color: '#d53f8c' },
  { label: 'Kidney', icon: 'ti-pill', color: '#3182ce' },
  { label: 'Thyroid', icon: 'ti-microscope', color: '#805ad5' },
  { label: 'Heart', icon: 'ti-heart-rate', color: '#e53e3e' },
  { label: 'Lifestyle', icon: 'ti-leaf', color: '#38a169' },
];

const LabTestsPage = ({ cart = [], onAddToCart, onChangeQty, showToastMsg }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [prescriptionOpen, setPrescriptionOpen] = useState(false);
  const cartCount = cart.reduce((a, b) => a + b.qty, 0);
  const cartSubtotal = cart.reduce((a, b) => a + Number(b.product_price || 0) * b.qty, 0);

  return (
    <div className="App">
      <SiteHeader
        searchQuery=""
        setSearchQuery={() => {}}
        onSearchSubmit={() => {}}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
        onOpenPrescription={() => setPrescriptionOpen(true)}
      />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', padding: '60px 24px', color: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <div style={{ background: '#e53e3e', color: 'white', display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 16 }}>
              ✓ NABL ACCREDITED LABS
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 42, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 ,color: '#e2e8f0'}}>
              Book Lab Tests<br /><span style={{ color: '#fbd38d' }}>at Home</span>
            </h1>
            <p style={{ color: '#e2e8f0', fontSize: 16, marginBottom: 24 }}>Safe sample collection from home. Results in 24–48 hours.</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: 8 }}>
                <i className="ti ti-home" style={{ color: '#fbd38d' }}></i>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Home Collection</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: 8 }}>
                <i className="ti ti-clock" style={{ color: '#fbd38d' }}></i>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Reports in 24hrs</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: 8 }}>
                <i className="ti ti-shield-check" style={{ color: '#fbd38d' }}></i>
                <span style={{ fontSize: 13, fontWeight: 600 }}>NABL Certified</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 32 }}>
              <i className="ti ti-microscope" style={{ fontSize: 64, color: '#fbd38d' }}></i>
              <div style={{ color: '#e53e3e', fontWeight: 800, fontSize: 28, marginTop: 8 }}>Up to 50% OFF</div>
              <div style={{ color: '#e2e8f0', fontSize: 13 }}>on all health packages</div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Concerns */}
      <section style={{ background: '#fff', padding: '40px 24px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24, fontFamily: 'Space Grotesk' }}>
            Lab Tests by <span style={{ color: '#e53e3e' }}>Health Concern</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 16 }}>
            {healthConcerns.map((hc, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '20px 12px', borderRadius: 12, border: '1px solid #f0f0f0', cursor: 'pointer', transition: 'all 0.2s', background: '#fafafa' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: hc.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                  <i className={`ti ${hc.icon}`} style={{ color: hc.color, fontSize: 22 }}></i>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#333' }}>{hc.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Booked */}
      <section style={{ background: '#f8faff', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, fontFamily: 'Space Grotesk' }}>Frequently Booked <span style={{ color: '#e53e3e' }}>Lab Tests</span></h2>
              <p style={{ color: '#666', marginTop: 4, fontSize: 14 }}>Trusted by millions. Book now, sample collected at home.</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {labTests.map(test => (
              <div key={test.id} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #f0f0f0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
                {test.tag && (
                  <div style={{ position: 'absolute', top: 12, right: 12, background: test.color, color: 'white', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4 }}>
                    {test.tag}
                  </div>
                )}
                <div style={{ width: 48, height: 48, background: test.color + '15', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <i className={`ti ${test.icon}`} style={{ color: test.color, fontSize: 24 }}></i>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: '#222' }}>{test.name}</h3>
                <p style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>{test.tests} included</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: '#222' }}>₹{test.price}</span>
                  <span style={{ fontSize: 13, color: '#999', textDecoration: 'line-through' }}>₹{test.mrp}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#38a169', background: '#f0fff4', padding: '2px 8px', borderRadius: 20 }}>{test.discount}% off</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ flex: 1, background: '#e53e3e', color: 'white', border: 'none', padding: '10px 0', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                    Book Now
                  </button>
                  <button style={{ padding: '10px 14px', border: '1px solid #e53e3e', borderRadius: 8, background: 'white', color: '#e53e3e', cursor: 'pointer' }}>
                    <i className="ti ti-info-circle"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onChangeQty={onChangeQty} subtotal={cartSubtotal} onCheckout={() => {}} />
      <PrescriptionModal isOpen={prescriptionOpen} onClose={() => setPrescriptionOpen(false)} showToastMsg={showToastMsg || (() => {})} />
      <Footer onOpenPrescription={() => setPrescriptionOpen(true)} />
    </div>
  );
};

export default LabTestsPage;
