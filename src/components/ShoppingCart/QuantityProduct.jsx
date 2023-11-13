"use client";

import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import "@/css/Cart/QuantityProducts.css";
import PropTypes from 'prop-types'

const QuantityProduct = ({ limit, quantity }) => {
  
  const [quantityProduct, setQuantityProduct] = useState(quantity);

  const addProduct = () => {
    let quantity = quantityProduct + 1;

    if (quantity <= limit) {
      setQuantityProduct(quantity);
    } else {
      setQuantityProduct(limit);
    }
  };

  const minusProduct = () => {
    let quantity = quantityProduct - 1;

    if (quantity >= 1) {
      setQuantityProduct(quantity);
    } else {
      setQuantityProduct(1);
    }
  };

  return (
    <div className="quantity-container">
      <button className="quantity-button" onClick={() => minusProduct()}>
        <AiOutlineMinus size={18} color="white" />
      </button>
      <input
        type="text"
        name="quantity-product"
        id="quantity-product"
        className="quantity-product"
        value={quantityProduct}
        onChange={(e) => setQuantityProduct(e.target.value)}
      />
      <button className="quantity-button" onClick={() => addProduct()}>
        <AiOutlinePlus size={18} color="white" />
      </button>
    </div>
  );
};

QuantityProduct.propTypes = {
  limit: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired
}

export default QuantityProduct;
