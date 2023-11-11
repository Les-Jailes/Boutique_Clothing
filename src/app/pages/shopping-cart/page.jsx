"use client";

import React, { useState, useContext } from "react";
import "@/css/Cart/ShoppingCart.css";
import CardProductCart from "@/components/ShoppingCart/CardProductCart";
import CheckOutButton from "@/components/ShoppingCart/CheckOutButton";
import OrderSummary from "@/components/ShoppingCart/OrderSummary";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { CartContext } from "@/components/Products/CartContext";

const Cart = () => {
  const { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenning = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="shopping-cart-container">
      <div className="your-cart-container">
        <h2 className="your-cart-title">YOUR CART</h2>
        <div className="list-your-cart-container">
          {cart.products.map((product, index) => {
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
          quantityProducts={cart.products.length}
          totalProducts={cart.total}
          taxes={cart.taxes}
          delivery={cart.delivery}
          total={cart.total + cart.taxes}
          currency={cart.currency}
          isOpen={ isOpen }
        />
      </div>
    </div>
  );
};

export default Cart;
