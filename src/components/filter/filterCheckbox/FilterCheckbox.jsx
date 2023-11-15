'use client'
import React, { useState } from "react";
import styles from "./fcheckbox.module.css";
import { FaSquareCaretDown } from "react-icons/fa6";

const FilterCheckbox = ({ title, options, onFilterChange }) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(options);



  const toggleOptions = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  const handleCheckboxChange = (option) => {
    const updatedSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedSelectedOptions);
    onFilterChange(title, updatedSelectedOptions);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{title}</h1>
        <FaSquareCaretDown size={30} className={styles.icon} onClick={toggleOptions} />
      </div>
      {isOptionsVisible && (
        <div className={styles.optionContainer}>
          {options.map((option, index) => (
            <div className={styles.option} key={index}>
              <input
                type="checkbox"
                className={styles.input}
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              <p className={styles.label}>{option}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterCheckbox;
