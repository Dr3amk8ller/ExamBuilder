import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from './Assets/logo.png';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const handleNavigation = (path) => {
    if (path === '/' || path === '/about' || path === '/features' || path === '/help' || path === '/plan') {
      // Navigate to the homepage
      navigate('/');
      
      // Scroll to the target section
      setTimeout(() => {
        const section = document.getElementById(path.substring(1));
        if (section) {
          section.scrollIntoView({ behavior: 'smooth'});
        }
      }, 100); // Adjust timeout to allow navigation to complete
    } else {
      navigate(path);
    }
    closeSidebar();
  };

  return (
    <header className="header">
      <div className="logo-header">
        <Link to="/">
          <img src={logo} alt="Online Exam Builder" className="logo-img" />
        </Link>
      </div>
      <nav className="nav-bar">
        <ul className="nav-list">
          <li>
            <button className="header-about" onClick={() => handleNavigation('/')}>
              Home
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={() => handleNavigation('/about')}>
              About Us
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={() => handleNavigation('/features')}>
              Features
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={() => handleNavigation('/help')}>
              Help
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={() => handleNavigation('/plan')}>
              Plans
            </button>
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
                <button onClick={() => handleNavigation('/')}>Home</button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/about')}>About Us</button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/features')}>Features</button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/help')}>Help</button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/plans')}>Plans</button>
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
