'use client'
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
  const [rightIsDisable, setRightIsDisable] = useState(false);

  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [checkedLabels, setCheckedLabels] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);

  
  const handleFilterButtonClick = () => {
    console.log( checkedLabels);

    const filteredItems = []
    products.forEach((product) => {
      console.log(product)
      Object.keys(checkedLabels).forEach((key) => {
        switch (key) {
          case 'category':
              const categoryFilter = checkedLabels[key].includes(product.category.toString())
              if(categoryFilter){
                filteredItems.push(product)
              }
          case 'type':
            const typeFilter = checkedLabels[key].includes(product.type.toString())
              if(typeFilter){
                filteredItems.push(product)
              }
            break;
          case 'color':
            let foundMatchingColor = false;
            for (const color of product.color) {
              if (checkedLabels[key].includes(color)) {
                filteredItems.push(product);
                foundMatchingColor = true;
                break;
              }
            }
            break;
          case 'size':
            let foundMatchingSize = false;
            for (const size of product.size) {
              if (checkedLabels[key].includes(size)) {
                filteredItems.push(product);
                foundMatchingSize = true;
                break;
              }
            }
          break;
          case 'price':
            const productPrice = product.price;
            const checkedPrice =checkedLabels[key][0];
            const [firstNumber, secondNumber] = checkedPrice.split(" - ").map(Number);
            if (productPrice > firstNumber && productPrice< secondNumber){
              filteredItems.push(product);
            }

          break;
          default:
            break;
        }
      })
    });
    console.log(filteredItems)
    setFilteredProducts(filteredItems)

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
        const uniqueCategories = [...new Set(response.data.map((product) => product.category))];
        const uniqueTypes = [...new Set(response.data.map((product) => product.type))];
        const uniqueColors = [...new Set(response.data.flatMap((product) => product.color))];
        const uniqueSizes = [...new Set(response.data.flatMap((product) => product.size))];

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
    setPagination(createPagination(filteredProducts.length > 0 ? filteredProducts : products));
  }, [products, filteredProducts]);

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
            [title]: selectedOptions.filter((option) => selectedOptions.includes(option)),
          }));
        }}
        onFilterButtonClick={handleFilterButtonClick}
      />
      <div className="products-page">
      <div className="product-container">
          {filteredProducts.map((product, index) => (
            <ClotheCard key={index} clothe={product} />
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
