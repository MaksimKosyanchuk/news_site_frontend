import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Article = () => {
    const {id} = useParams();
    const navigate = useNavigate()

    const [article, setArticle] = useState({});

    const getArticle = async () => {
        // console/.log()
        // fetch 
        try {
            let findNeededArticle = await fetch(`http://localhost:3001/posts/${id}`)
            .then(res => res.json())
            .then(res => {
                if (res.post) {
                    setArticle(res.post)

                }
            })
            
        } catch(e) {
            navigate('/')
        }
        // if ok 
    }

    useEffect(() => {
        getArticle()
    }, [])

    return (
        <div className="post">
            {
                article ?
                    <div className="post-conmtent">
                        <h1>{article.title}</h1>
                        <p>{article.body}</p>
                    </div>
                : <></>     
            }
        </div>
    )
}

export default Article;