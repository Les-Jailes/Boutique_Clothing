"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const ProductCarousel = ({ product }) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  return (
    <div className="product-carousel-container">
      <div className="top-carousel">
        <button className="left-button-carousel">
          <AiOutlineLeft />
        </button>
        <button className="right-button-carousel">
          <AiOutlineRight />
        </button>
        <div className={`product-image-container ${product.category}`}>
          <Image
            src={product.path[currentPosition]}
            alt="product image"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
