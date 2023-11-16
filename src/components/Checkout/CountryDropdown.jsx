'use client'

import React, { useState, useEffect } from 'react';
import '@/css/Checkout/CountryDropdown.css';

const CountryDropdown = ({ onCountryChange }) => {
  const [countries, setCountries] = useState([]);

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
    const countryCode = event.target.value;
    onCountryChange(countryCode); 
  };

  return (
    <div className="container">
      <div className="container country-container">
        <select className="countries" name="countries" id="countries" onChange={handleCountryChange}>
          {countries.map(country => (
            <option key={country.cca2} value={country.cca2}>{country.name.common}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CountryDropdown;
