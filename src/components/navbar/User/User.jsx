"use client";

import React, { useState, useEffect, useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";
import "@/css/UserOption/User.css";
import UserListMenu from "./UserListMenu";

const User = () => {
  const [isOpenUser, setIsOpenUser] = useState(false);
  const userButtonRef = useRef(null);

  const handleOpenning = () => {
    setIsOpenUser(!isOpenUser);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target) &&
        isOpenUser
      ) {
        const userListMenu = document.querySelector(".user-list-container");
        if (userListMenu && userListMenu.contains(event.target)) {
          return;
        }
        setIsOpenUser(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpenUser]);

  return (
    <>
      <button
        className="user-option-button"
        onClick={() => handleOpenning()}
        ref={userButtonRef}
      >
        <AiOutlineUser color="black" size={24} />
      </button>
      <UserListMenu isLogged={false} isOpen={isOpenUser} />
    </>
  );
};

export default User;
