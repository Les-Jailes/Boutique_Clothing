import React from "react";
import '@/css/UserOption/SessionOptions.css'

const SessionOption = ({ isLogged }) => {
  return (
    <div className={ `session-option-container ${ !isLogged ? 'is-not-logged' : '' }` }>
      <a href="/pages/account/login" className="log-in-option">
        Log In
      </a>
      <a href="/pages/account/signup" className="sign-up-option">
        Sign Up
      </a>
    </div>
  )
};

export default SessionOption;
