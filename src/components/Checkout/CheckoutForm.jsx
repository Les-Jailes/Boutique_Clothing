'use client'
import React from "react";
import { useState } from "react";
import '@/css/Checkout/CheckoutForm.css'
import {AiOutlineUser,AiOutlineLock, AiOutlineEye,AiOutlineEyeInvisible, AiOutlineFontSize, AiOutlineGlobal} from 'react-icons/ai'
import {BiWorld} from 'react-icons/bi'
import {LuMap} from 'react-icons/lu'
import {FiPhone} from 'react-icons/fi'


const CheckoutForm = () => {
  const [fullname, setFullname] = useState("");
  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Order placed successfully!");
  };

  const handleChange = () => {

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
    onChange={(e) => setFullname(e.target.value)}
  />
  </div>
  <div className="inputBox" >

<BiWorld className="icon" />
  <input
    className="input"
    id="country"
    label="Country"
    value={country}
    placeholder="Country"
    onChange={(e) => setCountry(e.target.value)}
  />
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
    onChange={(e) => setZipCode(e.target.value)}
    
  />
  </div>
  
  <div className="inputBox" >
    <FiPhone className="icon" />
  <input
    className="input"
    id="phoneNumber"
    label="Phone number"
    value={phoneNumber}
    placeholder="Phone number"
    onChange={(e) => setPhoneNumber(e.target.value)}
    
  />
  </div>
  

  <div className="checkboxContainer">
  <input type="checkbox" className="checkbox" name="vehicle1" value={age} onChange={()=> handleChange()}/>
  <label className="checkbox-label"> I am over 18 years old or have parental consent. </label>
  </div>

  <button type="submit" variant="contained" color="primary" className="button">
    
    Next
  </button>
  
</form>
</div>
  );
};

export default CheckoutForm;