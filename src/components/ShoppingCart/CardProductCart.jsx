import React from "react";
import "@/css/Cart/CardProductCart.css";
import QuantityProduct from "./QuantityProduct";
import { AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";

const CardProductCart = ({ product }) => {
  return (
    <div className="card-product-cart-container">
      <div className="image-card-product-cart-container card-cart-container">
        <div className={ ` background-image-product ${product.category} ` }>
          <Image
            src={product.path[0]}
            alt={`${product.name} image`}
            className="image-card-product-cart"
            draggable={ false }
            width={60}
            height={60}
            priority
          />
        </div>
      </div>
      <div className="information-container card-cart-container">
        <h3 className="product-name">{product.name}</h3>
        <p className="size-product">{`Size: ${product.size}`}</p>
        <p className="price-product">{`Price: ${product.price} $`}</p>
      </div>
      <div className="quantity-product-card-cart card-cart-container">
        <QuantityProduct limit={10} quantity={product.quantity} />
      </div>
      <div className="delete-option-card-cart card-cart-container">
        <button className="delete-product-cart">
          <AiOutlineDelete size={24} />
        </button>
      </div>
    </div>
  );
};

export default CardProductCart;
