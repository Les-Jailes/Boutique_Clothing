"use client";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import CartListSummary from "./CartListSummary";
import '@/css/Cart/CartButton.css'

const CartButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartButtonRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartButtonRef.current && !cartButtonRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button ref={cartButtonRef} className="cart-button" onClick={handleOpen}>
        <AiOutlineShoppingCart color="black" size={24} />
      </button>
      <div onClick={(e) => e.stopPropagation()}>
        <CartListSummary isOpen={isOpen} />
      </div>
    </>
  );
};

export default CartButton;
