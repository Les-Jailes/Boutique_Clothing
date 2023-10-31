import React from 'react'
import style from './navbar.module.css'
import Image from 'next/image'
import { menuItems } from '@/utils/menuItems'
import MenuItems from '@/components/menuItems/MenuItems'
import NavbarFooter from '../navbarFooter/NavbarFooter'

const Navbar = () => {
  return (
    <div>
      <div className={style.container}>
        LOGO
        <div className={style.searchContainer}>
            <form action="" className={style.searchBar}>
                <input type="text" placeholder='Search ...' className={style.searchBar}/>
                <button type='submit' className={style.searchButton}> 
                    <Image
                        src={"/searcher.png"}
                        alt='search img'
                        width={15}
                        height={15}
                        className={style.img}
                     />
                </button>
            </form>
        </div> 
        <div>
          <ul className={style.menuItems}>
            {menuItems.map((menu, index) => {
              return <MenuItems items={menu} key={index} />;
            })}
          </ul>
        </div>
      </div>
      <NavbarFooter />
    </div>
  )
}

export default Navbar