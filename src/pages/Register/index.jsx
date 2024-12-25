import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';
import InputField from '../../components/InputField/index';
import DropFile from '../../components/DropFile/index';
import { useContext, useState } from 'react';
import { AppContext } from '../../App';
import "./Register.scss";

const Register = () => {
    const navigate = useNavigate();

    const [ fields, setFields ] = useState(
        {
            nick_name: '',
            password: '',
            description: '',
            avatar: null
        }
    )
    const [errors, setErrors] = useState({});
    const { showToast } = useContext(AppContext);

    const handleFocus = (fieldName) => {
        const { [fieldName]: removedField, ...other } = errors;
        setErrors (other)
    }

    const handleRegister = async () => {
        const formData = new FormData();
        for(let field in fields) {
            formData.append(field, fields[field])
        }

        try {
            const register = await fetch(`${API_URL}/api/auth/register`, { method: "POST", body: formData });
            const result = await register.json();
            if (result.status === "success") {
                navigate("/auth/login");
                showToast({ message: "Зарегистрировано!", type: "success" });
            } else {
                if(result?.errors && Object.keys(result?.errors).length > 0) {
                    setErrors(result.errors)
                }
                showToast({ message: "Ошибка!", type: "error" });
                return result;
            }
        } catch (error) {
            console.log(error);
            return { status: "error", message: "server not found" };
        }
    };

    const handleClick = () => {
        const { ["avatar"]: removedField, ...other } = errors;
        setErrors (other)
    }

    return (
        <form className='form_input app-transition'>
            <>
                <DropFile setValue={(file) => setFields({ ...fields, avatar: file })} value={fields.avatar} drop_file_type={"image/*"} errors={errors?.avatar} setErrors={setErrors} handleClick={handleClick}/> 
                <InputField
                    className={`user_name`}
                    type="text"
                    onChange={(e) => setFields({ ...fields, nick_name: e.target.value })}
                    onFocus={() => handleFocus('nick_name')}
                    placeholder="Имя пользователя"
                    value={fields.nick_name}
                    error={errors?.nick_name ?? null}
                />
                <InputField
                    className={`password`}
                    type="password"
                    onChange={(e) => setFields({ ...fields, password: e.target.value })}
                    onFocus={() => handleFocus('password')}
                    placeholder="Пароль"
                    value={fields.password}
                    error={errors?.password ?? null}
                />
                <button className="submit_button app-transition" type="button" onClick={handleRegister}>Зарегистрироваться</button>
                <p className={"redirect_object"}>Уже есть аккаунт?
                    <Link to={"/auth/login"}> Войти.</Link>
                </p>
            </>
        </form>
    );
};

export default Register;
