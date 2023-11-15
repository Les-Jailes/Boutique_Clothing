"use client";

import React, { useState, useContext } from "react";
import "@/css/Cart/ShoppingCart.css";
import CardProductCart from "@/components/ShoppingCart/CardProductCart";
import CheckOutButton from "@/components/ShoppingCart/CheckOutButton";
import OrderSummary from "@/components/ShoppingCart/OrderSummary";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { CartContext } from "@/components/Products/CartContext";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import CartListSummary from "@/components/navbar/Cart/CartListSummary";
import ProductsSummary from "@/components/Checkout/ProducstSummary";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenning = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="shopping-cart-container">
      <div className="your-cart-container">
        <div className="list-your-cart-container">
          <CheckoutForm/>
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
        <OrderSummary
          quantityProducts={cart.products.length}
          totalProducts={cart.total}
          taxes={cart.taxes}
          delivery={cart.delivery}
          total={cart.total + cart.taxes}
          currency={cart.currency}
          isOpen={ isOpen }
        />
        <ProductsSummary/>
      </div>
    </div>
  );
};

export default Checkout;
