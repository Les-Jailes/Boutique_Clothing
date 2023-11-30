'use client'

import Image from "next/image";
import React, {useState} from "react";
import '@/css/ProductDetail/CarouselOption.css'

function CarouselOption({ category, image, position, currentPosition, handlePosition }) {



  return (
    <div className={`product-option-carousel ${(category).toLowerCase()} ${position === currentPosition ? 'is-active' : ''}`} onClick={() => handlePosition(position)}>
      <Image src={image} alt="Product image" width={300} height={300} className="option-carousel-image" />
    </div>
  );
}

export default CarouselOption;
