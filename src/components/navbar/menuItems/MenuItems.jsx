"use client";

import { useState } from "react";
import { AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import CartButton from "../CartButton/CartButton";

const MenuItems = ({ items }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="menu-items-container">
      <CartButton />
    </div>
  );
};

export default MenuItems;
