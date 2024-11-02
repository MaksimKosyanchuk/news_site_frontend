import { React, useContext} from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';
import InputForm from '../../components/InputForm/InputForm';

const Login = () => {
    const navigate = useNavigate()
    const { showToast } = useContext(AppContext)
    
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
                showToast({ message: "Вы вошли в аккаунт!", type: "success" })
                return result
            }
            else{
                console.log(result.message)
                switch(result.message){
                    case "User doesn`t exists":
                        showToast({ message: "Пользователь не найден!", type: "error" })
                        break;
                    case "Incorrect 'password'":
                        showToast({ message: "Неверный логин или пароль!", type: "error" })
                        break;
                    case "'password' length must be more than 8 and less then 100!":
                        showToast({ message: "Слишком короткий пароль!", type: "error" })
                    case "Invalid 'nick_name' or 'password'":
                        showToast({ message: "Неверный логин или пароль!", type: "error" })
                }
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
            <p className={"redirect_object"}>Нет акаунта?
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
