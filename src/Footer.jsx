import React, { useState } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocationDot, faHome, faInfoCircle, faBox, faTags, faEnvelope, faNewspaper, faShieldAlt, faGavel, faCookie, faBlog, faQuestionCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: ''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://598sj81enf.execute-api.ap-south-1.amazonaws.com/v1/getInTouch_M', formData, {
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` // Adjust according to how you store the JWT token
        // }
      });
      if (response.status === 201) {
        setResponseMessage('Your details have been submitted successfully!');
        setFormData({ name: '', email: '', contact: '' }); // Reset form after successful submission
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('There was an error submitting your details. Please try again later.');
    }
  };

  const handleLinkClick = (path) => {
    if (path === '/home'||path === '/about' || path === '/features' || path === '/help') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(path.substring(1)); // Extract section ID from path
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Timeout to ensure navigation happens before scrolling
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-info">
          <h2 className="footer-heading">Get In Touch</h2>
          <p><FontAwesomeIcon icon={faLocationDot} /><strong>Address:</strong> xyz</p>
          <p><FontAwesomeIcon icon={faEnvelope} /><strong>Email:</strong> <a className="emailfooter" href="Alfabetoglobal@gmail.com">Alfabetoglobal@gmail.com</a></p>
          <p><FontAwesomeIcon icon={faPhone} /><strong>Contact:</strong> +91 72176 67056</p>
        </div>
        <div className="footer-section footer-links">
          <h3 className="footer-heading">Quick Links</h3>
          <div className="footer-links-columns">
            <ul className="column">
              <li><FontAwesomeIcon icon={faHome} /> <a href="/home" onClick={(e) => { e.preventDefault(); handleLinkClick('/home'); }}>Home</a></li>
              <li><FontAwesomeIcon icon={faInfoCircle} /> <a href="/about" onClick={(e) => { e.preventDefault(); handleLinkClick('/about'); }}>About Us</a></li>
              <li><FontAwesomeIcon icon={faBox} /> <a href="/product" onClick={(e) => { e.preventDefault(); handleLinkClick('/product'); }}>Product</a></li>
              <li><FontAwesomeIcon icon={faTags} /> <a href="/pricing" onClick={(e) => { e.preventDefault(); handleLinkClick('/pricing'); }}>Pricing</a></li>
              <li><FontAwesomeIcon icon={faShieldAlt} /> <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); handleLinkClick('/privacy-policy'); }}>Privacy Policy</a></li>
            </ul>
            <ul className="column">
              <li><FontAwesomeIcon icon={faGavel} /> <a href="/terms" onClick={(e) => { e.preventDefault(); handleLinkClick('/terms'); }}>Terms</a></li>
              <li><FontAwesomeIcon icon={faCookie} /> <a href="/cookies" onClick={(e) => { e.preventDefault(); handleLinkClick('/cookies'); }}>Cookies</a></li>
              <li><FontAwesomeIcon icon={faBlog} /> <a href="/blog" onClick={(e) => { e.preventDefault(); handleLinkClick('/blog'); }}>Blog</a></li>
              <li><FontAwesomeIcon icon={faQuestionCircle} /> <a href="/help" onClick={(e) => { e.preventDefault(); handleLinkClick('/help'); }}>Help</a></li>
              <li><FontAwesomeIcon icon={faPlayCircle} /> <a href="/demo" onClick={(e) => { e.preventDefault(); handleLinkClick('/demo'); }}>Demo</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-section footer-newsletter">
          <h3 className="footer-heading">Newsletter</h3>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="contact">Your Phone:</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit Now</button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
      <div className="footer-bottom">
        <p>@alfabetoglobal All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
