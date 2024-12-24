import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';
import InputForm from '../../components/InputForm/InputForm';
import InputField from '../../components/InputField/index';
import DropFile from '../../components/DropFile/index';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import "./Register.scss";

const Register = () => {
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);
    const { showToast } = useContext(AppContext);

    const set_avatar_handle = (file) => {
        setAvatar(file);
    };

    const handleRegister = async (username, password, description) => {
        const formData = new FormData();
        formData.append("nick_name", username);
        formData.append("password", password);
        formData.append("avatar", avatar);
        formData.append("description", description);

        try {
            const register = await fetch(`${API_URL}/api/auth/register`, { method: "POST", body: formData });
            const result = await register.json();
            if (result.status === "success") {
                navigate("/auth/login");
                showToast({ message: "Зарегистрировано!", type: "success" });
            } else {
                switch(result.message) {
                    case "Invalid 'nick_name' or 'password'":
                        showToast({ message: "Неверное имя пользователя или пароль!", type: "error" });
                        break;
                    case "Current login is exists":
                        showToast({ message: "Данное имя пользователя уже занято!", type: "error" });
                        break;
                    case "'password' length must be more than 8 and less than 100!":
                        showToast({ message: "Слишком короткий пароль!", type: "error" });
                        break;
                }
                return result;
            }
        } catch (error) {
            console.log(error);
            return { status: "error", message: "server not found" };
        }
    };

    const input = ({ handleFocus, errorFields, setUsername, setPassword, setDescription, username, password, description, login_result, resultMessage }) => {
        return (
            <>
                <DropFile setValue={set_avatar_handle} value={avatar} /> 
                <InputField
                    className={`user_name ${errorFields.username ? "incorrect_field" : ""}`}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => handleFocus('username')}
                    placeholder="Имя пользователя"
                    value={username}
                />
                <InputField
                    className={`password ${errorFields.password ? "incorrect_field" : ""}`}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => handleFocus('password')}
                    placeholder="Пароль"
                    value={password}
                />
                <div className={`result_message ${login_result.status === "error" ? "error_message" : ""}`}>
                    {resultMessage}
                </div>
                <button className="submit_button app-transition" type="submit">Зарегистрироваться</button>
                <p className={"redirect_object"}>Уже есть аккаунт?
                    <Link to={"/auth/login"}> Войти.</Link>
                </p>
            </>
        );
    };

    return (
        <InputForm buttonText="Зарегистрироваться" onSubmit={handleRegister} Content={input} upload_img={true} description_field={true} />
    );
};

export default Register;
