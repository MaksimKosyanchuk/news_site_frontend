import "./Posts.scss";
import Banner from "../../components/Banner";
import Posts from "../../components/Posts/index.jsx";
import { Link, useNavigate } from "react-router-dom";
import { getPosts } from "../../api/posts.api.js";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App.js";

const HomePage = () => {   
    const [ posts, setPosts ] = useState([])
    const [ isLoading, setIsLoading ] = useState([])
    const { profile } = useContext(AppContext)
    const navigate = useNavigate()

    const fetchPosts = async () => {
        setIsLoading(true)
        const response = await getPosts()
        if(response.status === "success"){
            setPosts(response.data)
        }
        else{
            setPosts([])
        }
        setIsLoading(false)
    }

    const handleClick = () => {
        navigate("/create-post")
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <>
            <Banner 
                image={'https://img.tsn.ua/cached/552/tsn-dc382829a98d0f40b34d312a72bcb9b7/thumbs/1116x628/dc/7d/3769751a1240ebcc80e4c7322c177ddc.jpeg'}>

                <h1>My News Site</h1>
                <p>Please, share this work with your friends</p>
                <Link to={`/users/Maks`}>Maks</Link>
            </Banner>
            <Posts posts={posts} isLoading={isLoading}/>
            {
                (profile && profile.is_admin) ? 
                <button className={"submit_button create_post_button blurred app-transition"} onClick={handleClick}>Создать новость</button> : <></>
            }
        </>
    )
}

export default HomePage