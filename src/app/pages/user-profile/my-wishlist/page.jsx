"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import createPagination from "@/utils/Pagination";
import { ClotheCard } from "@/components/Products/ClotheCard";
import "@/css/Products/ProductsPage.css";
import { Pagination } from "@/components/Products/Pagination";
import Filter from "@/components/filter/Filter";
import styles from "@/app/pages/products/page.module.css";
import api from '@/app/api/api'
import { useSession } from "next-auth/react";
import NoProductsFound from "./NoProductsFound";


export default function Page(ids) {
  const [pagination, setPagination] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentlyPagination, setCurrentlyPagination] = useState(0);
  const [leftIsDisable, setLeftIsDisable] = useState(true);
  const [rightIsDisable, setRightIsDisable] = useState(true);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [empty, setEmpty] = useState(false);

  const session  = useSession();

  useEffect(() => {
    if (session.status === 'authenticated') {
      fillWishlistProducts();
    }
  }, [session.status, products]);

  const fillWishlistProducts = async () => {

    const wishlistProducts = [];

    try {
  
      const user = await api.get('/User/email/' + session.data.user.email);
      
      for(let productId of user.data.wishlist) {
      
        const response = await api.get(`/Product/${productId}`);
        
        wishlistProducts.push(response.data);
        
      }
      
      setProducts(wishlistProducts);
            
    } catch (error) {
      console.log(error);
    }

    if(wishlistProducts.length === 0){
      setEmpty(true);
    }
  
  }

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

  const filterProductsWithValidSizes = (products) => {
    return products.filter((product) => {
      return product.sizes.some((size) => size.quantity > 0);
    });
  };

  return empty ? (
    <NoProductsFound />
  ) : (
    <div className={styles.container}>
      <div className="products-page">
        <h2 className="your-cart-title">YOUR WISHLIST</h2>
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
