import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaEllipsisV } from 'react-icons/fa';
import '../css/Navigation.css';
// import React, { useContext } from 'react';
// import { UserProfileProvider,UserProfileContext } from '../UserprofileContext';


const Navbar = ({ isSidebarOpen, toggleSidebar, resEmail}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    const storedProfilePic = localStorage.getItem('image');
    if (storedProfilePic) {
        // setImage(storedProfilePic);
    }

    const handleStorageChange = () => {
     
    };

    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  },[]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/navigation/profile');
  };
  const profile=localStorage.getItem('pimage');
  return (
    <nav className={`custom-navbar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="container-fluid">
        {/* <h3>hi:{profile}</h3> */}
        {/* <div>
          <img src={profile} alt="" />
        </div> */}
        <div className="toggle-sidebar-btn" onClick={toggleSidebar}>
          <FaBars />
        </div>
        <div className="dropdown ms-auto">
          <button
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            onClick={toggleDropdown}
          >
           
            
            <div className="user-initials">
            <img
              src={profile}
              alt="Profile"
              className="user-initials" // You can style this class as needed
            />
              </div>
            {/* <FaEllipsisV /> */}
          </button>
          <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
            <button className="dropdown-item" type="button" onClick={handleProfileClick}>Profile</button>
            <button className="dropdown-item" type="button" onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;