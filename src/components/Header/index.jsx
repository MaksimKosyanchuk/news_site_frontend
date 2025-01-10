import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LinkToProfile from '../LinkToProfile';
import { AppContext } from '../../App';
import './Header.scss';
import DefaultAvatar from "../../assets/images/default-profile-avatar.png";
import { ReactComponent as HomeIcon } from "../../assets/svg/home-icon.svg";
import { ReactComponent as SunIcon } from "../../assets/svg/sun-icon.svg";
import { ReactComponent as MoonIcon } from "../../assets/svg/moon-icon.svg";
import { ReactComponent as MainLogo } from "../../assets/svg/main-logo-icon.svg";
import { ReactComponent as DefaultProfileIcon } from "../../assets/svg/profile-icon.svg";


function Header() {
  const {setIsDarkTheme, isDarkTheme} = useContext(AppContext)
  const [avatar, setAvatar] = useState(null);
  const { profile } = useContext(AppContext);

  useEffect(() => {
    if (profile) {
        if (profile.avatar) {
            setAvatar(profile.avatar);
        } else {
            setAvatar(DefaultAvatar);
        }
    } else {
        setAvatar(null);
    }
  }, [profile]);

  return (
    <header className="header blurred app-transition">
      <div className="container">
        <div className="header_content">
          <div className="header_side header_left_side">
            <Link to={'/posts'} className='header_item'>
              <HomeIcon className='app-transition'/>
            </Link>
          </div>
          <div  className="header_main_logo">
            <MainLogo className='app-transition'/>
          </div>
          <div className="header_side header_right_side">
            <button type='button' onClick={() => setIsDarkTheme(!isDarkTheme)} className='header_item'>
              {isDarkTheme ? <SunIcon className='app-transition'></SunIcon> : <MoonIcon className='app-transition'></MoonIcon>}
            </button> 
            <LinkToProfile class_name='header_item' children={
              avatar ? (
                <div className='header_profile_avatar'>
                    <img src={avatar} alt="Profile Avatar" className='app-transition' />
                </div>
              ) : (
                  <DefaultProfileIcon className='app-transition' />
              )}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
