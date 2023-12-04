"use client";

import React, { useState, useEffect } from "react";
import MultiSlider from "../Home/OurProducts/MultiSlider";
import "@/css/ProductDetail/OtherRecomendations.css";
import Loader from "@/utils/Loader";
import api from "@/app/api/api";

const OtherRecomendations = ({ category, productId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/Product")
      .then((response) => {
        const allProducts = response.data;
        const categoryProducts = allProducts.filter(
          (product) =>
            product.category === category && product._id !== productId
        );
        setProducts(categoryProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products: ", error);
        setLoading(false);
      });
  }, [category, productId]);

  return (
    <div className="other-recomendations-carousel">
      <h2 className="subtitle-other-recomendations">OTHER RECOMMENDATIONS</h2>
      {loading ? (
        <Loader isLoaderVisible={true} />
      ) : products.length > 0 ? (
        <div className="other-recomendations-container">
          <MultiSlider products={products} />
        </div>
      ) : (
        ""
      )}
      {!loading && products.length === 0 && (
        <a href="/pages/products" className="more-products" disabled>
          MORE PRODUCTS
        </a>
      )}
    </div>
  );
};

export default OtherRecomendations;
