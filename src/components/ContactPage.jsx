import React from 'react';
import SiteHeader from './SiteHeader';
import Footer from './Footer';

const locations = [
  { name: 'Mumbai Main Branch', mobile: '+91 98765 43210', address: 'Andheri West, Mumbai, MH' },
  { name: 'Delhi Central Hub', mobile: '+91 98765 43211', address: 'Connaught Place, New Delhi, DL' },
  { name: 'Bangalore Tech Center', mobile: '+91 98765 43212', address: 'Whitefield, Bangalore, KA' },
  { name: 'Chennai Regional Office', mobile: '+91 98765 43213', address: 'T. Nagar, Chennai, TN' },
  { name: 'Hyderabad Clinic Point', mobile: '+91 98765 43214', address: 'Jubilee Hills, Hyderabad, TS' },
  { name: 'Kolkata East Depot', mobile: '+91 98765 43215', address: 'Salt Lake, Kolkata, WB' },
  { name: 'Pune City Station', mobile: '+91 98765 43216', address: 'Shivaji Nagar, Pune, MH' },
  { name: 'Ahmedabad Care Center', mobile: '+91 98765 43217', address: 'Navrangpura, Ahmedabad, GJ' },
  { name: 'Jaipur Pink City Unit', mobile: '+91 98765 43218', address: 'Malviya Nagar, Jaipur, RJ' },
  { name: 'Lucknow North Hub', mobile: '+91 98765 43219', address: 'Gomti Nagar, Lucknow, UP' },
  { name: 'Indore Medical Center', mobile: '+91 98765 43220', address: 'Vijay Nagar, Indore, MP' },
  { name: 'Chandigarh Plaza Store', mobile: '+91 98765 43221', address: 'Sector 17, Chandigarh, CH' },
  { name: 'Kochi Coastal Unit', mobile: '+91 98765 43222', address: 'Marine Drive, Kochi, KL' },
  { name: 'Surat Diamond Branch', mobile: '+91 98765 43223', address: 'Adajan, Surat, GJ' }
];

const ContactPage = ({ cart = [] }) => {
  const cartCount = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <div className="App">
      <SiteHeader searchQuery="" setSearchQuery={() => {}} onSearchSubmit={() => {}} onOpenCart={() => {}} cartCount={cartCount} onOpenPrescription={() => {}} />

      <section style={{ background: 'linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%)', padding: '60px 24px', color: 'white', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 42, fontWeight: 800, marginBottom: 12,color: '#e2e8f0' }}>Contact <span style={{ color: '#90cdf4' }}>Us</span></h1>
        <p style={{ color: '#e2e8f0', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>Find our presence across India. We are committed to providing 24/7 pharmaceutical support at your nearest location.</p>
      </section>

      <section style={{ background: '#f8faff', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {locations.map((loc, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
                <div style={{ width: 40, height: 40, background: '#3182ce15', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <i className="ti ti-map-pin" style={{ color: '#3182ce', fontSize: 20 }}></i>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: '#2d3748' }}>{loc.name}</h3>
                <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, color: '#4a5568', fontSize: 14 }}>
                  <i className="ti ti-phone" style={{ color: '#38a169' }}></i>
                  <strong>{loc.mobile}</strong>
                </div>
                <p style={{ color: '#718096', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{loc.address}</p>
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