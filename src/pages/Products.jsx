// src/pages/Products.jsx
// Products page with fully interactive sidebar filters (Category, Price, Color, Fabric, Size) and unique polished UI.
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const CATS = ['All', 'Women', 'Men', 'Kids', 'Beauty'];
const COLORS = ['All', 'Black', 'White', 'Blue', 'Pink', 'Red'];
const FABRICS = ['All', 'Cotton', 'Denim', 'Silk'];
const SIZES = ['All', 'S', 'M', 'L', 'XL', 'Free Size'];

const Products = () => {
  const [params] = useSearchParams();
  const search = params.get('q') || '';
  const [category, setCategory] = useState(params.get('cat') || 'All');
  const [maxPrice, setMaxPrice] = useState(999);
  const [sort, setSort] = useState('popular');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedFabric, setSelectedFabric] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');

  useEffect(() => {
    const cat = params.get('cat');
    if (cat && CATS.includes(cat)) {
      setCategory(cat);
    } else {
      setCategory('All');
    }
  }, [params]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== 'All') {
      list = list.filter((p) => p.category === category);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    list = list.filter((p) => p.price <= maxPrice);

    if (selectedSize !== 'All') {
      list = list.filter((p) => p.sizes && p.sizes.includes(selectedSize));
    }

    if (sort === 'low') list.sort((a, b) => a.price - b.price);
    if (sort === 'high') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, maxPrice, sort, selectedColor, selectedFabric, selectedSize]);

  return (
    <div className="page">
      <Link to="/" className="back-home-btn">← Back to Home</Link>

      <div className="shop-layout">
        {/* Left Sidebar Unique Polished Filters */}
        <aside className="shop-sidebar">
          <div className="filters-header">FILTERS</div>
          <div className="filters-sub">{filtered.length} Products Available</div>

          {/* Category Filter */}
          <div className="filter-group">
            <div className="filter-group-title">
              <span>Category</span>
              <span>▾</span>
            </div>
            <div className="filter-options">
              {CATS.map((c) => (
                <label key={c} className="filter-checkbox-label">
                  <input
                    type="radio"
                    name="sidebar-cat"
                    checked={category === c}
                    onChange={() => setCategory(c)}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <div className="filter-group-title">
              <span>Price Range</span>
              <span>▾</span>
            </div>
            <div className="filter-options" style={{ padding: '6px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '800', color: 'var(--purple)' }}>
                <span>₹199</span>
                <span>Max: ₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="199"
                max="1499"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ accentColor: 'var(--purple)', width: '100%', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Color Filter */}
          <div className="filter-group">
            <div className="filter-group-title">
              <span>Color</span>
              <span>▾</span>
            </div>
            <div className="filter-options">
              {COLORS.map((col) => (
                <label key={col} className="filter-checkbox-label">
                  <input
                    type="radio"
                    name="sidebar-color"
                    checked={selectedColor === col}
                    onChange={() => setSelectedColor(col)}
                  />
                  <span>{col}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fabric Filter */}
          <div className="filter-group">
            <div className="filter-group-title">
              <span>Fabric</span>
              <span>▾</span>
            </div>
            <div className="filter-options">
              {FABRICS.map((fab) => (
                <label key={fab} className="filter-checkbox-label">
                  <input
                    type="radio"
                    name="sidebar-fabric"
                    checked={selectedFabric === fab}
                    onChange={() => setSelectedFabric(fab)}
                  />
                  <span>{fab}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="filter-group" style={{ borderBottom: 'none' }}>
            <div className="filter-group-title">
              <span>Size</span>
              <span>▾</span>
            </div>
            <div className="filter-options">
              {SIZES.map((sz) => (
                <label key={sz} className="filter-checkbox-label">
                  <input
                    type="radio"
                    name="sidebar-size"
                    checked={selectedSize === sz}
                    onChange={() => setSelectedSize(sz)}
                  />
                  <span>{sz}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="shop-content">
          {/* Unique Polished Top Bar */}
          <div className="shop-top-bar">
            <span style={{ fontWeight: 900, fontSize: '16px', color: '#1a0826' }}>
              All Products ({filtered.length})
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="muted" style={{ fontSize: '13px', fontWeight: 800 }}>Sort by :</span>
              <div className="custom-dropdown">
                <button
                  type="button"
                  className="custom-dropdown-btn"
                  onClick={() => setIsSortOpen((prev) => !prev)}
                >
                  <span>
                    {sort === 'popular' && 'Relevance / Popular'}
                    {sort === 'low' && 'Price : Low to High'}
                    {sort === 'high' && 'Price : High to Low'}
                    {sort === 'rating' && 'Customer Rating'}
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isSortOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {isSortOpen && (
                  <div className="custom-dropdown-menu">
                    {[
                      { value: 'popular', label: 'Relevance / Popular' },
                      { value: 'low', label: 'Price : Low to High' },
                      { value: 'high', label: 'Price : High to Low' },
                      { value: 'rating', label: 'Customer Rating' },
                    ].map((opt) => (
                      <div
                        key={opt.value}
                        className={`custom-dropdown-item ${sort === opt.value ? 'active' : ''}`}
                        onClick={() => {
                          setSort(opt.value);
                          setIsSortOpen(false);
                        }}
                      >
                        <span>{opt.label}</span>
                        {sort === opt.value && <span style={{ color: 'var(--purple)', fontWeight: 900 }}>✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4-Column Product Grid */}
          {filtered.length === 0 ? (
            <p className="center muted">No products found. Try another search or filter.</p>
          ) : (
            <div className="grid-4col">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
