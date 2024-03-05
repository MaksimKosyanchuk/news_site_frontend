
import "./Banner.scss";

const Banner = ({ image, children }) => {
    return (
        <div className="banner">
            <img src={image} alt="" />

            <div className="banner_content">
                {children}
            </div>
        </div>
    );
}

export default Banner;