import React from "react";
import '@/css/ProductDetail/SizeButton.css'

const SizeButton = ({ size, selected }) => {
  return (
    <>
      {size && size.quantity > 0 ? (
        <button className={`size-button ${selected ? 'selected' : ''}`}>
          {size.size}
        </button>
      ) : (
        null
      )}
    </>
  );
};

export default SizeButton;
