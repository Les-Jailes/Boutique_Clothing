import React from 'react'

const ProductDetails = ({description}) => {
	return (
		<div className="product-details-container">
			<h2 className="product-details-subtitle">
				Product details
			</h2>
			<p className="product-description-container">
				{
					description
				}
			</p>
		</div>
	)
}

export default ProductDetails