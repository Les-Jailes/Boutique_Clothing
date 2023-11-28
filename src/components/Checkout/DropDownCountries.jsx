'use client'

import React, { useState } from "react";
import '@/css/Checkout/DropDownCountries.css'
import PropTypes from 'prop-types'

const DropDownCountries = ({ options, placeholderText }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false)

  const handleInputChange = (event) => {
    const value = event.target.value
    setInputValue(value)

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredOptions(filtered);
    setIsOpen(true);
  }

  const handleOptionClick = (value) => {
    setInputValue(value)
    setIsOpen(false)
  }

  const handleBlur = () => {
    setIsOpen(false)
  }

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
				placeholder={placeholderText}
      />
      {isOpen && (
        <ul className="options-list">
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)} className="option-list">
            {option}
          </li>
          ))}
        </ul>
      )}
    </>
  )
}

DropDownCountries.propTypes = {
  options: PropTypes.array.isRequired,
  placeholderText: PropTypes.string.isRequired
}

export default DropDownCountries;