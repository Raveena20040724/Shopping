// src/components/Navbar.jsx
// Top bar: announcement ticker, logo, visual search, wishlist + cart vector icons, sign in / profile button.
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CameraIcon, CartIcon, HeartIcon, UserIcon } from './Icons';

const Navbar = () => {
  const { cartCount, wishlist, user, showToast } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(urlQuery);

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  const syncQueryToUrl = (val) => {
    if (location.pathname === '/products') {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (val.trim()) next.set('q', val.trim());
          else next.delete('q');
          return next;
        },
        { replace: true }
      );
    } else if (val.trim()) {
      navigate(`/products?q=${encodeURIComponent(val.trim())}`);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    syncQueryToUrl(val);
  };

  const onSearch = (e) => {
    e.preventDefault();
    if (location.pathname === '/products') return;
    navigate(query.trim() ? `/products?q=${encodeURIComponent(query.trim())}` : '/products');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      showToast('Visual Search: Analyzing image & matching products... 🔍');
      setTimeout(() => {
        navigate('/products?visualSearch=true');
      }, 1200);
    }
  };

  return (
    <>
      <div className="announcement-bar">
        ⚡ Lowest Prices • Free Delivery • Cash on Delivery Available • 7-Day Easy Returns
      </div>

      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="logo">
            <span className="logo-icon">S</span> ShopEasy
          </Link>
          <form className="search-bar" onSubmit={onSearch}>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search kurtis, sarees, shirts, home decor..."
                value={query}
                onChange={handleChange}
              />
              <label className="camera-btn-inside" title="Search by image upload">
                <CameraIcon />
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
            </div>
            <button type="submit">Search</button>
          </form>

          <div className="nav-icons">
            <Link to="/products" className="nav-link desktop-only" style={{ fontWeight: '800', color: '#1a0826', fontSize: '15px' }}>
              Explore
            </Link>

            <Link to="/wishlist" className="icon-btn desktop-only" title="Wishlist">
              <HeartIcon />
              <span className="badge">{wishlist.length}</span>
            </Link>

            <Link to="/cart" className="icon-btn" title="Cart">
              <CartIcon />
              <span className="badge">{cartCount}</span>
            </Link>

            {user ? (
              <Link to="/profile" className="icon-btn profile-btn" title="My Profile" style={{ background: '#f3e8ff', display: 'flex', gap: '6px', alignItems: 'center', padding: '8px 12px', fontSize: '14px', fontWeight: '800' }}>
                <UserIcon /> <span>{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link to="/signin" className="btn-primary sign-in-btn" style={{ padding: '10px 22px', fontSize: '14px', borderRadius: '30px', whiteSpace: 'nowrap', fontWeight: '800' }}>
                Sign In
              </Link>
            )}
          </div>
        </div>

        <form className="search-bar mobile-only" onSubmit={onSearch}>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={handleChange}
            />
            <label className="camera-btn-inside" title="Search by image upload">
              <CameraIcon />
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
          </div>
          <button type="submit">Go</button>
        </form>
      </nav>
    </>
  );
};

export default Navbar;
