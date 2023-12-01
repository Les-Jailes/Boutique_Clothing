"use client";

import React, { useState, useEffect } from "react";
import MultiSlider from "../Home/OurProducts/MultiSlider";
import axios from "axios";
import "@/css/ProductDetail/OtherRecomendations.css";
import Loader from "@/utils/Loader";

const OtherRecomendations = ({ category, productId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://boutique-clothing-api.onrender.com/Product")
      .then((response) => {
        const allProducts = response.data;

        const categoryProducts = allProducts.filter(
          (product) =>
            product.category === category && product._id !== productId
        );

        setProducts(categoryProducts);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [category, productId]);

  return (
    <div className="other-recomendations-carousel">
      <h2 className="subtitle-other-recomendations">OTHER RECOMMENDATIONS</h2>
      {
        products && products.length > 0 ? (
          <div className="other-recomendations-container">
            <MultiSlider products={products} />
          </div>
        ) : (
          <Loader isLoaderVisible={true} />
        )
      }
    </div>
  );
  
};

export default OtherRecomendations;
