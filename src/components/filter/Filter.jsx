import React from 'react'
import styles from './filter.module.css'

const Filter = () => {
  return (
    <div>
      <aside className={styles.filters }>
        <h1 class="bigHead">FILTER YOUR CLOTHING</h1>
        <h2 class="bump"><span class="results">37</span> Results Found</h2>
        <div className={styles.type }>
          <h1>CATEGORY</h1>
          <div class="bump">
            <div class="box1">
              <input type="checkbox" className={styles.clothing  }/>
              <label for="clothing" class="check-box"></label>
              <h4>CATEGORY OPTION</h4>
            </div>
            <div class="box1">
              <input type="checkbox" className={styles.equipment  }/>
              <label for="equipment" class="check-box"></label>
              <h4>CATEGORY OPTION</h4>
            </div>
            <div class="box1">
              <input type="checkbox" className={styles.trips  }/>
              <label for="trips" class="check-box"></label>
              <h4>CATEGORY OPTION</h4>
            </div>
          </div>
        </div>

        <div className={styles.type }>
          <h1>TYPE</h1>
          <div class="bump">
            <div class="box1">
              <input type="checkbox" className={styles.clothing  }/>
              <label for="clothing" class="check-box"></label>
              <h4>CATEGORY OPTION</h4>
            </div>
            <div class="box1">
              <input type="checkbox" className={styles.equipment  }/>
              <label for="equipment" class="check-box"></label>
              <h4>CATEGORY OPTION</h4>
            </div>
            <div class="box1">
              <input type="checkbox" className={styles.trips  }/>
              <label for="trips" class="check-box"></label>
              <h4>CATEGORY OPTION</h4>
            </div>
          </div>
        </div>

        <div className={styles.type }>
          <h1>COLOR</h1>
          <div class="bump">
            <div class="box1">
              <input type="checkbox" className={styles.clothing  }/>
              <label for="clothing" class="check-box"></label>
              <h4>CATEGORY OPTION</h4>
            </div>
            <div class="box1">
              <input type="checkbox" className={styles.equipment  }/>
              <label for="equipment" class="check-box"></label>
              <h4>CATEGORY OPTION</h4>
            </div>
            <div class="box1">
              <input type="checkbox" className={styles.trips  }/>
              <label for="trips" class="check-box"></label>
              <h4>CATEGORY OPTION</h4>
            </div>
          </div>
        </div>

        <div className={styles.type }>
          <h1>SIZE</h1>
          <div class="bump">
            <div class="box1">
              <input type="checkbox" className={styles.clothing  }/>
              <label for="clothing" class="check-box"></label>
              <h4>CATEGORY OPTION</h4>
            </div>
            <div class="box1">
              <input type="checkbox" className={styles.equipment  }/>
              <label for="equipment" class="check-box"></label>
              <h4>CATEGORY OPTION</h4>
            </div>
            <div class="box1">
              <input type="checkbox" className={styles.trips  }/>
              <label for="trips" class="check-box"></label>
              <h4>CATEGORY OPTION</h4>
            </div>
          </div>
        </div>

        <div className={styles.priceRange} >
          <h1>PRICE RANGE</h1>
          <div className={styles.bump}>
            <div className="styles.slider"></div>

            <div className={styles.minVal}>
              <h3 className={styles.minPrice}>1,300</h3>
            </div>

            <div className={styles.maxVal}>
              <h3 className={styles.maxPrice}>14,000</h3>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Filter
