import { useContext, useEffect, useState } from "react";
import Author from "../Author";
import { ReactComponent as BookMarkBorder} from "../../assets/svg/bookmark-outline.svg";
import { ReactComponent as BookMarkFilled} from "../../assets/svg/bookmark-filled.svg";
import { ReactComponent as ShareIcon} from "../../assets/svg/share.svg";
import { API_URL } from "../../config";
import "./ArticleTopic.scss";
import { AppContext } from "../../App";
import Loading from "../Loading";

async function copy_article_url(id) {
    try {
        await navigator.clipboard.writeText(`/posts/${id}`)
    } catch (err) {
        console.error(`Failed to copy: /posts/${id}`, err)
    }
}

function format_date(date) {
    const isoDatetimeStr = date
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
    const { profile, setProfile } = useContext(AppContext)
    const [isSaved, setIsSaved] = useState(profile && profile.saved_posts && article && article._id && profile.saved_posts.includes(article._id))
    const [ isSavingProcess, setSavingProcess ] = useState(false)

    useEffect(() => {
        setIsSaved(profile && profile.saved_posts && article && article._id && profile.saved_posts.includes(article._id))
    }, [profile])

    const save_post = async () => {
        setSavingProcess(true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: localStorage.getItem('token'), post_id: article._id })
        };

        try {
            let result = await fetch(`${API_URL}/api/profile/save-post`, requestOptions)
            result = await result.json();
            if (result.status === "success") {
                let saved_posts = isSaved ? profile.saved_posts.filter(element => element !== article._id ) : [...profile.saved_posts, article._id]
                setProfile({...profile, saved_posts: saved_posts })
                setIsSaved(!isSaved)
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            setSavingProcess(false)
        }
    };

    return (
        <div className="article-topic">
            <Author {...article.author} />
            <p className="article-topic-date">{format_date(article.created_date)}</p>
            <button type="button" className="article-topic-button" onClick={() => copy_article_url(article._id)}>
                <ShareIcon />
            </button>
            <button type="button" className="article-topic-button" onClick={save_post} disabled={isSavingProcess}>
                {
                    // isSavingProcess ? <Loading/>:
                    (isSaved ? <BookMarkFilled /> : <BookMarkBorder />)
                }
            </button>
        </div>
    )
}

export  { ArticleTopic, format_date }