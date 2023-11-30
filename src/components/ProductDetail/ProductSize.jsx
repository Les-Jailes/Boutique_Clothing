import React from "react";
import SizeButton from "./SizeButton";
import '@/css/ProductDetail/ProductSize.css'

const ProductSize = ({ sizes }) => {
  return (
    <div className="product-sizes-container">
      <h3 className="subtitle-product-detail">Select size</h3>
      <div className="sizes-container">
        {sizes && sizes.length > 0 ? (
          sizes.map((size, index) => (
            <SizeButton size={size} key={index} />
          ))
        ) : (
          "No stock"
        )}
      </div>
    </div>
  );
};

export default ProductSize;