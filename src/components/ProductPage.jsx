import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DATA } from '../data/data';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import CartSidebar from './CartSidebar';
import PrescriptionModal from './PrescriptionModal';
import '../styles/ProductPage.css';
import '../styles/Modals.css';

const getProductDetails = (p) => {
  const cat = (p.product_category || '').toLowerCase();
  const name = (p.product_name || '').toLowerCase();

  const defaults = {
    desc: p.product_description || 'High quality, laboratory-tested clinical supplement formulated to support daily wellness. Formulated with pure ingredients under GMP certified conditions.',
    ingredients: p.key_ingredient || 'Active medicinal compound (standardized grade)',
    dosage: p.how_to_use || 'As directed by your physician or healthcare specialist.',
    sideEffects: p.precautions || 'Generally safe when used as directed. Consult your doctor if symptoms persist.',
    manufacturer: 'SGN Pharmaceuticals Ltd.',
    storage: 'Store in a cool, dry place away from direct sunlight (below 25°C). Keep out of reach of children.',
    benefits: p.key_benifits || 'Supports daily health and wellness goals.',
    faqs: p.faq || [],
  };

  if (cat.includes('pain') || name.includes('paracetamol') || name.includes('dolo')) {
    return { ...defaults, manufacturer: 'GlaxoSmithKline Healthcare', ingredients: 'Paracetamol IP 650mg', storage: 'Store below 30°C. Protect from light.' };
  }
  if (cat.includes('digestive')) {
    return { ...defaults, manufacturer: 'Alkem Laboratories Ltd.', ingredients: 'Pantoprazole Sodium 40mg + Domperidone 30mg', storage: 'Store in cool place. Protect from moisture.' };
  }
  if (cat.includes('antibiotic') || name.includes('azithromycin') || name.includes('amoxicillin')) {
    return { ...defaults, manufacturer: 'Cipla Healthcare Ltd.', storage: 'Store below 25°C. Keep container tightly closed.' };
  }
  if (cat.includes('skin')) {
    return { ...defaults, manufacturer: 'Galderma India Pvt Ltd', storage: 'Store below 25°C. Do not freeze.' };
  }
  if (cat.includes('vitamin') || cat.includes('supplement') || cat.includes('multivitamin')) {
    return { ...defaults, manufacturer: 'Sun Pharmaceutical Industries', storage: 'Store in cool, dark place. Protect from light.' };
  }
  return defaults;
};

function ProductPage({ cart, onAddToCart, onChangeQty, showToastMsg }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [prescriptionOpen, setPrescriptionOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const product = DATA.catalog.find(p => String(p.id) === String(productId));

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [productId]);

  if (!product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '40px 20px' }}>
        <i className="ti ti-package-off" style={{ fontSize: 64, color: 'var(--border-hover)' }}></i>
        <h2>Product not found</h2>
        <p style={{ color: 'var(--text-muted)' }}>The product you're looking for doesn't exist.</p>
        <button className="btn-primary" onClick={() => navigate('/all-products')}>
          <i className="ti ti-arrow-left"></i> Back to Products
        </button>
      </div>
    );
  }

  const details = getProductDetails(product);
  const images = product.product_image?.length ? product.product_image : ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80'];
  const price = Number(product.product_price);
  const discount = Number(product.product_discount) || 0;
  const mrp = discount > 0 ? Math.round(price / (1 - discount / 100)) : price;
  const savings = mrp - price;
  const cartItem = cart?.find(c => c.id === product.id);
  const qty = cartItem?.qty || 0;
  const cartCount = cart?.reduce((a, b) => a + b.qty, 0) || 0;

  const handleSearch = () => navigate(`/all-products?query=${encodeURIComponent(searchQuery)}`);

  const relatedProducts = DATA.catalog
    .filter(p => p.product_category === product.product_category && p.id !== product.id)
    .slice(0, 5);

  return (
    <div className="product-page">
      <SiteHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearch}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
        onOpenPrescription={() => setPrescriptionOpen(true)}
      />

      {/* Breadcrumb */}
      <div className="product-breadcrumb">
        <div className="product-breadcrumb-inner">
          <a onClick={() => navigate('/')}><i className="ti ti-home"></i> Home</a>
          <i className="ti ti-chevron-right"></i>
          <a onClick={() => navigate('/all-products')}>Products</a>
          <i className="ti ti-chevron-right"></i>
          <a onClick={() => navigate(`/all-products?category=${encodeURIComponent(product.product_category)}`)}>{product.product_category}</a>
          <i className="ti ti-chevron-right"></i>
          <span className="current">{product.product_name}</span>
        </div>
      </div>

      {/* Main grid */}
      <div className="product-detail-grid">
        {/* Images */}
        <div className="product-detail-images">
          <div className="product-detail-main-img">
            <img src={images[activeImg]} alt={product.product_name} />
          </div>
          {images.length > 1 && (
            <div className="product-detail-thumbs">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`product-thumb ${activeImg === i ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="product-detail-info">
          <div className="product-detail-cat">
            <i className="ti ti-tag"></i> {product.product_category}
          </div>

          <h1 className="product-detail-name">{product.product_name}</h1>

          <div className="product-detail-brand">
            Made by <b>{product.brand}</b>
          </div>

          <div className="product-rating-row">
            <span className="product-stars">★★★★☆</span>
            <span className="product-rating-count">(128 reviews)</span>
            <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>
              <i className="ti ti-circle-check"></i> In Stock
            </span>
          </div>

          {/* Pricing */}
          <div className="product-detail-pricing">
            <div className="product-detail-price-row">
              <span className="product-detail-price">₹{price}</span>
              {discount > 0 && <>
                <span className="product-detail-mrp">₹{mrp}</span>
                <span className="product-detail-off">{discount}% OFF</span>
              </>}
            </div>
            {savings > 0 && (
              <div className="product-detail-savings">
                <i className="ti ti-piggy-bank"></i> You save ₹{savings} on this order!
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="product-detail-actions">
            {qty > 0 ? (
              <div className="product-detail-qty-control">
                <button className="product-detail-qty-btn" onClick={() => onChangeQty(product.id, -1)}>
                  <i className="ti ti-minus"></i>
                </button>
                <span className="product-detail-qty-num">{qty} in cart</span>
                <button className="product-detail-qty-btn" onClick={() => onChangeQty(product.id, 1)}>
                  <i className="ti ti-plus"></i>
                </button>
              </div>
            ) : (
              <button className="product-detail-add-btn" onClick={() => onAddToCart(product)}>
                <i className="ti ti-shopping-cart-plus"></i>
                Add to Cart
              </button>
            )}
            <button
              className="product-detail-add-btn"
              style={{ background: 'var(--bg-alt)', color: 'var(--text-dark)', boxShadow: 'none', border: '1.5px solid var(--border)', flex: 'none', width: 52 }}
              onClick={() => setIsCartOpen(true)}
              title="View Cart"
            >
              <i className="ti ti-shopping-cart"></i>
            </button>
          </div>

          {/* Trust row */}
          <div className="product-trust-row">
            <span className="product-trust-item" style={{ color: '#16a34a' }}>
              <i className="ti ti-shield-check" style={{ color: '#16a34a' }}></i> 100% Authentic
            </span>
            <span className="product-trust-item" style={{ color: '#2563eb' }}>
              <i className="ti ti-truck" style={{ color: '#2563eb' }}></i> Free Delivery ₹499+
            </span>
            <span className="product-trust-item" style={{ color: '#7c3aed' }}>
              <i className="ti ti-rotate" style={{ color: '#7c3aed' }}></i> Easy Returns
            </span>
            <span className="product-trust-item" style={{ color: '#d97706' }}>
              <i className="ti ti-clock" style={{ color: '#d97706' }}></i> 24x7 Support
            </span>
          </div>

          {/* Tabs */}
          <div className="product-tabs">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'details', label: 'Details & Storage' },
              { id: 'faq', label: 'FAQs' },
            ].map(tab => (
              <button
                key={tab.id}
                className={`product-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="product-tab-content">
            {activeTab === 'overview' && (
              <>
                <p style={{ marginBottom: 16 }}>{details.desc}</p>
                {details.benefits && (
                  <>
                    <h4 style={{ fontWeight: 700, marginBottom: 10, fontSize: 14 }}>Key Benefits</h4>
                    <p style={{ color: 'var(--text-muted)' }}>{details.benefits}</p>
                  </>
                )}
              </>
            )}
            {activeTab === 'details' && (
              <div>
                {[
                  ['Active Ingredients', details.ingredients],
                  ['Directions / Dosage', details.dosage],
                  ['Possible Side Effects', details.sideEffects],
                  ['Manufacturer', details.manufacturer],
                  ['Storage Instructions', details.storage],
                  ['Category', product.product_category],
                  ['Brand', product.brand],
                ].map(([key, val]) => (
                  <div className="detail-row" key={key}>
                    <span className="detail-key">{key}</span>
                    <span className="detail-val">{val}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'faq' && (
              <div>
                {(details.faqs || []).length === 0 && (
                  <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No FAQs available for this product.</p>
                )}
                {(details.faqs || []).map((faq, i) => (
                  <div className="product-faq-item" key={i}>
                    <div className="product-faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                      {faq.question}
                      <i className={`ti ${faqOpen === i ? 'ti-minus' : 'ti-plus'}`}></i>
                    </div>
                    {faqOpen === i && <div className="product-faq-a">{faq.answer}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="section-bg-alt" style={{ marginTop: 0 }}>
          <div className="section-inner">
            <div className="section-header">
              <div>
                <div className="section-title">Related <span>Products</span></div>
                <div className="section-subtitle">More from {product.product_category}</div>
              </div>
              <button className="view-all-btn" onClick={() => navigate(`/all-products?category=${encodeURIComponent(product.product_category)}`)}>
                See All <i className="ti ti-arrow-right"></i>
              </button>
            </div>
            <div style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
              {relatedProducts.map(p => {
                const rPrice = Number(p.product_price);
                const rDiscount = Number(p.product_discount) || 0;
                const rQty = cart?.find(c => c.id === p.id)?.qty || 0;
                return (
                  <div
                    key={p.id}
                    className="wellness-card"
                    style={{ flexShrink: 0 }}
                    onClick={() => navigate(`/product/${p.id}`)}
                  >
                    {rDiscount > 0 && <div className="wellness-tag">{rDiscount}% OFF</div>}
                    <img src={p.product_image?.[0]} alt={p.product_name} className="wellness-img" />
                    <div className="wellness-body">
                      <div className="wellness-brand">{p.brand}</div>
                      <div className="wellness-name">{p.product_name}</div>
                      <div className="wellness-price-row">
                        <span className="wellness-price">₹{rPrice}</span>
                      </div>
                      <button
                        className="wellness-add-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (rQty > 0) {
                            onChangeQty(p.id, 1);
                          } else {
                            onAddToCart(p);
                          }
                        }}
                      >
                        {rQty > 0 ? `${rQty} in Cart` : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <Footer onOpenPrescription={() => setPrescriptionOpen(true)} />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onChangeQty={onChangeQty}
        onCheckout={() => {}}
      />
      <PrescriptionModal
        isOpen={prescriptionOpen}
        onClose={() => setPrescriptionOpen(false)}
        showToastMsg={showToastMsg}
      />
    </div>
  );
}

export default ProductPage;
