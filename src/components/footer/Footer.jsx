'use client'
import Link from 'next/link'
import React from 'react'
import styles from './footer.module.css'
import {onlineShop, getHelp, socialLinks} from '@/utils/footerItems'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <div>
      <div>
        <h2>Boutique Clothing</h2>
        <p>Copyright © {currentYear} Boutique Clothing</p>
        <p>All rights reserved</p>
      </div>
      <div>
        <h3>Online Shop</h3>
          {onlineShop.map((item, index) => (
            <Link key={index} href={item.url}> {item.title}</Link>
          ))}
      </div>
      <div>
        <h3>Get Help</h3>
        {getHelp.map((item, index) => (
          <Link key={index} href={item.url}> {item.title}</Link>
        ))}
      </div>
      <div>
        <h3>Follow us</h3>
        <div>
            <ul>
              {socialLinks.map((item, index) => (
                <Link
                  href={item.url}
                  target="__blank"
                  key={index}
                >
                  <i>{item.icon}</i>
                </Link>
              ))}
            </ul>
        </div>
      </div>
    </div>
    
  )
}

export default Footer