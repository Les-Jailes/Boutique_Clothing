import Link from 'next/link'
import React from 'react'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <div>
      <div>
        <h2>Boutique Clothing</h2>
        <p>Copyright @ 2023 Boutique Clothing</p>
        <p>All rights reserved</p>
      </div>
      <div>
        <h3>Online Shop</h3>
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>See Products</Link>
        <Link href={"/"}>About us</Link>
        <Link href={"/"}>Contact us</Link>
        <Link href={"/"}>Settings</Link>
      </div>
      <div>
        <h3>Get Help</h3>
        <Link href={"/"}>FAQ</Link>
        <Link href={"/"}>Payment Options</Link>
        <Link href={"/"}>Watch Tutorial</Link>
      </div>
      <div>
        <h3>Follow us</h3>
        <div>
            Icons
        </div>
      </div>
    </div>
    
  )
}

export default Footer