// src/pages/Cart.jsx
// Cart: items, qty +/-, remove, price summary (₹), checkout button.
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products, categoryStyle } from '../data/products';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Join cart lines with full product data
  const lines = cart.map((line) => ({
    ...line,
    product: products.find((p) => p.id === line.id),
  })).filter((l) => l.product);

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const savings = lines.reduce((s, l) => s + (l.product.oldPrice - l.product.price) * l.qty, 0);

  if (lines.length === 0) {
    return (
      <div className="page center">
        <Link to="/" className="back-home-btn" style={{ display: 'inline-flex', marginBottom: '20px' }}>← Back to Home</Link>
        <h2>Your cart is empty 🛒</h2>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/" className="back-home-btn">← Back to Home</Link>
      <h2>Cart ({lines.length} items)</h2>
      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items">
          {lines.map((l) => {
            const meta = categoryStyle[l.product.category] || {};
            return (
              <div key={`${l.id}-${l.size}`} className="cart-row">
                <div className="cart-emoji" style={{ background: l.product.bg || meta.bg }}>
                  {l.product.emoji || meta.emoji}
                </div>
                <div className="cart-row-info">
                  <Link to={`/products/${l.id}`}><b>{l.product.name}</b></Link>
                  <p className="muted">Size: {l.size} • ₹{l.product.price}</p>
                  <div className="qty-row">
                    <button onClick={() => updateQty(l.id, l.size, l.qty - 1)}>-</button>
                    <span>{l.qty}</span>
                    <button onClick={() => updateQty(l.id, l.size, l.qty + 1)}>+</button>
                    <button className="link-danger" onClick={() => removeFromCart(l.id, l.size)}>
                      Remove
                    </button>
                  </div>
                </div>
                <b>₹{l.product.price * l.qty}</b>
              </div>
            );
          })}
        </div>
        {/* Summary */}
        <div className="summary">
          <h3>Price Summary</h3>
          <p>Subtotal: <b>₹{subtotal}</b></p>
          <p className="green">You save: ₹{savings}</p>
          <p>Delivery: <b>FREE</b></p>
          <hr />
          <p>Total: <b>₹{subtotal}</b></p>
          <button className="btn-primary full" onClick={() => navigate('/checkout')}>
            Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
