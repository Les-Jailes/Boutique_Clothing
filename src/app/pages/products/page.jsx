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


  // console.log(products)
  
  const handleFilterButtonClick = () => {
    console.log( checkedLabels);

    const filteredItems = []
    products.forEach((product) => {
      Object.keys(checkedLabels).forEach((key) => {
        switch (key) {
          case 'category':
              const categoryFilter = checkedLabels[key].includes(product.category.toString())
              console.log(categoryFilter ? 'i am filtering': 'nope')
              if(categoryFilter){
                filteredItems.push(product)
              }
              
          case 'type':
            
            break;
          case 'color':
            
            break;
          default:
            break;
        }
      })
      // console.log("helo")
      // console.log(product)
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
