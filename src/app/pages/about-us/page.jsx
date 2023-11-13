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
        content={"lorem"}
        img={"/history.jpg"}
      />
    </div>
  )
}

export default Aboutus