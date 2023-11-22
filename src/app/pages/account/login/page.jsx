'use client'
import 'dotenv/config'
import React,{useState, useEffect} from 'react'
import styles from './page.module.css'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import {AiOutlineUser,AiOutlineLock, AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { validateEmail, validatePassword } from '@/utils/formValidations';
import GoogleAuthButton from '@/components/GoogleAuthentication/GoogleAuthButton';
import { showToast } from '@/components/Alerts/CustomToast'
import { showAccountAlreadyExistsAlert, showAccountAlreadyExistsAlertSingIn } from '../signup/confirmationAlert'
import api from '@/app/api/api'

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [validation, setValidation] = useState({ email: { valid: true, message: '' }, password: { valid: true, message: '' } });
  const session = useSession()
  const router = useRouter()
  const isEmailValid = () => {
    if (emailInput.trim() === '') {
      setValidation((prev) => ({
        ...prev,
        email: { valid: true, message: '' },
      }));
      return true;
    }

    const [isValid, validationResult] = validateEmail(emailInput);
    setValidation((prev) => ({
      ...prev,
      email: { valid: isValid, message: validationResult },
    }));
    return isValid;
  };

  const isPasswordValid = () => {
    if (passwordInput.trim() === '') {
      setValidation((prev) => ({
        ...prev,
        password: { valid: true, message: '' },
      }));
      return true;
    }

    const [isValid, validationResult] = validatePassword(passwordInput);
    setValidation((prev) => ({
      ...prev,
      password: { valid: isValid, message: validationResult },
    }));
    return isValid;
  };

  const handleInputChange = (e, inputType) => {
    const updatedInput = e.target.value;
    if (inputType === 'email') {
      setEmailInput(updatedInput);
    } else if (inputType === 'password') {
      setPasswordInput(updatedInput);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let flag;
    try{
      const user = await api.get('/User/email/'+  emailInput);
      flag = false;
    }
    catch(error){
      flag = true;
    }
    if (isEmailValid() && isPasswordValid()) {
      if(flag===true)showAccountAlreadyExistsAlertSingIn(router);
      else{
        signIn('credentials', { email: emailInput, password: passwordInput });
      }
    }else{
      
    }

  };

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    const showCartEmptyToast = localStorage.getItem("showLogInRequiredForPayment");
    if (showCartEmptyToast === "true") {
      showToast(
        "Please log in to purchase.",
        "info"
      );
      localStorage.removeItem("showLogInRequiredForPayment");
    }
  }, []);

  useEffect(() => {
    const [isValid, message] = validateEmail(emailInput);
  
    setValidation(prev => ({
      ...prev, 
      email: {valid: isValid, message}
    }));
  
  }, [emailInput]);
  
  useEffect(() => {
    const [isValid, message] = validatePassword(passwordInput);
     
    setValidation(prev => ({
     ...prev,
     password: {valid: isValid, message}
    }));
  
  }, [passwordInput]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const showToastParam = queryParams.get('showToast');

    if (showToastParam === 'true') {
      showToast(`"An account with this email already exists. Please log in with your existing account."`, "error");
      queryParams.delete('showToast');
      window.history.replaceState(null, null, "?" + queryParams.toString());
    }
  }, []);
  
  useEffect(() => {
    if(session.status === "authenticated") {
      router.push("/")
    }
  }, [session, router])
 
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Log In</h1>
          <div className={styles.inputBox}>
            <AiOutlineUser className={styles.icon} />
            <input
              type="email"
              onChange={(e) => handleInputChange(e, 'email')}
              value={emailInput}
              maxLength={100}
              placeholder="Email"
              className={styles.input}
              required
            />
            <p className={styles.validation}>
              {validation.email.valid ? '' : validation.email.message}
            </p>
          </div>
          <div className={styles.inputBox}>
            <AiOutlineLock className={styles.icon} />
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              className={styles.input}
              value={passwordInput}
              onChange={(e) => handleInputChange(e, 'password')}
              maxLength={20}
              required
            />
            <p className={styles.validation}>
              {validation.password.valid ? '' : validation.password.message}
            </p>
            {passwordVisible ? (
              <AiOutlineEyeInvisible
                className={styles.iconLock}
                onClick={handlePasswordToggle}
              />
            ) : (
              <AiOutlineEye
                className={styles.iconLock}
                onClick={handlePasswordToggle}
              />
            )}
          </div>
          <button className={styles.button}>Log in</button>
          <p className={styles.text} >or Log In with</p>
          <div className={styles.googleAuthButtonDiv} >
            <GoogleAuthButton />
          </div>
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