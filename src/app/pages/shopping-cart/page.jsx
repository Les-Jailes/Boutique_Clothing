"use client";

import React, { useState } from "react";
import "@/css/Cart/ShoppingCart.css";
import CardProductCart from "@/components/ShoppingCart/CardProductCart";
import { exampleProducts } from "@/utils/ExampleSummary";
import CheckOutButton from "@/components/ShoppingCart/CheckOutButton";
import OrderSummary from "@/components/ShoppingCart/OrderSummary";
import { orderSummary } from "@/utils/OrderSummary";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenning = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="shopping-cart-container">
      <div className="your-cart-container">
        <h2 className="your-cart-title">YOUR CART</h2>
        <div className="list-your-cart-container">
          {exampleProducts.map((product, index) => {
            return <CardProductCart product={product} key={ index } />;
          })}
        </div>
      </div>
      <div className={ `more-information-container ${ isOpen ? 'active' : '' }` }>
        <button
          className="open-more-information-button"
          onClick={() => handleOpenning()}
        >
          {
            isOpen ? <AiOutlineDown size={18} color="white" /> : <AiOutlineUp color="white" size={18} />
          }
        </button>
        <CheckOutButton isOpen={ isOpen } />
        <OrderSummary
          quantityProducts={orderSummary[0].products.length}
          totalProducts={orderSummary[0].totalProducts}
          taxes={orderSummary[0].tax}
          delivery={orderSummary[0].delivery}
          total={orderSummary[0].totalOrder}
          currency={orderSummary[0].currency}
          isOpen={ isOpen }
        />
      </div>
    </div>
  );
};

export default Cart;
