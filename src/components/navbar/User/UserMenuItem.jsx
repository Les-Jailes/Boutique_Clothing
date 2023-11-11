import React from "react";

const UserMenuItem = ({ menuItem }) => {
  return (
    <a href={ menuItem.path } className="user-menu-item">
      { menuItem.name }
    </a>
  )
};

export default UserMenuItem;
