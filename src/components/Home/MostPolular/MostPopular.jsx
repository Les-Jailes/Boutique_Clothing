"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ClotheCard } from "@/components/Products/ClotheCard";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const MostPopular = () => {
  const [products, setProducts] = useState([]);
  const containerCarousel = useRef(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [position, setPosition] = useState(0);
  const [leftDisable, setLeftDisable] = useState(true);
  const [rightDisable, setRightDisable] = useState(false);

  useEffect(() => {
    axios
      .get("https://boutique-clothing-api.onrender.com/Product")
      .then((response) => {
        const firstTenProducts = response.data.slice(0, 10);
        setProducts(firstTenProducts);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLeftChange = () => {
    let middleScreen = windowSize * 0.5;
    let newPosition = position + middleScreen;
  
    if (newPosition > 0) {
      newPosition = 0;
    } else {
      newPosition = Math.min(0, newPosition);
    }
  
    setPosition(newPosition);
    containerCarousel.current.style.left = `${newPosition}px`;
    setRightDisable(false);
    setLeftDisable(newPosition === 0);
  };
  
  const handleRightChange = () => {
    let middleScreen = windowSize * 0.5;
    let newPosition = position - middleScreen;
    let maxPosition = (containerCarousel.current.scrollWidth + 100) - windowSize;
  
    if (newPosition < -maxPosition) {
      newPosition = -maxPosition;
    } else {
      newPosition = Math.max(-maxPosition, newPosition);
    }
  
    setPosition(newPosition);
    containerCarousel.current.style.left = `${newPosition}px`;
    setLeftDisable(false);
    setRightDisable(newPosition === -maxPosition);
  };

  return (
    <div className="most-popular-carousel">
      <button
        className={ `change-card-carousel left-button ${leftDisable ? 'disable' : ''}` }
        onClick={handleLeftChange}
        disabled={leftDisable}
      >
        <AiOutlineLeft />
      </button>
      <button
        className={ `change-card-carousel right-button ${rightDisable ? 'disable' : ''}` }
        onClick={handleRightChange}
        disabled={rightDisable}
      >
        <AiOutlineRight />
      </button>
      {products.length > 0 && (
        <div
          className="carousel-card-container"
          ref={containerCarousel}
          style={{ left: position }}
        >
          {products.map((product, index) => (
            <ClotheCard clothe={product} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MostPopular;
