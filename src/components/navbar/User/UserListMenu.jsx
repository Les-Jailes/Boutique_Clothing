import React from "react";
import SessionOption from "./SessionOption";
import UserListOptions from "./UserListOptions";

const UserListMenu = ({ isLogged, isOpen }) => {
  return (
    <div className={ `user-list-container ${ isOpen ? 'is-open' : '' }` }>
      <SessionOption isLogged={ isLogged } />
      <UserListOptions />
      <button className={ `log-out-option ${ isLogged ? 'is-logged' : '' }` }>
        Log out
      </button>
    </div>
  )
};

export default UserListMenu;
