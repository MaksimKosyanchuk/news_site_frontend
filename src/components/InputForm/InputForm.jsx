import React, { useState, useEffect } from 'react';
import InputField from "../InputField/index";
import './InputForm.scss';

const InputForm = ({ onSubmit, Content, description_field = false }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [login_result, setLoginResult] = useState({});
  const [errorFields, setErrorFields] = useState({ username: false, password: false, description: false });
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    if (login_result.status === "error") {
      setErrorFields((prev) => {
        const newErrorFields = { ...prev };

        if (login_result.status_code === 1) {
          newErrorFields.username = true;
        } else {
          newErrorFields.username = false;
        }

        if (login_result.status_code === 2) {
          newErrorFields.password = true;
        } else {
          newErrorFields.password = false;
        }

        if (description_field && login_result.status_code === 3) {
          newErrorFields.description = true;
        } else {
          newErrorFields.description = false;
        }

        return newErrorFields;
      });
      setResultMessage(login_result.message);
    } else {
      setErrorFields({});
      setResultMessage('');
    }
  }, [login_result, username, password, description, description_field]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit(username, password, description);
    setLoginResult(result);
  };

  const handleFocus = (field) => {
    if (errorFields[field]) {
      setLoginResult({});
      setResultMessage('');
    }
    setErrorFields((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <form onSubmit={handleSubmit} className='form_input app-transition'>
      <Content 
        handleFocus={handleFocus} 
        errorFields={errorFields} 
        setUsername={setUsername} 
        setPassword={setPassword} 
        setDescription={setDescription} 
        username={username} 
        password={password} 
        description={description} 
        login_result={login_result}
        resultMessage={resultMessage}
      />
    </form>
  );
};

export default InputForm;