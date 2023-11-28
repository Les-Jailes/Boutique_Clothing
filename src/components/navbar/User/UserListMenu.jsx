import React from "react";
import SessionOption from "./SessionOption";
import UserListOptions from "./UserListOptions";

const UserListMenu = ({ isLogged, isOpen, handleLogOut }) => {
  return (
<<<<<<< HEAD
    <div className={ `user-list-container ${ isOpen ? 'is-open' : '' }` }>
      <SessionOption isLogged={ isLogged } />
      {isLogged && <UserListOptions />}
      <button className={ `log-out-option ${ isLogged ? 'is-logged' : '' }` } onClick={ handleLogOut } >
        Log out
      </button>
=======
    <div className={`user-list-container ${isOpen ? 'is-open' : ''}`}>
      {isLogged ? (
        <>
          <UserListOptions />
          <button className={`log-out-option ${isLogged ? 'is-logged' : ''}`} onClick={handleLogOut}>
            Log out
          </button>
        </>
      ) : (
        <SessionOption />
      )}
>>>>>>> 10092d978408b748bc1f8b8880ca4d8221a1e4f3
    </div>
  );
};

export default UserListMenu;