// src/context/CartContext.jsx
// Global shop state: cart + wishlist + orders + auth user, saved to localStorage.
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => load('shopeasy-cart', []));
  const [wishlist, setWishlist] = useState(() => load('shopeasy-wishlist', []));
  const [orders, setOrders] = useState(() => load('shopeasy-orders', []));
  const [user, setUser] = useState(() => load('shopeasy-user', null));
  const [toast, setToast] = useState('');

  useEffect(() => {
    localStorage.setItem('shopeasy-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shopeasy-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('shopeasy-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shopeasy-user', JSON.stringify(user));
  }, [user]);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast(''), 2000);
  };

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const addToCart = (product, size = null, qty = 1) => {
    const chosenSize = size || (product.sizes ? product.sizes[0] : 'One Size');
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id && i.size === chosenSize);
      if (found) {
        return prev.map((i) =>
          i.id === product.id && i.size === chosenSize
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [...prev, { id: product.id, size: chosenSize, qty }];
    });
    showToast('Added to cart ✓');
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const updateQty = (id, size, qty) => {
    if (qty < 1) {
      removeFromCart(id, size);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const isWishlisted = (id) => wishlist.includes(id);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        cartCount,
        user,
        toast,
        showToast,
        login,
        logout,
        addOrder,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
