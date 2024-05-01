import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { API_URL } from '../../config';
import InputFiled from "../../components/InputField";
import "./CreatePost.scss"


const CreatePost = () => {
    const navigate = useNavigate()
    const { profile, profileLoading } = useContext(AppContext)
    const [ initialized, setInitialized ] = useState(false);
    const [ title, setTitle ] = useState("")
    const [ mainText, setMainText ] = useState("")
    const [ createResult, setCreateResult ] = useState({})
    const [ featuredImage, setFeaturedImage ] = useState("")

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
        setCreateResult(await create_post(title, mainText))
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

    const handleImage = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const base64Image = event.target.result.split(',')[1];
            setFeaturedImage(base64Image)
        };

        reader.readAsDataURL(file); 
    }

    return (
        <form className='create_post' onSubmit={handleSubmit}>
            <input type="file" id="imageInput" accept="image/*" onChange={handleImage}/>
            <InputFiled 
                className={"create_post_title"  + (createResult.status === "error" ? " incorrect_field" : "")}
                placeholder={"Заголовок"}
                onChange={(e) => setTitle(e.target.value)}
            />
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
