"use client";

import React, { useState, useEffect } from "react";
import CartCardSummary from "./CartCardSummary";
import "@/css/Cart/CartListSummary.css";

const CartListSummary = ({ isOpen }) => {
  const [productsAdd, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("productData")) || { products: [] };
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "productData") {
        const updatedProducts = JSON.parse(event.newValue) || { products: [] };
        setProducts(updatedProducts);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);  

  return (
    <div className={`list-cart-summary ${isOpen ? "is-open" : ""}`}>
      <div className="list-products">
      {productsAdd.products && productsAdd.products.map((product, index) => {
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
