'use client';
import React from "react";
import '../../css/GoogleAuthenticationStyles/GoogleButtonStyles.css';

const iconGoogle = "https://i.postimg.cc/2yChFw3L/google-icon.png";

function GoogleAuthButton({ onSignIn }) {
  return (
    <button className="google-button-container" onClick={onSignIn} >
      <div className="google-icon-wrapper">
        <img className="google-icon" src={iconGoogle} alt="Google Sign-In" />
      </div>
      <p className="button-text">Google</p>
    </button>
  );
}

export default GoogleAuthButton;
