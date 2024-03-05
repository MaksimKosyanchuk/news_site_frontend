import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Posts.scss";
import Loading from "../../components/Loading";
import Author from "../../components/Author";

const Posts = () => {
    const [posts, setPosts] = useState([
        {
            _id: 0,
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
        <div className="posts posts_bigger">
            {
                posts?.length ?
                    posts.map(post => {
                        return (
                            <div key={post._id}  className="posts_item app-transition">
                                <div className="posts_item_info">
                                    <Author
                                        author_id={post.author_id}
                                        author_name={"Kokos"}
                                        author_avatar={"https://masterpiecer-images.s3.yandex.net/5facb7c9220a5a8:upscaled"}
                                        />
                                    <Link to={`/posts/${post._id}`}>
                                        <h2 className="post_info_title">{post.title}</h2>
                                        <div className="post_info_description">
                                            {post.content_text.split('\n').map(str => <p>{str}</p>)}
                                        </div>
                                    </Link>
                                    <span className="post_info_date">{post.date}</span>
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
    )
}

export default Posts;