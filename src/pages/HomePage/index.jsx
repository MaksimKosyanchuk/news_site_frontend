import "./Posts.scss";
import Banner from "../../components/Banner";
import Posts from "../../components/Posts/index.jsx";
import { Link } from "react-router-dom";
import { getPosts } from "../../api/posts.api.js";
import { useEffect, useState } from "react";

const HomePage = () => {   
    const [ posts, setPosts ] = useState([])
    const [ isLoading, setIsLoading ] = useState([])

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
        </>
    )
}

export default HomePage