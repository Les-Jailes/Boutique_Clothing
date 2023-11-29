"use client";

import React, { useState, useEffect } from "react";
import api from "@/app/api/api";
import styles from "@/css/OrderHistoryUser/OrderHistoryPage.module.css";
import { useSession } from "next-auth/react";
import GoToProductsDetails from "@/components/OrderHistory/GoToProductsDetails";
import OrderContainer from "@/components/OrderHistory/OrderContainer";
import "@/css/OrderHistoryLoader/OrderHistoryLoaderTable.css";
import { Pagination } from "@/components/Products/Pagination";
import createPagination from "@/utils/Pagination";

const OrderHistoryUser = () => {
  const [userId, setUserId] = useState(null);
  const [checkoutUserId, setCheckoutUserId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [pagination, setPagination] = useState([]);
  const [currentlyPagination, setCurrentlyPagination] = useState(0);
  const [leftIsDisable, setLeftIsDisable] = useState(true);
  const [rightIsDisable, setRightIsDisable] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!redirected && session.status === "unauthenticated") {
      window.location.href = '/';
      setRedirected(true);
    }
  }, [session, redirected]);

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
      }finally {
        setIsLoading(false);
      }
    };
    setCurrentlyPagination(0);
    getUserId();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [session]);

  useEffect(() => {
    setPagination(createPagination(checkoutUserId));
  }, [checkoutUserId]);

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
        <GoToProductsDetails />
      </span>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__your_products}>
        <h1 className={styles.title}> Order History </h1>
      </div>
      {pagination.length > 0 &&
            pagination[currentlyPagination].map((order) => (
        <OrderContainer
          key={order._id}
          order={order}
          selectedOrderId={selectedOrderId}
          handleToggleTable={handleToggleTable}
        />
      ))}
        <Pagination
          currentlyPagination={currentlyPagination}
          changePaginationRight={handlePaginationRight}
          changePaginationLeft={handlePaginationLeft}
          leftIsDisable={leftIsDisable}
          rightIsDisable={rightIsDisable}
        />
    </div>
  );
};

export default OrderHistoryUser;