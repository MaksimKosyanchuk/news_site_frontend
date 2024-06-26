import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as HomeIcon } from "../../assets/svg/home-icon.svg";
import HeaderProfile from '../HeaderProfile';
import SunIcon from "../../assets/images/sun-icon.png";
import MoonIcon from "../../assets/images/moon-icon.png";
import { AppContext } from '../../App';
import './Header.scss';

function Header() {
  const {setIsDarkTheme, isDarkTheme} = useContext(AppContext)
    return (
      <header className="header blurred app-transition">
        <div className="container">
          <div className="header_content">
            <div className="header_item header_left_item">
              <Link to={'/posts'}>
                <HomeIcon className='app-transition'/>
              </Link>
            </div>
            <div  className="header_title">
              <h1>Daily buzz</h1>
            </div>
            <div className="header_item header_right_item">
              <button type='button' onClick={() => setIsDarkTheme(!isDarkTheme)}>
                <img src={isDarkTheme ? SunIcon : MoonIcon } className='app-transition'/>
              </button> 
              <HeaderProfile></HeaderProfile>
            </div>
          </div>
        </div>
      </header>
    );
}

export default Header;
