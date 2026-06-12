import React, { useMemo } from 'react';
import '../styles/CartSidebar.css';

const CartSidebar = ({ isOpen, onClose, cart, onChangeQty, onCheckout }) => {
  const { subtotal, deliveryFee } = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + Number(item.product_price || 0) * (item.qty || 1), 0);
    const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 40;
    return { subtotal, deliveryFee };
  }, [cart]);

  const remaining = Math.max(0, 500 - subtotal);
  const freeUnlocked = subtotal > 499;

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>

      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2><i className="ti ti-shopping-cart"></i> Your Cart</h2>
          <button className="cart-close" onClick={onClose}><i className="ti ti-x"></i></button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <i className="ti ti-shopping-cart-x"></i>
              <p>Your cart is empty</p>
              <span style={{ fontSize: 13, color: 'var(--text-light)' }}>
                Add items from our categories to get started!
              </span>
            </div>
          ) : (
            <>
              <div
                className="delivery-banner"
                style={{
                  background: freeUnlocked ? '#f0fdf4' : '#fff8eb',
                  color: freeUnlocked ? '#16a34a' : '#b45309',
                  border: `1px solid ${freeUnlocked ? '#bbf7d0' : '#fde68a'}`,
                }}
              >
                <i className={freeUnlocked ? 'ti ti-circle-check' : 'ti ti-info-circle'}></i>
                {freeUnlocked ? (
                  <span>FREE Delivery unlocked! 🎉</span>
                ) : (
                  <span>Add <b>₹{remaining}</b> more for FREE Delivery</span>
                )}
              </div>

              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img">
                    <img src={item.product_image?.[0]} alt={item.product_name} />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.product_name}</div>
                    <div className="cart-item-brand">{item.brand}</div>
                    <div className="cart-item-bottom">
                      <span className="cart-item-price">₹{Number(item.product_price || 0) * item.qty}</span>
                      <div className="cart-item-qty">
                        <button className="cart-item-qty-btn" onClick={() => onChangeQty(item.id, -1)}>
                          {item.qty === 1 ? <i className="ti ti-trash" style={{ fontSize: 14 }}></i> : '−'}
                        </button>
                        <span className="cart-item-qty-num">{item.qty}</span>
                        <button className="cart-item-qty-btn" onClick={() => onChangeQty(item.id, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal-row">
              <span>Subtotal</span>
              <strong>₹{subtotal}</strong>
            </div>
            <div className="cart-subtotal-row">
              <span>Delivery Fee</span>
              <strong>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</strong>
            </div>
            <div className="cart-total-row">
              <span>Total</span>
              <span>₹{subtotal + deliveryFee}</span>
            </div>
            <button className="cart-checkout-btn" onClick={() => { onClose(); onCheckout(); }}>
              Proceed to Checkout <i className="ti ti-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
