import "./Posts.scss";
import Banner from "../../components/Banner";
import Posts from "../../components/Posts/index.jsx";
import { API_URL } from "../../config/index.js";

const HomePage = () => {
    
    return (
        <>
            <Banner 
                image={'https://img.tsn.ua/cached/552/tsn-dc382829a98d0f40b34d312a72bcb9b7/thumbs/1116x628/dc/7d/3769751a1240ebcc80e4c7322c177ddc.jpeg'}>

                <h1>My News Site</h1>
                <p>Please, share this work with your friends</p>
                <a href={`${API_URL}/api/users/Maks`}>Maks</a>
            </Banner>

            <Posts/>
        </>
    )
}

export default HomePage