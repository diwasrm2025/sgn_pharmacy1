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
      <span style={{ paddingRight: '16px',borderRight:'1px solid #ffffff80' }}><i className="ti ti-truck"></i>Free delivery on orders above &#8377;499</span>
      <span style={{ paddingRight: '16px',borderRight:'1px solid #ffffff80' }}><i className="ti ti-phone"></i>Helpline Care: 1800-XXX-XXXX</span>
      <span ><i className="ti ti-clock"></i>Fast Medicine Dispatch 24x7</span>
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
