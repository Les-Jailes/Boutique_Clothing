'use client'
import React,{useState} from 'react'
import styles from './page.module.css'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import {AiOutlineUser,AiOutlineLock, AiOutlineEye,AiOutlineEyeInvisible, AiOutlineFontSize, AiOutlineMail} from 'react-icons/ai'
import {PiIdentificationCardLight} from 'react-icons/pi'
import {BsGenderAmbiguous, BsGenderFemale, BsGenderMale} from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import {validateCiField, validateEmail, validatePassword, validateTextField} from '@/utils/formValidations'
import api from '@/app/api/api'

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [validationEmail, setValidationEmail] = useState(false);
  const [validationName, setValidationName] = useState(false);
  const [validationCi, setValidationCi] = useState(false);
  const [valiEmailMessage, setValiEmailMessage] = useState('');
  const [validationLastName, setValidationLastName] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [validationPassword, setValidationPassword] = useState(false);
  const [valiPasswordMessage, setValiPasswordMessage] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [validNameMessage, setValiNameMessage] = useState('');
  const [validLastNameMessage, setValiLastNameMessage] = useState('');
  const [validCiMessage, setValiCiMessage] = useState('');
  const [ciInput, setCiInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  const session = useSession()
  const router = useRouter()
  if(session.status === "loading"){
    return <p>Loading Authentication from Server</p>
  }
  if(session.status === "authenticated"){
    router.push("/");
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imagePath = "";

    const name = nameInput;
    const lastName = lastNameInput;
    const email = emailInput;
    const password = passwordInput;
    const gender = selectedGender;
  
    const body = {
      name,
      lastName,
      email,
      password,
      gender,
      imagePath
    };
    console.log(body);
  
    const response = await api.post('/User', body);

    if(session.status ==="loading"){
      return <p>Redirecting to Login Page</p>
    }

    router.push("/pages/account/login");
  };


  const handleEmailChange = (e) => {
    const updatedEmail = e.target.value;
    const responseGet = api.get('/User', updatedEmail);
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
  const handleNameChange = (e) => {
    const username = e.target.value;
    setNameInput(username);
    validateNameInput(username);
  };
  const handleLastNameChange = (e) => {
    const lastName = e.target.value;
    setLastNameInput(lastName);
    validateLastNameInput(lastName);
  };
  const handleCiChange = (e) => {
    const ci = e.target.value;
    if(ci >= 0) setCiInput(ci);
    validateCiInput(ci);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };
  const validateNameInput = (text) => {
    const [isValid, validationResult] = validateTextField(text, "Name");
    if (isValid) {
      setValidationName(false);
    } else {
      setValidationName(true);
      setValiNameMessage(validationResult);
    }
  };
  const validateLastNameInput = (lastName) => {
    const [isValid, validationResult] = validateTextField(lastName, "Last name");
    if (isValid) {
      setValidationLastName(false);
    } else {
      setValidationLastName(true);
      setValiLastNameMessage(validationResult);
    }
  };
  const validateCiInput = (ci) => {
    const [isValid, validationResult] = validateCiField(ci);
    if (isValid) {
      setValidationCi(false);
    } else {
      setValidationCi(true);
      setValiCiMessage(validationResult);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Sign Up</h1>
          <div className={styles.inputBox}>
          <AiOutlineUser className={styles.icon}/>
            <input type="text" onChange={handleNameChange} value={nameInput} placeholder='Name' className={styles.input} maxLength={16} pattern="[A-Za-z\s]+" required/>
            <p className={styles.validation}>{validationName ? validNameMessage : ''}</p>
          </div>
          <div className={styles.inputBox}>
          <AiOutlineFontSize className={styles.icon}/>
            <input type="text" onChange={handleLastNameChange} value={lastNameInput} placeholder='Last Name' className={styles.input} maxLength={16} pattern="[A-Za-z\s]+" required/>
            <p className={styles.validation}>{validationLastName ? validLastNameMessage : ''}</p>
          </div>
          <div className={styles.inputBox}>
          <AiOutlineMail className={styles.icon}/>
            <input type="email" onChange={handleEmailChange} value={emailInput} maxLength={30} placeholder='Email' className={styles.input} required/>
            <p className={styles.validation}>{validationEmail ? valiEmailMessage : ''}</p>
          </div>
          <div className={styles.inputBox}>
          <PiIdentificationCardLight className={styles.icon}/>
            <input type="number" onChange={handleCiChange} value={ciInput} placeholder='CI' className={styles.input} maxLength={16} required/>
            <p className={styles.validation}>{validationCi ? validCiMessage : ''}</p>
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
          <div className={styles.genderBox}>
        <label className={styles.label}>Gender:</label> 
        
        <div className={styles.radioGroup} required>
          <label>
            <input
              type="radio"
              value="Male"
              checked={selectedGender === "Male"}
              onChange={handleGenderChange}

            />
             Male
          </label>
          <label>
            <input
              type="radio"
              value="Female"
              checked={selectedGender === "Female"}
              onChange={handleGenderChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              value="RatherNotSay"
              checked={selectedGender === "RatherNotSay"}
              onChange={handleGenderChange}
            />
            Rather not say
          </label>
        </div>
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