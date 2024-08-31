import React from 'react';
import '../css/Side.css';
import { FaHome, FaListAlt, FaInfoCircle, FaBars, FaPen } from 'react-icons/fa';
import companyLogo from '../Assets/logo.png';
import { Link } from 'react-router-dom';

const SideBar = ({ onToggleSidebar, isOpen }) => {
  return (
    <div className={`siDebar ${isOpen ? 'open' : ''}`}>
      <div className="logo-container">
        <img src={companyLogo} alt="Company Logo" className={`logoc ${isOpen ? 'logoc-expanded' : ''}`} />
        {/* <FaBars className="toggle-sidebar-btn" onClick={onToggleSidebar} /> */}
      </div>
      <div className="menu-items">
        <div className="menu-item">
          <FaHome />
          {isOpen && <span>Dashboard</span>}
        </div>
        <div className="menu-item">
          <Link to="/navigationbar" style={{ color: 'white', textDecoration: 'none' }}>
            <FaListAlt />
            {isOpen && <span>All Quizzes</span>}
          </Link>
        </div>
        <div className="menu-item-about">
          <Link to="/navigation/about" style={{ color: 'white', textDecoration: 'none' }}>
            <FaInfoCircle />
            {isOpen && <span>About Us</span>}
          </Link>
        </div>
        {/* <div className="menu-item">
          <Link to="/navigation/QuizSearch" style={{ color: 'white', textDecoration: 'none' }}>
            <FaPen />
            {isOpen && <span>Entrance Center</span>}
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default SideBar;
