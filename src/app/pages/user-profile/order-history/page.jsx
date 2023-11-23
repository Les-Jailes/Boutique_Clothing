"use client";

import React, { useState, useEffect } from "react";
import api from "@/app/api/api";
import styles from "@/css/OrderHistoryUser/OrderHistoryUserTable.module.css";
import { useSession } from "next-auth/react";
import Image from "next/image";
import "@/css/OrderHistoryLoader/OrderHistoryLoaderTable.css";
import GoToProductsDelails from "@/components/OrderHistory/GoToProductsDetails";

const OrderHistoryUser = () => {
  const session = useSession();
  const [userId, setUserId] = useState(null);
  const [checkoutUserId, setCheckoutUserId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserId = async () => {
      try {
        if (session.status === "authenticated") {
          const userResponse = await api.get(
            "/User/email/" + session.data.user.email
          );
          if (userResponse && userResponse.data && userResponse.data._id) {
            const checkoutUser = await api.get(
              "/OrderHistory/" + userResponse.data._id
            );
            setUserId(userResponse.data._id);
            setCheckoutUserId(checkoutUser.data);
          } else {
            console.log("No se encontraron datos de usuario.");
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUserId();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [session]);

  if (loading) {
    return (
      <div className="container-loader">
        <span className="loader"></span>
      </div>
    );
  }

  if (checkoutUserId.length === 0) {
    return (
      <span>
        <GoToProductsDelails />
      </span>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__your_products}>
        <h1 className={styles.title}> Your Products </h1>
      </div>
      <div className={styles.table_container}>
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
              <th className={styles.th}>Date</th>
            </tr>
          </thead>

          <tbody className={styles.tbody}>
            {checkoutUserId.map((order) =>
              order.purchasedProducts.map((product) => (
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
                  <td className={styles.td}>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistoryUser;