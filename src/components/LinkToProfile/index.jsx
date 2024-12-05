import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';
import './LinkToProfile.scss'
import { ReactComponent as DefaultAvatar } from "../../assets/svg/profile-icon.svg";

const LinkToProfile = ({children}) => {
    const [link, setLink] = useState('/auth/login');

    const { profile } = useContext(AppContext);

    useEffect(() => {
        if (profile) {
            setLink(`/users/${profile.nick_name}`);
        } else {
            setLink('/auth/login');
        }
    }, [profile]);

    return (
        <Link to={link} className='header_profile_link'>
            {children}
        </Link>
    );
};

export default LinkToProfile;
