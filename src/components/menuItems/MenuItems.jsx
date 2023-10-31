'use client'
import Dropdown from "../dropdown/Dropdown";
import style from './menu.module.css'
import { useState } from "react";

const MenuItems = ({ items }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <li className={style.menuItems}>
      {items.submenu ? (
        <>
          <button type="button" aria-haspopup="menu"
          aria-expanded={dropdown ? "true" : "false"}
          onClick={() => setDropdown((prev) => !prev)}>
            {items.title}{' '}
          </button>
          <Dropdown submenus={items.submenu}
          dropdown = {dropdown} />
        </>
      ) : (
        <a href={items.url}>{items.title}</a>
      )}
    </li>
  );
};

export default MenuItems;