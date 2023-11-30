"use client";

import React, { useState, useEffect, useCallback } from "react";
import ProductCarousel from "./ProductCarousel";
import CarouselOption from "./CarouselOption";
import ProductSize from "./ProductSize";
import ProductColor from "./ProductColor";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ProductDetails from "./ProductDetails";
import "@/css/ProductDetail/Product.css";

const Product = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [leftButton, setLeftButton] = useState(false);
  const [rightButton, setRightButton] = useState(false);

  useEffect(() => {
    if (product.path.length > 1) {
      setRightButton(true);
    }
  }, [product.path.length]);

  const handleCurrentPosition = useCallback((position) => {
    setCurrentPosition(position);
    setLeftButton(position > 0);
    setRightButton(position < product.path.length - 1);
  }, [product.path.length]);

  const handleLike = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);

  const handleLeftPosition = useCallback(() => {
    let leftPosition = currentPosition - 1;
    setLeftButton(leftPosition > 0);
    setRightButton(true);
    setCurrentPosition(leftPosition);
  }, [currentPosition]);

  const handleRightPosition = useCallback(() => {
    let rightPosition = currentPosition + 1;
    setLeftButton(true);
    setRightButton(rightPosition < product.path.length - 1);
    setCurrentPosition(rightPosition);
  }, [currentPosition, product.path.length]);

  return (
    <div className="product-detail-container">
      <div className="left-product-detail-container">
        <ProductCarousel
          product={product}
          currentPosition={currentPosition}
          handleLeftPosition={handleLeftPosition}
          handleRightPosition={handleRightPosition}
          leftStatus={leftButton}
          rightStatus={rightButton}
        />
        <div className="options-carousel-product-image">
          {product.path && product.path.length > 0
            ? product.path.map((image, index) => {
                return (
                  <CarouselOption
                    category={product.category}
                    image={image}
                    key={index}
                    position={index}
                    currentPosition={currentPosition}
                    handlePosition={handleCurrentPosition}
                  />
                );
              })
            : "No options"}
        </div>
      </div>
      <div className="right-product-detail-container">
        <h2 className="clothe-name-product-detail">{product.name}</h2>
        <p className="clothe-price-product-detail">{product.price} $</p>
        <ProductSize sizes={product.sizes} />
        <ProductColor color={product.color} />
        <div className="options-product-detail">
          <button className="add-cart-button">Add to cart</button>
          <button className="add-wishlist-button" onClick={() => handleLike()}>
            {!isLiked ? (
              <AiOutlineHeart color="red" />
            ) : (
              <AiFillHeart color="red" />
            )}
          </button>
        </div>
        <ProductDetails description={product.description} />
      </div>
    </div>
  );
};

export default Product;