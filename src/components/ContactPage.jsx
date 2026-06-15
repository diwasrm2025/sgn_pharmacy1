import React from 'react';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
const locations = [
  {
    name: 'Trichy SRM Hospital',
    googleMap: 'https://maps.app.goo.gl/6eJjc7eDdpSrgt1C7',
    mobile: '7871006465'
  },
  {
    name: 'Samayapuram Toll Plaza',
    googleMap: 'https://maps.app.goo.gl/5n5nf6Z4Rjx59cvW9',
    mobile: '9087944406'
  },
  {
    name: 'Ponmalaipatti',
    googleMap: 'https://maps.app.goo.gl/4g3LRySZKqRgj6M66',
    mobile: '9087944407'
  },
  {
    name: 'Samayapuram Kadaiveethi',
    googleMap: 'https://maps.app.goo.gl/ZDA6r6aLFUuUCZDw8',
    mobile: '9087944401'
  },
  {
    name: 'Sangenthi',
    googleMap: 'https://maps.app.goo.gl/8Mf5Gf8R9s9KsGyN6',
    mobile: '9087944403'
  },
  {
    name: 'Thuraiyur',
    googleMap: 'https://maps.app.goo.gl/8U2u31berDzHDuvc6',
    mobile: '9087944408'
  },
  {
    name: 'Perambalur 4 Road',
    googleMap: 'https://maps.app.goo.gl/Lse8PqkAzDu89TyHA',
    mobile: '9087901515'
  },
  {
    name: 'Perambalur New Busstand',
    googleMap: 'https://maps.app.goo.gl/LPRY7Z6r15qQNmMn8',
    mobile: '9087944410'
  },
  {
    name: 'Perambalur Old Bus stand',
    googleMap: 'https://maps.app.goo.gl/EbLfqQm4MNvozyeUA',
    mobile: '9087905252'
  },
  {
    name: 'Valadi',
    googleMap: 'https://maps.app.goo.gl/ud6K7Cp1QTPduY8cA',
    mobile: '9087944404'
  },
  {
    name: 'Mullai Nagar - Ramapuram Chennai',
    googleMap: 'https://maps.app.goo.gl/LigSzRHM7mM3QD4bA',
    mobile: '7824858000'
  },
  {
    name: 'SRM Prime Hospital',
    googleMap: 'https://maps.app.goo.gl/UUGW9pazh3BNnc6X7',
    mobile: '9600005003'
  },
  {
    name: 'SRM Hospital West Mambalam',
    googleMap: 'https://maps.app.goo.gl/fmCRD2tDFTxnjkwBA',
    mobile: '7550044199'
  },
  {
    name: 'SGN Opticals',
    googleMap: 'https://maps.app.goo.gl/6eJjc7eDdpSrgt1C7',
    mobile: '7871006848'
  }
];
const ContactPage = ({ cart = [] }) => {
  const cartCount = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <div className="App">
      <SiteHeader searchQuery="" setSearchQuery={() => {}} onSearchSubmit={() => {}} onOpenCart={() => {}} cartCount={cartCount} onOpenPrescription={() => {}} />

      <section style={{ background: 'linear-gradient(90deg, #8b0000 0%, #c62828 50%, #e53935 100%)', padding: '60px 24px', color: 'white', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 42, fontWeight: 800, marginBottom: 12,color: '#ffffff' }}>Contact <span style={{ color: '#2b2b2b' }}>Us</span></h1>
        <p style={{ color: '#e2e8f0', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>Find our presence across India. We are committed to providing 24/7 pharmaceutical support at your nearest location.</p>
      </section>

      <section style={{ background: '#f8faff', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {locations.map((loc, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
                <a href={loc.googleMap} target="_blank" rel="noopener noreferrer">
                  <div style={{ width: 40, height: 40, background: '#ce313115', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <i className="ti ti-map-pin" style={{ color: '#ce3131', fontSize: 20 }}></i>
                  </div>
                </a>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: '#2d3748' }}>{loc.name}</h3>
                <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, color: '#4a5568', fontSize: 14 }}>
                  <i className="ti ti-phone" style={{ color: '#38a169' }}></i>
                  <strong>{loc.mobile}</strong>
                </div>
                <a href={loc.googleMap} target="_blank" rel="noopener noreferrer"style={{ color: '#1750a5', fontSize: 13, lineHeight: 1.5, margin: 0 ,textDecoration:'underline'}}>View Location</a>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, background: '#fff', borderRadius: 20, padding: 40, textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Need Emergency Support?</h2>
            <p style={{ color: '#4a5568', marginBottom: 24 }}>Our global helpline is available 24x7 for all medical emergencies and medicine delivery inquiries.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, background: '#e53e3e15', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="ti ti-headset" style={{ color: '#e53e3e', fontSize: 24 }}></i>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 12, color: '#718096' }}>Toll Free</div>
                  <div style={{ fontWeight: 800 }}>1800-SGN-PHARMA</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, background: '#38a16915', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="ti ti-mail" style={{ color: '#38a169', fontSize: 24 }}></i>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 12, color: '#718096' }}>Email Support</div>
                  <div style={{ fontWeight: 800 }}>care@sgnpharmacy.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onOpenPrescription={() => {}} />
    </div>
  );
};

export default ContactPage;