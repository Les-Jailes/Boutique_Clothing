'use client';

import React, { useState, useEffect } from "react";
import coverElements from "@/utils/Carousel.json";
import CoverElement from "./CoverElement";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Carousel = () => {
  const [position, setPosition] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(handleRight, 6000);
    return () => clearInterval(intervalId);
  }, [position]);

  const handleRight = () => {
    let auxiliarPosition = position + 1;
    if (auxiliarPosition > coverElements.length) {
      setPosition(1);
    } else {
      setPosition(auxiliarPosition);
    }
  };

  const handleLeft = () => {
    let auxiliarPosition = position - 1;
    if (auxiliarPosition === 0) {
      setPosition(coverElements.length);
    } else {
      setPosition(auxiliarPosition);
    }
  };

  const handleButtonClick = () => {
    clearInterval();
  };

  return (
    <div className="slider-container">
      <button
        className="change-cover-button left-button"
        onClick={() => {
          handleLeft();
          handleButtonClick();
        }}
      >
        <AiOutlineLeft />
      </button>
      <button
        className="change-cover-button right-button"
        onClick={() => {
          handleRight();
          handleButtonClick();
        }}
      >
        <AiOutlineRight />
      </button>
      {coverElements.map((element) => (
        <CoverElement
          name={element.name}
          phrase={element.phrase}
          image={element.image}
          key={element.id}
          position={position}
          idElement={element.id}
        />
      ))}
    </div>
  );
};

export default Carousel;
