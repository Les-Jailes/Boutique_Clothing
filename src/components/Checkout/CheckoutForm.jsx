'use client'
import React from "react";
import { useState } from "react";
import '@/css/Checkout/CheckoutForm.css'
import {AiOutlineFontSize, AiOutlineGlobal} from 'react-icons/ai'
import {LuMap} from 'react-icons/lu'
import {FiPhone} from 'react-icons/fi'
import {validateNumberField, validateEmail, validatePassword, validateTextField} from '@/utils/formValidations'
import CountryDropdown from "./CountryDropdown";
import { GoArrowRight } from "react-icons/go";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";



const CheckoutForm = () => {
  const [fullname, setFullname] = useState("");
  const [validationFullname, setValidationFullname] = useState(false);
  const [validFullnameMessage, setValidFullnameMessage] = useState('');

  const [countryCode, setCountryCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [validationZipCode, setValidationZipCode] = useState(false);
  const [validZipCodeMessage, setValidZipCodeMessage] = useState('');

  const [phoneNumber, setPhoneNumber] = useState("");
  const [validationPhoneNumber, setValidationPhoneNumber] = useState(false);
  const [validPhoneNumberMessage, setValidPhoneNumberMessage] = useState('');

  const [age, setAge] = useState(true);

  const router = useRouter();

  const handleFullnameChange = (e) => {
    const username = e.target.value;
    setFullname(username);
    validateFullname(username);
  };
  const validateFullname = (text) => {
    const [isValid, validationResult] = validateTextField(text, "Fullname");
    if (isValid) {
      setValidationFullname(false);
    } else {
      setValidationFullname(true);
      setValidFullnameMessage(validationResult);
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const [isValid, validationResult] = validateNumberField(phoneNumber, "Phone number");
    if (isValid) {
      setValidationPhoneNumber(false);
    } else {
      setValidationPhoneNumber(true);
      setValidPhoneNumberMessage(validationResult);
    }
  };
  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;
    if(phoneNumber >= 0) setPhoneNumber(phoneNumber);
    validatePhoneNumber(phoneNumber);
  }

  const validateZipCode = (zipCode) => {
    const [isValid, validationResult] = validateNumberField(zipCode, "Zip code");
    if (isValid) {
      setValidationZipCode(false);
    } else {
      setValidationZipCode(true);
      setValidZipCodeMessage(validationResult);
    }
  };
  const handleZipCodeChange = (e) => {
    const phoneNumber = e.target.value;
    if(phoneNumber >= 0) setZipCode(phoneNumber);
    validateZipCode(phoneNumber);
  }
  
  const handleCountryChange = (newCountryCode) => {
    setCountryCode(newCountryCode);
  };

  const session = useSession();


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validationFullname && !validationPhoneNumber && !validationZipCode && age === "verified"){
      localStorage.setItem('shippingInfo', JSON.stringify({
        fullname,
        phoneNumber,
        email: session.data.user.email,
        streetAddress,
        zipCode,
        country: countryCode 
      }));
      router.push('/pages/checkout/payment')
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill out all fields correctly",
      });
    }
  };

  const handleChange = () => {
    setAge("verified");
  };

  return (
    <div className="formContainer">

    <form onSubmit={handleSubmit} className="form">
  <h1>CHECKOUT</h1>
  <div className="inputBox" >

  <AiOutlineFontSize className="icon" />
  <input
    className="input"
    id="fullname"
    label="Full name"
    value={fullname}
    placeholder="Fullname"
    onChange={handleFullnameChange}
  />
  <p className="validation">{validationFullname ? validFullnameMessage : ''}</p>
  </div>

  <div className="inputBox" >
    <LuMap className="icon" />
  <input
    className="input"
    id="streetAddress"
    label="Street address"
    value={streetAddress}
    placeholder="Street address"
    onChange={(e) => setStreetAddress(e.target.value)}
    
  />
  </div>
  <div className="inputBox" >

    <AiOutlineGlobal className="icon" />
  <input
    className="input"
    id="zipCode"
    label="Zip code"
    value={zipCode}
    placeholder="Zip code"
    onChange={handleZipCodeChange}
    
  />
  <p className="validation">{validationZipCode ? validZipCodeMessage : ''}</p>
  </div>
  
  <div className="inputBox" >
    <FiPhone className="icon" />
  <input
    type="text"
    inputMode="numeric"
    className="input"
    id="phoneNumber"
    label="Phone number"
    value={phoneNumber}
    placeholder="Phone number"
    
    onChange={handlePhoneNumberChange}
    
  />
  <p className="validation">{validationPhoneNumber ? validPhoneNumberMessage : ''}</p>
  </div>

  <div className="containerDropdown">
    <CountryDropdown onCountryChange={handleCountryChange} />
  </div>
  

  <div className="checkboxContainer">
  <input type="checkbox" className="checkbox" name="vehicle1" value={age} onChange={()=> handleChange()}/>
  <label className="checkbox-label"> I am over 18 years old or have parental consent. </label>
  </div>


    

    <button type="submit" variant="contained" color="primary" className="buttonNext">
    <GoArrowRight className="iconNext" size={24}/>
    Next
  </button>
    
  
</form>
</div>
  );
};

export default CheckoutForm;