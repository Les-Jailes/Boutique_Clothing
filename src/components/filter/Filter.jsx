import React from 'react'
import styles from './filter.module.css'
import { filterConstants } from '@/utils/filterConstants'
import FilterCheckbox from './filterCheckbox/FilterCheckbox'

const Filter = ({ categories, types, colors, sizes }) => {
  const filters = [
    { title: 'Category', options: categories },
    { title: 'Type', options: types },
    { title: 'Color', options: colors },
    { title: 'Size', options: sizes },
    { title: "Prices",options: ["0 - 50", "51 - 100", "100 - 150", "200 ++"]
  }
  ];
    return (
      <aside className={styles.container }>
        <h1 className={styles.title}>FILTER YOUR CLOTHING</h1>
        {filters.map((constant, index) => (
          <FilterCheckbox key={index} title ={constant.title} options={constant.options}/>
        ))}
        <button className={styles.button}>Filter</button>
      </aside>
  )
}

export default Filter
