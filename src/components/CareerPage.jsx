import React, { useState } from 'react';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import '../styles/Modals.css';

const CareerPage = ({ cart = [] }) => {
  const cartCount = cart.reduce((a, b) => a + b.qty, 0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="App">
      <SiteHeader searchQuery="" setSearchQuery={() => {}} onSearchSubmit={() => {}} onOpenCart={() => {}} cartCount={cartCount} onOpenPrescription={() => {}} />

      <section style={{ background: 'linear-gradient(135deg, #1c4532 0%, #276749 100%)', padding: '60px 24px', color: 'white', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 42, fontWeight: 800, marginBottom: 12,color: '#f0fff4'}}>Join Our <span style={{ color: '#68d391' }}>Team</span></h1>
        <p style={{ color: '#f0fff4', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>Build the future of healthcare technology and delivery. We are looking for passionate individuals to join our growing family.</p>
      </section>

      <section style={{ background: '#f8faff', padding: '48px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {!submitted ? (
            <div style={{ background: '#fff', borderRadius: 20, padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, fontFamily: 'Space Grotesk' }}>Apply for a Position</h2>
              <form className="prescription-form" onSubmit={handleSubmit}>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" placeholder="Enter your full name" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" placeholder="email@example.com" required />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" placeholder="10-digit mobile number" required pattern="[0-9]{10}" />
                  </div>
                  <div className="form-group">
                    <label>Applying For *</label>
                    <select required>
                      <option value="">Select Position</option>
                      <option value="pharmacist">Registered Pharmacist</option>
                      <option value="delivery">Delivery Executive</option>
                      <option value="tech">Software Engineer</option>
                      <option value="sales">Sales & Marketing</option>
                      <option value="admin">Operations/Admin</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Years of Experience *</label>
                  <input type="number" min="0" max="40" placeholder="Years of experience" required />
                </div>

                <div className="form-group">
                  <label>Resume Link / Portfolio</label>
                  <input type='file'/>
                </div>

                <div className="form-group">
                  <label>Cover Letter / Message</label>
                  <textarea rows="4" placeholder="Tell us why you are a good fit..."></textarea>
                </div>

                <button type="submit" className="prescription-submit-btn" style={{ marginTop: '12px', background: '#38a169' }}>Submit Application</button>
              </form>
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: 20, padding: '60px 40px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div style={{ width: 80, height: 80, background: '#38a16915', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}><i className="ti ti-circle-check" style={{ color: '#38a169', fontSize: 40 }}></i></div>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 28, fontWeight: 800 }}>Application Received!</h2>
              <p style={{ color: '#4a5568', marginTop: 12 }}>Thank you for your interest in SGN Pharmacy. Our HR team will review your application and contact you if your profile matches our requirements.</p>
              <button onClick={() => setSubmitted(false)} style={{ marginTop: 24, padding: '12px 24px', border: 'none', background: '#38a169', color: 'white', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Apply for Another Role</button>
            </div>
          )}
        </div>
      </section>

      <Footer onOpenPrescription={() => {}} />
    </div>
  );
};

export default CareerPage;