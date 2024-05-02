import React from 'react';
import "./InputField.scss";

const Input = ({ className, onChange, type, placeholder, is_multiline = false }) => {
  const InputComponent = is_multiline ? 'textarea' : 'input';
  return (
    <label className='input_field_label'>
      <InputComponent
        className={`input_field app-transition ${className?? ""}`}
        type={type}
        onChange={onChange}
        required
        placeholder={placeholder}
        rows="2" wrap="hard" maxlength="60"
        />
      </label>
  );
}

export default Input;