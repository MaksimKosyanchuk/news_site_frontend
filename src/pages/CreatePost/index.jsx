import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { API_URL } from '../../config';
import InputFiled from "../../components/InputField";
import "../../components/DropFile/index"
import "./CreatePost.scss"
import DropFile from '../../components/DropFile/index';

const CreatePost = () => {
    const navigate = useNavigate()
    const { profile, profileLoading } = useContext(AppContext)
    const [ initialized, setInitialized ] = useState(false);
    const [ title, setTitle ] = useState("")
    const [ mainText, setMainText ] = useState("")
    const [ createResult, setCreateResult ] = useState({})
    const [ featuredImage, setFeaturedImage ] = useState(null)

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


    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await create_post(title, mainText)
        setCreateResult(result)
    }

    const create_post = async (title, mainText) => {
        const formData = new FormData();
        formData.append('token', localStorage.getItem("token"));
        formData.append('title', title)
        formData.append('content_text', mainText)
        formData.append('featured_image', featuredImage)

        try{
            const creating = await fetch(`${API_URL}/api/posts/create-post`, { method: "POST", body: formData})
            const result = await creating.json()
            if(result.status === "success") {
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

    const handleImage = async (file) => {
        await setFeaturedImage(file)
    }

    return (
        <form className='create_post' onSubmit={handleSubmit}>
            <InputFiled 
                className={"create_post_title"  + (createResult.status === "error" ? " incorrect_field" : "")}
                placeholder={"Заголовок"}
                is_multiline={true}
                onChange={(e) => setTitle(e.target.value)}
            />
            <DropFile handleUpload={handleImage}/>
            <InputFiled 
                className={"create_post_main_text" + (createResult.status === "error" ? " incorrect_field" : "")}
                placeholder={"Текст"}
                onChange={(e) => setMainText(e.target.value)}
                is_multiline={true}
            />
            <button className='submit_button create_post_submit app-transition' type="submit">
                Создать
            </button>
        </form>
    )
}

export default CreatePost
