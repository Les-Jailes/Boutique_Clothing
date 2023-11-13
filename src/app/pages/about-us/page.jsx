import MainBox from '@/components/about-us/MainBox'
import styles from './page.module.css'
import React from 'react'
import InformationBox from '@/components/about-us/infoBox/InformationBox'
import { aboutUsInfo } from '@/utils/aboutUsUtils'
import ImgSlider from '@/components/about-us/imgSlider/ImgSlider'

const Aboutus = () => {
  return (
    <div>
      <MainBox />
      <div className={styles.container}>
        {aboutUsInfo.map((info, index)=>(
            <InformationBox 
            title={info.title}
            content={info.content}
            img={info.img}
            reverse={info.reverse}
            key={index}
          />
        ))}
        <ImgSlider/>
      </div>
      
    </div>
  )
}

export default Aboutus