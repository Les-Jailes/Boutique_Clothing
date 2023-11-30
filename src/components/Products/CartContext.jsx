"use client"
import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import api from '@/app/api/api'
import { showErrorMessage } from '@/utils/alerts';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [maxQuantity, setMaxQuantity] = useState(10);

  const initialCartState = {
    products: [],
    total: 0,
    totalProducts: 0,
    taxes: 0,
    delivery: 0,
    currency: "$"
  };

  const getMaxQuantity = async (product) => {
    const foundProduct = await api.get('/Product/'+product._id);
    foundProduct.data.sizes.forEach( (s) => {
      if(s.size == product.size){
        if(s.quantity < 10) setMaxQuantity(s.quantity);
      }
    });
  }

  const [cart, setCart] = useState(initialCartState);

  const clearCart = () => {
    setCart(initialCartState);
    localStorage.setItem("cart", JSON.stringify(initialCartState));
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      setCart(cartData);
    }
    setIsCartLoaded(true);
  }, []);

  const addToCart = (newProduct) => {
    newProduct.available = true;
    getMaxQuantity(newProduct);

    setCart((prevCart) => {
      const existingProductIndex = prevCart.products.findIndex(
        (item) => item.code === newProduct.code && item.size === newProduct.size
      );

      let updatedProducts;
      let updatedTotal = prevCart.total;
      let updatedTotalProducts = prevCart.totalProducts;
  
      if (existingProductIndex >= 0) {
        updatedProducts = [...prevCart.products];
        if (updatedProducts[existingProductIndex].quantity === maxQuantity) {
          if (maxQuantity != 10) showErrorMessage("Out of stock", `Sorry, we only have ${maxQuantity} "${newProduct.name}" in stock`);
          else showErrorMessage("Maximum of 10 Items per Size");
        }
        else {
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity: updatedProducts[existingProductIndex].quantity + 1
        };
        updatedTotal += parseFloat(newProduct.price);
        }
      } else {
        const productWithId = { ...newProduct, quantity: 1, id: uuidv4() };
        updatedProducts = [...prevCart.products, productWithId];
        updatedTotal += parseFloat(newProduct.price);
        updatedTotalProducts += 1;
      }
  
      const updatedCart = {
        ...prevCart,
        products: updatedProducts.map(product => ({
          ...product,
          id: product.id || uuidv4()
        })),
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

      const updatedTotal = updatedProducts.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);
      const updatedTotalProducts = updatedProducts.length;

      const updatedCart = {
        ...prevCart,
        products: updatedProducts,
        total: updatedTotal,
        totalProducts: updatedTotalProducts
      };
      
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const changeQuantity = (newQuantity, productId) => {
    setCart((prevCart) => {
      const updatedProducts = prevCart.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      );

      const updatedTotal = updatedProducts.reduce(
        (acc, item) => acc + parseFloat(item.price) * item.quantity,
        0
      );

      const updatedTotalProducts = updatedProducts.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      const updatedCart = {
        ...prevCart,
        products: updatedProducts,
        total: parseFloat(updatedTotal.toFixed(2)),
        totalProducts: updatedTotalProducts,
      };

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const calculateTax = async (taxPercent) => {
    let percent = taxPercent / 100
    let totalTax = cart.total * percent
    const updateCart = {
      ...cart,
      taxes: totalTax
    }

    setCart(updateCart)
    localStorage.setItem('cart', JSON.stringify(updateCart))
  }
  return (
    <CartContext.Provider value={{ cart, isCartLoaded, addToCart, removeFromCart, changeQuantity, clearCart, calculateTax }}>
      {children}
    </CartContext.Provider>
  );
};
