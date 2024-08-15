import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
    const [isHidden, setIsHidden] = useState(false);
    let lastScrollTop = 0;
    const navigate = useNavigate();

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

            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

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
            <ul className="navbar-menu">
                <li><ScrollLink to="home" smooth={true} duration={500}>Home</ScrollLink></li>
                <li><ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink></li>
                <li><ScrollLink to="feature" smooth={true} duration={500}>Features</ScrollLink></li>
                <li><ScrollLink to="help" smooth={true} duration={500}>Help</ScrollLink></li>
            </ul>
            <button onClick={handleLoginClick} className="login-button">Login</button>
        </nav>
    );
};

export default Navbar;
