"use client";
import React, { useEffect, useState, useCallback, useContext } from "react";
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
  DropdownFieldSubcity,
  CheckoutFieldNoEditable
} from "./CheckoutField";
import axios from "axios";
import { CartContext } from "../Products/CartContext";

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

  const [phoneNumber, setPhoneNumber] = useState("");
  const [validationPhoneNumber, setValidationPhoneNumber] = useState(false);
  const [validPhoneNumberMessage, setValidPhoneNumberMessage] = useState("");

  const [listCountries, setListCountries] = useState([]);
  const [listCity, setListCity] = useState([]);
  const [listSubcity, setListSubcity] = useState([]);

  const [taxes, setTaxes] = useState(0)

  const [age, setAge] = useState(true);

  const router = useRouter();

  const {calculateTax} = useContext(CartContext)

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

  const handleZipCodeChange = (e) => {
    const phoneNumber = e.target.value;
    setZipCode(phoneNumber);
  };

  const session = useSession();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !validationFullname &&
      !validationPhoneNumber &&
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

  const handleCountryChange = useCallback(
    (selectedCountry) => {
      setZipCode("");
      setSubcity("");
      setCity("");
      setListSubcity([])
      setListCity([])
      setTaxes(0)
      setCountry(selectedCountry);
      availableCities(selectedCountry);
      getAbbreviationCountry(selectedCountry)
    },
    [country]
  );

  const getAbbreviationCountry = async (countryName) => {
    try {
      let countryObject = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      setCountryCode(countryObject.data[0].altSpellings[0])
    } catch (error) {
      console.error(error)
    }
  }

  const handleCityChange = useCallback(
    (selectedCity) => {
      setZipCode("");
      setSubcity("");
      setListSubcity([])
      availableSubcities(country, selectedCity);
    },
    [city]
  );

  const handleSubcityChange = useCallback(
    (selectedSubcity) => {
      setSubcity(selectedSubcity.subCityName);
      setZipCode(selectedSubcity.zipCode);
    },
    [subcity]
  );

  const availableSubcities = async (countryName, cityName) => {
    try {
      const cityObject = await api.get(
        `/Country/name/${countryName}/city/${cityName}`
      );
      setTaxes(cityObject.data.tax)
      calculateTax(cityObject.data.tax)
      if (cityObject.data.zipCodes.length === 0) {
        setZipCode("00000")
      } else {
        setListSubcity(cityObject.data.zipCodes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uniqueCitiesNames = (cities) => {
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
      console.error(error);
    }
  };

  return (
    <div className="formContainer">
      <h1>CHECKOUT</h1>
      <form onSubmit={handleSubmit} className="form">

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

        {listCity && listCity.length > 0 ? (
          <DropdownField
            icon={AiOutlineGlobal}
            listOptions={listCity}
            placeholderText="Choose your city"
            value={city}
            setValue={setCity}
            handleClick={handleCityChange}
          />
        ) : (
          ""
        )}

        {listSubcity && listSubcity.length > 0 ? (
          <>
            <DropdownFieldSubcity
              icon={AiOutlineGlobal}
              listOptions={listSubcity}
              placeholderText="Choose your subcity"
              value={subcity}
              setValue={setSubcity}
              handleClick={handleSubcityChange}
            />
            <CheckoutFieldNoEditable
              icon={AiOutlineGlobal}
              placeholderText="ZIP code"
              id="zipCode"
              value={zipCode}
              inputType="text"
            />
          </>
        ) : (
          " "
        )}

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
