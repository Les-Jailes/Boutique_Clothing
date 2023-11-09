'use client';
import React from "react";
import '../../css/GoogleAuthenticationStyles/GoogleButtonStyles.css';
import { signIn } from "next-auth/react";


const iconGoogle = "https://i.postimg.cc/2yChFw3L/google-icon.png";

function GoogleAuthButton() {
  const handleSignIn = (e) => {
    e.preventDefault(); 
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <button className="google-button-container" onClick={handleSignIn} >
      <div className="google-icon-wrapper">
        <img className="google-icon" src={iconGoogle} alt="Google Sign-In" />
      </div>
      <p className="button-text">Google</p>
    </button>
  );
}

export default GoogleAuthButton;
