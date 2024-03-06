import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextEditor, { Content } from "../../components/TextEditor";
import Loading from "../../components/Loading";
import "./Article.scss";
import ArticleTopic from "../../components/ArticleTopic";

const INITIAL_EDITOR_DATA = {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "This is my awesome editor!",
          level: 1,
        },
      },
    ],
  };


const Article = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const [editorData, setEditorData] = useState(INITIAL_EDITOR_DATA);
    
    const [isLoading, setIsLoading] = useState(false);

    const getArticle = async () => {
        try {
            setIsLoading(true);
            let findNeededArticle = await fetch(`http://localhost:3001/api/posts/${id}`)
            .then(res => res.json())
            .then(res => {
                if (res.post) {
                    setArticle(res.post)

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
                        <ArticleTopic article={article}/>
                        {article.featured_image ? 
                            <div className="article-featured-image">
                            <img src={article.featured_image}/> 
                            </div>
                        : 
                            <></>
                        }

                        {/* <ReactQuill quill={quill} onChange={handleChange} /> */}
                        <div className="article-content" dangerouslySetInnerHTML={{__html: article.content_text}}>
                        </div>

                    </div>
                : <></>     
            }
        </div>
    )
}

export default Article;