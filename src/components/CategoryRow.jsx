// src/components/CategoryRow.jsx
// Round category icons row styled like the Meesho mobile app.
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Category items with emoji and matching colors
const CATS = [
  { name: 'All', emoji: '🛍️' },
  { name: 'Women', emoji: '👗' },
  { name: 'Men', emoji: '👔' },
  { name: 'Kids', emoji: '🧸' },
  { name: 'Home', emoji: '🏠' },
  { name: 'Beauty', emoji: '💄' },
];

const CategoryRow = () => {
  const navigate = useNavigate();

  // Navigate to products with category filter
  const handleClick = (name) => {
    if (name === 'All') {
      navigate('/products');
    } else {
      navigate(`/products?cat=${encodeURIComponent(name)}`);
    }
  };

  return (
    <div className="cat-row-wrap">
      <div className="cat-row">
        {CATS.map((c) => (
          <button
            key={c.name}
            className="cat-item"
            onClick={() => handleClick(c.name)}
            title={`Shop ${c.name}`}
          >
            <span className="cat-circle">{c.emoji}</span>
            <span className="cat-name">{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;
