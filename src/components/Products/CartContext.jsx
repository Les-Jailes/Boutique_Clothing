'use client'

import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    products: [],
    total: 0,
    totalProducts: 0,
    taxes: 0,
    delivery: 0,
    currency: "$"
  });

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      setCart(cartData);
    }
  }, []);

  const addToCart = (newProduct) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.products.findIndex(
        (item) => item.code === newProduct.code && item.size === newProduct.size
      );
  
      let updatedProducts;
      let updatedTotal = prevCart.total;
      let updatedTotalProducts = prevCart.totalProducts;
  
      if (existingProductIndex >= 0) {
        updatedProducts = [...prevCart.products];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity: updatedProducts[existingProductIndex].quantity + 1,
          individualTotal: parseFloat((updatedProducts[existingProductIndex].individualTotal + newProduct.price).toFixed(2))
        };
        updatedTotal += parseFloat(newProduct.price);
      } else {
        const newProductWithId = { ...newProduct, id: uuidv4(), quantity: 1, individualTotal: parseFloat(newProduct.price) };
        updatedProducts = [...prevCart.products, newProductWithId];
        updatedTotal += parseFloat(newProduct.price);
        updatedTotalProducts += 1;
      }
      updatedTotal = parseFloat(updatedTotal.toFixed(2));
  
      const updatedCart = {
        ...prevCart,
        products: updatedProducts,
        total: updatedTotal,
        totalProducts: updatedTotalProducts,
      };
  
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productToRemove) => {
    setCart((prevCart) => {
      const updatedProducts = prevCart.products.filter(
        (item) => item.code !== productToRemove.code || item.size !== productToRemove.size
      );

      const updatedTotal = updatedProducts.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const updatedTotalProducts = updatedProducts.length;
      const updatedIndividualTotal = updatedProducts.reduce((acc, item) => acc + item.individualTotal, 0);

      const updatedCart = {
        ...prevCart,
        products: updatedProducts,
        total: parseFloat((updatedIndividualTotal + prevCart.delivery + prevCart.taxes).toFixed(2)),
        totalProducts: updatedTotalProducts
      };
      
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};