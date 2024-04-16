import React, { useState } from 'react';
import './InputForm.scss'

const InputForm = ({ buttonText, onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login_result, setLoginResult] = useState({ })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoginResult(await onSubmit(username, password))
    console.log(login_result)
  }

  return (
    <form onSubmit={handleSubmit} className='form_input app-transition'>
      <input 
          className={ "user_name app-transition" + (login_result.status === "error" ? " incorrect_login" : "") }
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="User name"
      />
      <input
          className={ "password app-transition"  + (login_result.status === "error" ? " incorrect_login" : "" )}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
      />
      <div className={ "result_message" + (login_result.status === "error" ? " error_message" : "" )}>{ login_result ?  login_result.message : "" }</div>
      <button className="app-transition" type="submit">{buttonText}</button>
    </form>
  )
}

export default InputForm