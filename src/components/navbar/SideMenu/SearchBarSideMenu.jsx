import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "@/css/SideMenu/SearchBarSideMenu.css";

const SearchBarSideMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch) {
      setSearchTerm(lastSearch);
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      localStorage.removeItem("lastSearch");
      window.location.href = `/pages/products`;
    } else {
      localStorage.setItem("lastSearch", searchTerm);
      window.location.href = `/pages/searcher?query=${encodeURIComponent(
        searchTerm
      )}`;
    }
  };

  return (
    <div className="search-bar-side-menu-container">
      <form onSubmit={handleSearchSubmit} className="search-bar-side-menu">
        <input
          type="text"
          name="search-bar"
          id="search-bar"
          className="search-bar-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button onClick={clearSearch} type="button" className="clear-button">
            X
          </button>
        )}
        <button className="search-bar-button-sm">
          <AiOutlineSearch color="white" size={18} />
        </button>
      </form>
    </div>
  );
};

export default SearchBarSideMenu;
