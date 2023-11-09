import React from "react";
import "@/css/SideMenu/SideMenuButton.css";

const SideMenuButton = ({ handleOpenning, isOpen, buttonRef }) => {
  return (
    <div className="side-menu-button-container">
      <button
        className="side-menu-button"
        onClick={() => handleOpenning()}
        ref={buttonRef}
      >
        <span className={`lines-side-menu ${isOpen ? "is-open" : ""}`}></span>
        <span className={`lines-side-menu ${isOpen ? "is-open" : ""}`}></span>
        <span className={`lines-side-menu ${isOpen ? "is-open" : ""}`}></span>
      </button>
    </div>
  );
};

export default SideMenuButton;
