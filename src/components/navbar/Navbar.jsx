"use client";
import React, { useEffect, useState } from "react";
import style from "./navbar.module.css";
import { menuItems } from "@/utils/menuItems";
import MenuItems from "@/components/navbar/menuItems/MenuItems";
import NavbarFooter from "./navbarFooter/NavbarFooter";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const session = useSession();
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = '/pages/account/login'; 
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${style.header} ${scrolled ? style.active : ""}`}>
      <div className={style.container}>
        <Link href={"/"} className={style.logoLink}>
          <img
            src="https://i.postimg.cc/FzHMbWPS/logo.png"
            alt="logo"
            className={style.logoImg}
          />
        </Link>
        <div className={style.searchContainer}>
          <form action="" className={style.searchBar}>
            <input
              type="text"
              placeholder="Search ..."
              className={style.searchBarInput}
            />
            <button type="submit" className={style.searchButton}>
              <div className={style.imgContainer}>
                <AiOutlineSearch color="#fff" size={24} />
              </div>
            </button>
          </form>
        </div>        
        <div className={style.authContainer}>
        {session.status === "authenticated" ? (
          <button className={style.logout} onClick={handleSignOut}>Log Out</button>
        ) :(
            <>
              <Link href={"/pages/account/signup"} className={style.register}>Sign up</Link>
              <Link href={"/pages/account/login"} className={style.login}>Log in</Link>
              
            </>
        )}
        </div>
        <MenuItems />


      </div>
      <NavbarFooter />
    </div>
  );
};

export default Navbar;
