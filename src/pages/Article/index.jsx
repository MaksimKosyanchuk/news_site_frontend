import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextEditor, { Content } from "../../components/TextEditor";
import Loading from "../../components/Loading";
import "./Article.scss";
import ArticleTopic from "../../components/ArticleTopic";

// Initial Data
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
            title: "Облысение после тридцати",
            content_text: "Люди <a href='google.com'>начали</a> лысеть после тридцатиdsadkmaslkdmalsdmla smdlaskmdlaskmdlaskmdlaskmdlaskmd aksmdlaks mdlaskmdlkasmkldasdkmaslkmdlaskmdlkasmdlsakmdlkasmdlamsldmaslk\nnigga party\nuhsdaudhas\nshuhaduash",
            author_name: "Maksonchik",
            author_avatar: "https://masterpiecer-images.s3.yandex.net/5facb7c9220a5a8:upscaled",
            author_id: 0,
            date: "21.01.2012 20:48",
            is_saved: false,
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
                        
                        <div className="article-topic">
                            <ArticleTopic article={article} setArticle={setArticle} />
                        </div>

                        <span className="article-date">{article.date}</span>

                        <div className="article-featured-image">
                            <img src={article.featured_image} />
                        </div>

                        {/* <ReactQuill quill={quill} onChange={handleChange} /> */}
                        <div className="article-content">
                            <Content data={editorData}/>
                            <TextEditor data={editorData} onChange={setEditorData} editorblock="editorjs-container" />
                        </div>

                    </div>
                : <></>     
            }
        </div>
    )
}

export default Article;