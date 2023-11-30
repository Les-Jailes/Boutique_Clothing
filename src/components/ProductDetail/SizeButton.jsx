import React from "react";

const SizeButton = ({ size }) => {
  return (
    <>
      {size && size.quantity > 0 ? (
        <button className="size-button">
          {size.size}
        </button>
      ) : (
        null
      )}
    </>
  );
};

export default SizeButton;
