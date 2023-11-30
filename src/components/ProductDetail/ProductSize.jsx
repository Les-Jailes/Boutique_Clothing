import React from "react";
import SizeButton from "./SizeButton";
import '@/css/ProductDetail/ProductSize.css'
import PropTypes from 'prop-types'

const ProductSize = ({ sizes, currentSize, handleChangeSize }) => {
  return (
    <div className="product-sizes-container">
      <h3 className="subtitle-product-detail">Select size</h3>
      <div className="sizes-container">
        {sizes && sizes.length > 0 ? (
          sizes.map((size, index) => (
            <SizeButton size={size} key={index} currentSize={currentSize} handleChangeSize={handleChangeSize} />
          ))
        ) : (
          "No stock"
        )}
      </div>
    </div>
  );
};

ProductSize.propTypes = {
  sizes: PropTypes.array.isRequired,
  currentSize: PropTypes.string.isRequired,
  handleChangeSize: PropTypes.func.isRequired
}

export default ProductSize;