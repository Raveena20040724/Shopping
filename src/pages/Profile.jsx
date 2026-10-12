// src/pages/Profile.jsx
// User Profile page showing user details, actual placed orders history, and sign out option with Bootstrap-style SVG icons.
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { HeartIcon, CartIcon, SignOutIcon } from '../components/Icons';

const Profile = () => {
  const { user, orders, logout, showToast } = useCart();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="page center" style={{ padding: '60px 16px' }}>
        <div className="card" style={{ maxWidth: '420px', margin: '0 auto' }}>
          <h2>Please Sign In</h2>
          <p className="muted" style={{ margin: '16px 0 24px' }}>You need to be signed in to view your profile.</p>
          <Link to="/signin" className="btn-primary">Sign In Now</Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    showToast('Signed out successfully');
    navigate('/');
  };

  return (
    <div className="page" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" className="back-home-btn">← Back to Home</Link>
      <h2>My Profile</h2>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--purple),var(--pink))', color: '#fff', fontSize: '32px', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '20px' }}>{user.name}</h3>
            <p className="muted" style={{ margin: 0, fontSize: '14px' }}>{user.email} • {user.phone}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link to="/wishlist" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', padding: '10px 20px' }}>
            <HeartIcon filled={true} /> My Wishlist
          </Link>
          <Link to="/cart" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', padding: '10px 20px' }}>
            <CartIcon /> My Cart
          </Link>
          <button className="link-danger" onClick={handleLogout} style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 800 }}>
            <SignOutIcon /> Sign Out
          </button>
        </div>
      </div>

      <div className="card">
        <h3>My Orders & Activity ({orders.length})</h3>
        {orders.length === 0 ? (
          <div>
            <p className="muted" style={{ fontSize: '14px', marginTop: '8px' }}>No orders placed yet. Explore our collection and place your first order with Free Delivery & COD!</p>
            <Link to="/products" className="btn-primary" style={{ display: 'inline-block', marginTop: '16px' }}>Start Shopping →</Link>
          </div>
        ) : (
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.map((ord) => (
              <div key={ord.id} style={{ border: '1.5px solid var(--border)', borderRadius: '16px', padding: '16px', background: '#faf5ff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <div>
                    <span style={{ fontWeight: 900, color: 'var(--purple-dark)' }}>Order #{ord.id}</span>
                    <span className="muted" style={{ fontSize: '12px', marginLeft: '10px' }}>{ord.date}</span>
                  </div>
                  <span className="green" style={{ fontWeight: 800, fontSize: '13px' }}>{ord.status}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {ord.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img src={item.image} alt={item.name} style={{ width: '45px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontWeight: 800, fontSize: '14px' }}>{item.name}</p>
                        <p className="muted" style={{ margin: 0, fontSize: '12px' }}>Qty: {item.qty} {item.size ? `• Size: ${item.size}` : ''}</p>
                      </div>
                      <span style={{ fontWeight: 900 }}>₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                  <span className="muted" style={{ fontSize: '12px' }}>Payment: {ord.payment}</span>
                  <span style={{ fontWeight: 900, fontSize: '15px' }}>Total: ₹{ord.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
