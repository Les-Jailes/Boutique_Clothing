"use client";
import React from "react";
import "../../css/GoogleAuthenticationStyles/GoogleButtonStyles.css";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

function GoogleAuthButton() {
  const handleSignIn = (e) => {
    e.preventDefault();
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <button className="google-button-container" onClick={handleSignIn}>
      <div className="google-icon-wrapper">
        <FcGoogle className="google-icon" />
      </div>
      <p className="button-text">Google</p>
    </button>
  );
}

export default GoogleAuthButton;
