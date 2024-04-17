import React from 'react';
import { ReactComponent as HeaderProfileIcon} from "../../assets/svg/profile.svg";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getProfile } from '../../pages/Profile';

const HeaderProfile = () => {
    const [link, setLink] = useState('/auth/register');

    useEffect(() => {
        const profile = getProfile()
        profile.then((result) => {
            setLink(`/users/${result.nick_name}`);
            console.log(result)
        })
    }, []);

    return (
        <Link to={link}>
            <HeaderProfileIcon className='app-transition' />
        </Link>
    );
};

export default HeaderProfile;
