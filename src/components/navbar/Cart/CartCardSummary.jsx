"use client"
import React, { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import "@/css/Cart/CartCardSummary.css";
import { CartContext } from "@/components/Products/CartContext";

const CartCardSummary = ({ product }) => {
  // Pa removelor del carrito
  const { removeFromCart } = useContext(CartContext);

  const handleDelete = () => {
    removeFromCart(product);
  };

  return (
    <div className="cart-card-container">
      <div className="image-card-container">
        <div className={` image-background ${product.category} `}>
          <img
            src={product.image}
            alt={`${product.name} image`}
            className="image-product-cart"
            draggable="false"
          />
        </div>
      </div>
      <div className="information-card">
        <h3 className="card-cart-name">{product.name}</h3>
        <p className="card-cart-quantity"> { `Quantity: ${ product.quantity } ` } </p>
        <p className="card-cart-price">{`Price: ${product.price} $`}</p>
      </div>
      <div className="card-option-container">
        // Le pasamo la accion
        <button className="delete-option-card" onClick={handleDelete}>
          <AiOutlineDelete size={24} />
        </button>
      </div>
    </div>
  );
};

export default CartCardSummary;
