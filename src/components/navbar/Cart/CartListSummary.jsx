"use client";

import React, { useContext } from "react";
import CartCardSummary from "./CartCardSummary";
import "@/css/Cart/CartListSummary.css";
import { CartContext } from "@/components/Products/CartContext";

const CartListSummary = ({ isOpen }) => {
  const { cart } = useContext(CartContext);

  const handleClickInside = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`list-cart-summary ${isOpen ? "is-open" : ""}`} onClick={handleClickInside}>
      <div className="list-products">
        {cart.products &&
          cart.products.map((product, index) => {
            return <CartCardSummary product={product} key={index} showDeleteOption={true}/>;
          })}
      </div>
      <a href="/pages/shopping-cart" className="go-cart-page">
        View all products
      </a>
    </div>
  );
};

export default CartListSummary;