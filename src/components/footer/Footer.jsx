'use client'
import Link from 'next/link'
import React from 'react'
import styles from './footer.module.css'
import {onlineShop, getHelp, socialLinks} from '@/utils/footerItems'
import Image from 'next/image'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (

      <div className = {styles.footer}>
        <div className={styles.footerItem}>
          
          <Image 
          src={"/logoWhite.png"}
          alt='logo boutique'
          width={180}
          height={180}
          className={styles.img}
          priority
          />
          <p className={styles.copyText}>Copyright © {currentYear} Boutique Clothing</p>
          <p className={styles.copyText}>All rights reserved</p>
        </div>
        <div className={styles.footerItem}>
          <h3 className={styles.title}>Online Shop</h3>
            {onlineShop.map((item, index) => (
              <Link key={index} href={item.url} className={styles.link}> {item.title}</Link>
            ))}
        </div>
        <div className={styles.footerItem}>
          <h3 className={styles.title} >Get Help</h3>
          {getHelp.map((item, index) => (
            <Link key={index} href={item.url} className={styles.link}> {item.title}</Link>
          ))}
        </div>
        <div className={styles.footerItem}>
          <h3 className={styles.titleFollow}>Follow us</h3>
          <div className={styles.socialLinks}>
            {socialLinks.map((item, index) => (
              <Link
                href={item.url}
                target="__blank"
                key={index}
                className={styles.socialLink}
              >
                <i className={styles.icon}>{item.icon}</i>
              </Link>
            ))}
          </div>
        </div>    
      </div>  
  )
}

export default Footer