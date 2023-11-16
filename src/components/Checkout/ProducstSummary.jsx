"use client";

import React, { useContext } from "react";

import { CartContext } from "@/components/Products/CartContext";
import CartCardSummary from "../navbar/Cart/CartCardSummary";


const ProductsSummary = () => {
  const { cart } = useContext(CartContext);

  return (
    <div >
      <div className="list-products">
        {cart.products &&
          cart.products.map((product, index) => {
            return <CartCardSummary product={product} key={index} showDeleteOption={false}/>;
          })}
      </div>
    </div>
  );
};

export default ProductsSummary;