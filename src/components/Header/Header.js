import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as HomeIcon} from "../../assets/images/home-icon.svg";

import SunIcon from "../../assets/images/sun-icon.png";
import MoonIcon from "../../assets/images/moon-icon.png";
import './Header.scss';

function Header({ isDarkTheme, setIsDarkTheme }) {
    const [isOpened, setIsOpened] = useState(false);

    return (
      <header className={`header blurred app-transition`}>
        <div className="container">
          <div className="header_content">
            <Link className='header-button header-button_go_home' to={'/posts'}>
              <HomeIcon className='app-transition'/>
            </Link>

            <h1 
              className="header_title"
              onClick={() => setIsOpened(!isOpened)}>Current news</h1>
            
            <button 
              type='button' 
              className='header-button header-button_header_theme_toggler' 
              onClick={() => setIsDarkTheme(!isDarkTheme)}>
              <img src={isDarkTheme ? SunIcon : MoonIcon } className='app-transition'/>
            </button> 
          </div>

          <div className={`header__menu ${isOpened ? 'header__menu_opened' : ''}`}>
          </div>  
        </div>
      </header>
    );
}

export default Header;
