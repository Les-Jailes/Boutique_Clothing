"use client";

import Dropdown from "../dropdown/Dropdown";
import style from "./menu.module.css";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";

const MenuItems = ({ items }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <li className={style.menuItems}>
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            <AiOutlineMenu
              size={24}
              title="Menu Bar"
              color="black"
              className={style.icons}
            />
            {items.title}{" "}
          </button>
          <Dropdown submenus={items.submenu} dropdown={dropdown} />
        </>
      ) : items.icon === "user" ? (
        <Link href={items.url}>
          <AiOutlineUser
            size={24}
            title="User"
            color="black"
            className={style.icons}
          />
        </Link>
      ) : (
        <Link href={items.url} onClick={() => console.log("Productos en el carrito:", cart)}>
          <AiOutlineShoppingCart
            size={24}
            title="Shopping cart"
            color="black"
            className={style.icons}
          />
        </Link>
      )}
    </li>
  );
};

export default MenuItems;
