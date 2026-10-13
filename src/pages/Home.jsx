// src/pages/Home.jsx
// Home page with vector icons, full-width Offer Banner & Brand Ticker, Arched Categories.
import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryRow from '../components/CategoryRow';
import BrandTicker from '../components/BrandTicker';
import DealOfDay from '../components/DealOfDay';
import { TruckIcon, CashIcon, ReturnIcon, SparkleIcon } from '../components/Icons';

const PRICE_TABS = [
  { label: 'All', max: Infinity },
  { label: 'Under ₹299', max: 299 },
  { label: 'Under ₹399', max: 399 },
  { label: 'Under ₹499', max: 499 },
  { label: 'Under ₹799', max: 799 },
];

const Home = () => {
  const navigate = useNavigate();
  const [activePriceTab, setActivePriceTab] = useState('Under ₹399');

  const trending = useMemo(() => {
    return [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  }, []);

  const topPicks = useMemo(() => {
    const tab = PRICE_TABS.find((t) => t.label === activePriceTab);
    const max = tab ? tab.max : Infinity;
    return products.filter((p) => p.price <= max);
  }, [activePriceTab]);

  return (
    <div className="page home-page">
      {/* 1. Arched Category Cards row at the top */}
      <section className="home-section-cat">
        <CategoryRow />
      </section>

      {/* 2. Full-width Offer Banner */}
      <section className="full-width-section">
        <div className="offer-banner-wrap">
          <div className="offer-banner-left">
            <span className="offer-up-text">Up to</span>
            <h1 className="offer-huge-title">35% OFF</h1>
            <p className="offer-sub-text">on first order</p>
            <span className="offer-app-badge">*Only on App</span>
            <button className="download-btn" onClick={() => alert('Redirecting to App Download...')}>
              Download Now
            </button>
            <span className="tc-label">T&C Apply*</span>
          </div>
          <div className="offer-banner-right">
            <div className="offer-grid-cards">
              <div className="offer-feat-box" onClick={() => navigate('/products?cat=Women')}>
                <div className="feat-img-shell">
                  <img src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=300&q=80" alt="Trending Now" />
                </div>
                <span className="feat-btn-label">Trending Now</span>
              </div>
              <div className="offer-feat-box" onClick={() => navigate('/products')}>
                <div className="feat-img-shell">
                  <img src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=300&q=80" alt="Budget Buys" />
                </div>
                <span className="feat-btn-label">Budget Buys</span>
              </div>
              <div className="offer-feat-box" onClick={() => navigate('/products')}>
                <div className="feat-img-shell">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" alt="Top Rated Picks" />
                </div>
                <span className="feat-btn-label">Top Rated Picks</span>
              </div>
              <div className="offer-feat-box" onClick={() => navigate('/products?cat=Beauty')}>
                <div className="feat-img-shell">
                  <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80" alt="Daily Essentials" />
                </div>
                <span className="feat-btn-label">Daily Essentials</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Full-width Brand Ticker below the Offer Banner */}
      <section className="full-width-section">
        <BrandTicker />
      </section>

      {/* Trust features bar with vector icons */}
      <section className="trust-bar">
        <div className="trust-item">
          <div className="trust-icon"><TruckIcon /></div>
          <div className="trust-text">
            <h4>Free Delivery</h4>
            <p>On all orders</p>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon"><CashIcon /></div>
          <div className="trust-text">
            <h4>Cash on Delivery</h4>
            <p>Pay when you receive</p>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon"><ReturnIcon /></div>
          <div className="trust-text">
            <h4>Easy Returns</h4>
            <p>7-day hassle-free</p>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon"><SparkleIcon /></div>
          <div className="trust-text">
            <h4>Lowest Prices</h4>
            <p>Direct manufacturer rates</p>
          </div>
        </div>
      </section>

      {/* Deal of the Day */}
      <DealOfDay />

      {/* 4. Trending Now */}
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
        <div className="horizontal-scroll">
          {trending.map((p) => (
            <div key={p.id} className="scroll-card-wrap">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* 5. Top Picks */}
      <section className="home-section">
        <div className="section-head">
          <div className="section-title-wrap">
            <h2>Top Picks <SparkleIcon /></h2>
            <span className="section-subtitle">Budget-friendly deals curated for you</span>
          </div>
          <Link to="/products" className="btn-view-all">
            View All →
          </Link>
        </div>

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

        {topPicks.length === 0 ? (
          <p className="muted center">No products found for this budget.</p>
        ) : (
          <div className="grid">
            {topPicks.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

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
