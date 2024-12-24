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
            console.log(result)
            if(result.status === "success") {
                navigate("/posts")
                showToast({ message: "Опубликовано!", type: "success" })
                return result
            }
            else{
                switch(result.message){
                    case "Incorrect 'title'":
                        showToast({ message: "Неверный заголовок!", type: "error" })
                        break;
                    case "'content_text' length must be mroe than 0":
                        showToast({ message: "Неверный текст поста!", type: "error" })
                        break;
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

    const handleImage = async (file) => {
        await setFeaturedImage(file)
    }

    return (
        // <InpuForm>
            
        // </InpuForm>
        <form className='create_post' onSubmit={handleSubmit}>
            <InputFiled 
                className={"create_post_title"  + (createResult.status === "error" && createResult.message === "Incorrect 'title'" ? " incorrect_field" : "")}
                placeholder={"Заголовок"}
                is_multiline={true}
                onChange={(e) => setTitle(e.target.value)}
            />
            <DropFile handleUpload={handleImage}/>
            <InputFiled 
                className={"create_post_main_text" + (createResult.status === "error" && createResult.message === "'content_text' length must be mroe than 0" ? " incorrect_field" : "")}
                placeholder={"Текст"}
                onChange={(e) => setMainText(e.target.value)}
                is_multiline={true}
                length={400}
            />
            <button className='submit_button create_post_submit app-transition' type="submit">
                Создать
            </button>
        </form>
    )
}

export default CreatePost
