import React from "react";

const ProductColor = ({color}) => {
  return (
		<div className="product-color-container">
      <h3 className="subtitle-product-detail">Clothe color</h3>
      <div className="color-container">
        {color ? (
          <div className="clothe-color-container">
						{
							color
						}
					</div>
        ) : (
          "No color"
        )}
      </div>
    </div>
	)
};

export default ProductColor;
