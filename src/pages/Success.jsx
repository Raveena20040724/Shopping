// src/pages/Success.jsx
// Simple confirmation after order.
import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  const orderId = localStorage.getItem('shopeasy-last-order') || 'SE123456';
  return (
    <div className="page center">
      <div className="success-box">
        <div className="big-tick">✓</div>
        <h2>Order Placed!</h2>
        <p>Order ID: <b>{orderId}</b></p>
        <p className="muted">This is a demo — no real payment was taken.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/products" className="btn-secondary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
