'use client'

import React, { useState, useEffect } from 'react';
import '@/css/Checkout/CountryDropdown.css';

const CountryDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      });
  }, []);

  const handleCountryChange = (event) => {
    const selectedCountryCode = event.target.value;
    const selectedCountryData = countries.find(
      country => country.alpha2Code === selectedCountryCode
    );
    setSelectedCountry(selectedCountryData);
  };

  return (
    <div className="container">
      <div className="container country-container">
        <span className="flag" style={{ backgroundImage: selectedCountry ? `url(${selectedCountry.flag})` : '' }}></span>
        <select className="countries" name="countries" id="countries" onChange={handleCountryChange}>
          {countries.map(country => (
            <option key={country.cioc} value={country.cioc}>{country.name.common}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CountryDropdown