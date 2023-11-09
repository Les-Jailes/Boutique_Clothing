"use client";

import React, { useState } from "react";

export const SideMenuOptionsWithinSubMenu = ({ menuOption }) => {
  return (
    <a href={menuOption.path} className="side-menu-option">
      {menuOption.name}
    </a>
  );
};

export const SideMenuOptionsWithSubMenu = ({ menuOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenning = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="side-menu-option with-submenu">
      <div className="first-option-container" onClick={() => handleOpenning()}>
        <div className="main-button-with-submenu">
          <div className="link-menu-option-with-submenu-container">
            <a href={menuOption.path} className="side-menu-option-link">
              {menuOption.name}
            </a>
          </div>
          <button
            className="open-submenu-button"
            onClick={() => handleOpenning()}
          >
            <line
              className={`line-submenu-button ${isOpen ? "active" : ""}`}
            ></line>
            <line
              className={`line-submenu-button ${isOpen ? "active" : ""}`}
            ></line>
          </button>
        </div>
        <div
          className={`list-submenu-menu-option-sm ${
            isOpen ? "submenu-open" : ""
          }`}
        >
          {menuOption.submenu.map((submenu, index) => {
            return <SubmenuSideMenu submenu={submenu} />;
          })}
        </div>
      </div>
    </div>
  );
};

const SubmenuSideMenu = ({ submenu }) => {
  return (
    <a className="submenu-menu-option-sm" href={submenu.path}>
      {submenu.name}
    </a>
  );
};
