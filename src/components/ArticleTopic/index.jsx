import { useState } from "react";
import Author from "../Author";
import { ReactComponent as BookMarkBorder} from "../../assets/svg/bookmark-outline.svg"
import { ReactComponent as BookMarkFilled} from "../../assets/svg/bookmark-filled.svg"
import { ReactComponent as ShareIcon} from "../../assets/svg/share.svg"
import "./ArticleTopic.scss"

async function copy_article_url(id) {
    try {
        await navigator.clipboard.writeText(`/posts/${id}`);
      } catch (err) {
        console.error(`Failed to copy: /posts/${id}`, err);
      }
}

const ArticleTopic = ({ article, setArticle }) => {
    const [isSaved, setIsSaved] = useState(false);

    const fetchSaving = () => {
        // fetch 
        setIsSaved(!isSaved)
    }

    return (
        <div className="article-topic">
            <Author {...article}/>
            <p className="article-topic-date">21.01.2023</p>
            <button type="button" className="article-topic-button" onClick={() => copy_article_url(article._id)}>
                <ShareIcon />
            </button>

            <button type="button" className="article-topic-button" onClick={fetchSaving}>
                {isSaved ? <BookMarkBorder />  : <BookMarkFilled />}
            </button>
        </div>
    )
}

export default ArticleTopic;