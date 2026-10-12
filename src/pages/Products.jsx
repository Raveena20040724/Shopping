// src/pages/Products.jsx
// Grid with category filter, price filter, sort.
// Search comes from navbar via shared URL ?q=. Resets category to 'All' when searching without a category.
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const CATS = ['All', 'Women', 'Men', 'Kids', 'Home', 'Beauty'];

const Products = () => {
  const [params] = useSearchParams();
  // Shared search text from navbar (?q=)
  const search = params.get('q') || '';
  // Category can be pre-set via URL (?cat=..) from Home chips
  const [category, setCategory] = useState(params.get('cat') || 'All');
  const [maxPrice, setMaxPrice] = useState(999);
  const [sort, setSort] = useState('popular');

  // Sync category when URL params change (e.g. clicking category chips or clearing category)
  useEffect(() => {
    const cat = params.get('cat');
    if (cat && CATS.includes(cat)) {
      setCategory(cat);
    } else {
      setCategory('All');
    }
  }, [params]);

  // Filter by navbar search (name + category) + category dropdown + price, then sort
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
    if (sort === 'low') list.sort((a, b) => a.price - b.price);
    if (sort === 'high') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, maxPrice, sort]);

  return (
    <div className="page">
      <h2>All Products ({filtered.length})</h2>

      {/* Controls: category, sort, price — search lives only in navbar */}
      <div className="filters">
        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="popular">Sort: Popular</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
        <label className="price-filter">
          Under ₹{maxPrice}
          <input
            type="range"
            min="199"
            max="1499"
            step="50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="center muted">No products found. Try another search or filter.</p>
      ) : (
        <div className="grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
