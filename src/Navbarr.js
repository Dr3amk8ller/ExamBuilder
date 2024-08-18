// import React, { useEffect, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom'; // Import from react-router-dom and rename it as RouterLink
// import { Link as ScrollLink } from 'react-scroll'; // Import from react-scroll and rename it as ScrollLink

// const Navbar = () => {
//     const [isHidden, setIsHidden] = useState(false); // State to manage navbar visibility
//     let lastScrollTop = 0; // Keeps track of the last scroll position

//     useEffect(() => {
//         const handleScroll = () => {
//             const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

//             if (currentScrollTop > lastScrollTop) {
//                 // Scrolling down
//                 setIsHidden(true);
//             } else {
//                 // Scrolling up
//                 setIsHidden(false);
//             }

//             lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
//         };

//         window.addEventListener('scroll', handleScroll);

//         // Cleanup event listener on component unmount
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, [lastScrollTop]);
  
//     return (
//         <nav className={`navbar ${isHidden ? 'hidden' : ''}`}>
//             <ul className="navbar-menu">
//                 <li><ScrollLink to="home" smooth={true} duration={500}>Home</ScrollLink></li>
//                 <li><ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink></li>
//                 <li><ScrollLink to="feature" smooth={true} duration={500}>Features</ScrollLink></li>
//                 <li><ScrollLink to="help" smooth={true} duration={500}>Help</ScrollLink></li>
//             </ul>
//             <RouterLink to="/login" className="login-button">Login</RouterLink>
//         </nav>
//     );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';


const Navbar = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let lastScrollTop = 0;
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScrollTop > lastScrollTop) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }

            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleLoginClick = () => {
        const hostname = window.location.hostname;

        if (hostname === 'exambuilder.online') {
            // Change hostname to admin.exambuilder.online and navigate to /login
            window.location.href = 'https://admin.exambuilder.online/login';
        } else {
            navigate('/login');
        }
    };
    return (
        <nav className={`navbar ${isHidden ? 'hidden' : ''}`}>
            <button className="toggle-button" onClick={handleToggleMenu}>
                ☰
            </button>
            <ul className={`navbar-menu ${isMenuOpen ? 'show' : ''}`}>
                <li><ScrollLink to="home" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>Home</ScrollLink></li>
                <li><ScrollLink to="about" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>About</ScrollLink></li>
                <li><ScrollLink to="feature" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>Features</ScrollLink></li>
                <li><ScrollLink to="help" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>Help</ScrollLink></li>
            </ul>
            <button onClick={handleLoginClick} className="login-button">Login</button>
        </nav>
    );
};

export default Navbar;
