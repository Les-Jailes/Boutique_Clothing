import React from "react";
import '@/css/Cart/QuantityPopUp.css'

const QuantityPopUp = ({quantity}) => {
  return (
		<div className="quantity-pop-up">
			{
				quantity > 99 ? (
					"+99"
				) : (
					quantity
				)
			}
		</div>
	)
};

export default QuantityPopUp;
