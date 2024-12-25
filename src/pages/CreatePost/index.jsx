import { useNavigate } from 'react-router-dom';
import DropFile from '../../components/DropFile/index';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { API_URL } from '../../config';
import InputFiled from "../../components/InputField";
import "./CreatePost.scss"

const CreatePost = () => {
    const navigate = useNavigate()
    const { profile, profileLoading, showToast } = useContext(AppContext)
    const [ initialized, setInitialized ] = useState(false);
    const [ createResult, setCreateResult ] = useState({})
    const [errors, setErrors] = useState({});

    const [ fields, setFields ] = useState(
        {
            title: '',
            content_text: '',
            featured_image: null
        }
    )

    useEffect(() => {
        if(initialized){
            if(!profileLoading && (!profile || !profile.is_admin)){
                navigate("/posts")
            }
        }
        else{
            setInitialized(true);
        }
    },[profileLoading, initialized])

    const handleClick = () => {
        const { ["featured_image"]: removedField, ...other } = errors;
        setErrors (other)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await create_post(fields.title, fields.mainText)
        setCreateResult(result)
    }

    const handleFocus = (fieldName) => {
        const { [fieldName]: removedField, ...other } = errors;
        setErrors (other)
    }

    const create_post = async (title, mainText) => {
        const formData = new FormData();
        formData.append('token', localStorage.getItem("token"));
        formData.append('title', title)
        formData.append('content_text', fields.content_text)
        formData.append('featured_image', fields.featured_image)

        try{
            const creating = await fetch(`${API_URL}/api/posts/create-post`, { method: "POST", body: formData})
            if (!creating.ok) {
                console.log(creating)
            }
            const result = await creating.json()
            if(result.status === "success") {
                navigate("/posts")
                showToast({ message: "Опубликовано!", type: "success" })
                return result
            }
            else{
                if(result?.errors && Object.keys(result?.errors).length > 0) {
                    setErrors(result.errors)
                }
                return result
            }
        } 
        catch(e){
            if(e instanceof TypeError && e.message === "Failed to fetch") {
                setErrors({
                    "featured_image": [ "Max size of image is 5 mb"] 
                })
            }
            return {
                status: "error",
                message: "server not found"
            }
        }
    }

    return (
        <form className='create_post' onSubmit={handleSubmit}>
            <InputFiled 
                className={"create_post_title"  + (createResult.status === "error" && createResult.message === "Incorrect 'title'" ? " incorrect_field" : "")}
                placeholder={"Заголовок"}
                is_multiline={true}
                onChange={(e) => setFields({ ...fields, title: e.target.value })}
                onFocus={() => handleFocus('title')}
                error={errors?.title}
            />
            <DropFile setValue={(file) => setFields({ ...fields, featured_image: file })} drop_file_type={"images/*"} errors={errors?.featured_image} setErrors={setErrors} handleClick={handleClick}/>
            <InputFiled 
                className={"create_post_main_text" + (createResult.status === "error" && createResult.message === "'content_text' length must be mroe than 0" ? " incorrect_field" : "")}
                placeholder={"Текст"}
                onChange={(e) => setFields({ ...fields, content_text: e.target.value })}
                onFocus={() => handleFocus('content_text')}
                is_multiline={true}
                length={400}
                error={errors?.content_text}
            />
            <button className='submit_button create_post_submit app-transition' type="submit">
                Создать
            </button>
        </form>
    )
}

export default CreatePost
