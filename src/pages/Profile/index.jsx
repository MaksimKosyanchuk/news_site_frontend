import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App.js";
import { format_date } from "../../components/ArticleTopic";
import { API_URL } from "../../config";
import { getPosts } from "../../api/posts.api.js";
import Posts from "../../components/Posts/index.jsx"
import Loading from "../../components/Loading";
import "./Profile.scss"
import DefaultProfileAvatar from "../../assets/images/default-profile-avatar.png"
import { ReactComponent as Verified } from "../../assets/svg/verified-icon.svg";
import { ReactComponent as Calendar } from "../../assets/svg/calendar-icon.svg";

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    let tabs = ["Посты", "Сохранённые"];
    const { profile, setProfile, showToast } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [activePosts, setActivePosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                let response = await fetch(`${API_URL}/api/users/${id}`);
                let findNeededUser = await response.json();
                if (findNeededUser.status === "error") {
                    navigate('/404');
                } else {
                    setUser(findNeededUser.data);
                }
            } catch (e) {
                console.log(e);
                navigate('/404');
            }
        };
        getUser();
    }, [id]);

    useEffect(() => {
        if (user && user._id) {
            fetchPosts({ author: user._id }).then(data => setPosts(data));
        }
    }, [user]);

    useEffect(() => {
        if (activeTab === "Посты") {
            setActivePosts(posts);
        } else if (activeTab === "Сохранённые") {
            if (profile?.saved_posts?.length > 0) {
                fetchPosts({ _id: profile.saved_posts }).then(data => setActivePosts(data));
            } else {
                setActivePosts([]);
            }
        }
    }, [activeTab, posts, profile?.saved_posts]);

    const follow = async () => {
        try {
            const formData = new FormData();
            formData.append("token", localStorage.getItem("token"));
            formData.append('nick_name', user.nick_name);

            const follow = await fetch(`${API_URL}/api/profile/follow`, { method: "POST", body: formData})
            const result = await follow.json();

            if(result.status === "success") {
                setUser(result.data.followed)
                setProfile(result.data.follower)
                showToast({ message: `Вы подписались на ${result.data.followed.nick_name}!`, type: "success" })
            }
            else {
                if(result?.errors?.token){
                    showToast({ type: "warning", message: "Чтобы подписаться нужно войти в аккаунт!" })
                }
                if(result?.errors?.["user_id/nick_name"] === "U are already following this user!") {
                    showToast({ type: "warning", message: "Вы уже подписаны на этого пользователя!" })   
                }
                if(result?.errors?.["user_id/nick_name"] === "U cacanot follow your self!") {
                    showToast({ type: "warning", message: "Вы не можете подписаться на самого себя!" })   
                }
            }
        }
        catch(e) {
            console.log(e)
        }
    }

    const unfollow = async () => {
        try {
            const formData = new FormData();
            formData.append("token", localStorage.getItem("token"));
            formData.append('nick_name', user.nick_name);

            const follow = await fetch(`${API_URL}/api/profile/unfollow`, { method: "POST", body: formData})
            const result = await follow.json();

            if(result.status === "success") {
                showToast({ message: `Вы отписались от ${result.data.followed.nick_name}!`, type: "success" })
                setUser(result.data.followed)
                setProfile(result.data.follower)
            }
            else {
                if(result?.errors?.token){
                    showToast({ type: "warning", message: "Чтобы подписаться нужно войти в аккаунт!" })
                }
                if(result?.errors?.["user_id/nick_name"] === "You are not following this user!") {
                    showToast({ type: "warning", message: "Вы еще не подписаны на этого пользователя!" })   
                }
                if(result?.errors?.["user_id/nick_name"] === "You cannot unfollow yourself!") {
                    showToast({ type: "warning", message: "Вы не можете отписаться от самого себя!" })   
                }
            }
        }
        catch(e) {
            console.log(e)
        }
    }

    const fetchPosts = async (query) => {
        setIsLoading(true);
        const response = await getPosts(query);
        setIsLoading(false);
        return response.status === "success" ? response.data : [];
    };

    const handleTabClick = async (item) => {
        if (item === "Сохранённые" && (!profile || profile._id !== user._id)) {
            return;
        }
        setActiveTab(item);

        if (item === "Посты" && user?._id) {
            setIsLoading(true);
            const updatedPosts = await fetchPosts({ author: user._id });
            setPosts(updatedPosts);
            setIsLoading(false);
        }
    };

    const quitButtonClick = () => {
        localStorage.removeItem('token');
        showToast({ message: "Вы вышли из аккаунта!", type: "success" });
        navigate('/posts');
    };

    if (!user) {
        return <Loading />;
    }

    return (
        <div className="profile">
            <div className="profile_info">
                <div className="profile_info_top">
                    <div className="profile_info_top_avatar">
                        <img src={user?.avatar ?? DefaultProfileAvatar} alt="img" />
                    </div>
                    <div className="profile_info_top_right_side">
                        <div></div>
                        <div className="profile_info_top_right_side_elements">
                            <p>{posts?.length ?? "0"} постов</p>
                            <Link className="app-transition">
                                <p>{user?.follows?.length ?? "0"} подписок</p>
                            </Link>
                            <Link className="app-transition">
                                <p>{user?.followers?.length ?? "0"} подписчиков</p>
                            </Link>
                        </div>
                        {profile && profile._id === user._id ? (
                            <button
                                className="profile_info_top_right_side_button profile_info_top_right_side_button_quit app-transition"
                                onClick={quitButtonClick}
                            >
                                Выйти
                            </button>
                        ) : profile?.follows?.some(item => item === user._id) ? (
                            <button
                                onClick={unfollow}
                                className="profile_info_top_right_side_button profile_info_top_right_side_button_follow app-transition"
                            >
                                Отписаться
                            </button>
                        ) : (
                            <button
                                onClick={follow}
                                className="profile_info_top_right_side_button profile_info_top_right_side_button_follow app-transition"
                            >
                                Подписаться
                            </button>
                        )}
                    </div>
                </div>
                <div className="profile_info_bottom">
                    <div className="profile_info_bottom_nick">
                        <p
                            className={
                                "profile_info_bottom_nick_name" +
                                (user && user.is_admin ? " profile_info_bottom_nick_name_admin" : "")
                            }
                        >
                            {user.nick_name}
                        </p>
                        {user && user.is_verified ? <Verified className="profile_info_bottom_nick_verified" /> : null}
                    </div>
                    <div className="profile_info_bottom_administrator">
                        {
                            user?.is_admin ? 
                                <p>Administrator</p>
                            :
                                <></>
                        }
                    </div>
                    {user?.description && (
                        <div className="profile_info_bottom_description">
                            <p>{user.description}</p>
                        </div>
                    )}
                    <div className="profile_info_bottom_registration_date">
                        <Calendar className="app-transition" />
                        <p>Регистрация: {format_date(user.created_date)}.</p>
                    </div>
                </div>
            </div>
            <div className="profile_tab_list app-transition">
                {tabs.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleTabClick(item)}
                        className={`${
                            activeTab === item ? "profile_tab_list_active" : ""
                        } ${item === "Сохранённые" && (!profile || profile._id !== user._id) ? "not_allowed" : ""}`}
                    >
                        <p>{item}</p>
                    </div>
                ))}
            </div>
            <div className="profile_posts">
                <Posts posts={activePosts} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default Profile;