import React from "react";
import SessionOption from "./SessionOption";
import UserListOptions from "./UserListOptions";

const UserListMenu = ({ isLogged, isOpen, handleLogOut }) => {
  return (
    <div className={ `user-list-container ${ isOpen ? 'is-open' : '' }` }>
      <SessionOption isLogged={ isLogged } />
      {isLogged && <UserListOptions />}
      <button className={ `log-out-option ${ isLogged ? 'is-logged' : '' }` } onClick={ handleLogOut } >
        Log out
      </button>
    </div>
  )
};

export default UserListMenu;
