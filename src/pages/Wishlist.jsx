// src/pages/Wishlist.jsx
// Shows wishlisted products (persisted in localStorage via context).
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist } = useCart();
  const items = products.filter((p) => wishlist.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="page center">
        <Link to="/" className="back-home-btn" style={{ display: 'inline-flex', marginBottom: '20px' }}>← Back to Home</Link>
        <h2>No wishlist items yet ♡</h2>
        <Link to="/products" className="btn-primary">Discover Products</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/" className="back-home-btn">← Back to Home</Link>
      <h2>My Wishlist ({items.length})</h2>
      <div className="grid">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};

export default Wishlist;
