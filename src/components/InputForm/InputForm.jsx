import React, { useState } from 'react';
import InputField from "../InputField/index";
import './InputForm.scss';

const InputForm = ({ buttonText, onSubmit, redirect, upload_img = false }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ login_result, setLoginResult ] = useState({ })
  const [ avatar, setAvatar ] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoginResult(await onSubmit(username, password, avatar))
  }

  const set_avatar_handle = (event) => {
    event.preventDefault();
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const base64Image = event.target.result.split(',')[1];
            setAvatar(base64Image)
        };

        reader.readAsDataURL(file); 
  }

  return (
    <form onSubmit={handleSubmit} className='form_input app-transition'>
      {upload_img ? <input type="file" id="imageInput" accept="image/*" onChange={set_avatar_handle}/> : <></>}
      <InputField 
        className={"user_name" + (login_result.status === "error" ? " incorrect_field" : "")}
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Имя пользователя"
      />
      <InputField 
        className={"password" + (login_result.status === "error" ? " incorrect_field" : "")}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <div className={ "result_message" + (login_result.status === "error" ? " error_message" : "" )}>{ login_result ?  login_result.message : "" }</div>
      <button className="submit_button app-transition" type="submit">{buttonText}</button>
      {redirect}
    </form>
  )
}

export default InputForm