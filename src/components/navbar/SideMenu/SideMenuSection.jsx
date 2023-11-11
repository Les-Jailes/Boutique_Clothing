import React from "react";
import SearchBarSideMenu from "./SearchBarSideMenu";
import "@/css/SideMenu/SideMenuSection.css";
import {
  SideMenuOptionsWithSubMenu,
  SideMenuOptionsWithinSubMenu,
} from "./SideMenuOptions";

const SideMenuSection = ({ menuOptions, isOpen }) => {
  return (
    <div
      className={`side-menu-container ${isOpen ? "is-open" : ""}`}
    >
      <SearchBarSideMenu />
      <div className="list-options-side-menu-container">
        {menuOptions.map((menuOption, index) => {
          if (menuOption.submenu) {
            return <SideMenuOptionsWithSubMenu menuOption={menuOption} key={ index } />;
          } else {
            return <SideMenuOptionsWithinSubMenu menuOption={menuOption} key={ index } />;
          }
        })}
      </div>
    </div>
  );
};

export default SideMenuSection;