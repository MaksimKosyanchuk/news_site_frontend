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
    return (
        <div className="article-topic">
            <Author {...article}/>

            <button type="button" className="article-topic-button article-topic-button_share" onClick={() => copy_article_url(article._id)}>
                <ShareIcon />
            </button>

            <button type="button" className="article-topic-button article-topic-button_save" onClick={() => setArticle({...article, is_saved: !article.is_saved})}>
                {article.is_saved ? <BookMarkBorder />  : <BookMarkFilled />}
            </button>
        </div>
    )
}

export default ArticleTopic;