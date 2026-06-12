import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { DATA } from './data/data';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import PrescriptionModal from './components/PrescriptionModal';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import AllProductsPage from './components/AllProductsPage';
import SiteHeader from './components/SiteHeader';
import ContactPage from './components/ContactPage';
import CareerPage from './components/CareerPage';
import OffersPage from './components/OffersPage';
import HealthBlogPage from './components/HealthBlogPage';
import ProductPage from './components/ProductPage';
import PromoPopup from './components/PromoPopup';
import './styles/Hero.css';
import './styles/Sections.css';
import './styles/ProductCard.css';
import './styles/CartSidebar.css';
import './styles/Modals.css';

// ---- Static derived data ----
const featuredBrands = [...new Set(DATA.catalog.filter(p => p.brand).map(p => p.brand))];
const wellnessEssentials = DATA.catalog.filter(p => p.wellnessEssential);
const spotlightItems = DATA.catalog.filter(p => p.spotlightItem);

const healthArticles = [
  { cat: 'Nutrition', title: 'What is a Calorie Deficit?', date: 'Monday', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=70' },
  { cat: 'Monsoon Health', title: 'Safety from Water-Borne Diseases', date: 'Monday', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70' },
  { cat: 'Fitness', title: 'Safety for Babies with High Fever', date: 'Sunday', img: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=400&q=70' },
  { cat: 'Women Health', title: 'Sending a Child to School with Cold', date: 'Sunday', img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=70' },
  { cat: 'Diabetes', title: 'Baby Exam & Care Guide', date: 'Saturday', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=70' },
  { cat: 'Oral Care', title: 'Oral Thrush in Children', date: 'Friday', img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=70' },
];

function ScrollRow({ children }) {
  const ref = useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => scroll(-1)} className="scroll-arrow scroll-arrow-left"><i className="ti ti-chevron-left"></i></button>
      <div ref={ref} className="scroll-row">{children}</div>
      <button onClick={() => scroll(1)} className="scroll-arrow scroll-arrow-right"><i className="ti ti-chevron-right"></i></button>
    </div>
  );
}

// Cart state is lifted here so it persists across routes
function useCartState() {
  const [cart, setCart] = useState([]);
  const showToastMsg = (msg) => { /* handled by App */ };

  const handleAddToCart = (product, _showToast) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const handleChangeQty = (id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  const handleClearCart = () => setCart([]);
  const cartCount = cart.reduce((a, b) => a + b.qty, 0);

  return { cart, handleAddToCart, handleChangeQty, handleClearCart, cartCount };
}

function HomePage({ cart, onAddToCart, onChangeQty, showToastMsg }) {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dealTab, setDealTab] = useState('all');
  const [toast, setToast] = useState(null);
  const [showBackTop, setShowBackTop] = useState(false);
  const [showCatNav, setShowCatNav] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);

  const cartCount = cart.reduce((a, b) => a + b.qty, 0);
  const cartSubtotal = cart.reduce((a, b) => a + (Number(b.product_price || 0) * b.qty), 0);

  const filteredDeals = useMemo(() => {
    const catalog = DATA.catalog || [];
    const parseDiscount = (val) => {
      if (!val) return 0;
      if (typeof val === 'number') return val;
      if (typeof val === 'string') { const m = val.match(/\d+(\.\d+)?/); return m ? Number(m[0]) : 0; }
      if (typeof val === 'object') { const r = val.value ?? val.discount ?? 0; return parseDiscount(r); }
      return 0;
    };
    const dealsSource = catalog.filter(p => parseDiscount(p.product_discount ?? p.discount ?? p.offer) > 25);
    if (dealTab === '50off') return dealsSource.filter(p => parseDiscount(p.product_discount ?? p.discount ?? p.offer) >= 50);
    if (dealTab === 'new') return [...catalog].sort((a, b) => Number(b.id || 0) - Number(a.id || 0)).slice(0, 8);
    return dealsSource;
  }, [dealTab]);

  useEffect(() => {
    const h = () => { setShowBackTop(window.scrollY > 400); setShowCatNav(window.scrollY > 700); };
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleAddToCartLocal = (product) => {
    onAddToCart(product);
    showToast(<span><i className="ti ti-circle-check"></i> {product.product_name} added to cart!</span>);
  };

  const handleCategorySelect = (catId) => { setActiveCategory(catId); navigate(`/all-products?category=${encodeURIComponent(catId)}`); };
  const handleSearchSubmit = () => navigate(`/all-products?query=${encodeURIComponent(searchQuery)}`);
  const toggleFaq = (i) => setFaqOpenIndex(prev => prev === i ? null : i);

  const faqData = [
    { q: "How do I order medicines with a prescription?", a: "Upload your Rx photo, enter delivery details, and our pharmacist will verify and confirm delivery within 2–4 hours." },
    { q: "Is there a delivery charge?", a: "Delivery is free on orders above ₹499, otherwise a flat ₹40 fee applies." },
    { q: "Are all medicines genuine and certified?", a: "Yes. All products are sourced from licensed manufacturers and stored under pharmacy-grade conditions." },
    { q: "What is the estimated delivery time?", a: "45 minutes to 6 hours depending on your location and service type selected." },
    { q: "What is the return policy?", a: "15-day return for unopened, sealed items. Prescription medicines are non-returnable." },
  ];

  return (
    <div className="App">
      <SiteHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
        onOpenPrescription={() => setPrescriptionModalOpen(true)}
      />

      {/* CATEGORY NAV BAR */}
      {showCatNav && (
        <div className="cat-nav-bar">
          <div className="cat-nav-inner">
            {(DATA.category || []).map(cat => (
              <div key={cat.id} className="cat-nav-item" onClick={() => handleCategorySelect(cat.id)}>
                <div className="cat-nav-icon"><i className={`ti ${cat.icon}`}></i></div>
                <div className="cat-nav-label">{cat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="hero-modern" id="home">
        <div className="hero-modern-inner">
          <div className="hero-main-banner">
            <div className="hero-content animate-fade-in">
              <div className="hero-badge"><i className="ti ti-shield-check"></i> 100% Authentic Medicines</div>
              <h1>Your Health, Our <span>Trust & Priority</span></h1>
              <p>India's fastest pharmacy delivery. Medicines, lab tests, doctor consultations — all in one place.</p>
              <div className="hero-stats">
                <div className="hero-stat"><strong>10M+</strong><span>Happy Customers</span></div>
                <div className="hero-stat-divider"></div>
                <div className="hero-stat"><strong>75M+</strong><span>Orders Delivered</span></div>
                <div className="hero-stat-divider"></div>
                <div className="hero-stat"><strong>90K+</strong><span>Products</span></div>
                <div className="hero-stat-divider"></div>
                <div className="hero-stat">
                  <Link to='/contact'>
                  <strong>14</strong><span>Outlets</span>
                  </Link>
                </div>
              </div>
              <div className="hero-btns">
                <button className="btn-primary-hero" onClick={() => navigate('/all-products?category=Medicines')}>
                  <i className="ti ti-shopping-cart-discount"></i> Shop Medicines
                </button>
                <button className="btn-outline-hero" onClick={() => setPrescriptionModalOpen(true)}>
                  <i className="ti ti-file-upload"></i> Upload Prescription
                </button>
              </div>
            </div>
          </div>
          <div className="hero-side-banners">
            <div className="hero-side-card" style={{ background: 'linear-gradient(135deg,#1a365d,#2b6cb0)' }} onClick={() => navigate('/lab-tests')}>
              <div className="hsc-label">Book Lab Tests</div>
              <div className="hsc-val">Up to 50% OFF</div>
              <div className="hsc-sub">Home collection available</div>
              <i className="ti ti-microscope hsc-icon"></i>
            </div>
            <div className="hero-side-card" style={{ background: 'linear-gradient(135deg,#1c4532,#276749)' }} onClick={() => navigate('/doctor-consult')}>
              <div className="hsc-label">Consult Doctors</div>
              <div className="hsc-val">₹199 First Consult</div>
              <div className="hsc-sub">50K+ verified doctors</div>
              <i className="ti ti-stethoscope hsc-icon"></i>
            </div>
            <div className="hero-side-card" style={{ background: 'linear-gradient(135deg,#44337a,#805ad5)' }} onClick={() => navigate('/offers')}>
              <div className="hsc-label">Exclusive Offers</div>
              <div className="hsc-val">Coupons & Deals</div>
              <div className="hsc-sub">Save on every order</div>
              <i className="ti ti-discount hsc-icon"></i>
            </div>
          </div>
        </div>
      </section>

      {/* RX STRIP */}
      <div className="rx-strip">
        <div className="rx-strip-inner">
          {[
            { icon: 'ti-file-upload', color: '#e53e3e', title: 'Order with Prescription', sub: 'Upload Rx & get medicines at door', action: () => setPrescriptionModalOpen(true) },
            { icon: 'ti-truck', color: '#38a169', title: 'Free Home Delivery', sub: 'On orders above ₹499 anywhere' },
            { icon: 'ti-shield-check', color: '#3182ce', title: '100% Authentic', sub: 'All stock directly from manufacturers' },
            { icon: 'ti-clock', color: '#805ad5', title: 'Fast Dispatch 24x7', sub: 'Order any time, delivered to your door' },
          ].map((item, i) => (
            <React.Fragment key={i}>
              <div className="rx-strip-item" onClick={item.action} style={{ cursor: item.action ? 'pointer' : 'default' }}>
                <i className={`ti ${item.icon}`} style={{ color: item.color, fontSize: 26 }}></i>
                <div>
                  <div className="rx-title">{item.title}</div>
                  <div className="rx-sub">{item.sub}</div>
                </div>
              </div>
              {i < 3 && <div className="rx-divider"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section id="categories" className="categories-bg">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <div className="section-title">Shop by <span>Category</span></div>
              <div className="section-subtitle">Browse our full healthcare range</div>
            </div>
            <button className="view-all-btn" onClick={() => navigate('/all-products')}>View All <i className="ti ti-arrow-right"></i></button>
          </div>
          <div className="cat-grid">
            {(DATA.category || []).map(cat => (
              <div key={cat.id} className={`cat-item ${activeCategory === cat.id ? 'active' : ''}`} onClick={() => handleCategorySelect(cat.id)} style={{ background: cat.bg + '18', borderColor: cat.bg + '40', color: cat.bg }}>
                <div className="cat-icon-wrap" style={{ background: cat.bg + '22' }}>
                  <i className={`ti ${cat.icon}`} style={{ color: cat.bg }}></i>
                </div>
                <div className="cat-label">{cat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEALS */}
      <section id="deals" className="deals-bg">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <div className="section-title">Amazing <span>Deals</span></div>
              <div className="section-subtitle">Best offers, updated daily</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[{ id: 'all', label: 'All Deals' }, { id: '50off', label: '50% Off' }, { id: 'new', label: 'New Arrivals' }].map(tab => (
                <button key={tab.id} className={`deal-tab ${dealTab === tab.id ? 'active' : ''}`} onClick={() => setDealTab(tab.id)}>{tab.label}</button>
              ))}
            </div>
          </div>
          <div className="products-grid">
            {(filteredDeals || []).slice(0, 8).map(p => (
              <ProductCard key={p.id} product={p} cartItem={cart.find(c => c.id === p.id)} onAddToCart={handleAddToCartLocal} onChangeQty={onChangeQty} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button className="view-all-btn-lg" onClick={() => navigate('/all-products')}>
              View All Products <i className="ti ti-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* WELLNESS ESSENTIALS */}
      <section className="section-bg-alt">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <div className="section-title">Wellness Essentials <span>of the Week</span></div>
              <div className="section-subtitle">Doctor-recommended everyday health products</div>
            </div>
            <button className="view-all-btn" onClick={() => navigate('/all-products')}>See All <i className="ti ti-arrow-right"></i></button>
          </div>
          <ScrollRow>
            {wellnessEssentials.map((item, i) => (
              <div key={i} className="wellness-card">
                {item.tag && <div className="wellness-tag">{item.tag}</div>}
                <img src={item.product_image?.[0]} alt={item.product_name} className="wellness-img" />
                <div className="wellness-body">
                  <div className="wellness-brand">{item.brand}</div>
                  <div className="wellness-name">{item.product_name}</div>
                  <div className="wellness-price-row">
                    <span className="wellness-price">₹{item.product_price}</span>
                    <span className="wellness-mrp">₹{item.mrp}</span>
                    <span className="wellness-discount">{item.product_discount}% off</span>
                  </div>
                  <button className="wellness-add-btn" onClick={() => handleAddToCartLocal(item)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* FEATURED BRANDS */}
      <section className="brands-section">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <div className="section-title">Featured <span>Brands</span></div>
              <div className="section-subtitle">Shop from your favourite brands</div>
            </div>
          </div>
          <div className="brands-grid">
            {featuredBrands.map((brand, i) => (
              <div key={i} className="brand-card" onClick={() => navigate(`/all-products?query=${brand}`)}>
                <div className="brand-icon-wrap">
                  <i className="ti ti-building-store" style={{ color: '#919191', fontSize: 26 }}></i>
                </div>
                <div className="brand-name">{brand}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IN THE SPOTLIGHT */}
      <section className="spotlight-section">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <div className="section-title">In The <span>Spotlight</span></div>
              <div className="section-subtitle">Trending picks this week</div>
            </div>
            <button className="view-all-btn" onClick={() => navigate('/all-products')}>See All <i className="ti ti-arrow-right"></i></button>
          </div>
          <ScrollRow>
            {spotlightItems.map((item, i) => (
              <div key={i} className="spotlight-card">
                <div className="spotlight-discount">{item.product_discount}% OFF</div>
                <img src={item.product_image?.[0]} alt={item.product_name} className="spotlight-img" />
                <div className="spotlight-body">
                  <div className="spotlight-name">{item.product_name}</div>
                  <div className="spotlight-desc">{item.product_description}</div>
                  <div className="spotlight-price">₹{item.product_price}</div>
                  <button className="spotlight-btn" onClick={() => navigate('/all-products')}>Shop Now</button>
                </div>
              </div>
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* HEALTH ARTICLES */}
      <section className="section-bg-alt">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <div className="section-title">Health <span>Articles</span></div>
              <div className="section-subtitle">Expert-backed wellness content</div>
            </div>
            <button className="view-all-btn" onClick={() => navigate('/health-blog')}>See All <i className="ti ti-arrow-right"></i></button>
          </div>
          <div className="articles-grid">
            {healthArticles.map((art, i) => (
              <div key={i} className="article-card" onClick={() => navigate('/health-blog')}>
                <img src={art.img} alt={art.title} className="article-img" />
                <div className="article-body">
                  <div className="article-cat">{art.cat}</div>
                  <div className="article-title">{art.title}</div>
                  <div className="article-date">{art.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us-section">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <div className="section-title">Why <span>Choose Us?</span></div>
            </div>
          </div>
          <div className="why-grid">
            {[
              { icon: 'ti-users', val: '1 Million+', label: 'Registered Users', sub: 'Growing every day', color: '#3182ce' },
              { icon: 'ti-package', val: '75 Million+', label: 'Orders Delivered', sub: 'And counting', color: '#38a169' },
              { icon: 'ti-building-store', val: '90,000+', label: 'Pharmacy Network', sub: 'Stores across India', color: '#e53e3e' },
              { icon: 'ti-star', val: '19,000+', label: '5-Star Reviews', sub: 'Trusted by patients', color: '#d69e2e' },
            ].map((w, i) => (
              <div key={i} className="why-card">
                <div className="why-icon-wrap" style={{ background: w.color + '18' }}>
                  <i className={`ti ${w.icon}`} style={{ color: w.color, fontSize: 30 }}></i>
                </div>
                <div className="why-val">{w.val}</div>
                <div className="why-label">{w.label}</div>
                <div className="why-sub">{w.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP DOWNLOAD */}
      <section className="app-download-section">
        <div className="section-inner">
          <div className="app-download-inner">
            <div className="app-download-text">
              <h2>Simplifying Healthcare,<br /><span>Impacting Lives</span></h2>
              <p>Download the SGN Pharmacy app for faster ordering, exclusive app-only deals, prescription tracking, and real-time order updates.</p>
              <div className="app-btns">
                <button className="app-store-btn"><i className="ti ti-brand-google-play"></i><div><span>Get it on</span><strong>Google Play</strong></div></button>
                <button className="app-store-btn"><i className="ti ti-brand-apple"></i><div><span>Download on the</span><strong>App Store</strong></div></button>
              </div>
            </div>
            <div className="app-download-visual">
              <div className="app-mock">
                <div className="app-mock-screen">
                  <i className="ti ti-device-mobile" style={{ fontSize: 60, color: '#e53e3e' }}></i>
                  <div style={{ marginTop: 12, fontWeight: 700, fontSize: 14, color: '#fff' }}>SGN Pharmacy</div>
                  <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 12 }}>iOS & Android</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="section-inner">
          <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center', marginBottom: 36 }}>
            <div>
              <div className="section-title">What Our Customers <span>Say</span></div>
            </div>
          </div>
          <div className="testimonials-grid">
            {[
              { name: 'Ravi Kumar', loc: 'Chennai', rating: 5, text: 'Amazing service! Got my medicines delivered within 2 hours. Prices are genuinely lower than local pharmacies.' },
              { name: 'Nandita Pillai', loc: 'Bangalore', rating: 5, text: 'I uploaded my prescription and within 30 minutes got a call confirming my order. Absolutely reliable.' },
              { name: 'Mohammed Salim', loc: 'Hyderabad', rating: 4, text: 'Great variety of products. The diabetic care packages are very affordable. Delivery was on time.' },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="t-stars">{'★'.repeat(t.rating)}</div>
                <p className="t-text">"{t.text}"</p>
                <div className="t-author">
                  <div className="t-avatar">{t.name[0]}</div>
                  <div><div className="t-name">{t.name}</div><div className="t-loc">{t.loc}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq-bg">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <div className="section-title">Frequently Asked <span>Questions</span></div>
              <div className="section-subtitle">Quick answers to common queries</div>
            </div>
          </div>
          <div className="faq-list">
            {faqData.map((item, index) => (
              <div key={index} className={`faq-item ${faqOpenIndex === index ? 'open' : ''}`} onClick={() => toggleFaq(index)}>
                <div className="faq-question">
                  {item.q}
                  <i className={`ti ${faqOpenIndex === index ? 'ti-minus' : 'ti-plus'}`}></i>
                </div>
                {faqOpenIndex === index && <div className="faq-answer">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onOpenPrescription={() => setPrescriptionModalOpen(true)} />

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onChangeQty={onChangeQty} subtotal={cartSubtotal} onCheckout={() => setCheckoutModalOpen(true)} />
      <PrescriptionModal isOpen={prescriptionModalOpen} onClose={() => setPrescriptionModalOpen(false)} showToastMsg={showToast} />
      <CheckoutModal isOpen={checkoutModalOpen} onClose={() => setCheckoutModalOpen(false)} cart={cart} subtotal={cartSubtotal} onClearCart={() => {}} showToastMsg={showToast} />

      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
      <button className={`back-top ${showBackTop ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <i className="ti ti-arrow-up"></i>
      </button>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  const showToastMsg = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleAddToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToastMsg(<span><i className="ti ti-circle-check"></i> {product.product_name} added to cart!</span>);
  };

  const handleChangeQty = (id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  const handleClearCart = () => setCart([]);

  const sharedProps = { cart, onAddToCart: handleAddToCart, onChangeQty: handleChangeQty, showToastMsg };

  return (
    <>
      <PromoPopup />
      <Routes>
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/all-products" element={<AllProductsPage catalog={DATA.catalog} categories={DATA.category} {...sharedProps} />} />
        <Route path="/contact" element={<ContactPage {...sharedProps} />} />
        <Route path="/career" element={<CareerPage {...sharedProps} />} />
        <Route path="/offers" element={<OffersPage {...sharedProps} />} />
        <Route path="/health-blog" element={<HealthBlogPage />} />
        <Route path="/product/:productId" element={<ProductPage {...sharedProps} />} />
        <Route path="*" element={<HomePage {...sharedProps} />} />
      </Routes>
      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
    </>
  );
}

export default App;
