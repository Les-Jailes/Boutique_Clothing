import Image from 'next/image'
import React from 'react'
import styles from './infobox.module.css'

const InformationBox = ({title, content, img, reverse}) => {
  return (
    <div className= { styles.container}  style={{flexDirection: `${reverse ? 'row-reverse':''}`}}>
        <div className={styles.contentContainer}>
            <h2 className={styles.title}>
                {title}
            </h2>
            <p className={styles.content}>
                {content}
            </p>
        </div>
        <div className={styles.imgContainer}>
            <Image 
                src={img}
                alt= "info img"
                width={600}
                height={350}
                className={styles.img}
            />
        </div>
    </div>
  )
}

export default InformationBox