import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './Assets/logo.png';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <header className="header">
      <div className="logo-header">
        <Link to="/">
          <img src={logo} alt="Online Exam Builder" className="logo-img" />
        </Link>
        {/* <button className="menu-button" onClick={toggleSidebar}>
          ☰
        </button> */}
      </div>
      <nav className="nav-bar">
        <ul className="nav-list">
          <li>
          <Link to="/homepage">
  <button className="header-about">Home</button>
</Link>
          </li>
          <li>
            <Link to="/Aboutpage">
              <button className="nav-button">About Us</button>
            </Link>
          </li>
          <li>
            <Link to="/Features">
              <button className="nav-button">Features</button>
            </Link>
          </li>
          {/* <li>
            <Link to="/Components/Demo">
              <button className="nav-button"></button>
            </Link>
          </li> */}
          <li>
            <Link to="/helpPage">
              <button className="nav-button" >Help</button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="auth">
        {location.pathname === '/login' ? (
          <Link to="/register">
            <button className="loginn-button">Sign Up</button>
          </Link>
          
        ) : (
          <Link to="/login">
            <button className="loginn-button" disabled={location.pathname === '/login'}>
              Log In
            </button>
          </Link>
        )}
      </div>

      {location.pathname !== '/' && (
        <div className={`sidebar-toggle ${showSidebar ? 'open' : ''}`}>
        <button className="menu-button" onClick={toggleSidebar}>
          ☰
        </button>
          <nav className={`sidebar ${showSidebar ? 'show' : ''}`}>
            <button className="close-button" onClick={closeSidebar}>
              ✕
            </button>
            <ul className="sidebar-list">
              
            <li>
                <Link to="/homepage" onClick={closeSidebar}>
                  <button>Home</button>
                </Link>
              </li>
              <li>
                <Link to="/aboutpage" onClick={closeSidebar}>
                  <button>About Us</button>
                </Link>
              </li>
                
             
              <li>
                <Link to="/Components/features" onClick={closeSidebar}>
                  <button>Features</button>
                </Link>
              </li>
              <li>
                <Link to="/helpPage" onClick={closeSidebar}>
                  <button>Help</button>
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={closeSidebar}>
                  <button disabled={location.pathname === '/register'}>Sign Up</button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
