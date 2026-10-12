// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, clearCart, addOrder } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', pincode: '' });
  const [pay, setPay] = useState('COD');

  const lines = cart.map((l) => ({ ...l, product: products.find((p) => p.id === l.id) })).filter((l) => l.product);
  const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const placeOrder = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      alert('Please fill name, phone and address.');
      return;
    }
    const orderId = 'SE' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: lines.map((l) => ({ name: l.product.name, price: l.product.price, qty: l.qty, size: l.size, image: l.product.image })),
      total,
      payment: pay,
      status: 'Out for Delivery 🚚'
    };
    addOrder(newOrder);
    localStorage.setItem('shopeasy-last-order', orderId);
    clearCart();
    navigate('/success');
  };

  if (lines.length === 0) return <div className="page center"><h2>Nothing to checkout.</h2></div>;

  return (
    <div className="page">
      <Link to="/" className="back-home-btn">← Back to Home</Link>
      <h2>Checkout</h2>
      <form className="checkout-layout" onSubmit={placeOrder}>
        {/* Address */}
        <div className="card">
          <h3>Delivery Address</h3>
          <input className="input" placeholder="Full name" value={form.name} onChange={set('name')} />
          <input className="input" placeholder="Phone" value={form.phone} onChange={set('phone')} />
          <textarea className="input" placeholder="Address" value={form.address} onChange={set('address')} />
          <div className="row2">
            <input className="input" placeholder="City" value={form.city} onChange={set('city')} />
            <input className="input" placeholder="Pincode" value={form.pincode} onChange={set('pincode')} />
          </div>

          <h3>Payment method</h3>
          {['COD', 'UPI', 'Card'].map((m) => (
            <label key={m} className="pay-opt">
              <input type="radio" checked={pay === m} onChange={() => setPay(m)} />
              {m === 'COD' ? 'Cash on Delivery' : m}
            </label>
          ))}
        </div>

        {/* Summary */}
        <div className="card">
          <h3>Order Summary</h3>
          {lines.map((l) => (
            <p key={`${l.id}-${l.size}`} className="small">
              {l.product.name} × {l.qty} — ₹{l.product.price * l.qty}
            </p>
          ))}
          <hr />
          <p><b>Total: ₹{total}</b></p>
          <button className="btn-primary full" type="submit">Place Order</button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
