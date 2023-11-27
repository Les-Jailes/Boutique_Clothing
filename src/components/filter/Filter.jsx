'use client'
import React, { useState } from "react";
import styles from "./filter.module.css";
import FilterCheckbox from "./filterCheckbox/FilterCheckbox";
import { HiArrowPath } from "react-icons/hi2";

const Filter = ({ filters, onFilterChange, onFilterButtonClick, handleRefreshClick }) => {
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
