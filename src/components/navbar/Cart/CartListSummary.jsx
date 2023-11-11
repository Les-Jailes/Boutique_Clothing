import React from "react";
import CartCardSummary from "./CartCardSummary";
import { exampleProducts } from "@/utils/ExampleSummary.js";
import '@/css/Cart/CartListSummary.css'

const CartListSummary = ({ isOpen }) => {

  const handleClickInside = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`list-cart-summary ${isOpen ? "is-open" : ""}`} onClick={handleClickInside}>
      <div className="list-products">
        {exampleProducts.map((product, index) => {
          return <CartCardSummary product={product} key={index} />;
        })}
      </div>
      <a href="/pages/shopping-cart" className="go-cart-page">
        View all products
      </a>
    </div>
  );
};

export default CartListSummary;
