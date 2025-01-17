import { AppContext } from "../../App.js";
import { useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router'
import { API_URL } from "../../config";
import "./FollowButton.scss";

const FollowButton = ({ user, update_user=null, setUser, author_id, class_name }) => {
    const { profile, setProfile, showToast } = useContext(AppContext);
    let location = useLocation()

    const follow = async () => {
        try {
            const formData = new FormData();
            formData.append("token", localStorage.getItem("token"));
            formData.append('user_id', author_id);

            const follow = await fetch(`${API_URL}/api/profile/follow`, { method: "POST", body: formData})
            const result = await follow.json();

            if(result.status === "success") {
                setProfile(result.data.follower)
                switch (update_user){
                    case "follower":
                        setUser(result.data.follower)
                        break;
                    case "followed":
                        setUser(result.data.followed)
                        break;
                }
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
            formData.append('user_id', author_id);

            const follow = await fetch(`${API_URL}/api/profile/unfollow`, { method: "POST", body: formData})
            const result = await follow.json();

            if(result.status === "success") {
                showToast({ message: `Вы отписались от ${result.data.followed.nick_name}!`, type: "success" })
                switch (update_user){
                    case "follower":
                        setUser(result.data.follower)
                        break;
                    case "followed":
                        setUser(result.data.followed)
                        break;
                }
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

    return (
        profile?.follows?.some(item => item === author_id) ?
            <button
                onClick={() => unfollow(author_id) }
                className={ `follow_button app-transition ${class_name ?? "" } ${ (profile?._id === author_id) ? "non_visible" : "d" }` }
            >
                Отписаться
            </button>
        :
            <button
                onClick={ () => { follow(author_id) } }
                className={ `follow_button app-transition ${class_name ?? "" } ${profile?._id === author_id ? "non_visible" : "d" }` }
            >
                Подписаться
            </button>
    )
}

export default FollowButton;