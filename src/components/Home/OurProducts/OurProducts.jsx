"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import MultiSlider from "@/components/Home/OurProducts/MultiSlider";
import Loader from "@/utils/Loader";

const OurProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://boutique-clothing-api.onrender.com/Product")
      .then((response) => {
        const allProducts = response.data;
        const randomIndexes = [];
        while (randomIndexes.length < 12) {
          const randomIndex = Math.floor(Math.random() * allProducts.length);
          if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
          }
        }
        const randomProducts = randomIndexes.map((index) => allProducts[index]);

        setProducts(randomProducts);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  return (
    <div className="our-products-carousel">
      {
        products && products.length > 0 ? (
          <MultiSlider products={products} />
        ) : (
          <Loader isLoaderVisible={true} />
        )
      }
    </div>
  );
};

export default OurProducts;
