import Image from "next/image";
import React from "react";

function CarouselOption({category, image}) {
  return (
		<div className={`product-option-carousel ${category}`}>
			<Image
				src={image}
				alt="Product image"
				width={300}
				height={300}
			/>
		</div>
	)
}

export default CarouselOption;
