import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextEditor, { Content } from "../../components/TextEditor";
import Loading from "../../components/Loading";
import "./Article.scss";
import ArticleTopic from "../../components/ArticleTopic";


const Article = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    
    const [isLoading, setIsLoading] = useState(false);

    const getArticle = async () => {
        try {
            setIsLoading(true);
            let findNeededArticle = await fetch(`http://localhost:3001/api/posts/${id}`)
            .then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    setArticle(res.data)
                    console.log(res)
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

    useEffect(() => {
        getArticle()
    }, [])    

    const [article, setArticle] = useState([ ])

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div>
            {
                article ?
                    <div className="article">
                        <h1 className="article-title">{article.title}</h1>
                        <ArticleTopic article={article} />
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
        </div>
    )
}

export default Article;