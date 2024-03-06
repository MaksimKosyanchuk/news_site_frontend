import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from "../../assets/images/home-icon.svg";

import SunIcon from "../../assets/images/sun-icon.png";
import MoonIcon from "../../assets/images/moon-icon.png";
import './Header.scss';

function Header({ isDarkTheme, setIsDarkTheme }) {

    return (
      <header className="header blurred app-transition">
        <div className="container">
          <div className="header_content">
            <Link className='header_go_home' to={'/posts'}>
              <img src={HomeIcon} className='app-transition'/>
            </Link>
            <h1 className="header_title">Current news</h1>
            <button type='button' className='header_theme_toggler' onClick={() => setIsDarkTheme(!isDarkTheme)}>
              <img src={isDarkTheme ? SunIcon : MoonIcon } className='app-transition'/>
            </button> 
          </div>
        </div>
      </header>
    );
}

export default Header;
