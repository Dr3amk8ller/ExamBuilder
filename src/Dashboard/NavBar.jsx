import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaEllipsisV } from 'react-icons/fa';
import '../css/Navigation.css';
import SideBar from './SideBar';
import { useUserProfile } from '../contexts/UserProfileContext';
// import { useUserProfile } from '../contexts/UserProfileContext';


const Navbar = ({ isSidebarOpen, toggleSidebar,userInitials, resEmail}) => {
  // const { showLoader } = useLoader();
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { userProfileLink } = useUserProfile();
  // const[profileloading,setProfileLoading]=useState(false);
  useEffect(()=>{
    // const storedProfilePic = localStorage.getItem('image');
    // if (storedProfilePic) {
    //     setImage(storedProfilePic);
    // }

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
    // showLoader();
    
    navigate('/navigation/profile');
  };
  console.log("profileLink",userProfileLink);

  const profile=localStorage.getItem('pimage');
  return (

    <nav  className={`custom-navbar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      
      <div className="container-fluid">
       
        <div className="toggle-sidebar-btn" onClick={toggleSidebar}>
          <FaBars />
        </div>
        {/* <h3>sJQDH;{userProfileLink}</h3> */}
        <div className="dropdown ms-auto">
          <button
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            onClick={toggleDropdown}
          >
            
            <div className="user-initials">
            <img
              src={userProfileLink}
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