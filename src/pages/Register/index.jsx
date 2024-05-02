import { useNavigate } from 'react-router-dom';
import InputForm from '../../components/InputForm/InputForm';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';
import "./Register.scss"

const Register = () => {
    const navigate = useNavigate()

    const handleRegister = async (username, password, avatar) => {
        const formData = new FormData()
        formData.append("nick_name", username)
        formData.append("password", password)
        formData.append("avatar", avatar)

        try {
            const register = await fetch(`${API_URL}/api/auth/register`, { method: "POST", body: formData })
            const result = await register.json()
            if(result.status === "success") {
               navigate("/auth/login")
            }
            else{
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
        <InputForm buttonText="Зарегестрироваться" onSubmit={handleRegister} redirect={redirect} upload_img={true}/>
    )
}

export default Register
