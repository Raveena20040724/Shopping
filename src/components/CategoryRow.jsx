// src/components/CategoryRow.jsx
// Arched category cards row with All, Women, Men, Kids, Beauty.
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CATS = [
  { name: 'All', image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&q=80', query: 'All' },
  { name: 'Women', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80', query: 'Women' },
  { name: 'Men', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80', query: 'Men' },
  { name: 'Kids', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=400&q=80', query: 'Kids' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80', query: 'Beauty' },
];

const CategoryRow = () => {
  const navigate = useNavigate();

  const handleClick = (cat) => {
    if (cat.query === 'All') {
      navigate('/products');
    } else {
      navigate(`/products?cat=${encodeURIComponent(cat.query)}`);
    }
  };

  return (
    <div className="arched-cat-wrap">
      <div className="arched-cat-row">
        {CATS.map((c) => (
          <button
            key={c.name}
            className="arched-cat-item"
            onClick={() => handleClick(c)}
            title={`Shop ${c.name}`}
          >
            <div className="arched-card">
              <img src={c.image} alt={c.name} className="arched-img" />
            </div>
            <span className="arched-name">{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;
