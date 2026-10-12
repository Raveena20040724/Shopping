// src/pages/SignIn.jsx
// Sign In / Register page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { login, showToast } = useCart();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: name.trim() || email.split('@')[0] || 'Valued Customer',
      email: email.trim() || 'customer@shopeasy.com',
      phone: '+91 98765 43210',
    };
    login(userData);
    showToast('Signed in successfully! 🎉');
    navigate('/profile');
  };

  return (
    <div className="page center" style={{ maxWidth: '440px', margin: '40px auto' }}>
      <div className="card" style={{ textAlign: 'left' }}>
        <h2>{isRegister ? 'Create Account 🚀' : 'Sign In to ShopEasy 🔐'}</h2>
        <p className="muted small" style={{ marginBottom: '24px' }}>
          {isRegister ? 'Register to get exclusive offers & track orders' : 'Access your cart, wishlist and orders'}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: 800, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Full Name</label>
              <input
                type="text"
                className="input"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontWeight: 800, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Email or Mobile Number</label>
            <input
              type="text"
              className="input"
              placeholder="name@example.com or 9876543210"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 800, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Password</label>
            <input
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>

          <button type="submit" className="btn-primary full" style={{ marginBottom: '16px' }}>
            {isRegister ? 'Register & Sign In' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <button
            type="button"
            className="link-danger"
            style={{ color: 'var(--purple)', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
