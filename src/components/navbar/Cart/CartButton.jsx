"use client";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState, useEffect, useRef, useContext } from "react";
import CartListSummary from "./CartListSummary";
import "@/css/Cart/CartButton.css";
import { CartContext } from "@/components/Products/CartContext";

const CartButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartButtonRef = useRef(null);
  const { cart, updateCart } = useContext(CartContext);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRemoveProduct = (productId) => {
    updateCart((prevCart) => {
      const updatedProducts = prevCart.products.filter(
        (product) => product.id !== productId
      );
      return { ...prevCart, products: updatedProducts };
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target) &&
        isOpen
      ) {
        const cartListSummary = document.querySelector(".list-cart-summary");
        if (cartListSummary && cartListSummary.contains(event.target)) {
          return;
        }
        if (cart.products.length === 0) {
          handleClose();
        }
        if (cart.products.length > 0) {
          handleClose();
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, cart.products.length]);

  return (
    <>
      <button ref={cartButtonRef} className="cart-button" onClick={handleOpen}>
        <AiOutlineShoppingCart color="black" size={24} />
      </button>
      <div onClick={(e) => e.stopPropagation()}>
        <CartListSummary isOpen={isOpen} onRemoveProduct={handleRemoveProduct} />
      </div>
    </>
  );
};

export default CartButton;