import React from 'react';
import { ReactComponent as HeaderProfileIcon} from "../../assets/svg/profile.svg";
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { AppContext } from '../../App';
import ProfileLayout from '../ProfileLayout';

const HeaderProfile = () => {
    const [link, setLink] = useState('/auth/register');
    
    const {profile} = useContext(AppContext)

    useEffect(() => {
        if(profile){
            setLink(`/users/${profile.nick_name}`)
        }
    }, [profile])

    return (
        <ProfileLayout>
            <Link to={link}>
                <HeaderProfileIcon className='app-transition' />
            </Link>
        </ProfileLayout>
    );
};

export default HeaderProfile;
