import React from 'react'
import '@/css/ProductDetail/ProductDetails.css'

const ProductDetails = ({description}) => {
	return (
		<div className="product-details-container">
			<p className="product-details-subtitle">
				Product details
			</p>
			<p className="product-description-container">
				{
					description
				}
			</p>
		</div>
	)
}

export default ProductDetails