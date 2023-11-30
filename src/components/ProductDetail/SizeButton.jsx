import React from "react";
import '@/css/ProductDetail/SizeButton.css'

const SizeButton = ({ size, currentSize, handleChangeSize }) => {

  return (
    <>
      {size && size.quantity > 0 ? (
        <button className={`size-button ${size.size === currentSize ? 'selected' : ''}`} onClick={() => handleChangeSize(size.size)}>
          {size.size}
        </button>
      ) : (
        null
      )}
    </>
  );
};

export default SizeButton;
