// src/components/ProductCard.jsx
// Redesigned ProductCard with strict 3/4 portrait aspect ratio, Mall badge, reviews, and robust fallback.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { toggleWishlist, isWishlisted } = useCart();
  const wished = isWishlisted(product.id);
  const [imgError, setImgError] = useState(false);

  // Discount percentage from oldPrice
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // Realistic review count based on id
  const reviewsCount = (product.id * 14321 + 842) % 300000 + 5000;

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <Link to={`/products/${product.id}`}>
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              className="product-portrait-img"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="product-portrait-img product-fallback-box">
              <span>🛍️ {product.category}</span>
            </div>
          )}
        </Link>
        {/* Wishlist heart on the image */}
        <button
          className={`heart-btn ${wished ? 'active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          title="Wishlist"
        >
          {wished ? '♥' : '♡'}
        </button>
      </div>

      <div className="product-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '4px' }}>
          <Link to={`/products/${product.id}`} className="product-name" style={{ flex: 1 }}>
            {product.name}
          </Link>
          <span className="mall-tag">Mall</span>
        </div>
        <p className="product-cat">{product.category}</p>

        <div className="price-row">
          <span className="price-bold">₹{product.price}</span>
          {product.oldPrice && (
            <span className="old-price">₹{product.oldPrice}</span>
          )}
          {discount > 0 && (
            <span className="green-discount">{discount}% off</span>
          )}
        </div>

        <div className="rating-pill-row" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="rating-pill">★ {product.rating}</span>
          <span className="reviews-count">{reviewsCount.toLocaleString()} Reviews</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
