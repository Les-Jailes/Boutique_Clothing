"use client";

import { useState } from "react";
import CartButton from "../Cart/CartButton";
import SideMenu from "../SideMenu/SideMenu";

const MenuItems = ({ items }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="menu-items-container">
      <CartButton />
      <SideMenu />
    </div>
  );
};

export default MenuItems;
