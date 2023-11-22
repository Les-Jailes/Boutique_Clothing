"use client"
import React, { useContext, useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import "@/css/Cart/CartCardSummary.css";
import Image from "next/image";
import { CartContext } from "@/components/Products/CartContext";
import SoldOut from "@/components/ShoppingCart/SoldOut";
import api from "@/app/api/api"

const CartCardSummary = ({ product, showDeleteOption }) => {
  const [reducible, setReducible] = useState(true);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    inStock();
  });

  useEffect(() => {
    inStock();
  }, []);

  const inStock = async () => {
    
    try {
      const productFound = await api.get('/Product/' + product._id);
      const sizes = productFound.data.sizes;
      const selectedQuantity = product.quantity;

      const sizeFound = sizes.find((size) => size.size == product.size)      
      setReducible(sizeFound.quantity > 0);
      setAvailable(sizeFound.quantity >= selectedQuantity);
      
    } catch (error) {
      
    }
  }


  const { removeFromCart } = useContext(CartContext);

  const handleDelete = () => {
    removeFromCart(product);
  };

  return (
    <div className={`cart-card-container ${available ? 'available' : ''}`}>
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
        <div className="sold-out-container-information">
          <div className="information-container-sold-out">
            <p className="card-cart-price">{`Size: ${product.size}`}</p>
            <p className="card-cart-quantity"> { `Quantity: ${ product.quantity } ` } </p>
           <p className="card-cart-price">{`Price: ${product.price} $`}</p>
          </div>
          {!available &&  (<SoldOut reducible={reducible ? true : false} fixed={true}/>)}
        </div>
      </div>
      {showDeleteOption && (
        <div className="card-option-container">
          <button className="delete-option-card" onClick={handleDelete}>
            <AiOutlineDelete size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CartCardSummary;
