import React, { useState } from 'react';
import InputField from "../InputField/index";
import DropFile from '../DropFile';
import './InputForm.scss';


const InputForm = ({ buttonText, onSubmit, redirect, upload_img = false, description_field = false }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ login_result, setLoginResult ] = useState({ })
  const [ avatar, setAvatar ] = useState(null)
  const [ description, setDescription ] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoginResult(await onSubmit(username, password, avatar, description))
  }

  const set_avatar_handle = (file) => {
    setAvatar(file)
  }

  return (
    <form onSubmit={handleSubmit} className='form_input app-transition'>
      {upload_img ? <DropFile handleUpload={set_avatar_handle}/> : <></>}
      <InputField 
        className={"user_name" + (login_result.status === "error" ? " incorrect_field" : "")}
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Имя пользователя"
      />
      {
        description_field ? 
        <InputField 
          className={"form_input_description" + (login_result.status === " error" ? " incorrect_field" : "")}
          type="text"
          required={false}
          placeholder="Описание профиля"
          onChange={(e) => setDescription(e.target.value)}
          is_multiline={true}
          length={60}
        /> : <></>
      }
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