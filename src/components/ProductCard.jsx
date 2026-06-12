import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductCard.css';

const getCardThemeClass = (p) => {
  const cat = (p.product_category || '').toLowerCase();
  if (cat.includes('skin')) return 'theme-skin';
  if (cat.includes('vitamin') || cat.includes('ayurvedic')) return 'theme-vitamin';
  if (cat.includes('medicine') || cat.includes('antibiotic')) return 'theme-rx';
  return 'theme-otc';
};

const ProductCard = ({ product, cartItem, onAddToCart, onChangeQty }) => {
  const navigate = useNavigate();
  const qty = cartItem ? cartItem.qty : 0;
  const price = Number(product.product_price);
  const discount = Number(product.product_discount) || 0;
  const mrp = discount > 0 ? Math.round(price / (1 - discount / 100)) : 0;
  const image = product.product_image?.[0];

  return (
    <div className={`product-card ${getCardThemeClass(product)}`}>
      {discount > 0 && (
        <div className="product-offer-badge">
          <i className="ti ti-discount-2"></i> {discount}% OFF
        </div>
      )}

      <div className="product-img" onClick={() => navigate(`/product/${product.id}`)}>
        <img src={image} alt={product.product_name} loading="lazy" />
        <div className="product-quickview-overlay">
          <button className="quickview-btn" onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}>
            <i className="ti ti-eye"></i> View Details
          </button>
        </div>
      </div>

      <div className="product-body">
        <div className="product-cat">{product.product_category}</div>

        <div className="product-name" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
          {product.product_name}
        </div>

        <div className="product-brand">
          <b>Brand:</b> <span style={{ color: '#16a34a' }}>{product.brand}</span>
        </div>

        <div className="product-price-row">
          <span className="product-price">₹{price}</span>
          {mrp > 0 && <span className="product-mrp">₹{mrp}</span>}
          {discount > 0 && <span className="product-discount-badge">{discount}% off</span>}
        </div>

        <div className="product-action">
          {qty > 0 ? (
            <div className="qty-control">
              <button className="qty-btn" onClick={() => onChangeQty(product.id, -1)}>
                <i className="ti ti-minus"></i>
              </button>
              <span className="qty-num">{qty} Added</span>
              <button className="qty-btn" onClick={() => onChangeQty(product.id, 1)}>
                <i className="ti ti-plus"></i>
              </button>
            </div>
          ) : (
            <button className="add-cart-btn" onClick={() => onAddToCart(product)}>
              <i className="ti ti-shopping-cart-plus"></i>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
