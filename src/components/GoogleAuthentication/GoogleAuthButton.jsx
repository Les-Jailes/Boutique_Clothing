'use client';
import React from "react";
import '../../css/GoogleAuthenticationStyles/GoogleButtonStyles.css';
import { useRouter } from 'next/navigation';
import { signInWithGoogle } from '@/Context/authContext'; 


const iconGoogle = "https://i.postimg.cc/2yChFw3L/google-icon.png";

function GoogleAuthButton() {
  const router = useRouter(); 

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push('/'); 
    } catch (error) {
      console.error(error);
    }
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
