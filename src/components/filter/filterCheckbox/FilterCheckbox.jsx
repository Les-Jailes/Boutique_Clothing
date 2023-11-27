'use client'
import React, { useState } from "react";
import styles from "./fcheckbox.module.css";
import { FaSquareCaretDown } from "react-icons/fa6";

const FilterCheckbox = ({ title, options, onFilterChange}) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleOptions = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  const handleCheckboxChange = (option) => {
    const updatedSelectedOption = selectedOption === option ? null : option;

    setSelectedOption(updatedSelectedOption);
    onFilterChange(title, updatedSelectedOption ? [updatedSelectedOption] : []);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{title}</h1>
        <FaSquareCaretDown size={25} className={styles.icon} onClick={toggleOptions} />
      </div>
      {isOptionsVisible && (
        <div className={styles.optionContainer}>
          {options.map((option, index) => (
            <div className={styles.option} key={index}>
              <input
                  type="checkbox"
                  className={styles.input}
                  checked={selectedOption === option}
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
