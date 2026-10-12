// src/pages/ProductDetails.jsx
// Details: exact product photo, title, price (₹), old price, discount %, rating, size, Add to Cart, trust guarantees.
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();

  // Find product by id
  const product = products.find((p) => p.id === Number(id));
  const [size, setSize] = useState(product?.sizes?.[0] || 'One Size');

  if (!product) return <div className="page"><p>Product not found.</p><Link to="/products">Back</Link></div>;

  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  const wished = isWishlisted(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const buyNow = () => {
    addToCart(product, size, 1);
    navigate('/cart');
  };

  return (
    <div className="page">
      <Link to="/products" className="back-home-btn">← Back to Products</Link>
      <div className="details-wrap">
        {/* Exact product photo side */}
        <div className="details-img">
          <img
            src={product.image}
            alt={product.name}
            className="details-portrait-img"
          />
        </div>
        {/* Info side */}
        <div className="details-info">
          <h2>{product.name}</h2>
          <p className="muted">{product.category}</p>
          <div className="price-row big">
            <span className="price-bold">₹{product.price}</span>
            <span className="old-price">₹{product.oldPrice}</span>
            <span className="green-discount">{discount}% off</span>
          </div>
          <p className="rating-pill-row"><span className="rating-pill">★ {product.rating} rating</span></p>

          {/* Size selector */}
          <p style={{ marginTop: '16px' }}><b>Select size:</b></p>
          <div className="chips">
            {product.sizes.map((s) => (
              <button
                key={s}
                className={`chip ${size === s ? 'active' : ''}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="details-btns">
            <button className="btn-primary" onClick={() => addToCart(product, size, 1)}>
              Add to Cart
            </button>
            <button className="btn-secondary" onClick={buyNow}>
              Buy Now
            </button>
            <button className="btn-ghost" onClick={() => toggleWishlist(product.id)}>
              {wished ? '♥ Wishlisted' : '♡ Wishlist'}
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="trust-guarantees">
            <div className="guarantee-item">
              <span>🚚</span>
              <p>Free Delivery</p>
            </div>
            <div className="guarantee-item">
              <span>💵</span>
              <p>COD Available</p>
            </div>
            <div className="guarantee-item">
              <span>🔄</span>
              <p>7-Day Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ marginTop: '40px', textAlign: 'left' }}>
          <h3>You may also like</h3>
          <div className="grid" style={{ marginTop: '16px' }}>
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
