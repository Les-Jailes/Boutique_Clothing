"use client";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import CartListSummary from "./CartListSummary";
import '@/css/Cart/CartButton.css'

const CartButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button className="cart-button" onClick={ () => handleOpen() }>
        <AiOutlineShoppingCart color="black" size={24} />
      </button>
      <CartListSummary isOpen={isOpen} />
    </>
  );
};

export default CartButton;
