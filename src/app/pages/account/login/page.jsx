'use client'
import React,{useState} from 'react'
import styles from './page.module.css'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import {AiOutlineUser,AiOutlineLock, AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const session = useSession()
  console.log(session)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    alert(email +" " + password)
    signIn("credentials", {email, password})
  }

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Log In</h1>
          <div className={styles.inputBox}>
          <AiOutlineUser className={styles.icon}/>
            <input type="email" placeholder='Email' className={styles.input} required/>
            
          </div>
          <div className={styles.inputBox}>
            <AiOutlineLock className={styles.icon} />
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              className={styles.input}
              required
            />
            {passwordVisible ? (
              <AiOutlineEyeInvisible
                className={styles.iconLock}
                onClick={handlePasswordToggle}
              />
            ) : (
              <AiOutlineEye className={styles.iconLock} onClick={handlePasswordToggle} />
            )}
          </div>
          <button className={styles.button}>Log in</button>
        </form>
        <div className={styles.bottomSignUp}>
          <p className={styles.signUpTxt}>Don&apos;t you have an account?</p>
          <Link href={"/pages/account/signup"} className={styles.signUpButton}>Sign Up</Link>
      </div>
      </div>
    </div>
  )
}

export default Login