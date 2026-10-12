// src/pages/Home.jsx
// Meesho mobile app style Home page:
// 1. Round category row
// 2. Hero banner: "SALE IS LIVE NOW! UPTO 50% OFF" + Shop Now
// 3. Trust features bar (Free delivery, COD, Returns)
// 4. Trending Now ⚡ (horizontal scroll cards)
// 5. Deal of the Day countdown
// 6. Top Picks with price labels ("Under ₹399", etc.) + View All
import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryRow from '../components/CategoryRow';
import DealOfDay from '../components/DealOfDay';

// Price filter chips for the "Top Picks" section
const PRICE_TABS = [
  { label: 'All', max: Infinity },
  { label: 'Under ₹299', max: 299 },
  { label: 'Under ₹399', max: 399 },
  { label: 'Under ₹499', max: 499 },
  { label: 'Under ₹799', max: 799 },
];

const Home = () => {
  const navigate = useNavigate();

  // Active price filter for Top Picks (default to "Under ₹399")
  const [activePriceTab, setActivePriceTab] = useState('Under ₹399');

  // "Trending Now ⚡": pick top-rated products
  const trending = useMemo(() => {
    return [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  }, []);

  // "Top Picks": filter products based on selected price label
  const topPicks = useMemo(() => {
    const tab = PRICE_TABS.find((t) => t.label === activePriceTab);
    const max = tab ? tab.max : Infinity;
    return products.filter((p) => p.price <= max);
  }, [activePriceTab]);

  return (
    <div className="page home-page">
      {/* 1. Round category icons row */}
      <section className="home-section-cat">
        <CategoryRow />
      </section>

      {/* 2. Hero banner with gradient + "SALE IS LIVE NOW! UPTO 50% OFF" */}
      <section className="meesho-hero">
        <div className="meesho-hero-content">
          <span className="meesho-badge">🔥 MEGA BLOCKBUSTER SALE</span>
          <h1 className="meesho-hero-title">SALE IS LIVE NOW! UPTO 50% OFF</h1>
          <p className="meesho-hero-sub">
            Lowest Prices • Free Delivery • Cash on Delivery Available
          </p>
          <Link to="/products" className="meesho-hero-btn">
            Shop Now →
          </Link>
        </div>
        <div className="meesho-hero-art" aria-hidden="true">
          <div className="art-badge">-50%</div>
          <div className="art-emojis">
            <span>👗</span>
            <span>👔</span>
            <span>🧸</span>
            <span>💄</span>
          </div>
        </div>
      </section>

      {/* 3. Trust features bar */}
      <section className="trust-bar">
        <div className="trust-item">
          <div className="trust-icon">🚚</div>
          <div className="trust-text">
            <h4>Free Delivery</h4>
            <p>On all orders</p>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">💵</div>
          <div className="trust-text">
            <h4>Cash on Delivery</h4>
            <p>Pay when you receive</p>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">🔄</div>
          <div className="trust-text">
            <h4>Easy Returns</h4>
            <p>7-day hassle-free</p>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">✨</div>
          <div className="trust-text">
            <h4>Lowest Prices</h4>
            <p>Direct manufacturer rates</p>
          </div>
        </div>
      </section>

      {/* Deal of the Day with live countdown */}
      <DealOfDay />

      {/* 4. "Trending Now ⚡" section (horizontal scroll cards) */}
      <section className="home-section">
        <div className="section-head">
          <div className="section-title-wrap">
            <h2>Trending Now ⚡</h2>
            <span className="section-subtitle">Swipe to explore hot selling deals</span>
          </div>
          <Link to="/products" className="view-all-link">
            View All →
          </Link>
        </div>

        {/* Horizontal scroll container */}
        <div className="horizontal-scroll">
          {trending.map((p) => (
            <div key={p.id} className="scroll-card-wrap">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* 5. "Top Picks" with price labels ("Under ₹399") & "View All" */}
      <section className="home-section">
        <div className="section-head">
          <div className="section-title-wrap">
            <h2>Top Picks ✨</h2>
            <span className="section-subtitle">Budget-friendly deals curated for you</span>
          </div>
          <Link to="/products" className="btn-view-all">
            View All →
          </Link>
        </div>

        {/* Price label chips ("Under ₹399", etc.) */}
        <div className="price-label-chips">
          {PRICE_TABS.map((tab) => (
            <button
              key={tab.label}
              className={`price-tab-chip ${activePriceTab === tab.label ? 'active' : ''}`}
              onClick={() => setActivePriceTab(tab.label)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filtered Top Picks grid */}
        {topPicks.length === 0 ? (
          <p className="muted center">No products found for this budget.</p>
        ) : (
          <div className="grid">
            {topPicks.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* Prominent bottom View All button */}
        <div className="center-btn-wrap">
          <button
            className="btn-primary-outline"
            onClick={() => navigate('/products')}
          >
            View All Products ({products.length}) →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
