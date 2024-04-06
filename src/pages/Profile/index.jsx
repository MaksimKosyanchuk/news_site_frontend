import "./Profile.scss"
import Posts from "../../components/Posts/index.jsx"
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format_date } from "../../components/ArticleTopic";
import Loading from "../../components/Loading";
import { API_URL } from "../../config";

const Profile = ( ) => {
    const {id} = useParams();
    const navigate = useNavigate()
    let tabs = ["Посты", "Сохранённые"]
    let [ activeTab, setActiveTab ] = useState(tabs[0])
    
    const getProfile = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: localStorage.getItem('token') })
            }
            
            let findNeededUser = await fetch(`${API_URL}/api/users/${id}`)
            findNeededUser = await findNeededUser.json()
            
            if(findNeededUser.status === "error") {
                navigate('/404')
            }
            
            else {
                await setUser(findNeededUser.data)
                let findNeededProfile = await fetch(`${API_URL}/api/profile`, requestOptions)
                findNeededProfile = await findNeededProfile.json()
                if(findNeededProfile.status === "success" && findNeededProfile.data._id === findNeededUser.data._id) {
                    await setProfile(findNeededProfile.data)
                }
            }
            
        } catch(e) {
            console.log(e)
            navigate('/404')
        }
    };
    
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    
    useEffect(() => {
        getProfile()
    }, []);
    
    
    if(!user) {
        return (
            <Loading></Loading>
        )
    }

    return (
        <div className="profile"> 
            <div className="profile_info">
                <div className="profile_info_avatar">
                    <img src = "https://avatars.githubusercontent.com/u/113336097?v=4" alt="img"/>
                </div>
                <div className="profile_info_data">
                    <p className="profile_info_data_name">{ user.nick_name }</p>
                    <p className="profile_info_data_registration_date">Дата регистрации: {format_date(user.created_date)}.</p>
                </div>
            </div>
            <div className="profile_tab_list"> 
                {tabs.map((item, index) => (
                    <div key={index} onClick={() => setActiveTab(item)} className={activeTab === item ? "profile_tab_list_active" : ''}>
                        <p>{item}</p>
                    </div>
                ))}
            </div>
            <div className="profile_posts">
                {
                    (activeTab === "Посты") ? 
                    (
                        user._id ? <Posts query = {{ author: user._id }} /> :
                        <></>
                    )   
                    :
                    (
                        profile && profile.saved_posts.length > 0 ? <Posts query = {{ _id: profile.saved_posts }} /> :
                        <></>
                    )
                }
            </div>
        </div>   
    )
}

export default Profile;