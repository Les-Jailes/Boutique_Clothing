import React from "react";
import PropTypes from "prop-types";

const CoverElement = ({ name, phrase, image, position, idElement }) => {
  const backgroundImage = {
    backgroundImage: `url(${image})`,
  };

  let orientation;

  if (idElement > position) {
    orientation = "right";
  } else if (idElement < position) {
    orientation = "left";
  } else {
    orientation = "center";
  }

  return (
    <div className={ `cover-element ${ orientation }` } style={backgroundImage}>
      <p className="cover-pharse">
        "{phrase}"
      </p>
    </div>
  );
};

CoverElement.propTypes = {
  name: PropTypes.string.isRequired,
  phrase: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  idElement: PropTypes.number.isRequired
};

export default CoverElement;
