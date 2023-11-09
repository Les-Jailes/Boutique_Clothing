"use client";
import styles from './page.module.css';
import React from 'react';
import { signOut } from 'next-auth/react'; // Importar la función signOut de next-auth

const Aboutus = () => {
  // Función para manejar el cierre de sesión
  const handleSignOut = async () => {
    // Redirigir al usuario a la página principal después de cerrar sesión
    await signOut({ redirect: false });
    window.location.href = '/'; // o la ruta a la que quieras redirigir después de cerrar sesión
  };

  return (
    <div className={styles.container}>
      <div>About us</div>
      {/* Botón de cierre de sesión */}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Aboutus;
