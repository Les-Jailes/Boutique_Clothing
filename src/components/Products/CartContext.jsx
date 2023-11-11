"use client"
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    products: [],
    total: 0,
    totalProducts: 0,
  });

  // Cargamo los datos del carrito desde localStorage
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
        updatedProducts[existingProductIndex].quantity += 1;
        updatedTotal += parseFloat(newProduct.price);
      } else {
        updatedProducts = [...prevCart.products, { ...newProduct, quantity: 1 }];
        updatedTotal += parseFloat(newProduct.price);
        updatedTotalProducts += 1;
      }

      const updatedCart = {
        ...prevCart,
        products: updatedProducts,
        total: updatedTotal,
        totalProducts: updatedTotalProducts
      };

      // Guardamos los datos en localStorage solo si presionamos el boton de agregar al carrito
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

      const updatedCart = {
        ...prevCart,
        products: updatedProducts,
        total: updatedTotal,
        totalProducts: updatedTotalProducts
      };

      // Aqui igual guardamos los datos en localStorage solo si presionamos el boton de eliminar del carrito
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
