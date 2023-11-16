import React from "react";
import PropTypes from "prop-types";

const CategorySection = ({ category, image, isLarge }) => {
  return (
    <div
      className={`cateogory-container ${
        isLarge ? "large" : "small"
      } ${category}`}
    >
      <h3 className="category-name">{category.toUpperCase()}</h3>
      <Image
        src={image}
        alt={`${category} image`}
        className="category-image"
        draggable={false}
        width={650}
        height={650}
        priority
      />
    </div>
  );
};

CategorySection.propTypes = {
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isLarge: PropTypes.bool.isRequired,
};

export default CategorySection;
