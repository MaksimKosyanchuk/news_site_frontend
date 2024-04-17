import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import "./Article.scss";
import { ArticleTopic } from "../../components/ArticleTopic";
import { API_URL } from "../../config";
import { AppContext } from "../../App";
import MainLayout from "../../components/MainLayout";


const Article = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    
    const [isLoading, setIsLoading] = useState(false)
    const { profile } = useContext(AppContext)
    const [article, setArticle] = useState([ ])
    
    useEffect(() => {
        getArticle()
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

    return (
        !isLoading ?
        <MainLayout>
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
                        </div>:
                    <></>     
                }
            </div>
        </MainLayout>:
        <Loading />
    )
}

export default Article;