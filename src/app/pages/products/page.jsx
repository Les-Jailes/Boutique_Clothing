"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import createPagination from "@/utils/Pagination";
import { ClotheCard } from "@/components/Products/ClotheCard";
import "@/css/Products/ProductsPage.css";
import { Pagination } from "@/components/Products/Pagination";
import data from "@/utils/AddCartProducts.json"

export default function Page() {
  const initialProductData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("productData")) || data
      : data;

  const [productData, setProductData] = useState(initialProductData);
  const [pagination, setPagination] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentlyPagination, setCurrentlyPagination] = useState(0);
  const [leftIsDisable, setLeftIsDisable] = useState(true);
  const [rightIsDisable, setRightIsDisable] = useState(false);

  useEffect(() => {
    axios
      .get("https://boutique-clothing-api.onrender.com/Product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  useEffect(() => {
    setPagination(createPagination(products));
  }, [products]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("productData", JSON.stringify(productData));
    }
  }, [productData]);

  const handlePaginationRight = () => {
    let paginationNumber = currentlyPagination + 1;
    if (paginationNumber < pagination.length) {
      setCurrentlyPagination(paginationNumber);
      setLeftIsDisable(false);
    }
    if (paginationNumber === pagination.length - 1) {
      setRightIsDisable(true);
    }
  };

  const addToCart = (product) => {
    const existingProduct = productData.products.find(
      (item) => item.code === product.code && item.size === product.size
    );

    if (existingProduct) {
      setProductData((prevData) => ({
        ...prevData,
        products: prevData.products.map((item) =>
          item.code === product.code && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        total: prevData.total + parseFloat(product.price),
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        products: [...prevData.products, { ...product, quantity: 1 }],
        total: prevData.total + parseFloat(product.price),
        totalProducts: prevData.totalProducts + 1,
      }));
    }
  };

  const handlePaginationLeft = () => {
    let paginationNumber = currentlyPagination - 1;
    if (paginationNumber >= 0) {
      setCurrentlyPagination(paginationNumber);
      setRightIsDisable(false);
    }
    if (paginationNumber === 0) {
      setLeftIsDisable(true);
    }
  };

  return (
    <div className="products-page">
      <div className="product-container">
        {pagination[currentlyPagination]?.map((product, index) => (
          <ClotheCard key={index} clothe={product} addToCart={addToCart} />
        ))}
      </div>
      <Pagination
        currentlyPagination={currentlyPagination}
        changePaginationRight={handlePaginationRight}
        changePaginationLeft={handlePaginationLeft}
        leftIsDisable={leftIsDisable}
        rightIsDisable={rightIsDisable}
      />
    </div>
  );
}