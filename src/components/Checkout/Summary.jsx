"use client";

import React, { useState, useContext, useEffect } from "react";
import "@/css/Checkout/Summary.css";
import CardProductCart from "@/components/ShoppingCart/CardProductCart";
import OrderSummary from "@/components/ShoppingCart/OrderSummary";
import { CartContext } from "@/components/Products/CartContext";
import CartCardSummary from "../navbar/Cart/CartCardSummary";
import { showAlertMessage, showAlertMessageAutomatically } from "@/utils/alerts";
import api from '@/app/api/api'


const Summary = () => {
  const { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    verifyStock();
  });

  const verifyStock = async () => {
    const products = cart.products;
    let showMessage = false;
    products.forEach(p => {
      if(!inStock(p)) showMessage = true;
      console.log(showMessage);
    });
    if(showMessage) showAlertMessage("Out of stock", "Modifying to the available quantity");
  }

  const inStock = async (product) => {
    let flag = true;
      try {
        const productFound = await api.get('/Product/' + product._id);
        const sizes = productFound.data.sizes;
        const sizeFound = sizes.find((size) => size.size == product.size);
        if(product.quantity > sizeFound.quantity)   {
          product.quantity = sizeFound.quantity;
          showAlertMessageAutomatically("Out of stock", "Modifying to the available quantity")
          flag = false;
          return false;
        }
      } catch (error) {
        
      }
    return flag;
  }

  return (
    <div className="summary-container">
        <OrderSummary
          quantityProducts={cart.products.length}
          totalProducts={cart.total}
          taxes={cart.taxes}
          delivery={cart.delivery}
          total={cart.total + cart.taxes}
          currency={cart.currency}
          isOpen={ true }
        />
        <div className="cart-container">
        <div className="list-cart-container">
          {cart.products.map((product) => {
            console.log(product);
            return <CartCardSummary product={product} key={product.code} showDeleteOption={false}/>;
          })}
        </div>
        </div>
      </div>
  );
};

export default Summary;
