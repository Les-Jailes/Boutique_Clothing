"use client";
import React, { useState, useEffect } from "react";
import createPagination from "@/utils/Pagination";
import { ClotheCard } from "@/components/Products/ClotheCard";
import "@/css/Products/ProductsPage.css";
import { Pagination } from "@/components/Products/Pagination";
import styles from "@/app/pages/products/page.module.css";
import api from '@/app/api/api'
import { useSession } from "next-auth/react";
import NoProductsFound from "./NoProductsFound";
import Loader from '@/utils/Loader'


export default function Page() {
  const [pagination, setPagination] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentlyPagination, setCurrentlyPagination] = useState(0);
  const [leftIsDisable, setLeftIsDisable] = useState(true);
  const [rightIsDisable, setRightIsDisable] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const session  = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      localStorage.setItem("showLogInRequiredForWishlist", "true");
      window.location.href = "/pages/account/login";
    }
  }, [session]);


  useEffect(() => {
    if (session.status === 'authenticated') {
      fillWishlistProducts();
      setPagination(createPagination(products));
    }
  }, [session.status, isLoading, products]);

  useEffect(() => {
    if (session.status === 'authenticated') {
      setPagination(createPagination(products));
      validatePagination();
    }
  }, [currentlyPagination, products]);

  const validatePagination = () => {
    if( pagination.length >= 1 && pagination.length === currentlyPagination){
      if(currentlyPagination - 1 === 0)setLeftIsDisable(true);
      setCurrentlyPagination(currentlyPagination - 1);
      
    } 
  }

  function getUniqueProducts(products) {
    const unique = [];
    products.forEach(product => {
      if (!unique.find(u => u._id === product._id)) {
        unique.push(product); 
      }
    });  
    return unique;
  }

  const fillWishlistProducts = async () => {

    let wishlistProducts = [];

    try {
      const user = await api.get('/User/email/' + session.data.user.email);

      wishlistProducts = user.data.wishlist;
      
      const uniqueProducts = getUniqueProducts(wishlistProducts);
      setProducts(uniqueProducts);

    } catch (error) {
      console.error(error);
    }

    if(wishlistProducts.length === 0) setEmpty(true);
    else setIsLoading(false);

  }

  useEffect(() => {
    if(currentlyPagination === 0) {
      if (pagination.length > 1) {
        setRightIsDisable(false);
      } else {
        setRightIsDisable(true);
      }
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
      {isLoading && <Loader isLoaderVisible={isLoading}/>}
      <div className="products-page">
        {!isLoading && <h2 className="your-wishlist-title">YOUR WISHLIST</h2>}
      <div className="product-container">
        {pagination.length > 0 &&
          pagination[currentlyPagination] &&
          filterProductsWithValidSizes(pagination[currentlyPagination]).map((product) => (
            <ClotheCard key={product._id} clothe={product} />
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
