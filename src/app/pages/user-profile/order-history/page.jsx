"use client";

import React, { useState, useEffect } from "react";
import api from "@/app/api/api";
import styles from "@/css/OrderHistoryUser/OrderHistoryUserTable.module.css";
import { useSession } from "next-auth/react";
import Image from "next/image";
import "@/css/OrderHistoryLoader/OrderHistoryLoaderTable.css";
import { AiOutlineUp } from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";
import GoToProductsDelails from "@/components/OrderHistory/GoToProductsDetails";

const OrderHistoryUser = () => {
  const session = useSession();
  const [userId, setUserId] = useState(null);
  const [checkoutUserId, setCheckoutUserId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleToggleTable = (orderId) => {
    setSelectedOrderId(orderId === selectedOrderId ? null : orderId);
  };

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
        <h1 className={styles.title}> Order History </h1>
      </div>

      {checkoutUserId.map((order) => (
        <div key={order._id} className={styles.orderContainer}>
          <div
            onClick={() => handleToggleTable(order._id)}
            className={styles.show_more_information}
          >
            <div className={styles.order_id}>
              <p className={styles.order_id__text}>Order ID:</p>
              <p className={styles.order_id__value}>{order._id}</p>
            </div>
            <div className={styles.date}>
              <p className={styles.date__text}>Date:</p>
              <p className={styles.date__value}>{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className={styles.total_amount}>
              <p className={styles.total_amount__text}>Total Amount:</p>
              <p className={styles.total_amount__value}>${order.amount.toFixed(2)}</p>
            </div>
            <div className={styles.total_products_purchased}>
            <p className={styles.total_products_purchased__text}>Total Products Purchased:</p>
            <p className={styles.total_products_purchased__value}>{order.purchasedProducts.length}</p>
            </div>
            
            <p className={styles.arrow}>{selectedOrderId === order._id ? <AiOutlineUp /> : <AiOutlineDown />}</p>
          </div>

          {selectedOrderId === order._id && (
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
                  </tr>
                </thead>

                <tbody className={styles.tbody}>
                  {order.purchasedProducts.map((product) => (
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
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <td>Total Quantity per Products:</td>
                    <td>
                      {order.purchasedProducts.reduce(
                        (sum, product) => sum + product.quantity,
                        0
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Total per product:</td>
                    <td>
                      $
                      {order.purchasedProducts
                        .reduce(
                          (sum, product) =>
                            sum + product.price * product.quantity,
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryUser;