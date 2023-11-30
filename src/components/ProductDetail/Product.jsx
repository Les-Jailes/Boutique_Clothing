'use client'

import React, {useState} from "react";
import ProductCarousel from "./ProductCarousel";
import CarouselOption from "./CarouselOption";
import ProductSize from "./ProductSize";
import ProductColor from "./ProductColor";
import {
  AiOutlineHeart,
  AiFillHeart
} from "react-icons/ai";
import ProductDetails from "./ProductDetails";

const Product = ({ product }) => {

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="product-detail-container">
      <div className="left-product-detail-container">
        <ProductCarousel product={product} />
        <div className="options-carousel-product-image">
          {product.path && product.path.length > 0
            ? product.path.map((image, index) => {
                return (
                  <CarouselOption
                    category={product.category}
                    image={image}
                    key={index}
                  />
                );
              })
            : "No options"}
        </div>
      </div>
      <div className="right-product-detail-container">
        <h2 className="clothe-name-product-detail">
          {product.name}
        </h2>
        <p className="clothe-price-product-detail">
          {product.price} $
        </p>
        <ProductSize sizes={product.sizes} />
        <ProductColor color={product.color} />
        <div className="options-product-detail">
          <button className="add-cart-button">
            Add to cart
          </button>
          <button
              className="add-wishlist-button"
              onClick={() => handleLike()}
            >
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
