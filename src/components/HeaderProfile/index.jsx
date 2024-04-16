import React from 'react';
import { ReactComponent as HeaderProfileIcon} from "../../assets/svg/profile.svg";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { API_URL } from "../../config";
import { useLocation } from 'react-router-dom';

const HeaderProfile = () => {
    const [link, setLink] = useState('/auth/register');
    const location = useLocation();
    
    const getProfile = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token })
            };

            try {
                const response = await fetch(`${API_URL}/api/profile`, requestOptions);
                const profileData = await response.json();

                if (profileData.status === 'success') {
                    setLink(`/users/${profileData.data.nick_name}`);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }
    };

    useEffect(() => {
        getProfile();
    }, [location]);

    return (
        <Link to={link}>
            <HeaderProfileIcon className='app-transition' />
        </Link>
    );
};

export default HeaderProfile;
