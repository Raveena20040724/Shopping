// src/context/CartContext.jsx
// Global shop state: cart + wishlist, saved to localStorage so refresh keeps data.
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const CartContext = createContext(null);

// Custom hook so pages can do: const { cart, addToCart } = useCart()
export const useCart = () => useContext(CartContext);

// Helper: safely read JSON from localStorage
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export const CartProvider = ({ children }) => {
  // Cart items: [{ id, size, qty }]
  const [cart, setCart] = useState(() => load('shopeasy-cart', []));
  // Wishlist: array of product ids
  const [wishlist, setWishlist] = useState(() => load('shopeasy-wishlist', []));
  // Toast message (e.g. "Added to cart")
  const [toast, setToast] = useState('');

  // Save cart + wishlist on every change
  useEffect(() => {
    localStorage.setItem('shopeasy-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shopeasy-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Show a small toast message for 2 seconds
  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast(''), 2000);
  };

  // Add product to cart (default size + qty 1). Merges same id+size.
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
    // Toast feedback on every add
    showToast('Added to cart ✓');
  };

  // Remove one line from cart
  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  // Update quantity (+/-). Removes line if qty < 1.
  const updateQty = (id, size, qty) => {
    if (qty < 1) {
      removeFromCart(id, size);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i))
    );
  };

  // Empty cart after placing order
  const clearCart = () => setCart([]);

  // Wishlist toggle: add id if missing, remove if present
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const isWishlisted = (id) => wishlist.includes(id);

  // Total item count for navbar badge
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        toast,
        showToast,
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
