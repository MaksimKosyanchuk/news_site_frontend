
import "./Banner.scss";

const Banner = ({ image, content }) => {
    return (
        <div className="banner">
            <img src={image} alt="" />

            <div className="banner_content">
                {content}
            </div>
        </div>
    );
}

export default Banner;