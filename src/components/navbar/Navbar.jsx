import React from 'react'
import style from './navbar.module.css'
import Image from 'next/image'
import { menuItems } from '@/utils/menuItems'
import MenuItems from '@/components/menuItems/MenuItems'

const Navbar = () => {
  return (
    <div className={style.container}>
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
        <ul className={style.menus}>
        {menuItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} />;
        })}
      </ul>
        </div>
    </div>
  )
}

export default Navbar