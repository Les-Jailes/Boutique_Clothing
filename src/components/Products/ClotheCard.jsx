"use client";

import "@/css/Products/ClotheCard.css";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Image from "next/image";
import { useState, useEffect, useRef, useContext } from "react";
import { ColorClothe } from "./ColorClothe";
import { SizePopup } from "@/utils/SizePopup";
import { CartContext } from "./CartContext";

export const ClotheCard = ({ clothe }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSizePopupOpen, setIsSizePopupOpen] = useState(false);
  const cardRef = useRef(null);
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
    setIsSizePopupOpen(!isSizePopupOpen);
    if (size) {
      handleAddToCart(size);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target) &&
        isSizePopupOpen
      ) {
        setIsSizePopupOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSizePopupOpen]);

  const handleRedirection = (event) => {
    let url = `/pages/page-details?id=${clothe._id}`;
    window.location.href = url;
  };

  return (
    <div
      className="clothe-card-container"
    >
      <div className={`card-image-section ${clothe.category.toLowerCase()}`}>
        <Image
          src={clothe.path[0]}
          alt="Clothe image"
          className="clothe-image"
          draggable={false}
          width={400}
          height={400}
        />
      </div>
      <div className="information-container">
        <div className="section-card clothe-information">
          <h3 className="clothe-name" onClick={(event) => handleRedirection(event)}>{clothe.name}</h3>
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
              ref={cardRef}
              className="options-card shop-card"
              onClick={() => {
                handleSizeSelection();
              }}
            >
              <AiOutlineShoppingCart color="white" />
            </button>
          </div>
          {isSizePopupOpen && (
            <SizePopup
              handleSizeSelection={handleSizeSelection}
              sizes={clothe.sizes}
              isSizePopupOpen={isSizePopupOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
};
