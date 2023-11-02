'use client'
import React from 'react'
import style from './navbar.module.css'
import { menuItems } from '@/utils/menuItems'
import MenuItems from '@/components/navbar/menuItems/MenuItems'
import NavbarFooter from './navbarFooter/NavbarFooter'
import Link from 'next/link'
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  return (
    <>
      <div className={style.container}>
        <Link href={"/"} className={style.logoLink}>
          <img
            src="https://i.postimg.cc/FzHMbWPS/logo.png"
            alt='logo'
            className={style.logoImg}
          />
        </Link>
        <div className={style.searchContainer}>
            <form action="" className={style.searchBar}>
                <input type="text" placeholder='Search ...' className={style.searchBarInput}/>
                <button type='submit' className={style.searchButton}> 
                  <div className={style.imgContainer}>
                    <AiOutlineSearch color='#fff' size={24} />
                  </div>
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
    </>
  )
}

export default Navbar