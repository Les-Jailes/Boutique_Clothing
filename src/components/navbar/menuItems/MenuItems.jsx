"use client";

import { useState } from "react";
import CartButton from "../Cart/CartButton";
import SideMenu from "../SideMenu/SideMenu";
import User from "../User/User";

const MenuItems = ({ items }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="menu-items-container">
      <User />
      <CartButton />
      <SideMenu />
    </div>
  );
};

export default MenuItems;
