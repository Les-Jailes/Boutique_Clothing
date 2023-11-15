'use client'
import React, { useState } from "react";
import styles from "./filter.module.css";
import FilterCheckbox from "./filterCheckbox/FilterCheckbox";

const Filter = ({ categories, types, colors, sizes, onFilterChange }) => {
  const addAllOption = (options) => ["All", ...options];
  const filters = [
    { title: "Category", options: addAllOption(categories) },
    { title: "Type", options: addAllOption(types) },
    { title: "Color", options: addAllOption(colors) },
    { title: "Size", options: addAllOption(sizes) },
    { title: "Prices", options: ["All", "0 - 50", "51 - 100", "100 - 150", "200 ++"] },
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
      <button className={styles.button}>Filter</button>
    </aside>
  );
};

export default Filter;
