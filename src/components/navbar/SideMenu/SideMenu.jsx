'use client'

import React, {useState} from "react"
import sideMenuItems from '@/utils/SideMenuItems.json'
import SideMenuButton from "./SideMenuButton";
import SideMenuSection from "./SideMenuSection";

const SideMenu = () => {

  const [isOpen, setIsOpen] = useState(false)

  const handleOpennig = () => {
    setIsOpen(!isOpen)
    console.log(isOpen)
  }

  return (
    <>
      <SideMenuButton handleOpenning={ handleOpennig } isOpen={ isOpen } />
      <SideMenuSection menuOptions={ sideMenuItems } isOpen={ isOpen } />
    </>
  )
};

export default SideMenu;
