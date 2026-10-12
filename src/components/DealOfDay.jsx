// src/components/DealOfDay.jsx
// "Deal of the Day" banner with a live countdown to midnight.
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { products, categoryStyle } from '../data/products';
import { useCart } from '../context/CartContext';

// Seconds left until midnight (for countdown)
function secondsToMidnight() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  return Math.max(0, Math.floor((end - now) / 1000));
}

const DealOfDay = () => {
  // Pick the biggest-discount product as today's deal
  const deal = [...products].sort(
    (a, b) => (b.oldPrice - b.price) - (a.oldPrice - a.price)
  )[0];
  const { addToCart } = useCart();
  const [left, setLeft] = useState(secondsToMidnight());

  // Tick every second
  useEffect(() => {
    const t = setInterval(() => setLeft(secondsToMidnight()), 1000);
    return () => clearInterval(t);
  }, []);

  const h = String(Math.floor(left / 3600)).padStart(2, '0');
  const m = String(Math.floor((left % 3600) / 60)).padStart(2, '0');
  const s = String(left % 60).padStart(2, '0');

  return (
    <section className="deal">
      <div className="deal-info">
        <span className="deal-pill">⚡ Deal of the Day</span>
        <h2>{deal.name}</h2>
        <p>
          <b>₹{deal.price}</b> <s>₹{deal.oldPrice}</s>
        </p>
        {/* Countdown boxes */}
        <div className="timer">
          <span>{h}h</span>:<span>{m}m</span>:<span>{s}s</span>
        </div>
        <div className="deal-btns">
          <button className="btn-primary" onClick={() => addToCart(deal)}>
            Add to Cart
          </button>
          <Link to={`/products/${deal.id}`} className="btn-ghost">
            View
          </Link>
        </div>
      </div>
      <div className="deal-img-box">
        <img src={deal.image} alt={deal.name} className="deal-portrait-img" />
      </div>
    </section>
  );
};

export default DealOfDay;
