"use client";

import React from "react";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import styles from "@/css/OrderHistoryUser/OrderDetailsHeader.module.css";


const OrderDetailsHeader = ({ order, selectedOrderId }) => {

  const orderIdNumbersOnly = order._id.replace(/\D/g, '');

  return (
    <div className={styles.show_more_information}>
      <div className={styles.order_id}>
        <p className={styles.order_id__text}>Order ID:</p>
        <p className={styles.order_id__value}>{orderIdNumbersOnly}</p>
      </div>
      <div className={styles.date}>
        <p className={styles.date__text}>Date:</p>
        <p className={styles.date__value}>
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className={styles.total_amount}>
        <p className={styles.total_amount__text}>Total Amount:</p>
        <p className={styles.total_amount__value}>${order.amount.toFixed(2)}</p>
      </div>
      <div className={styles.total_products_purchased}>
        <p className={styles.total_products_purchased__text}>
          Total Products Purchased:
        </p>
        <p className={styles.total_products_purchased__value}>
          {order.purchasedProducts.length}
        </p>
      </div>

      <p className={styles.arrow}>
        {selectedOrderId === order._id ? <AiOutlineUp /> : <AiOutlineDown />}
      </p>
    </div>
  );
};

export default OrderDetailsHeader;