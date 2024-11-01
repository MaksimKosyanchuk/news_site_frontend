import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderProfile from '../HeaderProfile';
import { AppContext } from '../../App';
import './Header.scss';
import { ReactComponent as HomeIcon } from "../../assets/svg/home-icon.svg";
import { ReactComponent as SunIcon } from "../../assets/svg/sun-icon.svg";
import { ReactComponent as MoonIcon } from "../../assets/svg/moon-icon.svg";

function Header() {
  const {setIsDarkTheme, isDarkTheme} = useContext(AppContext)
    return (
      <header className="header blurred app-transition">
        <div className="container">
          <div className="header_content">
            <div className="header_side header_left_side">
              <Link to={'/posts'} className='header_item'>
                <HomeIcon className='app-transition'/>
              </Link>
            </div>
            <div  className="header_title">
              <h1>Daily buzz</h1>
            </div>
            <div className="header_side header_right_side">
              <button type='button' onClick={() => setIsDarkTheme(!isDarkTheme)} className='header_item'>
                {isDarkTheme ? <SunIcon className='app-transition'></SunIcon> : <MoonIcon className='app-transition'></MoonIcon>}
              </button> 
              <HeaderProfile className='header_item'></HeaderProfile>
            </div>
          </div>
        </div>
      </header>
    );
}

export default Header;
