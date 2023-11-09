"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import createPagination from "@/utils/Pagination";
import { ClotheCard } from "@/components/Products/ClotheCard";
import "@/css/Products/ProductsPage.css";
import { Pagination } from "@/components/Products/Pagination";

export default function Page() {
  const [pagination, setPagination] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentlyPagination, setCurrentlyPagination] = useState(0);
  const [leftIsDisable, setLeftIsDisable] = useState(true);
  const [rightIsDisable, setRightIsDisable] = useState(false);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

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

  useEffect(() => {
    if (cart.length > 0 || total > 0) {
      console.log("Carrito de compras:", cart);
      console.log("Total del carrito:", total);
      console.log("Prendas seleccionadas:", cart.length);
    }
  }, [cart, total]);

  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.code === product.code && item.size === product.size
    );
    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.code === product.code && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
    setTotal((prevTotal) => prevTotal + parseFloat(product.price));
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