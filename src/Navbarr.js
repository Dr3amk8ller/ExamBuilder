import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Import from react-router-dom and rename it as RouterLink
import { Link as ScrollLink } from 'react-scroll'; // Import from react-scroll and rename it as ScrollLink

const Navbar = () => {
    const [isHidden, setIsHidden] = useState(false); // State to manage navbar visibility
    let lastScrollTop = 0; // Keeps track of the last scroll position

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScrollTop > lastScrollTop) {
                // Scrolling down
                setIsHidden(true);
            } else {
                // Scrolling up
                setIsHidden(false);
            }

            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    return (
        <nav className={`navbar ${isHidden ? 'hidden' : ''}`}>
            <ul className="navbar-menu">
                <li><ScrollLink to="home" smooth={true} duration={500}>Home</ScrollLink></li>
                <li><ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink></li>
                <li><ScrollLink to="feature" smooth={true} duration={500}>Features</ScrollLink></li>
                <li><ScrollLink to="help" smooth={true} duration={500}>Help</ScrollLink></li>
            </ul>
            <RouterLink to="/login" className="login-button">Login</RouterLink>
        </nav>
    );
};

export default Navbar;