"use client";
import React, { useEffect, useState, useCallback } from "react";
import "@/css/Checkout/CheckoutForm.css";
import { AiOutlineFontSize, AiOutlineGlobal } from "react-icons/ai";
import { LuMap } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import {
  validateNumberField,
  validateTextField,
} from "@/utils/formValidations";
import { GoArrowRight } from "react-icons/go";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import api from "@/app/api/api";
import {
  CheckoutFieldWithValidation,
  CheckoutField,
  DropdownField,
} from "./CheckoutField";

const CheckoutForm = () => {
  const [fullname, setFullname] = useState("");
  const [validationFullname, setValidationFullname] = useState(false);
  const [validFullnameMessage, setValidFullnameMessage] = useState("");

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [subcity, setSubcity] = useState("");

  const [countryCode, setCountryCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [validationZipCode, setValidationZipCode] = useState(false);
  const [validZipCodeMessage, setValidZipCodeMessage] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [validationPhoneNumber, setValidationPhoneNumber] = useState(false);
  const [validPhoneNumberMessage, setValidPhoneNumberMessage] = useState("");

  const [listCountries, setListCountries] = useState([]);
  const [listCity, setListCity] = useState([]);
  const [listSubcity, setListSubcity] = useState([]);

  const [age, setAge] = useState(true);

  const router = useRouter();

  const availableCountries = async () => {
    try {
      const listAvailableCountries = await api.get("/Country");
      const uniqueCountries = uniqueCountryNames(listAvailableCountries.data);
      setListCountries(uniqueCountries);
    } catch (error) {
      console.error("Error in obtaining the list of countries:", error);
    }
  };

  const uniqueCountryNames = (countries) => {
    if (countries && countries.length > 0) {
      return countries.reduce((acc, current) => {
        if (!acc.includes(current.countryName)) {
          acc.push(current.countryName);
        }
        return acc;
      }, []);
    }
    return [];
  };

  useEffect(() => {
    availableCountries();
  }, []);

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
    const [isValid, validationResult] = validateNumberField(
      phoneNumber,
      "Phone number"
    );
    if (isValid) {
      setValidationPhoneNumber(false);
    } else {
      setValidationPhoneNumber(true);
      setValidPhoneNumberMessage(validationResult);
    }
  };
  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;
    if (phoneNumber >= 0) setPhoneNumber(phoneNumber);
    validatePhoneNumber(phoneNumber);
  };

  const validateZipCode = (zipCode) => {
    const [isValid, validationResult] = validateNumberField(
      zipCode,
      "Zip code"
    );
    if (isValid) {
      setValidationZipCode(false);
    } else {
      setValidationZipCode(true);
      setValidZipCodeMessage(validationResult);
    }
  };
  const handleZipCodeChange = (e) => {
    const phoneNumber = e.target.value;
    if (phoneNumber >= 0) setZipCode(phoneNumber);
    validateZipCode(phoneNumber);
  };

  const session = useSession();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !validationFullname &&
      !validationPhoneNumber &&
      !validationZipCode &&
      age === "verified"
    ) {
      localStorage.setItem(
        "shippingInfo",
        JSON.stringify({
          fullname,
          phoneNumber,
          email: session.data.user.email,
          streetAddress,
          zipCode,
          country: countryCode,
        })
      );
      router.push("/pages/checkout/payment");
    } else {
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

  const handleCountryChange = useCallback((selectedCountry) => {
    setCountry(selectedCountry)
    availableCities(selectedCountry)
  }, [country])

  const uniqueCitiesNames = (cities) => {
    console.log(cities + " ----------------");
    if (cities && cities.listCountry && cities.listCountry.length > 0) {
      return cities.listCountry.reduce((acc, current) => {
        if (!acc.includes(current.cityName)) {
          acc.push(current.cityName);
        }
        return acc;
      }, []);
    }
    return [];
  };

  const availableCities = async (countryName) => {
    try {
      const listAvailableCities = await api.get(`/Country/name/${countryName}`);
      const listCities = uniqueCitiesNames(listAvailableCities.data);
      setListCity(listCities);
    } catch (error) {
      console.error("Error in obtaining the list of countries:", error);
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="form">
        <h1>CHECKOUT</h1>

        <CheckoutFieldWithValidation
          icon={AiOutlineFontSize}
          placeholderText="Full name"
          id="fullname"
          value={fullname}
          handleInput={handleFullnameChange}
          inputType="text"
          validationComponent={validationFullname}
          validationComponentMessage={validFullnameMessage}
          inputMode="text"
        />

        <CheckoutField
          icon={LuMap}
          id="streetAddress"
          value={streetAddress}
          placeholderText="Street address"
          handleInput={(e) => setStreetAddress(e.target.value)}
          inputType="text"
          inputMode="text"
        />

        <DropdownField
          icon={AiOutlineGlobal}
          listOptions={listCountries}
          placeholderText="Choose your country"
          value={country}
          setValue={setCountry}
          handleClick={handleCountryChange}
        />

        <DropdownField
          icon={AiOutlineGlobal}
          listOptions={listCity}
          placeholderText="Choose your city"
          value={city}
          setValue={setCity}
        />

        <DropdownField
          icon={AiOutlineGlobal}
          listOptions={listSubcity}
          placeholderText="Choose your subcity"
          value={subcity}
          setValue={setSubcity}
        />

        <CheckoutFieldWithValidation
          icon={AiOutlineGlobal}
          placeholderText="ZIP code"
          id="zipCode"
          value={zipCode}
          handleInput={handleZipCodeChange}
          inputType="text"
          validationComponent={validationZipCode}
          validationComponentMessage={validZipCodeMessage}
          inputMode="numeric"
        />

        <CheckoutFieldWithValidation
          icon={FiPhone}
          placeholderText="Phone number"
          id="phoneNumber"
          value={phoneNumber}
          handleInput={handlePhoneNumberChange}
          inputType="text"
          validationComponent={validationPhoneNumber}
          validationComponentMessage={validPhoneNumberMessage}
          inputMode="numeric"
        />

        <div className="checkboxContainer">
          <input
            type="checkbox"
            className="checkbox"
            name="vehicle1"
            value={age}
            onChange={() => handleChange()}
          />
          <label className="checkbox-label">
            I am over 18 years old or have parental consent.{" "}
          </label>
        </div>

        <button
          type="submit"
          variant="contained"
          color="primary"
          className="buttonNext"
        >
          <GoArrowRight className="iconNext" size={24} />
          Next
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
