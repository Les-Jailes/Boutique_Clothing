import React from 'react'
import Link from 'next/link';

const NoProductsFound = () => {
  return (
    <div className='nf-container'>
        <div className='nf-top'>
            <h2 className='nf-status'>Your Wishlist is Empty</h2>
        </div>
        <div className='nf-bottom'>
            <p className='nf-message'>You do not have any items saved to your wishlist yet. 
        Browse our products and save your favorite items to build your wishlist!</p>
            <Link href={"/pages/products"} className='nf-button'>GO TO PRODUCTS</Link>
        </div>
    </div>
  )
}

export default NoProductsFound