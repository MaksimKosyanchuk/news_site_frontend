import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from "../../assets/images/home-icon.svg";
import './Header.css';

function Header() {
    return (
      <header className="header blurred">
        <div className="container">
          <div className="header_content">
            <Link className='header_go_home' to={'/posts'}>
              <img src={HomeIcon} />
              <span>Home</span>
            </Link>
            <h1 className="header_title">News Site</h1>

            <Link className='header_go_home' to={'/posts'}>
              <img src={HomeIcon} />
              <span>Home</span>
            </Link>

          </div>
        </div>
      </header>
    );
}

export default Header;
