// src/components/Navbar.jsx
// Top bar: announcement ticker, logo, search, wishlist + cart icons with counts.
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount, wishlist } = useCart();
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

  return (
    <>
      {/* Top professional announcement ticker */}
      <div className="announcement-bar">
        ⚡ Lowest Prices • Free Delivery • Cash on Delivery Available • 7-Day Easy Returns
      </div>

      <nav className="navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-icon">S</span> ShopEasy
          </Link>

          {/* Search bar */}
          <form className="search-bar" onSubmit={onSearch}>
            <input
              type="text"
              placeholder="Search kurtis, sarees, shirts, home decor..."
              value={query}
              onChange={handleChange}
            />
            <button type="submit">Search</button>
          </form>

          {/* Icons */}
          <div className="nav-icons">
            <Link to="/products" className="nav-link">
              Explore
            </Link>
            <Link to="/wishlist" className="icon-btn" title="Wishlist">
              ♥<span className="badge">{wishlist.length}</span>
            </Link>
            <Link to="/cart" className="icon-btn" title="Cart">
              🛒<span className="badge">{cartCount}</span>
            </Link>
          </div>
        </div>

        {/* Mobile search row */}
        <form className="search-bar mobile-only" onSubmit={onSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={handleChange}
          />
          <button type="submit">Go</button>
        </form>
      </nav>
    </>
  );
};

export default Navbar;
