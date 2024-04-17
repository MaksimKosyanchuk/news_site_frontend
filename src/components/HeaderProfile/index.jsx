import React from 'react';
import { ReactComponent as HeaderProfileIcon} from "../../assets/svg/profile.svg";
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { API_URL } from "../../config";
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../App';

const HeaderProfile = () => {
    const [link, setLink] = useState('/auth/register');
    
    const {profile} = useContext(AppContext)

    useEffect(() => {
        if(profile){
            setLink(`/users/${profile.nick_name}`)
        }
    }, [profile])

    return (
        <Link to={link}>
            <HeaderProfileIcon className='app-transition' />
        </Link>
    );
};

export default HeaderProfile;
