import React from "react";
import SearchBarSideMenu from "./SearchBarSideMenu"
import '@/css/SideMenu/SideMenuSection.css'
import { SideMenuOptionsWithSubMenu, SideMenuOptionsWithinSubMenu } from "./SideMenuOptions";

const SideMenuSection = ({ menuOptions, isOpen }) => {
  console.log(menuOptions)
  return (
    <div className={ `side-menu-container ${ isOpen ? 'is-open' : '' }` }>
      <SearchBarSideMenu />
      <div className="list-options-side-menu-container">
        {
          menuOptions.map((menuOption, index) => {
            if (menuOption.submenu) {
              return <SideMenuOptionsWithSubMenu menuOption={ menuOption } />
            } else {
              return <SideMenuOptionsWithinSubMenu menuOption={ menuOption } />
            }
          })
        }
      </div>
    </div>
  )
};

export default SideMenuSection;
