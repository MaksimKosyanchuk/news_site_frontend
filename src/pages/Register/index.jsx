import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { API_URL } from '../../config';
import InputField from '../../components/InputField/index';
import DropFile from '../../components/DropFile/index';
import "./Register.scss";
import { ReactComponent as AvatarIcon } from "../../assets/svg/avatar-icon.svg"

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

    const add_errors_to_image = (new_errors) => {
        const updated_errors = { ...errors };

        if (!updated_errors.featured_image) { 
            updated_errors.featured_image = [];
        }

        for(const new_error of new_errors) {
            updated_errors.featured_image.push(new_error)
        }
        setErrors(updated_errors);
    }

    const clear_errors_from_image = () => {
        const updated_errors = { ...errors };

        if(updated_errors.featured_image) {
            delete updated_errors.featured_image
        }

        setErrors(updated_errors)
    }

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
            if(error instanceof TypeError && error.message === "Failed to fetch") {
                setErrors({
                    "avatar": [ "Max size of image is 5 mb"] 
                })
            }
            return { status: "error", message: "server not found" };
        }
    };

    const handleClick = () => {
        const { avatar: removedField, ...other } = errors;
        setErrors (other)
    }

    return (
        <form className='form_input app-transition'>
            <>
                <DropFile setValue={(file) => setFields({ ...fields, avatar: file })} value={fields.avatar} background={<AvatarIcon className="drop_file_info_avatar_icon app-transition"/>} drop_file_type={"image/*"} file_types={"SVG, PNG, JPEG, JPG и другие"} errors={errors.featured_image} add_new_errors={add_errors_to_image} clear_errors={clear_errors_from_image} handleClick={handleClick}/> 
                <InputField
                    className={`user_name`}
                    type="text"
                    onChange={(e) => setFields({ ...fields, nick_name: e.target.value })}
                    onFocus={() => handleFocus('nick_name')}
                    input_label="Имя пользователя"
                    placeholder="User Name"
                    value={fields.nick_name}
                    error={errors?.nick_name ?? null}
                />
                <InputField
                    className={`description`}
                    type="text"
                    is_multiline = {true}
                    length={30}
                    onChange={(e) => setFields({ ...fields, description: e.target.value })}
                    onFocus={() => handleFocus('description')}
                    input_label="Описание"
                    placeholder="Description of profile"
                    value={fields.description}
                    error={errors?.description ?? null}
                />
                <InputField
                    className={`password`}
                    type="password"
                    onChange={(e) => setFields({ ...fields, password: e.target.value })}
                    onFocus={() => handleFocus('password')}
                    input_label="Пароль"
                    placeholder="Password123"
                    value={fields.password}
                    error={errors?.password ?? null}
                />
                <button className="submit_button app-transition" type="button" onClick={handleRegister}>Зарегистрироваться</button>
                <p className={"redirect_object"}>Уже есть аккаунт?
                    <Link to={"/auth/login"}>Войти.</Link>
                </p>
            </>
        </form>
    );
};

export default Register;
