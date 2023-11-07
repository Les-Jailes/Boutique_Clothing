import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import "@/css/Cart/CartCardSummary.css";

const CartCardSummary = ({ name, category, image, price }) => {
  return (
    <div className="cart-card-container">
      <div className="image-card-container">
        <div className={ ` image-background ${ category } ` }>
          <img
            src={image}
            alt={`${name} image`}
            className="image-product-cart"
            draggable="false"
          />
        </div>
      </div>
      <div className="information-card">
        <h3 className="card-cart-name">{name}</h3>
        <p className="card-cart-price">{`${price} $`}</p>
      </div>
      <div className="card-option-container">
        <button className="delete-option-card">
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
};

export default CartCardSummary;
