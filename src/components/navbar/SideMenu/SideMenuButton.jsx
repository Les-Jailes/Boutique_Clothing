import React from "react";
import "@/css/SideMenu/SideMenuButton.css";

const SideMenuButton = ({ handleOpenning, isOpen, ref }) => {
  return (
    <div className="side-menu-button-container">
      <button className="side-menu-button" onClick={() => handleOpenning()} ref={ref}>
        <span className={`lines-side-menu ${isOpen ? "is-open" : ""}`}></span>
        <span className={`lines-side-menu ${isOpen ? "is-open" : ""}`}></span>
        <span className={`lines-side-menu ${isOpen ? "is-open" : ""}`}></span>
      </button>
    </div>
  );
};

export default SideMenuButton;
