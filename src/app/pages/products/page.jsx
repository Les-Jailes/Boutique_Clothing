"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import createPagination from "@/utils/Pagination";
import { ClotheCard } from "@/components/Products/ClotheCard";
import "@/css/Products/ProductsPage.css";
import { Pagination } from "@/components/Products/Pagination";
import Filter from "@/components/filter/Filter";
import styles from "./page.module.css";
import api from '@/app/api/api'
import { showToast } from "@/components/Alerts/CustomToast";

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

  const filterByCategory = (product, checkedLabels) => {
    const selectedCategories = checkedLabels.category;
    if (selectedCategories && selectedCategories.length > 0) {
      return selectedCategories.includes(product.category.toString());
    }
    return false;
  };

  const filterByType = (product, checkedLabels) => {
    const selectedTypes = checkedLabels.type;
    if (selectedTypes && selectedTypes.length > 0) {
      return selectedTypes.includes(product.type.toString());
    }
    return false;
  };

  const filterByColor = (product, checkedLabels) => {
    const selectedLabels = checkedLabels["color"];
    if (selectedLabels && selectedLabels.length > 0) {
      for (const item of product["color"]) {
        if (selectedLabels.includes(item)) {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  };

  const filterBySize = (product, checkedLabels) => {
    const selectedLabels = checkedLabels["size"];
    if (selectedLabels && selectedLabels.length > 0) {
      for (const item of product["sizes"]) {
        const productSize = item.size
        if (selectedLabels[0]=== (productSize.toLowerCase())) {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  };

  const filterByPrice = (product, checkedLabels) => {
    const selectedPrice = checkedLabels.price;
    if (selectedPrice) {
      const productPrice = product.price;
      const checkedPrice = selectedPrice[0];
      if (checkedPrice) {
        try {
          const [firstNumber, secondNumber] = checkedPrice
            .split(" - ")
            .map(Number);
          if (productPrice > firstNumber && productPrice < secondNumber) {
            return true;
          } else {
            return false;
          }
        } catch (error) {}
      }
    } else {
      return true;
    }
  };

  const handleFilterButtonClick = () => {
    const filteredItems = products.filter((product) => {
      let categoryFilter = true;
      let typeFilter = true;
      let sizeFilter = true;
      let colorFilter = true;
      let priceFilter = true;

      if (checkedLabels.category && checkedLabels.category.length > 0) {
        categoryFilter = filterByCategory(product, checkedLabels);
      }

      if (checkedLabels.type && checkedLabels.type.length > 0) {
        typeFilter = filterByType(product, checkedLabels);
      }

      if ((checkedLabels.size && checkedLabels.size.length > 0)) {
        sizeFilter = filterBySize(product, checkedLabels);
      }
      if ((checkedLabels.color && checkedLabels.color.length > 0)) {
        colorFilter = filterByColor(product, checkedLabels) 
      }

      if (checkedLabels.price && checkedLabels.price.length > 0) {
        priceFilter = filterByPrice(product, checkedLabels);
      }

      return categoryFilter && typeFilter && sizeFilter &&colorFilter && priceFilter;
    });

    setFilteredProducts(filteredItems);
    setCurrentlyPagination(0);
    setLeftIsDisable(true);
  };

  useEffect(() => {
    const showCartEmptyToast = localStorage.getItem("showCartEmptyToast");
    if (showCartEmptyToast === "true") {
      showToast(
        "You need to add products to the cart before proceeding to purchase.",
        "info"
      );
      localStorage.removeItem("showCartEmptyToast");
    }
  }, []);

  useEffect(() => {
    if (Object.keys(checkedLabels).length === 0) {
      setFilteredProducts(products);
    }
  }, [checkedLabels, products]);

  useEffect(() => {
    api
      .get("/Product")
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
          ...new Set(response.data.flatMap((product) => product.sizes)),
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
  }, [products, filteredProducts, isFiltered]);

  useEffect(() => {
    if (pagination.length > 1) {
      setRightIsDisable(false);
    } else {
      setRightIsDisable(true);
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
    setIsFiltered(false);
  };

  useEffect(() => {

    const filteredProducts = filterProductsWithValidSizes(products);
    setFilteredProducts(filteredProducts);
  }, [products]);

  const filterProductsWithValidSizes = (products) => {
    return products.filter((product) => {
      return product.sizes.some((size) => size.quantity > 0);
    });
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
          filterProductsWithValidSizes(pagination[currentlyPagination]).map((product) => (
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
