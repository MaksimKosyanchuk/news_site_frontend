import "./Author.scss";
import { Link } from "react-router-dom";

const Author = ( author_data ) => {
    if(!author_data) return<></>
    return (
        <Link className="author" to={`/users/${author_data.nick_name}`}>
            <div className="author_avatar">
                <img src = {author_data.avatar ? author_data.avatar : "https://avatars.githubusercontent.com/u/113336097?v=4"}/>
            </div>
            <div className="author_info">
                <p className="author_name">
                    {author_data.nick_name}
                </p>
            </div>
        </Link>
    )
}

export default Author;