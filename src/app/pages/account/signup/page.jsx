'use client'
import React,{useState} from 'react'
import styles from './page.module.css'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import {AiOutlineUser,AiOutlineLock, AiOutlineEye,AiOutlineEyeInvisible, AiOutlineFontSize} from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import {validateEmail, validatePassword} from '@/utils/formValidations'

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [validationEmail, setValidationEmail] = useState(false);
  const [valiEmailMessage, setValiEmailMessage] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [validationPassword, setValidationPassword] = useState(false);
  const [valiPasswordMessage, setValiPasswordMessage] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [userNameInput, setUsernameInput] = useState('');

  const session = useSession()
  const router = useRouter()
  if(session.status === "loading"){
    return <p>Loading Authentication from Server</p>
  }
  if(session.status === "authenticated"){
    router.push("/");
}
  console.log(session)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    
    const valid = validateEmailInput(email) && validatePasswordInput(password)
    if (valid) {
      signIn('credentials', { email, password });
    }
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
  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setUsernameInput(username);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Sign Up</h1>
          <div className={styles.inputBox}>
          <AiOutlineFontSize className={styles.icon}/>
            <input type="text" onChange={handleUsernameChange} value={userNameInput} placeholder='Username' className={styles.input} required/>
            <p className={styles.validation}>{validationEmail ? valiEmailMessage : ''}</p>
          </div>
          <div className={styles.inputBox}>
          <AiOutlineUser className={styles.icon}/>
            <input type="email" onChange={handleEmailChange} value={emailInput} placeholder='Email' className={styles.input} required/>
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
          <button className={styles.button}>Create account</button>
        </form>
        <div className={styles.bottomSignUp}>
          <p className={styles.signUpTxt}>Already have an account?</p>
          <Link href={"/pages/account/login"} className={styles.signUpButton}>Log In</Link>
      </div>
      </div>
    </div>
  )
}

export default SignUp