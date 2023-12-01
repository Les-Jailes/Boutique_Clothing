"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/css/OrderHistoryUser/OrderDetailsTable.module.css";
import { Pagination } from "@/components/Products/Pagination";
import createPagination from "@/utils/Pagination";

const OrderDetailsTable = ({ purchasedProducts, orderDetails }) => {
  const [pagination, setPagination] = useState([]);
  const [currentlyPagination, setCurrentlyPagination] = useState(0);
  const [leftIsDisable, setLeftIsDisable] = useState(true);
  const [rightIsDisable, setRightIsDisable] = useState(true);

  useEffect(() => {
    setPagination(createPagination(purchasedProducts));
  }, [purchasedProducts]);

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

  const totalCalculator = (products) => {
    let total = 0;
    products.forEach((product) => {
      const quantity = product.quantity
      const productPrice = product.price

      total += quantity * productPrice
    });
  
    return total;
  }

  const taxCalculator = () => {
    let totalPerProducts = totalCalculator(purchasedProducts);
    return orderDetails.amount - totalPerProducts;
  };

  return (
    <>
      <div className={styles.tfoot}>
        <div className={styles.total_quantity_per_products}>
          <p className={styles.total_quantity_per_products__text}>Total Quantity per Products:</p>
          <p className={styles.total_quantity_per_products__value}>
            {purchasedProducts.reduce(
              (sum, product) => sum + product.quantity,
              0
            )}
          </p>
        </div>
        <div className={styles.total_per_product}>
          <p className={styles.total_per_product__text}>Total per Products:</p>
          <p className={styles.total_per_product__value}>
            $
            {purchasedProducts
              .reduce(
                (sum, product) => sum + product.price * product.quantity,
                0
              )
              .toFixed(2)}
          </p>
        </div>
        <div>
          {
            `Taxes: ${taxCalculator().toFixed(2)} $`
          }
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Image</th>
            <th className={styles.th}>Name of Product</th>
            <th className={styles.th}>Price</th>
            <th className={styles.th}>Category</th>
            <th className={styles.th}>Type</th>
            <th className={styles.th}>Color</th>
            <th className={styles.th}>Size</th>
            <th className={styles.th}>Quantity</th>
            <th className={styles.th}>Sub Total</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {pagination.length > 0 &&
            pagination[currentlyPagination].map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td className={styles.image}>
                  {product.path.length > 0 && (
                    <Image
                      src={product.path[0]}
                      alt={`Product`}
                      width={50}
                      height={50}
                    />
                  )}
                </td>
                <td className={styles.td}>{product.name}</td>
                <td className={styles.td}>${product.price}</td>
                <td className={styles.td}>{product.category}</td>
                <td className={styles.td}>{product.type}</td>
                <td className={styles.td}>{product.color?.join(", ")}</td>
                <td className={styles.td}>{product.size}</td>
                <td className={styles.td}>{product.quantity}</td>
                <td className={styles.td}>
                  ${(product.price * product.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
          currentlyPagination={currentlyPagination}
          changePaginationRight={handlePaginationRight}
          changePaginationLeft={handlePaginationLeft}
          leftIsDisable={leftIsDisable}
          rightIsDisable={rightIsDisable}
        />
    </>
  );
};

export default OrderDetailsTable;