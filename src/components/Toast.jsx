// src/components/Toast.jsx
// Small popup shown when cart updates.
import React from 'react';
import { useCart } from '../context/CartContext';

const Toast = () => {
  const { toast } = useCart();
  if (!toast) return null;
  return <div className="toast">{toast}</div>;
};

export default Toast;
