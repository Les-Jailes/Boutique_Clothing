'use client'
import React,{useState} from 'react'
import styles from './page.module.css'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import {AiOutlineUser,AiOutlineLock, AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import {validateEmail, validatePassword} from '@/utils/formValidations'

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [validationEmail, setValidationEmail] = useState(false);
  const [valiEmailMessage, setValiEmailMessage] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [validationPassword, setValidationPassword] = useState(false);
  const [valiPasswordMessage, setValiPasswordMessage] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const session = useSession()
  const router = useRouter()
  if(session.status === "loading"){
    return <p>Loading Authentication from Server</p>
  }
  if(session.status === "authenticated"){
    router.push("/");
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    signIn('credentials', { email, password });
  }


  const handleEmailChange = (e) => {
    const updatedEmail = e.target.value;
    setEmailInput(updatedEmail);
    validateEmailInput(updatedEmail);
  };

  const handlePasswordChange = (e) => {
    const updatedPassword = e.target.value;
    setPasswordInput(updatedPassword);
    validatePasswordInput(updatedPassword);
  };

  const validateEmailInput = (email) => {
    const [isValid, validationResult] = validateEmail(email);
    if (isValid) {
      setValidationEmail(false);
    } else {
      setValidationEmail(true);
      setValiEmailMessage(validationResult);
    }
  };

  const validatePasswordInput = (password) => {
    const [isValid, validationResult] = validatePassword(password);
    if (isValid) {
      setValidationPassword(false);
    } else {
      setValidationPassword(true);
      setValiPasswordMessage(validationResult);
    }
  };

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
            <input type="email" onChange={handleEmailChange} value={emailInput} maxLength={30} placeholder='Email' className={styles.input} required/>
            <p className={styles.validation}>{validationEmail ? valiEmailMessage : ''}</p>
          </div>
          <div className={styles.inputBox}>
            <AiOutlineLock className={styles.icon} />
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              className={styles.input}
              value={passwordInput}
              onChange={handlePasswordChange}
              maxLength={16}
              required
            />
            <p className={styles.validation}>
              {validationPassword ? valiPasswordMessage : ''}
            </p>
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