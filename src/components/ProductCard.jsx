// src/components/ProductCard.jsx
// Redesigned ProductCard with strict 3/4 portrait aspect ratio and robust fallback.
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
        <Link to={`/products/${product.id}`} className="product-name">
          {product.name}
        </Link>
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

        <div className="rating-pill-row">
          <span className="rating-pill">★ {product.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
