# ShopEasy - Meesho-style Shopping Website

## Overview
A simple online shopping website for affordable fashion and home products.
Frontend only. Use dummy data. No backend, no real payments.

## Tech Stack
- React + Vite
- Plain CSS (or Tailwind CSS)
- React Router for pages
- localStorage to save cart and wishlist

## Pages
1. Home: banner, category chips, trending products grid
2. Products: grid of cards with search, category filter, price filter, sort
3. Product Details: image, title, price, old price, discount %, rating, size selector, Add to Cart
4. Cart: items, quantity +/-, remove, price summary, Checkout button
5. Checkout: address form, payment options (UI only), Place Order
6. Order Success: simple confirmation message

## Features
- Navbar with logo, search bar, cart count, wishlist icon
- Product card: image, name, price, discount badge, rating, wishlist heart
- Cart total updates automatically
- Cart and wishlist persist after refresh
- Fully responsive (mobile first)
- Footer with simple links

## Dummy Data
- 20 products in `src/data/products.js`
- Categories: Women, Men, Kids, Home, Beauty
- Fields: id, name, category, price, oldPrice, rating, image, sizes
- Use placeholder images (picsum.photos or emoji)

## Design
- Meesho-like colors: purple/pink theme
- Clean card layout, rounded corners
- Simple, beginner-friendly commented code

## Folder Structure
src/
- components/ (Navbar, ProductCard, Footer)
- pages/ (Home, Products, ProductDetails, Cart, Checkout, Success)
- data/products.js
- context/CartContext.jsx
- App.jsx, main.jsx

## Out of Scope
Login, backend, database, real payment, admin panel