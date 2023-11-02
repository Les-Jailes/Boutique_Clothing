"use client";

import { ClotheCard } from "@/components/Products/ClotheCard";
import "@/css/Products/ProductsPage.css";
import { useState, useEffect } from "react";
import { AiFillFilter } from "react-icons/ai";
import axios from "axios";

export default function page({ isActive }) {
  const [isOpen, setIsOpen] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/product')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  const handleOpenFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="products-page">
      <button
        className={` button-filter-container ${isOpen ? "is-open" : ""} `}
        onClick={() => handleOpenFilter()}
      >
        <AiFillFilter color="white" />
      </button>
      <div className={` filter-container ${isOpen ? "is-open" : ""} `}></div>
      <div className="product-container">
        {products.map((product, index) => (
          <ClotheCard key={index} clothe={product} />
        ))}
      </div>
    </div>
  );
}
