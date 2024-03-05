import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Posts.scss";
import Loading from "../../components/Loading";
import Banner from "../../components/Banner";
import ArticleTopic from "../../components/ArticleTopic";

const Posts = () => {
    const [posts, setPosts] = useState([
        {
            _id: 0,
            title: "Облысение после тридцати",
            // content_text: "Люди начали лысеть после тридцатиdsadkmaslkdmalsdmla smdlaskmdlaskmdlaskmdlaskmdlaskmd aksmdlaks mdlaskmdlkasmkldasdkmaslkmdlaskmdlkasmdlsakmdlkasmdlamsldmaslk\nnigga party\nuhsdaudhas\nshuhaduash",
            author_name: "Maksonchik",
            author_id: 0,
            author_avatar: "https://masterpiecer-images.s3.yandex.net/5facb7c9220a5a8:upscaled",
            date: "21.01.2012 20:48",
            featured_image: "https://i1.sndcdn.com/artworks-000104557119-038f1g-t500x500.jpg"
        },
        {
            _id: 1,
            title: "Облысение после тридцати",
            // content_text: "Люди начали лысеть после тридцатиdsadkmaslkdmalsdmla smdlaskmdlaskmdlaskmdlaskmdlaskmd aksmdlaks mdlaskmdlkasmkldasdkmaslkmdlaskmdlkasmdlsakmdlkasmdlamsldmaslk\nnigga party\nuhsdaudhas\nshuhaduash",
            author_name: "Maksonchik",
            author_id: 0,
            author_avatar: "https://masterpiecer-images.s3.yandex.net/5facb7c9220a5a8:upscaled",
            date: "21.01.2012 20:48",
            featured_image: "https://i1.sndcdn.com/artworks-000104557119-038f1g-t500x500.jpg"
        },
        {
            _id: 2,
            title: "Облысение после тридцати",
            // content_text: "Люди начали лысеть после тридцатиdsadkmaslkdmalsdmla smdlaskmdlaskmdlaskmdlaskmdlaskmd aksmdlaks mdlaskmdlkasmkldasdkmaslkmdlaskmdlkasmdlsakmdlkasmdlamsldmaslk\nnigga party\nuhsdaudhas\nshuhaduash",
            author_name: "Maksonchik",
            author_id: 0,
            author_avatar: "https://masterpiecer-images.s3.yandex.net/5facb7c9220a5a8:upscaled",
            date: "21.01.2012 20:48",
            featured_image: "https://i1.sndcdn.com/artworks-000104557119-038f1g-t500x500.jpg"
        }
    ])
    const [isLoading, setIsLoading] = useState(false);  

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

    if (isLoading) {
        return <Loading/>
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
                    posts?.length ?
                        posts.map(post => {
                            return (
                                <div key={post._id}  className="posts_item app-transition">
                                    <div className="posts_item_info">
                                        <ArticleTopic article={post}/>
                                        <Link to={`/posts/${post._id}`}>
                                            <h2 className="posts_item_info_title">{post.title}</h2>
                                            
                                            { 
                                                post.content_text ?
                                                    <div className="posts_item_info_description">
                                                        {post.content_text.split('\n').map(str => <p>{str}</p>)}
                                                    </div>
                                                : <></>
                                            }

                                        </Link>
                                        <span className="posts_item_info_date">{post.date}</span>
                                    </div>
                                    <Link to={`/posts/${post._id}`} className="posts_item_img">
                                        <img src={post.featured_image} alt="" />
                                    </Link>
                                </div>
                            )
                        })
                    : <></>
                }
            </div>
        </>
    )
}

export default Posts;