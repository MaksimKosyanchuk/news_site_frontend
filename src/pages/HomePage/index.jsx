import "./Posts.scss";
import Banner from "../../components/Banner";
import Posts from "../../components/Posts/index.jsx";
import { Link } from "react-router-dom";
import { getPosts } from "../../api/posts.api.js";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading/index.jsx";
import { AppContext } from "../../App.js";

const HomePage = () => {   
    const [ posts, setPosts ] = useState([])
    const [ isLoading, setIsLoading ] = useState([])
    const {profile} = useContext(AppContext)

    const fetchPosts = async () => {
        setIsLoading(false)
        const response = await getPosts()
        if(response.status === "success"){
            setPosts(response.data)
        }
        else{
            setPosts([])
        }
        setIsLoading(true)
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
            <Posts posts={posts}/>
        </>

    )
}

export default HomePage