import React from 'react';
import Navbar from './Navbar';
import '../styles/Navbar.css';
import '../styles/Hero.css';

const SiteHeader = ({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onOpenCart,
  cartCount,
  onOpenPrescription,
}) => (
  <>
    <div className="topbar">
      <span><i className="ti ti-truck" style={{ marginRight: '6px' }}></i>Free delivery on orders above &#8377;499</span>
      <span className="separator">|</span>
      <span><i className="ti ti-phone" style={{ marginRight: '6px' }}></i>Helpline Care: 1800-XXX-XXXX</span>
      <span className="separator">|</span>
      <span><i className="ti ti-clock" style={{ marginRight: '6px' }}></i>Fast Medicine Dispatch 24x7</span>
    </div>

    <Navbar
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onSearchSubmit={onSearchSubmit}
      onOpenCart={onOpenCart}
      cartCount={cartCount}
      onOpenPrescription={onOpenPrescription}
    />
  </>
);

export default SiteHeader;
