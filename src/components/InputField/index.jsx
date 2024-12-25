import React from 'react';
import "./InputField.scss";

const Input = ({ className, onChange, onFocus, error, type, value, placeholder, required=false, is_multiline = false, length = 120 }) => {
  
  const InputComponent = is_multiline ? 'textarea' : 'input';

  return (
    <label className='input_field_label'>
      <InputComponent
        className={`input_field ${error ? "incorrect_field" : ""} app-transition ${className?? ""}`}
        type={type}
        onChange={onChange}
        onFocus={onFocus}
        required={required}
        placeholder={placeholder}
        rows="2" wrap="hard" maxLength={length}
        value={value}
      />
      {
        <p className={`input_field_label_error_message ${error ? "show" : ""}`}>
            {error}
        </p>
      }
      </label>
  );
}

export default Input;