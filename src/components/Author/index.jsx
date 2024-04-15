import "./Author.scss";
import { Link } from "react-router-dom";

const Author = ( author_data ) => {
    if(!author_data) return<></>
    return (
        <Link className="author" to={`/users/${author_data.nick_name}`}>
            <div className="author_avatar">
                <img src = {author_data.avatar ? author_data.avatar : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}/>
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