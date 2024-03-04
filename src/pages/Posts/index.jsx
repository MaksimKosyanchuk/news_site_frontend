import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Posts.css";

const Posts = () => {
    const [posts, setPosts] = useState([
        {
            title: "Облысение после тридцати",
            content_text: "Люди начали лысеть после тридцатиdsadkmaslkdmalsdmla smdlaskmdlaskmdlaskmdlaskmdlaskmd aksmdlaks mdlaskmdlkasmkldasdkmaslkmdlaskmdlkasmdlsakmdlkasmdlamsldmaslk\nnigga party\nuhsdaudhas\nshuhaduash",
            author_name: "Maksonchik",
            author_id: 0,
            date: "21.01.2012 20:48",
            featured_image: "https://i1.sndcdn.com/artworks-000104557119-038f1g-t500x500.jpg"
        },
        {
            title: "Облысение после тридцати",
            content_text: "Люди начали лысеть после тридцати\nnigga party\nuhsdaudhas\nshuhaduash",
            author_name: "Maksonchik",
            author_id: 0,
            date: "21.01.2012 20:48",
            featured_image: "https://i1.sndcdn.com/artworks-000104557119-038f1g-t500x500.jpg"
        },
        {
            title: "Облысение после тридцати",
            content_text: "Люди начали лысеть после тридцати\nnigga party\nuhsdaudhas\nshuhaduash",
            author_name: "Maksonchik",
            author_id: 0,
            date: "21.01.2012 20:48",
            featured_image: "https://i1.sndcdn.com/artworks-000104557119-038f1g-t500x500.jpg"
        },
        {
            title: "Облысение после тридцати",
            content_text: "Люди начали лысеть после тридцати\nnigga party\nuhsdaudhas\nshuhaduash",
            author_name: "Maksonchik",
            author_id: 0,
            date: "21.01.2012 20:48",
            featured_image: "https://i1.sndcdn.com/artworks-000104557119-038f1g-t500x500.jpg"
        },
        {
            title: "Облысение после тридцати",
            content_text: "Люди начали лысеть после тридцати\nnigga party\nuhsdaudhas\nshuhaduash",
            author_name: "Maksonchik",
            author_id: 0,
            date: "21.01.2012 20:48",
            featured_image: "https://i1.sndcdn.com/artworks-000104557119-038f1g-t500x500.jpg"
        },
        {
            title: "Облысение после тридцати",
            content_text: "Люди начали лысеть после тридцати\nnigga party\nuhsdaudhas\nshuhaduash",
            author_name: "Maksonchik",
            author_id: 0,
            date: "21.01.2012 20:48",
            featured_image: "https://i1.sndcdn.com/artworks-000104557119-038f1g-t500x500.jpg"
        },
        {
            title: "Облысение после тридцати",
            content_text: "Люди начали лысеть после тридцати\nnigga party\nuhsdaudhas\nshuhaduash",
            author_name: "Maksonchik",
            author_id: 0,
            date: "21.01.2012 20:48",
            featured_image: "https://i1.sndcdn.com/artworks-000104557119-038f1g-t500x500.jpg"
        },
        {
            title: "Облысение после тридцати",
            content_text: "Люди начали лысеть после тридцати\nnigga party\nuhsdaudhas\nshuhaduash",
            author_name: "Maksonchik",
            author_id: 0,
            date: "21.01.2012 20:48",
            featured_image: "https://i1.sndcdn.com/artworks-000104557119-038f1g-t500x500.jpg"
        }
    ])

    const getPosts = async () => {
        await fetch(`http://localhost:3001/posts`)
        .then(res => res.json())
        .then(res => {
            console.log(res.posts)
            if (res.posts) {
                setPosts(res.posts)

            }
        })

    }

    return (
        <div className="posts">
            {
                posts?.length ?
                    posts.map(post => {
                        return (
                            <div key={post._id}  className="posts_item">
                                <div className="posts_item_info">
                                    <Link to={`/users/${post.author_id}`} className="post_info_author">
                                        <div className="post_info_author_avatar">
                                            <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Bundesarchiv_Bild_183-S33882%2C_Adolf_Hitler_%28cropped2%29.jpg/248px-Bundesarchiv_Bild_183-S33882%2C_Adolf_Hitler_%28cropped2%29.jpg"/>
                                        </div>
                                        <p className="post_info_author_name">{post.author_name}</p>
                                    </Link>
                                    <Link to={`/posts/${post._id}`}>
                                        <h2 className="post_info_title">{post.title}</h2>
                                        <div className="post_info_description">
                                            {post.content_text.split('\n').map(str => <p>{str}</p>)}
                                        </div>
                                    </Link>
                                    <span className="post_info_date">{post.date}</span>
                                </div>
                                <Link to={`/posts/${post._id}`} className="post_info_img">
                                    <img src={post.featured_image} alt="" />
                                </Link>
                            </div>
                        )
                    })
                : <></>
            }
        </div>
    )
}

export default Posts;