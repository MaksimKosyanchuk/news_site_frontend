import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import "./Article.scss";
import { ArticleTopic } from "../../components/ArticleTopic";
import { API_URL } from "../../config";


const Article = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    
    const [isLoading, setIsLoading] = useState(false)
    const [profile, setProfile] = useState(null)
    const [article, setArticle] = useState([ ])
    
    useEffect(() => {
        getArticle()
        getProfile()
    }, [])    

    const getArticle = async () => {
        try {
            setIsLoading(true)
            
            let findNeededArticle = await fetch(`${API_URL}/api/posts/${id}`)
            .then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    setArticle(res.data)
                }
                else {
                    navigate('/404')
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
            
        } catch(e) {
            navigate('/404')
        }
    }

    const getProfile = async () => {
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
        }
    }

    return (
        !isLoading ?
        <div>
            {
                article ?
                    <div className="article">
                        <h1 className="article-title">{article.title}</h1>
                        <ArticleTopic article={article} profile={profile}/>
                        {article.featured_image ? 
                            <div className="article-featured-image">
                            <img src={article.featured_image}/> 
                            </div>
                        : 
                            <></>
                        }

                        <div className="article-content" dangerouslySetInnerHTML={{__html: article.content_text}}>
                        </div>

                    </div>
                : <></>     
            }
        </div>:
        <Loading />
    )
}

export default Article;