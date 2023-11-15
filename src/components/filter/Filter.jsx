'use client'
import React, { useState } from "react";
import styles from "./filter.module.css";
import FilterCheckbox from "./filterCheckbox/FilterCheckbox";

const Filter = ({ categories, types, colors, sizes, onFilterChange, onFilterButtonClick }) => {
  const filters = [
    { title: "category", options: categories },
    { title: "type", options: types },
    { title: "color", options: colors },
    { title: "size", options: sizes },
    { title: "price", options: ["0 - 50", "51 - 100", "100 - 150", "200 ++"] },
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
        />
      ))}
      <button onClick={onFilterButtonClick} className={styles.button}>
        Filter
      </button>
    </aside>
  );
};

export default Filter;
