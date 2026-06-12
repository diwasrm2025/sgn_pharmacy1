import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import ProductCard from './ProductCard';
import CartSidebar from './CartSidebar';
import PrescriptionModal from './PrescriptionModal';
import '../styles/CatalogPage.css';

const PAGE_SIZE = 8;

const normalize = (value) => String(value ?? '').toLowerCase().trim().replace(/\s+/g, ' ');

const productMatches = (product, query) => {
  const q = normalize(query);
  if (!q) return true;
  const fields = [product.product_name, product.brand, product.variant, product.product_category, product.pack_size, product.fragnance, product.product_price, product.product_discount];
  return fields.some((field) => normalize(field).includes(q));
};

const sortCatalog = (items, sortBy) => {
  const sorted = [...items];
  switch (sortBy) {
    case 'price-low': return sorted.sort((a, b) => Number(a.product_price) - Number(b.product_price));
    case 'price-high': return sorted.sort((a, b) => Number(b.product_price) - Number(a.product_price));
    case 'discount': return sorted.sort((a, b) => Number(b.product_discount) - Number(a.product_discount));
    case 'name': return sorted.sort((a, b) => a.product_name.localeCompare(b.product_name));
    default: return sorted;
  }
};

const AllProductsPage = ({ catalog, categories, cart, onAddToCart, onChangeQty, showToastMsg }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('featured');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);

  useEffect(() => {
    setSearchQuery(searchParams.get('query') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
    setPage(1);
  }, [searchParams]);

  const categoryOptions = useMemo(() => [
    { id: 'all', label: 'All Products', count: catalog.length },
    ...categories.map((cat) => ({
      id: cat.label,
      label: cat.label,
      count: catalog.filter((product) => normalize(product.product_category) === normalize(cat.label)).length,
    })),
  ], [catalog, categories]);

  const filteredProducts = useMemo(() => {
    const categoryFiltered = selectedCategory === 'all'
      ? catalog
      : catalog.filter((product) => normalize(product.product_category) === normalize(selectedCategory));
    const searched = categoryFiltered.filter((product) => productMatches(product, searchQuery));
    return sortCatalog(searched, sortBy);
  }, [catalog, searchQuery, selectedCategory, sortBy]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visibleProducts = filteredProducts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + Number(item.product_price || 0) * item.qty, 0);

  const applyRouteState = (nextSearch, nextCategory) => {
    const query = new URLSearchParams();
    if (nextSearch) query.set('query', nextSearch);
    if (nextCategory && nextCategory !== 'all') query.set('category', nextCategory);
    setSearchParams(query);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    applyRouteState(searchQuery, selectedCategory);
    setPage(1);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1);
    applyRouteState(searchQuery, categoryId);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('featured');
    setPage(1);
    setSearchParams({});
  };

  // Build a compact pagination range
  const getPageNumbers = () => {
    const pages = [];
    const maxShown = 5;
    let start = Math.max(1, safePage - 2);
    let end = Math.min(pageCount, start + maxShown - 1);
    if (end - start < maxShown - 1) start = Math.max(1, end - maxShown + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="catalog-page">
      <SiteHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSubmitSearch}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
        onOpenPrescription={() => setPrescriptionModalOpen(true)}
      />

      <section className="catalog-hero">
        <div className="section-inner">
          <form className="catalog-search-bar" onSubmit={handleSubmitSearch}>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicines, skin care, vitamins, deals..."
            />
            <button type="submit" className="catalog-search-btn"><i className="ti ti-search"></i> Search</button>
            <button type="button" className="catalog-reset-btn" onClick={handleReset}>Reset</button>
          </form>
        </div>
      </section>

      <section className="catalog-layout">
        <div className="section-inner">
          <div className="catalog-wrapper">
            <aside className="catalog-sidebar">
              <div className="catalog-filter-header">
                <h3>Categories</h3>
                <p>Browse products by category</p>
              </div>
              <div className="catalog-filter-panel">
                <div className="catalog-filter-list">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat.id}
                      className={`catalog-filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => handleCategorySelect(cat.id)}
                    >
                      <span>{cat.label}</span>
                      <span>{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <main className="catalog-content">
              <div className="catalog-toolbar">
                <div>
                  <div className="catalog-results-title">
                    <h3>{selectedCategory === 'all' ? 'All Products' : categoryOptions.find((cat) => cat.id === selectedCategory)?.label}</h3>
                  </div>
                  <div className="catalog-results-meta"><b>{filteredProducts.length}</b> Products Found</div>
                </div>

                <select className="catalog-sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Biggest Discount</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>

              {visibleProducts.length === 0 ? (
                <div className="catalog-empty">
                  <i className="ti ti-search-off"></i>
                  <p>No products found. Try adjusting your search or filters.</p>
                </div>
              ) : (
                <div className="catalog-products">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      cartItem={cart.find((item) => item.id === product.id)}
                      onAddToCart={onAddToCart}
                      onChangeQty={onChangeQty}
                    />
                  ))}
                </div>
              )}

              {pageCount > 1 && (
                <div className="catalog-pagination">
                  <button className="page-btn" disabled={safePage === 1} onClick={() => setPage(safePage - 1)}>
                    <i className="ti ti-chevron-left"></i>
                  </button>
                  {getPageNumbers().map((p) => (
                    <button key={p} className={`page-btn ${p === safePage ? 'active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                  ))}
                  <button className="page-btn" disabled={safePage === pageCount} onClick={() => setPage(safePage + 1)}>
                    <i className="ti ti-chevron-right"></i>
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onChangeQty={onChangeQty}
        subtotal={cartSubtotal}
        onCheckout={() => {
          showToastMsg(<span><i className="ti ti-circle-check"></i> Proceed to checkout from the cart!</span>);
          setIsCartOpen(false);
        }}
      />

      <PrescriptionModal
        isOpen={prescriptionModalOpen}
        onClose={() => setPrescriptionModalOpen(false)}
        showToastMsg={showToastMsg}
      />
    </div>
  );
};

export default AllProductsPage;
