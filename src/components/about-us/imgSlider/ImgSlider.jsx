'use client'
import React, { useState } from 'react' 
import styles from './slider.module.css'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa' 
import { sliderImgs } from '@/utils/aboutUsUtils'
import Image from 'next/image'

const ImageSlider = () => {
  const [currentImg, setCurrent] = useState(0) 
  const length = sliderImgs.length 

  const nextSlide = () => {
    setCurrent(currentImg === length - 1 ? 0 : currentImg + 1) 
  } 

  const prevSlide = () => {
    setCurrent(currentImg === 0 ? length - 1 : currentImg - 1) 
  } 

  if (!Array.isArray(sliderImgs) || sliderImgs.length <= 0) {
    return null 
  }
  const prevIndex = (currentImg - 1 + length) % length;
  const nextIndex = (currentImg + 1) % length; 
  return (
    <div className={styles.slider}>
      <FaArrowAltCircleLeft className={styles.leftArrow} onClick={prevSlide} />
      <div className={styles.sideImage}>
        {sliderImgs[prevIndex] && (
          <Image
            src={sliderImgs[prevIndex].img} alt={sliderImgs[prevIndex].alt} className={styles.imgSide}   
            width={500}
            height={500}
          />
          
        )}
      </div>

      <div className={styles.mainImage}>
        {sliderImgs.map((slide, index) => (
          <div
            className={index === currentImg ? `${styles.slide} ${styles.active}` : styles.slide}
            key={index}
          >
            {index === currentImg && (
              <Image
                src={slide.img} alt={sliderImgs[prevIndex].alt} className={styles.img} 
                width={500}
                height={500}
               />
            )}
          </div>
        ))}
      </div>

      <div className={styles.sideImage}>
        {sliderImgs[nextIndex] && (
          <Image
            src={sliderImgs[nextIndex].img} alt={sliderImgs[prevIndex].alt} className={styles.imgSide} 
            width={500}
            height={500}
           />
        )}
      </div>
      
      <FaArrowAltCircleRight className={styles.rightArrow} onClick={nextSlide} />
    </div>
  ) 
} 

export default ImageSlider 
