import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from '../../components/InputForm/InputForm';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()

    const handleLogin = async (username, password) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nick_name: username, password: password }),
        }
        try{
            const login = await fetch(`${API_URL}/api/auth/login`, requestOptions)
            const result = await login.json()
            if(result.status === "success") {
                localStorage.setItem('token', result.data.token)
                navigate("/posts")
                return result
            }
            else{
                return result
            }
        } 
        catch(e){
            console.log(e)
            return {
                status: "error",
                message: "server not found"
            }
        }
    }

    const redirect = (
            <p className={"redirect_object"} >Нет акаунта?
                <Link to={"/auth/register"}> 
                Зарегестрироваться.
                </Link>
            </p>
    )

    return (
        <InputForm buttonText="Войти" onSubmit={handleLogin} redirect={redirect} />
    )
}

export default Login
