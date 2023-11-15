'use client'
import React, { useState } from "react";
import styles from "./filter.module.css";
import FilterCheckbox from "./filterCheckbox/FilterCheckbox";

const Filter = ({ categories, types, colors, sizes, onFilterChange, onFilterButtonClick }) => {
  const filters = [
    { title: "category", options: categories, unique: false },
    { title: "type", options: types,  unique: false },
    { title: "color", options: colors ,  unique: false },
    { title: "size", options: sizes ,  unique: false },
    { title: "price", options: ["0 - 50", "51 - 100", "101 - 150", "151 - 300 ", "301 - 500"] ,  unique: true },
  ];

  return (
    <aside className={styles.container}>
      <h1 className={styles.title}>FILTER YOUR CLOTHING</h1>
      {filters.map((constant, index) => (
        <FilterCheckbox
          key={index}
          title={constant.title}
          options={constant.options}
          onFilterChange={onFilterChange}
          unique = {constant.unique}
        />
      ))}
      <button onClick={onFilterButtonClick} className={styles.button}>
        Filter
      </button>
    </aside>
  );
};

export default Filter;
