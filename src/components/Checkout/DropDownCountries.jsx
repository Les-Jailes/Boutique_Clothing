"use client";

import React, { useState } from "react";
import "@/css/Checkout/DropDownCountries.css";
import PropTypes from "prop-types";

const DropDownCountries = ({
  options,
  placeholderText,
  value,
  setValue,
  handleClick,
  typeOption
}) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    const auxiliarValue = event.target.value;
    setValue(auxiliarValue);

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(auxiliarValue.toLowerCase())
    );

    setFilteredOptions(filtered);
    setIsOpen(true);

    if (filtered.length === 1 && auxiliarValue.toLowerCase() === filtered[0].toLowerCase()) {
      handleOptionClick(filtered[0]);
    }
  };

  const handleOptionClick = (selectedValue) => {
    setValue(selectedValue);
    setIsOpen(false);
    handleClick(selectedValue);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder={placeholderText}
        className="checkout-search-input"
      />
      {isOpen && (
        <ul className="options-list">
          {filteredOptions && filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onMouseDown={() => handleOptionClick(option)}
                className="option-list"
              >
                {option}
              </li>
            ))
          ) : (
            `${value} is not an available ${typeOption.toLowerCase()}`
          )}
        </ul>
      )}
    </>
  );
};

DropDownCountries.propTypes = {
  options: PropTypes.array.isRequired,
  placeholderText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  typeOption: PropTypes.string.isRequired
};

const DropdownSubcity = ({
  options,
  placeholderText,
  value,
  setValue,
  handleClick,
}) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    const auxiliarValue = event.target.value;
    setValue(auxiliarValue);

    const filtered = options.filter((option) =>
      option.subCityName.toLowerCase().includes(auxiliarValue.toLowerCase())
    );

    setFilteredOptions(filtered);
    setIsOpen(true);

    if (
      filtered.length === 1 &&
      auxiliarValue.toLowerCase() === filtered[0].subCityName.toLowerCase()
    ) {
      handleOptionClick(filtered[0]);
    }
  };

  const handleOptionClick = (selectedValue) => {
    setValue(selectedValue);
    setIsOpen(false);
    handleClick(selectedValue);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder={placeholderText}
        className="checkout-search-input"
      />
      {isOpen && (
        <ul className="options-list">
          {filteredOptions && filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onMouseDown={() => handleOptionClick(option)}
                className="option-list"
              >
                {option.subCityName}
              </li>
            ))
          ) : (
            `${value} is not an available subcity`
          )}
        </ul>
      )}
    </>
  );
};

DropdownSubcity.propTypes = {
  options: PropTypes.array.isRequired,
  placeholderText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export { DropDownCountries, DropdownSubcity };
