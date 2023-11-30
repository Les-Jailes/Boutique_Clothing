"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import '@/css/ProductDetail/ProductCarousel.css'

const ProductCarousel = ({ product, currentPosition, handleLeftPosition, handleRightPosition, leftStatus, rightStatus }) => {

  return (
    <div className="product-carousel-container">
      <button className={`left-button-carousel ${!leftStatus ? 'disable' : ''}`} onClick={handleLeftPosition}>
        <AiOutlineLeft />
      </button>
      <button className={`right-button-carousel ${!rightStatus ? 'disable' : ''}`} onClick={handleRightPosition}>
        <AiOutlineRight />
      </button>
      <div className={`product-image-container ${(product.category).toLowerCase()}`}>
        <Image
          src={product.path[currentPosition]}
          alt="product image"
          width={300}
          height={300}
          className="image-carousel"
        />
      </div>
    </div>
  );
};

export default ProductCarousel;
