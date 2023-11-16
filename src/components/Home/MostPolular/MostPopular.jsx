"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClotheCard } from "@/components/Products/ClotheCard";
import Carousel from "react-multi-carousel";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const MostPopular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://boutique-clothing-api.onrender.com/Product")
      .then((response) => {
        const firstTenProducts = response.data.slice(0, 4);
        setProducts(firstTenProducts);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  return (
    <div className="most-popular-carousel">
			{products.map((product, index) => (
        <ClotheCard clothe={product} key={index} />
      ))}
    </div>
  );
}

export default MostPopular;
