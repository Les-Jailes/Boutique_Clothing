"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import createPagination from "@/utils/Pagination";
import { ClotheCard } from "@/components/Products/ClotheCard";
import "@/css/Products/ProductsPage.css";
import { Pagination } from "@/components/Products/Pagination";
import Filter from "@/components/filter/Filter";
import styles from "./page.module.css";

export default function Page() {
  const [pagination, setPagination] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentlyPagination, setCurrentlyPagination] = useState(0);
  const [leftIsDisable, setLeftIsDisable] = useState(true);
  const [rightIsDisable, setRightIsDisable] = useState(true);

  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [checkedLabels, setCheckedLabels] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const filterByCategory = (product, checkedLabels, filteredItems) => {
    const categoryFilter = checkedLabels.category.includes(
      product.category.toString()
    );
    if (categoryFilter) {
      filteredItems.push(product);
    }
  };

  const filterByType = (product, checkedLabels, filteredItems) => {
    const typeFilter = checkedLabels.type.includes(product.type.toString());
    if (typeFilter) {
      filteredItems.push(product);
    }
  };

  const filterByColorOrSize = (product, checkedLabels, key, filteredItems) => {
    let foundMatching = false;
    for (const item of product[key]) {
      if (checkedLabels[key].includes(item)) {
        filteredItems.push(product);
        foundMatching = true;
        break;
      }
    }
    return foundMatching;
  };

  const filterByPrice = (product, checkedLabels, filteredItems) => {
    const productPrice = product.price;
    const checkedPrice = checkedLabels.price[0];
    try {
      const [firstNumber, secondNumber] = checkedPrice.split(" - ").map(Number); 
      if (productPrice > firstNumber && productPrice < secondNumber) {
        filteredItems.push(product);
      }
    } catch (error) {

    }
  };

  const handleFilterButtonClick = () => {
    const filteredItems = [];

    products.forEach((product) => {
      Object.keys(checkedLabels).forEach((key) => {
        switch (key) {
          case "category":
            filterByCategory(product, checkedLabels, filteredItems);
            break;
          case "type":
            filterByType(product, checkedLabels, filteredItems);
            break;
          case "color":
          case "size":
            filterByColorOrSize(product, checkedLabels, key, filteredItems);
            break;
          case "price":
            filterByPrice(product, checkedLabels, filteredItems);
            break;
          default:
            break;
        }
      });
    });
    if (filteredItems.length >= 1){
      setFilteredProducts(filteredItems);
    }else{
      setFilteredProducts(products)
    }
    
    setCurrentlyPagination(0)
    setLeftIsDisable(true)
  };

  useEffect(() => {
    if (Object.keys(checkedLabels).length === 0) {
      setFilteredProducts(products);
    }
  }, [checkedLabels, products]);

  useEffect(() => {
    axios
      .get("https://boutique-clothing-api.onrender.com/Product")
      .then((response) => {
        setProducts(response.data);
        const uniqueCategories = [
          ...new Set(response.data.map((product) => product.category)),
        ];
        const uniqueTypes = [
          ...new Set(response.data.map((product) => product.type)),
        ];
        const uniqueColors = [
          ...new Set(response.data.flatMap((product) => product.color)),
        ];
        const uniqueSizes = [
          ...new Set(response.data.flatMap((product) => product.size)),
        ];

        setCategories(uniqueCategories);
        setTypes(uniqueTypes);
        setColors(uniqueColors);
        setSizes(uniqueSizes);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  useEffect(() => {
    setPagination(createPagination(isFiltered ? filteredProducts : products));
  }, [products, filteredProducts]);

  useEffect(() => {
    if (pagination.length > 1) {
      setRightIsDisable(false);
    } else {
      setRightIsDisable(true)
    }
  }, [pagination]);

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

  const handleRefreshClick = () => {
    window.location.reload();
    setIsFiltered(false)
  };

  return (
    <div className={styles.container}>
      <Filter
        categories={categories}
        types={types}
        colors={colors}
        sizes={sizes}
        onFilterChange={(title, selectedOptions) => {
          setCheckedLabels((prevLabels) => ({
            ...prevLabels,
            [title]: selectedOptions.filter((option) =>
              selectedOptions.includes(option)
            ),
          }));
          setIsFiltered(true);
        }}
        onFilterButtonClick={handleFilterButtonClick}
        handleRefreshClick={handleRefreshClick}
      />
      <div className="products-page">
        <div className="product-container">
          {pagination.length > 0 &&
            pagination[currentlyPagination] &&
            pagination[currentlyPagination].map((product) => (
              <ClotheCard key={product.code} clothe={product} />
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
    </div>
  );
}
