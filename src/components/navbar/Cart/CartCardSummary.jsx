import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import "@/css/Cart/CartCardSummary.css";
import Image from "next/image";

const CartCardSummary = ({ product }) => {
  return (
    <div className="cart-card-container">
      <div className="image-card-container">
        <div className={` image-background ${product.category} `}>
          <Image
            src={product.path[0]}
            alt={`${product.name} image`}
            className="image-product-cart"
            draggable={ false }
            width={60}
            height={40}
            priority
          />
        </div>
      </div>
      <div className="information-card">
        <h3 className="card-cart-name">{product.name}</h3>
        <p className="card-cart-price">{`Size: ${product.size}`}</p>
        <p className="card-cart-quantity"> { `Quantity: ${ product.quantity } ` } </p>
        <p className="card-cart-price">{`Price: ${product.price} $`}</p>
      </div>
      <div className="card-option-container">
        <button className="delete-option-card">
          <AiOutlineDelete size={24} />
        </button>
      </div>
    </div>
  );
};

export default CartCardSummary;
