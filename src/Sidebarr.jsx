import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './Sidebarr.css'; // Ensure to create this CSS file

const Sidebarr = ({ isOpen, handleClose }) => {
  return (
    <div className={`sidebarr ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={handleClose}>×</button>
      <ul className="sidebarr-menu">
        <li><ScrollLink to="home" smooth={true} duration={500} onClick={handleClose}>Home</ScrollLink></li>
        <li><ScrollLink to="about" smooth={true} duration={500} onClick={handleClose}>About</ScrollLink></li>
        <li><ScrollLink to="feature" smooth={true} duration={500} onClick={handleClose}>Features</ScrollLink></li>
        <li><ScrollLink to="help" smooth={true} duration={500} onClick={handleClose}>Help</ScrollLink></li>
        <li><ScrollLink to="plan" smooth={true} duration={500} onClick={handleClose}>Plans</ScrollLink></li>
      </ul>
    </div>
  );
};

export default Sidebarr;
