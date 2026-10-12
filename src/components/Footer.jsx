// src/components/Footer.jsx
// Simple footer with links.
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>ShopEasy</h4>
          <p>Affordable fashion & home essentials.</p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/products">All Products</Link>
          <Link to="/products?q=Women">Women</Link>
          <Link to="/products?q=Men">Men</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div className="footer-col">
          <h4>Help</h4>
          <span>FAQ</span>
          <span>Shipping</span>
          <span>Returns</span>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} ShopEasy • Demo only, no real payments.
      </div>
    </footer>
  );
};

export default Footer;
