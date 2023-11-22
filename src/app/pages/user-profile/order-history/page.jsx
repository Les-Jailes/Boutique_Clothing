"use client";

import React, { useState, useEffect } from "react";
import api from "@/app/api/api";
import "@/css/OrderHistoryUser/OrderHistoryUserTable.css";
import { useSession } from "next-auth/react";
import Image from "next/image";

const OrderHistoryUser = () => {
  const session = useSession();
  const [userId, setUserId] = useState(null);
  const [checkoutUserId, setCheckoutUserId] = useState([]);

  useEffect(() => {
    const getUserId = async () => {
      try {
        if (session.status === "authenticated") {
          const user = await api.get('/User/email/' + session.data.user.email);
          setUserId(user.data._id);
          const checkoutUser = await api.get('/OrderHistory/' + user.data._id);
          setCheckoutUserId(checkoutUser.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUserId();
  }, [session]);

  return (
    <div className='container'>
      <div className='container__your-products'>
        <h1> Your Products </h1>
      </div>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name of Product</th>
              <th>Price</th>
              <th>Category</th>
              <th>Type</th>
              <th>Color</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {checkoutUserId.map((order) => (
              order.purchasedProducts.map((product) => (
                <tr key={product._id}>
                  <td className='image'>
                    {product.path.length > 0 && (
                      <Image src={product.path[0]} 
                      alt={`Product`} 
                      width ={50} 
                      height= {50} />
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td className='price'>${product.price}</td>
                  <td className='category'>{product.category}</td>
                  <td className='type'>{product.type}</td>
                  <td className='color'>{product.color?.join(', ')}</td>
                  <td className='size'>{product.size}</td>
                  <td>{product.quantity}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistoryUser;