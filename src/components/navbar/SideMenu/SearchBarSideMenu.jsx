import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import '@/css/SideMenu/SearchBarSideMenu.css'

const SearchBarSideMenu = () => {
  return (
    <div className="search-bar-side-menu-container">
      <form className="search-bar-side-menu">
        <input
          type="text"
          name="search-bar"
          id="search-bar"
          className="search-bar-input"
          placeholder="Search..."
        />
        <button className="search-bar-button-sm">
          <AiOutlineSearch color="white" size={18} />
        </button>
      </form>
    </div>
  );
};

export default SearchBarSideMenu;
