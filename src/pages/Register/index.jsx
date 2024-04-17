import { useNavigate } from 'react-router-dom';
import InputForm from '../../components/InputForm/InputForm';
import { API_URL } from '../../config';
import MainLayout from '../../components/ProfileLayout';
import { Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()

    const handleRegister = async (username, password) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nick_name: username, password: password }),
        }

        try {
            const register = await fetch(`${API_URL}/api/auth/register`, requestOptions)
            const result = await register.json()
            if(result.status === "success") {
               navigate("/auth/login")
            }
            else{
                return result
            }
        } catch (error) {
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
        <MainLayout>
            <InputForm buttonText="Зарегестрироваться" onSubmit={handleRegister} redirect={redirect}/>
        </MainLayout>
    )
}

export default Register
