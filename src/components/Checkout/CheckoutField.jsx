import React from "react";
import '@/css/Checkout/CheckoutField.css'
import PropTypes from 'prop-types'

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
  icon: PropTypes.object.isRequired,
  placeholderText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  inputType: PropTypes.string.isRequired,
  validationComponent: PropTypes.func.isRequired,
  validationComponentMessage: PropTypes.string.isRequired,
  inputMode: PropTypes.string.isRequired
}

const CheckoutField = ({
  icon: IconItem,
  id,
  value,
  placeholderText,
  handleInput,
  inputType,
  inputMode
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
  icon: PropTypes.object.isRequired,
  placeholderText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  inputType: PropTypes.string.isRequired,
  inputMode: PropTypes.string.isRequired
}

export {CheckoutFieldWithValidation, CheckoutField};
