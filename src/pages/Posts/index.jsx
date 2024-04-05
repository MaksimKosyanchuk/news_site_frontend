import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Posts.scss";
import Loading from "../../components/Loading";
import Banner from "../../components/Banner";
import { ArticleTopic } from "../../components/ArticleTopic";
import { API_URL } from "../../config";

const Posts = () => {
    const [posts, setPosts] = useState([ ])
    const [isLoading, setIsLoading] = useState(false); 
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        getPosts()
        getProfile()
    }, [])

    const getProfile = async () => {
        setIsLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: localStorage.getItem('token') })
        };

        try {
            const response = await fetch(`${API_URL}/api/profile/`, requestOptions)
            const data = await response.json();

            if (data.status === "success") {
                setProfile(data.data)
            }
        } catch (error) {
            console.error('Error fetching profile:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const getPosts = async () => {
        setIsLoading(true);

        await fetch(`${API_URL}/api/posts`)
        .then(res => res.json())
        .then(res => {
            if (res.status == "success") {
                setPosts(res.data);
            }
        })
        .catch((err) => {

        })
        setIsLoading(false)
    }

    return (
        <>
            <Banner 
                image={'https://img.tsn.ua/cached/552/tsn-dc382829a98d0f40b34d312a72bcb9b7/thumbs/1116x628/dc/7d/3769751a1240ebcc80e4c7322c177ddc.jpeg'}>

                <h1>My News Site</h1>
                <p>Please, share this work with your friends das das d sa das d sad sa dsa dasdasd asd as das d as d asd as dsa d as dsa friends das das d sa das d sad sa dsa dasdasd asd as das d as d asd as dsa d as dsa  </p>
                <a href="/mccoklsa">MacKos</a>
            </Banner>

            <div className="posts posts_columns">
                {
                    (!isLoading) ?
                        posts.map(post => {
                            return (
                                <div key={post._id}  className="posts_item app-transition">
                                    <ArticleTopic article={post} profile={profile}/>
                                    
                                    <Link to={`/posts/${post._id}`}>
                                        <h2 className="posts_item_title">{post.title}</h2>
                                    </Link>
                                    {post.featured_image ? 
                                        
                                    <Link to={`/posts/${post._id}`} className="posts_item_img">
                                        <img src={post.featured_image} alt="" />
                                    </Link>
                                    : 
                                        <></>
                                    }
                                </div>
                            )
                        })
                    : <Loading/>
                }
            </div>
        </>
    )
}

export default Posts;