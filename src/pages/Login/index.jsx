import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from '../../components/InputForm/InputForm';
import { API_URL } from '../../config';

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
            return {
                status: "error",
                message: "server not found"
            }
        }
    }

    return <InputForm buttonText="Login" onSubmit={handleLogin} />
}

export default Login
