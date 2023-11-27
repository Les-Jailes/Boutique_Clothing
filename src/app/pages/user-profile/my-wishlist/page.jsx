"use client";
import React, { useState, useEffect } from "react";
import createPagination from "@/utils/Pagination";
import { ClotheCard } from "@/components/Products/ClotheCard";
import "@/css/Products/ProductsPage.css";
import { Pagination } from "@/components/Products/Pagination";
import styles from "@/app/pages/products/page.module.css";
import api from '@/app/api/api'
import { useSession } from "next-auth/react";

export default function Page(ids) {
  const [pagination, setPagination] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentlyPagination, setCurrentlyPagination] = useState(0);
  const [leftIsDisable, setLeftIsDisable] = useState(true);
  const [rightIsDisable, setRightIsDisable] = useState(true);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const session  = useSession();

  useEffect(() => {
    if (session.status === 'authenticated') {
      fillWishlistProducts();
    }
  }, [session.status, products]);

  const fillWishlistProducts = async () => {

    try {
  
      const user = await api.get('/User/email/' + session.data.user.email);
      
      const wishlistProducts = [];
      
      for(let productId of user.data.wishlist) {
      
        const response = await api.get(`/Product/${productId}`);
        
        wishlistProducts.push(response.data);
        
      }
      
      setProducts(wishlistProducts);
            
    } catch (error) {
      console.log(error);
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

  return (
    <div className={styles.container}>
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
