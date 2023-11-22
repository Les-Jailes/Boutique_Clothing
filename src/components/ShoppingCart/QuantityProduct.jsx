"use client";

import React, { useContext, useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import "@/css/Cart/QuantityProducts.css";
import PropTypes from "prop-types";
import { CartContext } from "../Products/CartContext";
import { showErrorMessage } from "@/utils/alerts";
import api from '@/app/api/api'

const QuantityProduct = ({ limit, quantity, idProduct, product }) => {
  const { changeQuantity } = useContext(CartContext);
  const [quantityProduct, setQuantityProduct] = useState(quantity);
  const [definedLimit, setDefinedLimit] = useState(limit);

  const validateLimit = async () => {
    try {
      const productFound = await api.get('/Product/' + product._id);
      const sizeFound = productFound.data.sizes.find((size) => size.size == product.size);
      if(sizeFound.quantity < definedLimit) setDefinedLimit(sizeFound.quantity);
    }
    catch(error){
      
    }
  }

  useEffect(() => {
    setQuantityProduct(quantity);
  }, [quantity]);

  useEffect(() => {
    validateLimit();
  }, []);

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
    }
  };

  const handleInputBlur = () => {
    if (quantityProduct === 0 || quantityProduct === '') {
      setQuantityProduct(1);
      changeQuantity(1, idProduct);
    }
  };

  const addProduct = () => {
    console.log(definedLimit);
    let auxiliarQuantity = quantityProduct + 1;
    if (auxiliarQuantity >= definedLimit) {
      if(definedLimit != 10 && quantityProduct >= definedLimit){
        showErrorMessage("Out of stock", "Sorry, we only have " + definedLimit + " \"" + product.name + "\" in stock");
      }
      auxiliarQuantity = definedLimit;
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
