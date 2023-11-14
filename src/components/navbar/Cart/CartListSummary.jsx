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
      {cart.products && cart.products.length > 0 ? (
        <>
          <div className="list-products">
            {cart.products.map((product, index) => (
              <CartCardSummary product={product} key={index} />
            ))}
          </div>
          <a href="/pages/shopping-cart" className="go-cart-page">
            View all products
          </a>
        </>
      ) : (
        <div className="empty-cart-message">
          There are no products added to the cart.
        </div>
      )}
    </div>
  );
};

export default CartListSummary;