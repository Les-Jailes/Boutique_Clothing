import React from "react";
import ProductCarousel from "./ProductCarousel";
import CarouselOption from "./CarouselOption";

const Product = ({ product }) => {
  return (
    <div className="product-detail-container">
      <div className="left-product-detail-container">
        <ProductCarousel product={product} />
        <div className="options-carousel-product-image">
          {product.path && product.path > 0
            ? product.path.map((image, index) => {
                <CarouselOption
                  category={product.category}
                  image={image}
                  key={index}
                />;
              })
            : "No options"}
        </div>
      </div>
			<div className="right-product-detail-container">
				
			</div>
    </div>
  );
};

export default Product;
