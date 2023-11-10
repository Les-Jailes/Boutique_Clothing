"use client";
import styles from './page.module.css';
import React from 'react';
import { signOut } from 'next-auth/react';

const Aboutus = () => {
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = '/pages/account/login'; 
  };

  return (
    <div className={styles.container}>
      <div>About us</div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Aboutus;
