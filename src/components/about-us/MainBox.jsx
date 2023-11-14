import React from 'react'
import styles from './mainbox.module.css'

const MainBox = () => {
  return (
    <div className={styles.container}>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.content}>At Boutique Clothing, we pride ourselves on being more than just an online clothing store. We are a passionate team that strives to offer high quality fashion for women, men, boys and girls. At the heart of our mission is the idea that fashion is an expression of personal identity and style.</p>
        </div>
    </div>
  )
}

export default MainBox