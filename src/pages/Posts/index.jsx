import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Posts.css";

const Posts = () => {
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        // fetch 
        await fetch(`http://localhost:3001/posts`)
        .then(res => res.json())
        .then(res => {
            console.log(res.posts)
            if (res.posts) {
                setPosts(res.posts)

            }
        })

    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className="posts">
            {
                posts?.length ?
                    posts.map(post => {
                        return (
                            <Link key={post.id} to={`/posts/${post.id ?? post.source.name}`} className="posts_item">
                                <h2>{post.title}</h2>
                                <span>{new Date(post.publishedAt).toLocaleDateString("en-US").replaceAll('/', '.')}</span>
                                <p>{post.description}</p>
                            </Link>
                        )
                    })
                : <></>
            }
        </div>
    )
}

export default Posts;