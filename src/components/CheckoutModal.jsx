import React, { useState } from 'react';
import '../styles/Modals.css';

const CheckoutModal = ({ isOpen, onClose, cart, subtotal, onClearCart, showToastMsg }) => {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  
  // Shipping details state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  // Payment details state
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    }
  };

  const handleBackStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderId = 'SGN-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(randomOrderId);
      setStep(3);
      onClearCart();
      showToastMsg(<span><i className="ti ti-circle-check"></i> Order placed successfully!</span>);
    }, 1500);
  };

  const handleClose = () => {
    setStep(1);
    setName('');
    setPhone('');
    setAddress('');
    setCity('');
    setPincode('');
    setPaymentMethod('cod');
    setUpiId('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    onClose();
  };

  const deliveryCharges = subtotal > 499 ? 0 : 40;
  const grandTotal = subtotal + deliveryCharges;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose}>
      <div className="modal-container checkout-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close Checkout"><i className="ti ti-x"></i></button>

        {/* Checkout steps indicator */}
        {step < 3 && (
          <div className="checkout-steps">
            <div className={`checkout-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <div className="step-num">{step > 1 ? <i className="ti ti-check" style={{ fontSize: '14px' }}></i> : '1'}</div>
              <div className="step-label">Shipping</div>
            </div>
            <div className={`checkout-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              <div className="step-num">2</div>
              <div className="step-label">Payment</div>
            </div>
            <div className="checkout-step">
              <div className="step-num">3</div>
              <div className="step-label">Confirmation</div>
            </div>
          </div>
        )}

        {/* Step 1: Shipping Address Form */}
        {step === 1 && (
          <form onSubmit={handleNextStep}>
            <div className="prescription-header" style={{ textAlign: 'left', marginBottom: '20px' }}>
              <h2>Shipping Address</h2>
              <p>Please tell us where to deliver your healthcare products.</p>
            </div>

            <div className="prescription-form">
              <div className="form-group">
                <label htmlFor="ship-name">Full Name *</label>
                <input 
                  type="text" 
                  id="ship-name" 
                  placeholder="Enter full name" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="ship-phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="ship-phone" 
                    placeholder="10-digit mobile number" 
                    required 
                    pattern="[0-9]{10}"
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ship-pincode">Pincode *</label>
                  <input 
                    type="text" 
                    id="ship-pincode" 
                    placeholder="6-digit pincode" 
                    required 
                    pattern="[0-9]{6}"
                    value={pincode} 
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="ship-addr">Street Address / Flat No. *</label>
                <input 
                  type="text" 
                  id="ship-addr" 
                  placeholder="House No, Apartment, Locality" 
                  required 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="ship-city">City *</label>
                <input 
                  type="text" 
                  id="ship-city" 
                  placeholder="City Name" 
                  required 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <button type="submit" className="prescription-submit-btn">
                Continue to Payment <i className="ti ti-arrow-right"></i>
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Form */}
        {step === 2 && (
          <form onSubmit={handleCompleteOrder}>
            <div className="prescription-header" style={{ textAlign: 'left', marginBottom: '20px' }}>
              <h2>Choose Payment Method</h2>
              <p>Select your preferred payment option and finalize your order.</p>
            </div>

            <div className="payment-methods-grid">
              {/* Cash On Delivery */}
              <div 
                className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  id="pay-cod" 
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <i className="ti ti-truck-delivery"></i>
                <div className="payment-option-details">
                  <div className="payment-option-title">Cash on Delivery (COD)</div>
                  <div className="payment-option-desc">Pay cash or scan QR at your door during delivery.</div>
                </div>
              </div>

              {/* UPI */}
              <div 
                className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  id="pay-upi" 
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                />
                <i className="ti ti-device-mobile"></i>
                <div className="payment-option-details">
                  <div className="payment-option-title">UPI (GPay / PhonePe / Paytm)</div>
                  <div className="payment-option-desc">Transfer securely using your UPI application.</div>
                </div>
              </div>

              {paymentMethod === 'upi' && (
                <div className="form-group" style={{ padding: '0 16px', margin: '-4px 0 8px 36px' }}>
                  <label htmlFor="upi-id" style={{ fontSize: '12px' }}>Enter UPI ID *</label>
                  <input 
                    type="text" 
                    id="upi-id" 
                    placeholder="username@okaxis / username@okhdfc" 
                    required={paymentMethod === 'upi'}
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              )}

              {/* Cards */}
              <div 
                className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  id="pay-card" 
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <i className="ti ti-credit-card"></i>
                <div className="payment-option-details">
                  <div className="payment-option-title">Credit or Debit Card</div>
                  <div className="payment-option-desc">All major domestic and international cards accepted.</div>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div style={{ padding: '0 16px', margin: '-4px 0 8px 36px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="form-group">
                    <label htmlFor="card-no" style={{ fontSize: '12px' }}>Card Number *</label>
                    <input 
                      type="text" 
                      id="card-no" 
                      placeholder="16-digit card number" 
                      maxLength="19"
                      required={paymentMethod === 'card'}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="card-exp" style={{ fontSize: '12px' }}>Expiry *</label>
                      <input 
                        type="text" 
                        id="card-exp" 
                        placeholder="MM/YY" 
                        maxLength="5"
                        required={paymentMethod === 'card'}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="card-cvv" style={{ fontSize: '12px' }}>CVV *</label>
                      <input 
                        type="password" 
                        id="card-cvv" 
                        placeholder="3 Digits" 
                        maxLength="3"
                        required={paymentMethod === 'card'}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Billing Summary Box */}
            <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px', fontSize: '13px', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '10px', color: 'var(--text-dark)' }}>Price Details</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Subtotal ({cart.length} items)</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Delivery Charges</span>
                <span>{deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border)', fontSize: '15px', fontWeight: '800', color: 'var(--text-dark)' }}>
                <span>Amount Payable</span>
                <span style={{ color: 'var(--primary)' }}>₹{grandTotal}</span>
              </div>
            </div>

            <div className="checkout-actions">
              <button type="button" className="btn-back" onClick={handleBackStep}>
                <i className="ti ti-arrow-left"></i> Back
              </button>
              <button 
                type="submit" 
                className="checkout-btn" 
                style={{ width: 'auto', padding: '12px 36px' }}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing Order...' : `Pay & Place Order (₹${grandTotal})`}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success Screen */}
        {step === 3 && (
          <div className="success-screen">
            <div className="success-icon">
              <i className="ti ti-check"></i>
            </div>
            <h3>Order Placed Successfully!</h3>
            <p>Thank you for choosing SGN Pharmacy. Your order has been placed and is currently being compiled by our medical team. We will send you SMS alerts regarding preparation and dispatch.</p>
            
            <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', width: '100%', textAlign: 'left', fontSize: '13px' }}>
              <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <strong>Order Tracking ID:</strong> 
                <span style={{ fontFamily: 'monospace', fontWeight: '700', color: 'var(--primary)', fontSize: '14px' }}>{orderId}</span>
              </div>
              <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <strong>Deliver To:</strong>
                <span>{name}, {phone}</span>
              </div>
              <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <strong>Address:</strong>
                <span style={{ textAlign: 'right', maxWidth: '60%' }}>{address}, {city} - {pincode}</span>
              </div>
              <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <strong>Payment Mode:</strong>
                <span>{paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'upi' ? 'UPI' : 'Credit/Debit Card'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '8px', fontSize: '14px', fontWeight: '800' }}>
                <strong>Amount Paid:</strong>
                <span style={{ color: 'var(--primary)' }}>₹{grandTotal}</span>
              </div>
            </div>

            <div style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <i className="ti ti-clock" style={{ fontSize: '14px', color: 'var(--primary)' }}></i> 
              Estimated delivery: {paymentMethod === 'cod' ? 'Within 2 hours' : 'Within 45 minutes'}
            </div>

            <button className="success-close-btn" onClick={handleClose}>Continue Shopping</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
