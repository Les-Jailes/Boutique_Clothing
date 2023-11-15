import React, { useState } from 'react';
import styles from './fcheckbox.module.css';
import { FaSquareCaretDown } from "react-icons/fa6";


const FilterCheckbox = ({ title, options }) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  console.log(options)

  const toggleOptions = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  return (
    <div className={styles.container}>
        <div className={styles.titleContainer}>
            <h1 className={styles.title}>
                {title}
            </h1>
            <FaSquareCaretDown size={30} className={styles.icon}  onClick={toggleOptions}/>
        </div>
      {isOptionsVisible && (
        <div className={styles.optionContainer}>
          {options.map((option, index) => (
            <div className={styles.option} key={index}>
              <input type="checkbox" className={styles.input} />
              <p className={styles.label}>{option}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterCheckbox;
