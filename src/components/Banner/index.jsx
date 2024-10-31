import "./Banner.scss";

const Banner = ({ image, children }) => {
    console.log(process.env.PUBLIC_URL)
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