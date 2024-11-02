import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';
import InputForm from '../../components/InputForm/InputForm';
import { useContext } from 'react';
import { AppContext } from '../../App';
import "./Register.scss"

const Register = () => {
    const navigate = useNavigate()
    const { showToast } = useContext(AppContext)

    const handleRegister = async (username, password, avatar, description) => {
        const formData = new FormData()
        formData.append("nick_name", username)
        formData.append("password", password)
        formData.append("avatar", avatar)
        formData.append("description", description)

        try {
            const register = await fetch(`${API_URL}/api/auth/register`, { method: "POST", body: formData })
            const result = await register.json()
            if(result.status === "success") {
               navigate("/auth/login")
               showToast({ message: "Зарегестрировано!", type: "success" })
            }
            else{
                switch(result.message){
                    case "Invalid 'nick_name' or 'password'":
                        showToast({ message: "Неверное имя пользователя или пароль!", type: "error" });
                        break;
                    case "Current login is exists":
                        showToast({ message: "Данное имя пользователя уже занято!", type: "error" });
                        break;
                    case "'password' length must be more than 8 and less then 100!":
                        showToast({ message: "Слишком короткий пароль!", type: "error" });
                    break;
                }
                return result
            }
        } catch (error) {
            console.log(error)
            return {
                status: "error",
                message: "server not found"
            }
        }
    }

    const redirect = (
        <p className={"redirect_object"} >Уже есть акаунт?
            <Link to={"/auth/login"}> 
                Войти.
            </Link>
        </p>
    )

    return (
        <InputForm buttonText="Зарегестрироваться" onSubmit={handleRegister} redirect={redirect} upload_img={true} description_field={true}/>
    )
}

export default Register
