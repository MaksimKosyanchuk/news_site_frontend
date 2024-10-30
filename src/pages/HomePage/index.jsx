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
                image={'https://habrastorage.org/r/w1560/getpro/habr/post_images/215/b29/a44/215b29a4489dec3391c16ab0c4dd0704.png'}>

                <h1>Please, visit my github page and share this site to your friends</h1>
                <a href="https://github.com/MaksimKosyanchuk/news_site_frontend" target="_blank">GitHub</a>
                <Link to={`/users/Maks`}>My profile</Link>
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