import React from "react";

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

const CheckoutField = ({
  icon: IconItem,
  id,
  value,
  placeholderText,
  handleInput,
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
      />
    </div>
  );
};

export {CheckoutFieldWithValidation, CheckoutField};
