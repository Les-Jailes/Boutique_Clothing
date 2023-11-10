"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import createPagination from "@/utils/Pagination";
import { ClotheCard } from "@/components/Products/ClotheCard";
import "@/css/Products/ProductsPage.css";
import { Pagination } from "@/components/Products/Pagination";
import data from "@/utils/AddCartProducts.json";

const initialCartData = data;

const Page = () => {
  const [pagination, setPagination] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentlyPagination, setCurrentlyPagination] = useState(0);
  const [leftIsDisable, setLeftIsDisable] = useState(true);
  const [rightIsDisable, setRightIsDisable] = useState(false);
  const [cart, setCart] = useState(initialCartData.products);
  const [total, setTotal] = useState(initialCartData.total);

  const updateLocalStorage = (updatedCart) => {
    const updatedData = {
      ...initialCartData,
      products: updatedCart,
      totalProducts: updatedCart.length,
      total: updatedCart.reduce((acc, product) => acc + parseFloat(product.price), 0),
    };
    localStorage.setItem('cartData', JSON.stringify(updatedData));
    console.log('Updated Cart Data:', updatedData);
  };

  useEffect(() => {
    const data = localStorage.getItem('cartData');
    if (data) {
      const parsedData = JSON.parse(data);
      setCart(parsedData.products);
      setTotal(parsedData.total);
      console.log('Retrieved Cart Data:', parsedData);
    }
  }, []);

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
    updateLocalStorage(cart, total);
  }, [cart, total]);

  useEffect(() => {
    if (cart.length > 0 || total > 0) {
      console.log("Shopping cart:", cart);
      console.log("Cart total:", total);
      console.log("Selected items:", cart.length);
    }
  }, [cart, total]);

  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.code === product.code && item.size === product.size
    );
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.code === product.code && item.size === product.size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      setTotal((prevTotal) => prevTotal + parseFloat(product.price));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      setTotal((prevTotal) => prevTotal + parseFloat(product.price));
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
};

export default Page;