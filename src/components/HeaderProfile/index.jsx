import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';
import './HeaderProfile.scss'
import { ReactComponent as DefaultAvatar } from "../../assets/svg/profile-icon.svg";

const HeaderProfile = () => {
    const [link, setLink] = useState('/auth/login');
    const [avatar, setAvatar] = useState(null);

    const { profile } = useContext(AppContext);

    useEffect(() => {
        if (profile) {
            setLink(`/users/${profile.nick_name}`);
            if (profile.avatar) {
                setAvatar(profile.avatar);
            } else {
                setAvatar(null);
            }
        } else {
            setLink('/auth/login');
            setAvatar(null);
        }
    }, [profile]);

    return (
        <Link to={link}>
            {avatar ? (
                <div className='header_profile_avatar'>
                    <img src={avatar} alt="Profile Avatar" className='app-transition' />
                </div>
            ) : (
                <DefaultAvatar className='app-transition' />
            )}
        </Link>
    );
};

export default HeaderProfile;
