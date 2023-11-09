"use client";

import React, { useState, useEffect, useRef } from "react";
import sideMenuItems from "@/utils/SideMenuItems.json";
import SideMenuButton from "./SideMenuButton";
import SideMenuSection from "./SideMenuSection";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sideMenuRef = useRef(null);

  const handleOpennig = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sideMenuRef.current &&
        !sideMenuRef.current.contains(event.target) &&
        SideMenuSection.contains(event.target)
      ) {
        return;
      }
      setIsOpen(false);
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <SideMenuButton
        handleOpenning={handleOpennig}
        isOpen={isOpen}
        ref={sideMenuRef}
      />
      <SideMenuSection
        menuOptions={sideMenuItems}
        isOpen={isOpen}
      />
    </>
  );
};

export default SideMenu;