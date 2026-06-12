import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import appLogo from '../assets/images/logo.png';
import '../styles/Navbar.css';

const Navbar = ({ searchQuery, setSearchQuery, onSearchSubmit, onOpenCart, cartCount, onOpenPrescription }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const handleLogout = async () => { await signOut(auth); setUser(null); navigate('/'); };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (!isHomePage) { setMobileMenuOpen(false); navigate('/'); return; }
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a className="logo-wrap" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          <img src={appLogo} alt="SGN Pharmacy" />
        </a>

        <form className="nav-search" onSubmit={(e) => { e.preventDefault(); onSearchSubmit?.(); }}>
          <input
            type="text"
            placeholder="Search medicines, health products, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="nav-search-btn" type="submit" aria-label="Search"><i className="ti ti-search"></i></button>
        </form>

        <div className="nav-actions">
          <RouterLink to="/offers" className="nav-link-btn"><i className="ti ti-discount"></i> Offers</RouterLink>
          <RouterLink to="/contact" className="nav-link-btn"><i className="ti ti-map-pin"></i> Contact</RouterLink>
          <RouterLink to="/career" className="nav-link-btn"><i className="ti ti-briefcase"></i> Career</RouterLink>

          <button className="cart-btn" onClick={onOpenCart}>
            <i className="ti ti-shopping-cart"></i>
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {user.photoURL && <img src={user.photoURL} alt="profile" style={{ width: 32, height: 32, borderRadius: '50%' }} />}
              <span style={{ fontWeight: 600, fontSize: 13, textTransform: 'capitalize' }}>{user.displayName?.split(' ')[0] || user.email}</span>
              <button className="auth-nav-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <RouterLink to="/login" className="auth-nav-btn"><i className="ti ti-user-circle"></i> Login</RouterLink>
          )}
        </div>

        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
          <i className={mobileMenuOpen ? 'ti ti-x' : 'ti ti-menu-2'}></i>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-dropdown-menu">
          <a href="/all-products" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/all-products'); }}><i className="ti ti-layout-grid"></i> All Products</a>
          <a href="/lab-tests" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/lab-tests'); }}><i className="ti ti-flask"></i> Lab Tests</a>
          <a href="/doctor-consult" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/doctor-consult'); }}><i className="ti ti-stethoscope"></i> Doctor Consult</a>
          <a href="/offers" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/offers'); }}><i className="ti ti-discount"></i> Offers</a>
          <a href="/health-blog" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/health-blog'); }}><i className="ti ti-news"></i> Health Blog</a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/contact'); }}><i className="ti ti-map-pin"></i> Contact</a>
          <a href="/career" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/career'); }}><i className="ti ti-briefcase"></i> Career</a>
          <a href="#upload-rx" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onOpenPrescription(); }}><i className="ti ti-file-text"></i> Upload Prescription</a>
          <a href="/login" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/login'); }}><i className="ti ti-login"></i> Login</a>
          <button onClick={() => { setMobileMenuOpen(false); onOpenCart(); }}>
            <i className="ti ti-shopping-cart"></i> Cart ({cartCount})
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
