"use client";

import React, { useState, useEffect, useCallback } from "react";
import api from "@/app/api/api";
import "@/css/OrderHistoryUser/OrderHistoryUserTable.css";
import { useSession } from "next-auth/react";

const OrderHistoryUser = () => {
  const session = useSession();

  const getUser = useCallback(async () => {
    try {
      if (session && session.data && session.data.user) {
        const u = await api.get('/User/email/' + session.data.user.email);
        if(u.data !== null && u.data.__id !== undefined ){
          alert(u.data.__id);
          const c = await api.get("/CheckoutPayments/userId/" + u.data.__id);
          return c.data;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }, [session]);

  return (
    <div className="container">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name of Product</th>
              <th>Price</th>
              <th>Category</th>
              <th>Type</th>
              <th>Color</th>
              <th>Sizes</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <td className="size">
              <button onClick={getUser}>hello</button>
            </td>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistoryUser;