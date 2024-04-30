import React from 'react';
import "./InputField.scss";

const Input = ({ className, onChange, type, placeholder, is_multiline = false }) => {
    const InputComponent = is_multiline ? 'textarea' : 'input';
  return (
    <InputComponent
      className={`input_field app-transition ${className?? ""}`}
      type={type}
      onChange={onChange}
      required
      placeholder={placeholder}
    />
  );
}

export default Input;