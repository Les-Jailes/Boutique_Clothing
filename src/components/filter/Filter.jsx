'use client'
import React, { useState } from "react";
import styles from "./filter.module.css";
import FilterCheckbox from "./filterCheckbox/FilterCheckbox";
import { HiArrowPath } from "react-icons/hi2";

const Filter = ({ categories, types, colors, sizes, onFilterChange, onFilterButtonClick, handleRefreshClick }) => {
  const extractUniqueSizes = (data) => {
    const uniqueSizes = [...new Set(Object.values(data).map(item => item.size && item.size.toLowerCase()))];
    return uniqueSizes;
  };
  const filters = [
    { title: "category", options: categories },
    { title: "type", options: types },
    { title: "color", options: colors  },
    { title: "size", options: extractUniqueSizes(sizes)  },
    { title: "price", options: ["0 - 50", "51 - 100", "101 - 150", "151 - 300 ", "301 - 500"] },
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
      <div className={styles.actionContainer}>
        <button onClick={onFilterButtonClick} className={styles.button}>
          Filter
        </button>
        <button onClick={handleRefreshClick} className={styles.buttonRefresh}><HiArrowPath size={24} className={styles.icon}/></button>
      </div>
    </aside>
  );
};

export default Filter;
