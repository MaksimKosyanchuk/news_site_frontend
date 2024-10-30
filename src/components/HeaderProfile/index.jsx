import React from 'react';
import { ReactComponent as HeaderProfileIcon} from "../../assets/svg/profile-icon.svg";
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { AppContext } from '../../App';

const HeaderProfile = () => {
    const [link, setLink] = useState('/auth/login');
    
    const {profile} = useContext(AppContext)

    useEffect(() => {
        if(profile){
            setLink(`/users/${profile.nick_name}`)
        }
        else{
            setLink('/auth/login')
        }
    }, [profile])

    return (
        <Link to={link}>
            <HeaderProfileIcon className='app-transition' />
        </Link>
    );
};

export default HeaderProfile;
