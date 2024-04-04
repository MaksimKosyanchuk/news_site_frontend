import "./Profile.scss"
import ProfilePosts from "./ProfilePosts"
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
        const token = localStorage.getItem('token')

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: localStorage.getItem('token') })
            };
            
            let findNeededProfile = await fetch(`${API_URL}/api/users/${id}`)
            let res = await findNeededProfile.json()

            if(res.status == "error") {
                navigate('/404')
            }

            else {
                setProfile(res.data)
                findNeededProfile = await fetch(`${API_URL}/api/profile`, requestOptions)
                findNeededProfile = await findNeededProfile.json()

                if(findNeededProfile.status == "success" && res.data._id == findNeededProfile.data._id) {
                    setProfile(findNeededProfile.data)
                }
            }
            
        } catch(e) {
            console.log(e)
            navigate('/404')
        }
    };
    
    useEffect(() => {
        getProfile()
    }, []);
    
    const [profile, setProfile] = useState([])
    
    if(!profile) {
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
                    <p className="profile_info_data_name">{profile.nick_name}</p>
                    <p className="profile_info_data_registration_date">Дата регистрации: {format_date(profile.created_date)}.</p>
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
                        profile._id ? <ProfilePosts query = {{ author: profile._id }} /> 
                        : <></>
                    )   
                    :
                    (
                        profile.saved_posts ? <ProfilePosts query = {{ _id: profile.saved_posts }} /> : <></>
                    )
                }
            </div>
        </div>   
    )
}

export default Profile;