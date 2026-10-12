// src/components/BottomNav.jsx
// Bottom bar for mobile: Home, Categories, Wishlist, Cart.
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const BottomNav = () => {
  const { cartCount, wishlist } = useCart();
  const { pathname } = useLocation();

  // Helper for active link highlight
  const active = (p) => (pathname === p ? 'bnav-item active' : 'bnav-item');

  return (
    <nav className="bnav">
      <Link to="/" className={active('/')}>
        <span>🏠</span>Home
      </Link>
      <Link to="/products" className={active('/products')}>
        <span>🗂️</span>Categories
      </Link>
      <Link to="/wishlist" className={active('/wishlist')}>
        <span>♥</span>Wishlist ({wishlist.length})
      </Link>
      <Link to="/cart" className={active('/cart')}>
        <span>🛒</span>Cart ({cartCount})
      </Link>
    </nav>
  );
};

export default BottomNav;
