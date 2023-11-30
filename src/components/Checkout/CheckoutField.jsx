import React from "react";
import "@/css/Checkout/CheckoutField.css";
import PropTypes from "prop-types";
import { DropDownCountries, DropdownSubcity } from "./DropDownCountries";

const CheckoutFieldWithValidation = ({
  icon: IconItem,
  placeholderText,
  id,
  value,
  handleInput,
  inputType,
  validationComponent,
  validationComponentMessage,
  inputMode,
}) => {
  return (
    <div className="checkout-field-with-validation">
      <div className="checkout-field">
        {IconItem && <IconItem color="#000000" size={24} />}
        <input
          className="check-input"
          id={id}
          value={value}
          placeholder={placeholderText}
          onChange={handleInput}
          type={inputType}
          inputMode={inputMode}
        />
      </div>
      <p className="check-field-validation">
        {validationComponent ? validationComponentMessage : ""}
      </p>
    </div>
  );
};

CheckoutFieldWithValidation.propTypes = {
  icon: PropTypes.func.isRequired,
  placeholderText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  inputType: PropTypes.string.isRequired,
  validationComponent: PropTypes.bool.isRequired,
  validationComponentMessage: PropTypes.string.isRequired,
  inputMode: PropTypes.string.isRequired,
};

const CheckoutField = ({
  icon: IconItem,
  id,
  value,
  placeholderText,
  handleInput,
  inputType,
  inputMode,
}) => {
  return (
    <div className="checkout-field-normal">
      {IconItem && <IconItem color="#000000" size={24} />}
      <input
        className="check-input"
        id={id}
        value={value}
        placeholder={placeholderText}
        onChange={handleInput}
        type={inputType}
        inputMode={inputMode}
      />
    </div>
  );
};

CheckoutField.propTypes = {
  icon: PropTypes.func.isRequired,
  placeholderText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  inputType: PropTypes.string.isRequired,
  inputMode: PropTypes.string.isRequired,
};

const DropdownField = ({
  icon: IconItem,
  listOptions,
  placeholderText,
  value,
  setValue,
  handleClick,
  typeOption
}) => {
  return (
    <div className="input-countries">
      {IconItem && <IconItem color="#000" size={24} />}
      <DropDownCountries
        options={listOptions}
        placeholderText={placeholderText}
        value={value}
        setValue={setValue}
        handleClick={handleClick}
        typeOption={typeOption}
      />
    </div>
  );
};

DropdownField.propTypes = {
  icon: PropTypes.func.isRequired,
  listOptions: PropTypes.array.isRequired,
  placeholderText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  typeOption: PropTypes.string.isRequired
};

const DropdownFieldSubcity = ({
  icon: IconItem,
  listOptions,
  placeholderText,
  value,
  setValue,
  handleClick
}) => {
  return (
    <div className="input-countries">
      {IconItem && <IconItem color="#000" size={24} />}
      <DropdownSubcity
        options={listOptions}
        placeholderText={placeholderText}
        value={value}
        setValue={setValue}
        handleClick={handleClick}
      />
    </div>
  );
};

DropdownFieldSubcity.propTypes = {
  icon: PropTypes.func.isRequired,
  listOptions: PropTypes.array.isRequired,
  placeholderText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
};

const CheckoutFieldNoEditable = ({
  icon: IconItem,
  id,
  value,
  placeholderText,
  inputType
}) => {
  return (
    <div className="checkout-field-normal">
      {IconItem && <IconItem color="#000000" size={24} />}
      <input
        className="check-input"
        id={id}
        value={value}
        placeholder={placeholderText}
        type={inputType}
        readOnly
      />
    </div>
  );
};

CheckoutFieldNoEditable.propTypes = {
  icon: PropTypes.func.isRequired,
  placeholderText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired
};

export { CheckoutFieldWithValidation, CheckoutField, DropdownField, DropdownFieldSubcity, CheckoutFieldNoEditable };
