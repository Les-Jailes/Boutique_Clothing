"use client";
import React, { useEffect, useState } from "react";
import style from "./navbar.module.css";
import MenuItems from "@/components/navbar/menuItems/MenuItems";
import NavbarFooter from "./navbarFooter/NavbarFooter";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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
        <MenuItems />
      </div>
      <NavbarFooter />
    </div>
  );
};

export default Navbar;
