"use client"

import React, { useState, useEffect } from 'react';
import API from '@/app/api/api';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TbEditCircle } from "react-icons/tb";
import "@/css/OrderHistoryUser/OrderHistoryUserTable.css";

const GetProductForm = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/CheckoutPayments");
        console.log("Response:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='container'>
      <div className='table-container'>
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
            {products.map((product) => (
              <tr key={product._id.$oid}>
                <td className='code'>{product.code}</td>
                <td>{product.name}</td>
                <td className='price'>${product.price}</td>
                <td className='category'>{product.category}</td>
                <td className='type'>{product.type}</td>
                <td className='color'>{product.color?.join(', ')}</td>
                <td className='size'>
                  {product.sizes.map((size, index) => (
                    <div key={index}>
                      {`${size.size}: ${size.quantity}`}
                    </div>
                  ))}
                </td>

                <td className='image'>
                  {product.path.length > 0 && (
                    <img src={product.path[0]} alt={`Product 1`} style={{ width: '50px', height: '50px' }} />
                  )}
                </td>

                <td>
                  <IoMdCloseCircleOutline className='delete-button' />
                  <TbEditCircle className='edit-button' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetProductForm;