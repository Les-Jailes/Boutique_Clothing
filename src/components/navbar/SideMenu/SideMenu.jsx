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
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sideMenuRef.current &&
        !sideMenuRef.current.contains(event.target) &&
        isOpen
      ) {
        const sideMenuSection = document.querySelector(".side-menu-container");
        if (sideMenuSection && sideMenuSection.contains(event.target)) {
          return;
        }
        setIsOpen(false);
      }
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
        buttonRef={sideMenuRef}
      />
      <div onClick={ (e) => e.stopPropagation() }>
        <SideMenuSection menuOptions={sideMenuItems} isOpen={isOpen} />
      </div>
    </>
  );
};

export default SideMenu;
