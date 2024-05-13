import React from 'react';
import "./InputField.scss";

const Input = ({ className, onChange, type, placeholder, required=false, is_multiline = false, length = 40 }) => {
  const InputComponent = is_multiline ? 'textarea' : 'input';
  return (
    <label className='input_field_label'>
      <InputComponent
        className={`input_field app-transition ${className?? ""}`}
        type={type}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows="2" wrap="hard" maxLength={length}
        />
      </label>
  );
}

export default Input;