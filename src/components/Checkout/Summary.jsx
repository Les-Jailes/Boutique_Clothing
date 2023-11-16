"use client";

import React, { useState, useContext } from "react";
import "@/css/Checkout/Summary.css";
import CardProductCart from "@/components/ShoppingCart/CardProductCart";
import OrderSummary from "@/components/ShoppingCart/OrderSummary";
import { CartContext } from "@/components/Products/CartContext";
import CartCardSummary from "../navbar/Cart/CartCardSummary";

const Summary = () => {
  const { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

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
            return <CartCardSummary product={product} key={product.code} showDeleteOption={false}/>;
          })}
        </div>
        </div>
      </div>
  );
};

export default Summary;
