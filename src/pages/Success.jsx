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
        <Link to="/products" className="btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default Success;
