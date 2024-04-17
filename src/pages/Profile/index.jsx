import "./Profile.scss"
import Posts from "../../components/Posts/index.jsx"
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { format_date } from "../../components/ArticleTopic";
import Loading from "../../components/Loading";
import { API_URL } from "../../config";
import { AppContext } from "../../App.js";
import DefaultProfileAvatar from "../../assets/images/default-profile-avatar.png"
import NoPosts from '../../components/NoPosts'
import { getPosts } from "../../api/posts.api.js";


const Profile = ( ) => {
    const {id} = useParams();
    const navigate = useNavigate()
    let tabs = ["Посты", "Сохранённые"]
    let [ activeTab, setActiveTab ] = useState(tabs[0])
    const { profile } = useContext(AppContext)
    const [ isLoading, setIsLoading ] = useState(false)
    const [posts, setPosts] = useState([ ])
    const [user, setUser] = useState(null)

    useEffect(() => {
        if(activeTab === "Посты" && user && user._id){
            fetchPosts( { author: user._id } )
        }
        else if(activeTab === "Сохранённые" && profile ){
            if(profile.saved_posts.length == 0){
                setPosts([])
            }
            else{
                fetchPosts( { _id: profile.saved_posts } )
            }
        }
        console.log("posts")
    }, [activeTab, user])

    const handleTabClick = (item) => {
        if (item === "Сохранённые" && (!profile || profile._id !== user._id)) {
            return
        }
        setActiveTab(item)
    };

    const quitButtonClick = () => {
        localStorage.removeItem('token')
        navigate('/posts')
    }

    const getUser = async () => {
        try {
            let findNeededUser = await fetch(`${API_URL}/api/users/${id}`)
            findNeededUser = await findNeededUser.json()
            
            if(findNeededUser.status === "error") {
                navigate('/404')
            }
            else {
                await setUser(findNeededUser.data)
            }
            
        } catch(e) {
            console.log(e)
            navigate('/404')
        }
    };

    const fetchPosts = async (query) => {
        setIsLoading(true)
        const response = await getPosts(query)
        console.log("res", response)
        if(response.status === "success") {
            setPosts(response.data)
        }
        else{
            setPosts([])
        }
        setIsLoading(false)
    }
    
    useEffect(() => {
        getUser()
    }, [id]);
    
    
    if(!user) {
        return (
            <Loading></Loading>
        )
    }

    return (
        <div className="profile"> 
            <div className="profile_info">
                <div className="profile_info_avatar">
                    <img src={user?.avatar ?? DefaultProfileAvatar} alt="img"/>
                </div>
                <div className="profile_info_data">
                    <p className={ "profile_info_data_name" + ( user && user.is_admin ? " profile_info_data_administrator_true" : "") } >{ user.nick_name }</p>
                    <p className={ "profile_info_data_administrator" + ( user && user.is_admin ? " profile_info_data_administrator_true": "") } >Administrator</p>
                    <p className="profile_info_data_registration_date">Дата регистрации: {format_date(user.created_date)}.</p>
                </div>
                {
                    (profile && profile._id == user._id) ?
                    <button className="profile_info_quit_button app-transition" onClick={quitButtonClick}>
                    <p>Выйти</p>
                    </button>:
                    <></>
                }
            </div>
            <div className="profile_tab_list"> 
                {tabs.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleTabClick(item)}
                        className={`${activeTab === item ? "profile_tab_list_active" : ""} ${item === "Сохранённые" && (!profile || profile._id !== user._id) ? "not_allowed" : ""}`}
                    >
                        <p>{item}</p>
                    </div>
                ))}
            </div>
            <div className="profile_posts">
                {
                    isLoading ? 
                        <Loading/> 
                    :
                    (posts && posts.length > 0) ? 
                    <Posts posts={posts}/> 
                        :
                        <NoPosts/>
                }
            </div>
        </div>   
    )
}

export default Profile;