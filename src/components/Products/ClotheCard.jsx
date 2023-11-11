"use client";

import "@/css/Products/ClotheCard.css";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useState, useContext } from "react";
import { ColorClothe } from "./ColorClothe";
import SizePopup from "@/utils/SizePopup";
import { CartContext } from "@/components/Products/CartContext";

export const ClotheCard = ({ clothe }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSizePopupOpen, setIsSizePopupOpen] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAddToCart = (selectedSize) => {
    addToCart({
      ...clothe,
      size: selectedSize,
    });
  };

  const handleSizeSelection = (size) => {
    if (isSizePopupOpen) {
      setIsSizePopupOpen(false);
      handleAddToCart(size);
    } else {
      setIsSizePopupOpen(true);
    }
  };

  return (
    <div className="clothe-card-container">
      <div className={`card-image-section ${clothe.category.toLowerCase()}`}>
        <img
          src={clothe.path[0]}
          alt="Clothe image"
          className="clothe-image"
          draggable="false"
        />
      </div>
      <div className="information-container">
        <div className="section-card clothe-information">
          <h3 className="clothe-name">{clothe.name}</h3>
          <p className="clothe-price">{clothe.price} $</p>
        </div>
        <div className="container-more-information-and-buttons">
          <div className="section-card colors-container">
            {clothe.color.map((color, index) => (
              <ColorClothe key={index} color={color} />
            ))}
          </div>
          <div className="section-card card-buttons">
            <button
              className="options-card like-card"
              onClick={() => handleLike()}
            >
              {!isLiked ? (
                <AiOutlineHeart color="red" />
              ) : (
                <AiFillHeart color="red" />
              )}
            </button>
            <button
              className="options-card shop-card"
              onClick={handleSizeSelection}
            >
              <AiOutlineShoppingCart color="white" />
            </button>
          </div>
          {isSizePopupOpen && (
            <SizePopup handleSizeSelection={handleSizeSelection} sizes={clothe.size}/>
          )}
        </div>
      </div>
    </div>
  );
};