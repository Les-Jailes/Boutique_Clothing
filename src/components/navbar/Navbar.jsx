import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div>
        LOGO
        <div>
            <form action="" className='search-bar'>
                <input type="text" placeholder='Search ...' className='search-input'/>
                <button type='submit'>
                    <Image
                        src={"/searcher.png"}
                        alt='search img'
                        width={40}
                        height={40}
                     />
                </button>
            </form>
        </div> 
        <div>
            
        </div>
    </div>
  )
}

export default Navbar