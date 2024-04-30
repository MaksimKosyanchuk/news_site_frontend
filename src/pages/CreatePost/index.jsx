import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { API_URL } from '../../config';
import InputFiled from "../../components/InputField";
import "./CreatePost.scss"


const CreatePost = () => {
    const navigate = useNavigate()
    const { profile, profileLoading } = useContext(AppContext)
    const [initialized, setInitialized] = useState(false);
    const [ title, setTitle ] = useState("")
    const [ mainText, setMainText ] = useState("")
    const [ createResult, setCreateResult ] = useState({})

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
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: localStorage.getItem("token"), title: title, content_text: mainText }),
        }
        try{
            const creating = await fetch(`${API_URL}/api/posts/create-post`, requestOptions)
            const result = await creating.json()
            console.log(result)
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

    return (
        <form className='create_post' onSubmit={handleSubmit}>
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
            <button className='create_post_submit app-transition' type="submit">
                <div className='create_post_submit_content'>
                    <p>Создать</p>
                </div>
            </button>
        </form>
    )
}

export default CreatePost
