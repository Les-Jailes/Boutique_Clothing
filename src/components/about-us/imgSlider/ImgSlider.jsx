'use client'
import React, { useState, useEffect} from 'react' 
import styles from './slider.module.css'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa' 
import { sliderImgs } from '@/utils/aboutUsUtils'
import Image from 'next/image'

const ImageSlider = () => {
  const [currentImg, setCurrent] = useState(0)
  const length = sliderImgs.length

  const nextSlide = () => {
      setCurrent((currentImg + 1) % length);
  };

  const prevSlide = () => {
      setCurrent((currentImg - 1 + length) % length);
  };
  const prevIndex = (currentImg - 1 + length) % length;
  const nextIndex = (currentImg + 1) % length;

  useEffect(() => {
      setCurrent((currentImg + length) % length);
  }, [currentImg, length]);

  if (!Array.isArray(sliderImgs) || sliderImgs.length <= 0) {
    return null;
}
  return (
    <div className={styles.container}>
        <h2 className={styles.title}>Our team</h2>
        <div className={styles.slider}>
            <FaArrowAltCircleLeft size={30} className={styles.leftArrow} onClick={prevSlide} />
            <div className={styles.imgSliderContainer}>
                <div className={styles.sideImage}>
                    {sliderImgs[prevIndex] && (
                    <Image
                        src={sliderImgs[prevIndex].img} alt={sliderImgs[prevIndex].alt} className={styles.imgSide}   
                        width={500}
                        height={500}
                    />
                    )}
                    <p className={styles.sideName}> {sliderImgs[prevIndex].name}</p>
                </div>

                <div className={styles.mainImage}>
                    <FaArrowAltCircleLeft size={80} className={styles.arrowMobile} onClick={prevSlide} />
                        <div>
                            {sliderImgs.map((slide, index) => (
                                <div
                                    className={index === currentImg ? `${styles.slide} ${styles.active}` : styles.slide}
                                    key={index}
                                >
                                    
                                    {index === currentImg && (
                                    <Image
                                        src={slide.img} alt={slide.alt} className={styles.img} 
                                        width={500}
                                        height={500}
                                    />
                                    )}
                                </div>
                            ))}
                            <p className={styles.mainName}>{sliderImgs[currentImg].name}</p>
                        </div>
                    <FaArrowAltCircleRight size={80} className={styles.arrowMobile} onClick={nextSlide} />
                </div>
                <div className={styles.sideImage}>
                    {sliderImgs[nextIndex] && (
                    <Image
                        src={sliderImgs[nextIndex].img} alt={sliderImgs[prevIndex].alt} className={styles.imgSide} 
                        width={500}
                        height={500}
                    />
                    )}
                    <p className={styles.sideName}>{sliderImgs[nextIndex].name}</p>
                </div>
            </div>      
            <FaArrowAltCircleRight size={30} className={styles.rightArrow} onClick={nextSlide} />
        </div>
    </div>

  ) 
} 

export default ImageSlider 
