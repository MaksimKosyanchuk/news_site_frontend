import "./Author.scss";
import { Link } from "react-router-dom";

const Author = ({ author_id, author_name, author_avatar  }) => {

    
    return (
        <Link className="author" to={`/users/${author_id}`}>
            <div className="author_avatar">
                <img src = {author_avatar}/>
            </div>
            <div className="author_info">
                <p className="author_name">
                    {author_name}
                </p>
            </div>
        </Link>
    )
}

export default Author;