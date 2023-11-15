import React from "react";
import PropTypes from "prop-types";

const CoverElement = ({ name, phrase, image }) => {
  const backgroundImage = {
    backgroundImage: image,
  };

  return (
    <div className="cover-element" style={backgroundImage}>
      <p className="cover-pharse">{phrase}</p>
    </div>
  );
};

CoverElement.propTypes = {
  name: PropTypes.string.isRequired,
  phrase: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CoverElement;
