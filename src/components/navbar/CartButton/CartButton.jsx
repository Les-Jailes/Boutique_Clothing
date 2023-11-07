"use client";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import CartListSummary from "./CartListSummary";
import CartCardSummary from "./CartCardSummary";

const CartButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const product = {
    name: "Elegant Men's Clothing",
    price: 130,
    image: "https://i.postimg.cc/J4cNBw1s/129-1.png",
    category: "men",
  };

  return (
    <>
      <button className="cart-button">
        <AiOutlineShoppingCart color="black" />
      </button>
      <CartListSummary isOpen={isOpen} />
      <CartCardSummary
        name={product.name}
        category={product.category}
        image={product.image}
        price={product.price}
      />
    </>
  );
};

export default CartButton;
