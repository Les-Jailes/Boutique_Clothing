import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ClotheCard } from "@/components/Products/ClotheCard";
import PropTypes from "prop-types";

const MultiSlider = ({ products }) => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    currentSlide: 0,
    responsive: [
      {
        breakpoint: 1620,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ height: "400px" }}>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.code} className="slider-item">
            <ClotheCard clothe={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

MultiSlider.propTypes = {
  products: PropTypes.array.isRequired,
};

export default MultiSlider;
