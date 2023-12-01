"use client";

import React from "react";
import OrderDetailsHeader from "./OrderDetailsHeader";
import OrderDetailsTable from "./OrderDetails";
import styles from "@/css/OrderHistoryUser/OrderContainer.module.css";

const OrderContainer = ({ order, selectedOrderId, handleToggleTable }) => {
  return (
    <div className={styles.orderContainer}>
      <div
        onClick={() => handleToggleTable(order._id)}
      >
        <OrderDetailsHeader order={order} selectedOrderId={selectedOrderId} />
      </div>

      {selectedOrderId === order._id && (
        <div className={styles.table_container}>
          <OrderDetailsTable purchasedProducts={order.purchasedProducts} orderDetails={order} />
        </div>
      )}
    </div>
  );
};

export default OrderContainer;