import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import "@/css/Home/Categories/Category.css";

const CategorySection = ({ category, image, isLarge }) => {
  return (
    <a
      className={`cateogory-container ${
        isLarge ? "large" : "small"
      } ${category}`}
      href={ `/pages/categories?category=${ category }` }
    >
      <h3 className="category-name">{category && category.toUpperCase()}</h3>
      <Image
        src={image}
        alt={`${category} image`}
        className={`category-image ${isLarge ? "large" : "small"}`}
        draggable={false}
        width={700}
        height={700}
        priority
      />
    </a>
  );
};

CategorySection.propTypes = {
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isLarge: PropTypes.bool.isRequired,
};

export default CategorySection;
