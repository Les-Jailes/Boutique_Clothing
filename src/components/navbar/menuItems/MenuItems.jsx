'use client'
import Image from "next/image";
import Dropdown from "../dropdown/Dropdown";
import style from './menu.module.css'
import { useState } from "react";
import Link from "next/link";

const MenuItems = ({ items }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <li className={style.menuItems}>
      {items.submenu ? (
        <>
          <button type="button" aria-haspopup="menu"
          aria-expanded={dropdown ? "true" : "false"}
          onClick={() => setDropdown((prev) => !prev)}>
            <Image
              src={items.src}
              alt={items.alt}
              width={40}
              height={40}
              className={style.img}
            />
            {items.title}{' '}
          </button>
          <Dropdown submenus={items.submenu}
          dropdown = {dropdown} />
        </>
      ) : (
            <Link href={items.url}>
                <Image
                src={items.src}
                alt={items.alt}
                width={40}
                height={40}
                className={style.img}
              />
            </Link>
      )}
    </li>
  );
};

export default MenuItems;