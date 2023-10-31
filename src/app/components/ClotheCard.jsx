import React from "react";
import "@/app/css/ClotheCard.css";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

export const ClotheCard = ({ clothe }) => {
  return (
    <div className="clothe-card-container">
      <div className="card-image-section">
        <img src={clothe.image} alt="Clothe image" className="clothe-image" draggable="false" />
      </div>
      <div className="text-container">
        <div className="clothe-information">
          <h3 className="clothe-name">{clothe.name}</h3>
          <p className="clothe-price">{clothe.price} $</p>
        </div>
        <div className="card-buttons">
          <button className="options-card like-card">
            <AiOutlineHeart />
          </button>
          <button className="options-card shop-card">
            <AiOutlineShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};
