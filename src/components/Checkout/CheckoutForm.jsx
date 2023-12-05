"use client";
import React, { useEffect, useState, useCallback, useContext } from "react";
import "@/css/Checkout/CheckoutForm.css";
import { AiOutlineFontSize, AiOutlineGlobal } from "react-icons/ai";
import { LuMap } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import {
  validateNumberField,
  validateFullNameField,
  validateStreetAddress,
} from "@/utils/formValidations";
import { GoArrowRight } from "react-icons/go";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import api from "@/app/api/api";
import {
  CheckoutFieldWithValidation,
  DropdownField,
  DropdownFieldSubcity,
  CheckoutFieldNoEditable,
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
  const [validationStreetAddress, setValidationStreetAddress] = useState(false);
  const [validationStreetAddressMessage, setValidationStreetAddressMessage] =
    useState("");
  const [zipCode, setZipCode] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [validationPhoneNumber, setValidationPhoneNumber] = useState(false);
  const [validPhoneNumberMessage, setValidPhoneNumberMessage] = useState("");

  const [listCountries, setListCountries] = useState([]);
  const [listCity, setListCity] = useState([]);
  const [listSubcity, setListSubcity] = useState([]);

  const [age, setAge] = useState(false);

  const { calculateTax } = useContext(CartContext);

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
    const [isValid, validationResult] = validateFullNameField(text, "Fullname");
    if (isValid) {
      setValidationFullname(false);
    } else {
      setValidationFullname(true);
      setValidFullnameMessage(validationResult);
    }
  };

  const handleStreetAddressChange = (e) => {
    const address = e.target.value;
    setStreetAddress(address);
    validateStreetAddressValue(address);
  };

  const validateStreetAddressValue = (address) => {
    const [isValid, validationResult] = validateStreetAddress(
      address,
      "Street Address"
    );
    if (isValid) {
      setValidationStreetAddress(false);
    } else {
      setValidationStreetAddress(true);
      setValidationStreetAddressMessage(validationResult);
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

  const session = useSession();

  const validateDropdownField = (field, fieldValue, options) => {
    if (!fieldValue || !options.includes(fieldValue)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Please select a valid ${field}.`,
      });
      return false;
    }
    return true;
  };

  const validateForm = () => {
    const isCountryValid = validateDropdownField(
      "country",
      country,
      listCountries
    );
    if (!isCountryValid) return false;

    const isCityValid = validateDropdownField("city", city, listCity);
    if (!isCityValid) return false;

    if (listSubcity.length > 0) {
      const isSubcityValid = validateDropdownField(
        "subcity",
        subcity,
        listSubcity.map((subcity) => subcity.subCityName)
      );
      if (!isSubcityValid) return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !validationFullname &&
      !validationPhoneNumber &&
      age &&
      validateForm()
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
      window.location.href = "/pages/checkout/payment";
    } else if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please check that the country, city or subcity sections are correct",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill out all fields correctly",
      });
    }
  };

  const handleChange = () => {
    setAge(!age);
  };

  const handleCountryChange = useCallback(
    (selectedCountry) => {
      setZipCode("");
      setSubcity("");
      setCity("");
      setListSubcity([]);
      setListCity([]);
      setCountry(selectedCountry);
      availableCities(selectedCountry);
      getAbbreviationCountry(selectedCountry);
    },
    [country]
  );

  const getAbbreviationCountry = async (countryName) => {
    try {
      let countryObject = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );
      setCountryCode(countryObject.data[0].altSpellings[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCityChange = useCallback(
    (selectedCity) => {
      setZipCode("");
      setSubcity("");
      setListSubcity([]);
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
      calculateTax(cityObject.data.tax);
      if (cityObject.data.zipCodes.length === 0) {
        setZipCode("00000");
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
          placeholderText="Full name *"
          id="fullname"
          value={fullname}
          handleInput={handleFullnameChange}
          inputType="text"
          validationComponent={validationFullname}
          validationComponentMessage={validFullnameMessage}
          inputMode="text"
          maxLength={100}
        />

        <CheckoutFieldWithValidation
          icon={LuMap}
          id="streetAddress"
          value={streetAddress}
          placeholderText="Street address *"
          handleInput={handleStreetAddressChange}
          validationComponent={validationStreetAddress}
          validationComponentMessage={validationStreetAddressMessage}
          inputType="text"
          inputMode="text"
          maxLength={120}
        />

        <DropdownField
          icon={AiOutlineGlobal}
          listOptions={listCountries}
          placeholderText="Choose your country *"
          value={country}
          setValue={setCountry}
          handleClick={handleCountryChange}
          typeOption="Country"
        />

        {listCity && listCity.length > 0 ? (
          <DropdownField
            icon={AiOutlineGlobal}
            listOptions={listCity}
            placeholderText="Choose your city"
            value={city}
            setValue={setCity}
            handleClick={handleCityChange}
            typeOption="city"
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
          placeholderText="Phone number *"
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
            checked={age}
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
