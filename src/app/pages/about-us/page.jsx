import MainBox from '@/components/about-us/MainBox'
import styles from './page.module.css'
import React from 'react'
import InformationBox from '@/components/about-us/infoBox/InformationBox'

const Aboutus = () => {
  return (
    <div>
      <MainBox />
      <InformationBox 
        title={"History"}
        content={"A few years ago, in an exciting twist of fate, six close friends came together to bring Boutique Clothing to life. What started as a passionate conversation about the lack of authentic options in fashion, turned into an unforgettable journey. Through ups and downs, we managed to turn our vision into reality. On a rainy spring afternoon, while sharing laughter and dreams, we decided that the world deserved an online shopping experience that not only offered stylish clothes, but also a touch of joy and authenticity. It was that moment of inspiration that prompted us to create Boutique Clothing, a store that reflects the excitement and confidence we feel for fashion."}
        img={"/history.jpg"}
      />
    </div>
  )
}

export default Aboutus