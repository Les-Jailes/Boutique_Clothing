"use client";
import React, { useContext, useState, useEffect } from "react";
import "@/css/Cart/CardProductCart.css";
import QuantityProduct from "./QuantityProduct";
import { AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";
import PropTypes from "prop-types";
import { CartContext } from "@/components/Products/CartContext";
import SoldOut from "./SoldOut";
import api from "@/app/api/api";

const CardProductCart = ({ product, editable }) => {
  const [available, setAvailable] = useState(true);
  const [reducible, setReducible] = useState(true);

  useEffect(() => {
    inStock();
  });

  const inStock = async () => {
    try {
      const productFound = await api.get("/Product/" + product._id);
      const sizes = productFound.data.sizes;
      const selectedQuantity = product.quantity;

      const sizeFound = sizes.find((size) => size.size == product.size);
      setReducible(sizeFound.quantity > 0);
      setAvailable(sizeFound.quantity >= selectedQuantity);
      product.available = available;
    } catch (error) {}
  };

  const { removeFromCart } = useContext(CartContext);

  const handleDelete = () => {
    removeFromCart(product);
  };

  return (
    <div
      className={`card-product-cart-container ${available ? "available" : ""}`}
    >
      <div className="image-card-product-cart-container card-cart-container">
        <div className={` background-image-product ${product.category} `}>
          <Image
            src={product.path[0]}
            alt={`${product.name} image`}
            className="image-card-product-cart"
            draggable={false}
            width={100}
            height={100}
            priority
          />
        </div>
      </div>
      <div className="information-container card-cart-container">
        <h3 className="product-name">{product.name}</h3>

        <div className="sold-out-container-information">
          <div className="information-container-sold-out">
            <p className="size-product">{`Size: ${product.size}`}</p>
            <p className="price-product">{`Price: ${product.price} $`}</p>
          </div>
          {!available && (
            <SoldOut reducible={!!reducible} fixed={false} />
          )}
        </div>
      </div>
      {editable && reducible && (
        <div className="quantity-product-card-cart card-cart-container">
          <QuantityProduct
            limit={10}
            quantity={product.quantity}
            idProduct={product.id}
            product={product}
          />
        </div>
      )}
      {editable && (
        <div className="delete-option-card-cart card-cart-container">
          <button className="delete-product-cart" onClick={handleDelete}>
            <AiOutlineDelete size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

CardProductCart.propTypes = {
  product: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired
};

export default CardProductCart;
