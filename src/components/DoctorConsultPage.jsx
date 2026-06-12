import React, { useState } from 'react';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import CartSidebar from './CartSidebar';

const specialties = [
  { label: 'General Physician', icon: 'ti-stethoscope', color: '#3182ce', patients: '2.1M+', fee: 299 },
  { label: 'Dermatologist', icon: 'ti-sparkles', color: '#d53f8c', patients: '980K+', fee: 399 },
  { label: 'Gynaecologist', icon: 'ti-heart', color: '#e53e3e', patients: '1.2M+', fee: 499 },
  { label: 'Cardiologist', icon: 'ti-heart-rate', color: '#dd6b20', patients: '560K+', fee: 599 },
  { label: 'Diabetologist', icon: 'ti-droplet', color: '#38a169', patients: '890K+', fee: 449 },
  { label: 'ENT Specialist', icon: 'ti-ear', color: '#805ad5', patients: '430K+', fee: 349 },
  { label: 'Paediatrician', icon: 'ti-baby-carriage', color: '#d69e2e', patients: '1.5M+', fee: 399 },
  { label: 'Orthopaedist', icon: 'ti-bone', color: '#2b6cb0', patients: '670K+', fee: 499 },
];

const doctors = [
  { name: 'Dr. Priya Sharma', specialty: 'General Physician', exp: '12 yrs', rating: 4.9, reviews: 2841, fee: 299, available: 'Available in 10 min', color: '#3182ce' },
  { name: 'Dr. Rohan Mehta', specialty: 'Cardiologist', exp: '18 yrs', rating: 4.8, reviews: 1654, fee: 599, available: 'Available now', color: '#dd6b20' },
  { name: 'Dr. Ananya Iyer', specialty: 'Dermatologist', exp: '9 yrs', rating: 4.9, reviews: 3102, fee: 399, available: 'Available in 5 min', color: '#d53f8c' },
  { name: 'Dr. Vikram Nair', specialty: 'Diabetologist', exp: '15 yrs', rating: 4.7, reviews: 1987, fee: 449, available: 'Available in 20 min', color: '#38a169' },
];

const DoctorConsultPage = ({ cart = [], onAddToCart, onChangeQty, showToastMsg }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = cart.reduce((a, b) => a + b.qty, 0);
  const cartSubtotal = cart.reduce((a, b) => a + Number(b.product_price || 0) * b.qty, 0);

  return (
    <div className="App">
      <SiteHeader searchQuery="" setSearchQuery={() => {}} onSearchSubmit={() => {}} onOpenCart={() => setIsCartOpen(true)} cartCount={cartCount} onOpenPrescription={() => {}} />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', padding: '60px 24px', color: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ background: '#3182ce', display: 'inline-block', padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 16 }}>
              <i className="ti ti-stethoscope" style={{ marginRight: 6 }}></i>CONSULT ONLINE
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk',color:'white', fontSize: 42, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
              Talk to a Doctor<br /><span style={{ color: '#90cdf4' }}>in Minutes</span>
            </h1>
            <p style={{ color: '#cbd5e0', fontSize: 16, marginBottom: 28 }}>Video & audio consultations with India's top verified doctors. Available 24x7.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['₹199 First Consult', '24x7 Available', '100% Verified'].map((t, i) => (
                <span key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                  <i className="ti ti-check" style={{ color: '#68d391', marginRight: 6 }}></i>{t}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[{ n: '50K+', l: 'Doctors' }, { n: '10M+', l: 'Consults Done' }, { n: '4.8★', l: 'Avg Rating' }, { n: '24/7', l: 'Available' }].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#90cdf4' }}>{s.n}</div>
                <div style={{ fontSize: 12, color: '#a0aec0', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section style={{ background: '#fff', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 28, fontFamily: 'Space Grotesk' }}>Choose a <span style={{ color: '#e53e3e' }}>Specialty</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {specialties.map((s, i) => (
              <div key={i} style={{ padding: '24px 20px', border: '1px solid #f0f0f0', borderRadius: 14, cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s', background: '#fafafa' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = `0 4px 20px ${s.color}20`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ width: 56, height: 56, background: s.color + '15', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <i className={`ti ${s.icon}`} style={{ color: s.color, fontSize: 26 }}></i>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#222', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{s.patients} patients</div>
                <div style={{ marginTop: 8, fontWeight: 700, color: s.color, fontSize: 14 }}>from ₹{s.fee}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Doctors */}
      <section style={{ background: '#f8faff', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 28, fontFamily: 'Space Grotesk' }}>Our Top <span style={{ color: '#e53e3e' }}>Doctors</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {doctors.map((doc, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #f0f0f0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: doc.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="ti ti-user-circle" style={{ fontSize: 32, color: doc.color }}></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: '#222' }}>{doc.name}</div>
                    <div style={{ fontSize: 13, color: '#666', marginTop: 2 }}>{doc.specialty}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{doc.exp} experience</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <span style={{ background: '#f0fff4', color: '#38a169', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                    ★ {doc.rating}
                  </span>
                  <span style={{ color: '#888', fontSize: 12 }}>{doc.reviews} reviews</span>
                </div>
                <div style={{ background: '#f0fff4', color: '#38a169', padding: '8px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <i className="ti ti-clock"></i> {doc.available}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, fontSize: 18, color: '#222' }}>₹{doc.fee}</span>
                  <button style={{ background: '#e53e3e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                    Consult Now
                  </button>
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

export default DoctorConsultPage;
