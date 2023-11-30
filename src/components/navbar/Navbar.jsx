"use client";
import React, { useEffect, useState } from "react";
import style from "./navbar.module.css";
import MenuItems from "@/components/navbar/menuItems/MenuItems";
import NavbarFooter from "./navbarFooter/NavbarFooter";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const session = useSession();

  useEffect(() => {
    let test = window.location.pathname.includes("/pages/searcher");
    if (!test) {
      setSearchTerm("");
      localStorage.removeItem("lastSearch");
    }
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = "/pages/account/login";
  };

  const clearSearch = () => {
    setSearchTerm("");
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

  useEffect(() => {
    if (session.status === "authenticated") {
      setIsLogged(true);
    }
  }, [session]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogoClick = () => {
    setSearchTerm("");
    localStorage.removeItem("lastSearch");
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

  useEffect(() => {
    const lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch) {
      setSearchTerm(lastSearch);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      const lastSearch = localStorage.getItem("lastSearch");
      if (lastSearch) {
        setSearchTerm(lastSearch);
      } else {
        setSearchTerm("");
      }
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <div className={`${style.header} ${scrolled ? style.active : ""}`}>
      <div className={style.container}>
        <Link href={"/"} onClick={handleLogoClick} className={style.logoLink}>
          <Image
            src="https://i.postimg.cc/FzHMbWPS/logo.png"
            alt="logo"
            className={style.logoImg}
            width={100}
            height={60}
            draggable={false}
            priority
          />
        </Link>
        <div className={style.searchContainer}>
          <form onSubmit={handleSearchSubmit} className={style.searchBar}>
            <input
              type="text"
              placeholder="Search ..."
              className={style.searchBarInput}
              onChange={handleSearchChange}
              value={searchTerm}
              maxLength={200}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                type="button"
                className={style.clearButton}
              >
                X
              </button>
            )}
            <button type="submit" className={style.searchButton}>
              <div className={style.imgContainer}>
                <AiOutlineSearch color="#fff" size={24} />
              </div>
            </button>
          </form>
        </div>
        <MenuItems isLogged={isLogged} handleLogOut={() => handleSignOut()} />
      </div>
      <NavbarFooter />
    </div>
  );
};

export default Navbar;
