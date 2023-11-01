'use client'
import Image from "next/image";
import Dropdown from "../dropdown/Dropdown";
import style from './menu.module.css'
import { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";

const MenuItems = ({ items }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <li className={style.menuItems}>
      {items.submenu ? (
        <>
          <button type="button" aria-haspopup="menu"
          aria-expanded={dropdown ? "true" : "false"}
          onClick={() => setDropdown((prev) => !prev)}>
            <FaBars 
              size={30}
              title="Menu Bar"
              color="black"
              className={style.icons}
            />
            {items.title}{' '}
          </button>
          <Dropdown submenus={items.submenu}
          dropdown = {dropdown} />
        </>
      ) : (
          items.icon === 'user'?(
            <Link href={items.url}>
            <AiOutlineUser
            size={35}
            title="User"
            color="black"
            className={style.icons}
             />
          </Link>
          ) :(
            <Link href={items.url}>
            <BsCart4 
            size={35}
            title="Shopping cart"
            color="black"
            className={style.icons}
            />
            
          </Link>
          )
      )}
    </li>
  );
};

export default MenuItems;