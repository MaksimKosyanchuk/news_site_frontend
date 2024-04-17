import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Posts.scss";
import Loading from "../../components/Loading";
import { ArticleTopic } from "../../components/ArticleTopic";
import NoPosts from "../NoPosts";
import { AppContext } from "../../App";

const Posts =  ( { posts, isLoading } ) => {
    const { profile } = useContext(AppContext)

    if(!posts) {
        return <NoPosts/>
    }

    return (
        <div className="posts posts_columns">
        {
            isLoading ?
                <Loading/> :
                posts.length == 0 ? 
                    <NoPosts/> :
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
                    }
                )
        }
        </div>
    )
}

export default Posts;