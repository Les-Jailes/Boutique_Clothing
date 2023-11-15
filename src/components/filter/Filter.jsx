import React from 'react'
import styles from './filter.module.css'
import { filterConstants } from '@/utils/filterConstants'
import FilterCheckbox from './filterCheckbox/FilterCheckbox'

const Filter = () => {
  return (
      <aside className={styles.container }>
        <h1 className={styles.title}>FILTER YOUR CLOTHING</h1>
        {filterConstants.map((constant, index) => (
          <FilterCheckbox key={index} title ={constant.title} options={constant.options}/>
        ))}
        <button className={styles.button}>Filter</button>
      </aside>
  )
}

export default Filter
