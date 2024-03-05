import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import "./Article.scss";
import Author from "../../components/Author";

const Article = () => {
    const {id} = useParams();
    const navigate = useNavigate()

    // const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getArticle = async () => {
        try {
            setIsLoading(true);
            let findNeededArticle = await fetch(`http://localhost:3001/posts/${id}`)
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

    // useEffect(() => {
    //     getArticle()
    // }, [])

    const [article, setArticle] = useState(
        {
            _id: 0,
            title: "Облысение после тридцати dsndjasnd djsnadj asndjn dsjan jsan jdasn das sd asd asd as das dsa",
            content_text: "Люди <b>начали</b> лысеть после тридцатиdsadkmaslkdmalsdmla smdlaskmdlaskmdlaskmdlaskmdlaskmd aksmdlaks mdlaskmdlkasmkldasdkmaslkmdlaskmdlkasmdlsakmdlkasmdlamsldmaslk\nnigga party\nuhsdaudhas\nshuhaduash",
            author_name: "Maksonchik",
            author_id: 0,
            date: "21.01.2012 20:48",
            featured_image: "https://i1.sndcdn.com/artworks-000104557119-038f1g-t500x500.jpg"
        },
    )

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div>
            {
                article ?
                    <div className="article">
                        <h1 className="article-title">{article.title}</h1>
                        <Author
                            author_id={345}
                            author_name={"Kokos"}
                            author_avatar={"https://masterpiecer-images.s3.yandex.net/5facb7c9220a5a8:upscaled"}
                            />
                        <span className="article-date">{article.date}</span>
                        <div className="article-featured-image">
                            <img src={article.featured_image} />
                        </div>
                        <div className="article-content" dangerouslySetInnerHTML={ { __html: article.content_text}}>
                        </div>
                    </div>
                : <></>     
            }
        </div>
    )
}

export default Article;