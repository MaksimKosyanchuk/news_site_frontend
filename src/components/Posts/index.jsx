import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Posts.scss";
import Loading from "../../components/Loading";
import { ArticleTopic } from "../../components/ArticleTopic";
import { API_URL } from "../../config";
import ProfileLayout from "../ProfileLayout";
import NoPosts from "../NoPosts";

const Posts =  ( { query } ) => {
    const [posts, setPosts] = useState([ ])
    const [isLoading, setIsLoading] = useState(false)
    const [ profile, setProfile ] = useState(null) 

    useEffect(() => {
        getPosts()
        console.log("posts")
    }, [query])

    
    const getPosts = async () => {
        setIsLoading(true)
        let queryString = ""

        if(query) {
            queryString = Object.entries(query).map(([key, value]) => {
                if (Array.isArray(value)) {
                    return value.map(id => `${key}=${id}`).join('&')
                }
                return `${key}=${value}`
            }).join('&')
        }
        
        await fetch(`${API_URL}/api/posts?${queryString}`)
        .then(res => res.json())
        .then(res => {
            if (res.status === "success") {
                setPosts(res.data)
            }
        })
        .catch((err) => { })
        setIsLoading(false)
    }

    if(!posts) {
        return <NoPosts/>
    }

    return (
        <ProfileLayout>
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
        </ProfileLayout>
    )
}

export default Posts;