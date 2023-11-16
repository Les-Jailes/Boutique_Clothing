import React from "react";
import coverElements from "@/utils/Carousel.json";
import CoverElement from "./CoverElement";

const Carousel = () => {
  return (
    <div className="slider-container">
      {coverElements.map((element) => {
        return (
          <CoverElement
            name={element.name}
            phrase={element.phrase}
            image={element.image}
            key={element.id}
          />
        );
      })}
    </div>
  );
};

export default Carousel;
