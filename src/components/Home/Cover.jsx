import React from "react";
import { Carousel } from "react-responsive-carousel";
import coverElements from "@/utils/Carousel.json";
import CoverElement from "./CoverElement";

const Cover = () => {
  console.log(coverElements);

  return (
    <main className="cover-container">
      <Carousel>
        {coverElements &&
          coverElements.map((coverElement, index) => {
            return (
              <CoverElement
                name={coverElement.name}
                phrase={coverElement.phrase}
                image={coverElement.image}
                key={index}
              />
            );
          })}
      </Carousel>
    </main>
  );
};

export default Cover;
