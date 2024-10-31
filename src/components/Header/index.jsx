import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as HomeIcon } from "../../assets/svg/home-icon.svg";
import HeaderProfile from '../HeaderProfile';
import { ReactComponent as SunIcon } from "../../assets/svg/sun-icon.svg";
import { ReactComponent as MoonIcon } from "../../assets/svg/moon-icon.svg";
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
                {isDarkTheme ? <SunIcon className='app-transition'></SunIcon> : <MoonIcon className='app-transition'></MoonIcon>}
              </button> 
              <HeaderProfile></HeaderProfile>
            </div>
          </div>
        </div>
      </header>
    );
}

export default Header;
