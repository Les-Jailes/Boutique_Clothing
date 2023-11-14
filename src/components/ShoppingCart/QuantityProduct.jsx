"use client";

import React, { useContext, useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import "@/css/Cart/QuantityProducts.css";
import PropTypes from "prop-types";
import { CartContext } from "../Products/CartContext";

const QuantityProduct = ({ limit, quantity, idProduct }) => {
  const { changeQuantity } = useContext(CartContext);
  const [quantityProduct, setQuantityProduct] = useState(quantity);

  useEffect(() => {
    setQuantityProduct(quantity);
  }, [quantity]);

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/\D/g, '');
    if (inputValue.length > 0) {
      const parsedValue = parseInt(inputValue, 10);
      const validValue = Math.min(Math.max(1, parsedValue), limit);
      setQuantityProduct(validValue);
      changeQuantity(validValue, idProduct);
    } else {
      setQuantityProduct("")
      changeQuantity(1, idProduct)
    }
  };

  const handleInputBlur = () => {
    if (quantityProduct === 0 || quantityProduct === '') {
      setQuantityProduct(1);
      changeQuantity(1, idProduct);
    }
  };

  const addProduct = () => {
    let auxiliarQuantity = quantityProduct + 1;

    if (auxiliarQuantity >= limit) {
      auxiliarQuantity = limit;
    }

    setQuantityProduct(auxiliarQuantity);
    changeQuantity(auxiliarQuantity, idProduct);
  };

  const minusProduct = () => {
    let auxiliarQuantity = quantityProduct - 1;

    if (auxiliarQuantity <= 1) {
      auxiliarQuantity = 1;
    }

    setQuantityProduct(auxiliarQuantity);
    changeQuantity(auxiliarQuantity, idProduct);
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
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      <button className="quantity-button" onClick={() => addProduct()}>
        <AiOutlinePlus size={18} color="white" />
      </button>
    </div>
  );
};

QuantityProduct.propTypes = {
  limit: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  idProduct: PropTypes.string.isRequired,
};

export default QuantityProduct;
