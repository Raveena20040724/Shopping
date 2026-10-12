// src/components/BrandTicker.jsx
// Smooth left-sliding infinite brand ticker marquee
import React from 'react';

const BRANDS = [
  { name: 'Bata', logoText: 'Bata' },
  { name: 'WOW Skin Science', logoText: 'WOW SKIN SCIENCE' },
  { name: 'Mamaearth', logoText: 'mamaearth™' },
  { name: 'Wild Stone', logoText: 'WILD STONE' },
  { name: 'Plum', logoText: 'plum be good' },
  { name: 'Nivea', logoText: 'NIVEA' },
  { name: 'Lakme', logoText: 'LAKMÉ' },
  { name: 'PUMA', logoText: 'PUMA' },
  { name: 'Maybelline', logoText: 'MAYBELLINE' },
];

const BrandTicker = () => {
  return (
    <div className="brand-ticker-wrap">
      <div className="brand-ticker-track">
        {[...BRANDS, ...BRANDS].map((b, idx) => (
          <div key={idx} className="brand-ticker-item">
            <span className="brand-logo-text">{b.logoText}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandTicker;
