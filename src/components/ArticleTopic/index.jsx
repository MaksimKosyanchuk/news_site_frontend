import { useEffect, useState } from "react";
import Author from "../Author";
import { ReactComponent as BookMarkBorder} from "../../assets/svg/bookmark-outline.svg";
import { ReactComponent as BookMarkFilled} from "../../assets/svg/bookmark-filled.svg";
import { ReactComponent as ShareIcon} from "../../assets/svg/share.svg";
import { API_URL } from "../../config";
import "./ArticleTopic.scss";

async function copy_article_url(id) {
    try {
        await navigator.clipboard.writeText(`/posts/${id}`)
    } catch (err) {
        console.error(`Failed to copy: /posts/${id}`, err)
    }
}

function format_date(date) {
    const isoDatetimeStr = "2024-03-07T15:47:19.130Z"
    const isoDatetime = new Date(isoDatetimeStr)

    const formattedDatetimeStr = isoDatetime.toLocaleString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })

    return formattedDatetimeStr.replace(",", "")
}

const ArticleTopic = ({ article }) => {
    const [isSaved, setIsSaved] = useState(false)

    useEffect(() => {
    }, [])

    const get_saved_posts = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: localStorage.getItem('token') })
        }

        try{
            let findNeededProfile = await fetch(`${API_URL}/api/profile`, requestOptions)
            findNeededProfile = await findNeededProfile.json()
            console.log("test", findNeededProfile.data.saved_posts, article._id)
            setIsSaved(findNeededProfile.data.saved_posts.indexOf(article._id) !== -1)
        } catch(e) {
            console.log(e)
        }
        
    }

    const save_post = ( {article} ) => {

    }

    get_saved_posts()

    return (
        <div className="article-topic">
            <Author {...article.author}/>
            <p className="article-topic-date">{format_date(article.created_date)}</p>
            <button type="button" className="article-topic-button" onClick={() => copy_article_url(article._id)}>
                <ShareIcon />
            </button>

            <button type="button" className="article-topic-button" onClick={save_post}>
                {isSaved ? <BookMarkFilled />  : <BookMarkBorder />}
            </button>
        </div>
    )
}

export  { ArticleTopic, format_date }