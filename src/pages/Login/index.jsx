import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';
import InputField from '../../components/InputField/index';
import "./Login.scss";

const Login = () => {
    const navigate = useNavigate(); 
    const [ fields, setFields ] = useState(
        {
            nick_name: '',
            password: '',
        }
    )
    const [errors, setErrors] = useState({}); 
   
    const { showToast } = useContext(AppContext); 
   
    const handleFocus = (fieldName) => {
        const { [fieldName]: removedField, ...other } = errors;
        setErrors (other)
    }

    const handleLogin = async () => { 
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nick_name: fields.nick_name, password: fields.password }),
        }
        try {
            const login = await fetch(`${API_URL}/api/auth/login`, requestOptions)
            const result = await login.json() 
            if (result.status === 'success') { 
                localStorage.setItem('token', result.data.token); 
                navigate('/posts');
                showToast({ message: 'Вы вошли в аккаунт!', type: 'success' }); 
                return result; 
            } 
            else { 
                if (result?.errors && Object.keys(result.errors).length > 0 ) { 
                    showToast({ message: 'Ошибка!', type: 'error' }); 
                    setErrors(result.errors); 
                } 
        
                return result; 
            } 
        }
        catch (e) { 
            console.log(e)
        } 
    };
 
  return (
    <form className='form_input app-transition'>
        <InputField
            className={`user_name`}
            type="text"
            onChange={(e) => setFields({ ...fields, nick_name: e.target.value })}
            onFocus={() => handleFocus('nick_name')}
            input_label="Имя пользователя"
            placeholder="Введите имя пользователя"
            value={fields.nick_name}
            error={errors?.nick_name ?? null}
        />
        <InputField
            className={`password`}
            type="password"
            onChange={(e) => setFields({ ...fields, password: e.target.value })}
            onFocus={() => handleFocus('password')}
            input_label="Пароль"
            placeholder="Введите пароль"
            value={fields.password}
            error={errors?.password ?? null}
        />
        <button className="submit_button app-transition" onClick={handleLogin} type="button">Войти</button>
        <p className={"redirect_object"}>Нет акаунта?
            <Link to={"/auth/register"}>
                Зарегестрироваться.
            </Link>
        </p>
    </form>
  );
};

export default Login;
