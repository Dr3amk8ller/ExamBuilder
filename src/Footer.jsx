
import React, { useState } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { faPhone, faLocationDot, faHome, faInfoCircle, faBox, faTags, faEnvelope, faNewspaper, faShieldAlt, faGavel, faCookie, faBlog, faQuestionCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

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
      const response = await axios.post('https://j0mmgihtaj.execute-api.us-east-1.amazonaws.com/v1/getInTouch', formData, {
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

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-info">
          <h2 className="footer-heading">Get In Touch</h2>
          <p><FontAwesomeIcon icon={faLocationDot} /><strong>Address:</strong> xyz</p>
          <p><FontAwesomeIcon icon={faEnvelope} /><strong>Email:</strong> <a className="emailfooter" href="mailto:prince.meghani@alfabetoglobal.com">prince.meghani@alfabetoglobal.com</a></p>
          <p><FontAwesomeIcon icon={faPhone} /><strong>Contact:</strong> 934-073-9809</p>
        </div>
        <div className="footer-section footer-links">
          <h3 className="footer-heading">Quick Links</h3>
          <div className="footer-links-columns">
        <ul className="column">
          <li><FontAwesomeIcon icon={faHome} /> <a href="/">Home</a></li>
          <li><FontAwesomeIcon icon={faInfoCircle} /> <a href="/about">About Us</a></li>
          <li><FontAwesomeIcon icon={faBox} /> <a href="/product">Product</a></li>
          <li><FontAwesomeIcon icon={faTags} /> <a href="/pricing">Pricing</a></li>
          <li><FontAwesomeIcon icon={faEnvelope} /> <a href="/contact">Contact Us</a></li>
          <li><FontAwesomeIcon icon={faNewspaper} /> <a href="/newsletter">Newsletter</a></li>
        </ul>
        <ul className="column">
          <li><FontAwesomeIcon icon={faShieldAlt} /> <a href="/privacy-policy">Privacy Policy</a></li>
          <li><FontAwesomeIcon icon={faGavel} /> <a href="/terms">Terms</a></li>
          <li><FontAwesomeIcon icon={faCookie} /> <a href="/cookies">Cookies</a></li>
          <li><FontAwesomeIcon icon={faBlog} /> <a href="/blog">Blog</a></li>
          <li><FontAwesomeIcon icon={faQuestionCircle} /> <a href="/help">Help</a></li>
          <li><FontAwesomeIcon icon={faPlayCircle} /> <a href="/demo">Demo</a></li>
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


// import React from 'react';
// import './Footer.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { faPhone, faLocationDot, faHome, faInfoCircle, faBox, faTags, faEnvelope, faNewspaper, faShieldAlt, faGavel, faCookie, faBlog, faQuestionCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="footer-section footer-info">
//           <h2 className="footer-heading">Get In Touch</h2>
//           <p> <FontAwesomeIcon icon={faLocationDot} /><strong >Address:</strong> xyz</p>
//           <p> <FontAwesomeIcon icon={faEnvelope} /><strong>Email:</strong> <a className="emailfooter" href="prince.meghani@alfabetoglobal.com">prince.meghani@alfabetoglobal.com</a></p>
//           <p><FontAwesomeIcon icon={faPhone} /><strong>Phone:</strong> 934-073-9809</p>
//         </div>
//         <div className="footer-section footer-links">
//           <h3 className="footer-heading">Quick Links</h3>
//           <ul>
//             <li><FontAwesomeIcon icon={faHome} /> <a href="/">Home</a></li>
//             <li><FontAwesomeIcon icon={faInfoCircle} /> <a href="/about">About Us</a></li>
//             <li><FontAwesomeIcon icon={faBox} /> <a href="/product">Product</a></li>
//             <li><FontAwesomeIcon icon={faTags} /> <a href="/pricing">Pricing</a></li>
//             <li><FontAwesomeIcon icon={faEnvelope} /> <a href="/contact">Contact Us</a></li>
//             <li><FontAwesomeIcon icon={faNewspaper} /> <a href="/newsletter">Newsletter</a></li>
//             <li><FontAwesomeIcon icon={faShieldAlt} /> <a href="/privacy-policy">Privacy Policy</a></li>
//             <li><FontAwesomeIcon icon={faGavel} /> <a href="/terms">Terms</a></li>
//             <li><FontAwesomeIcon icon={faCookie} /> <a href="/cookies">Cookies</a></li>
//             <li><FontAwesomeIcon icon={faBlog} /> <a href="/blog">Blog</a></li>
//             <li><FontAwesomeIcon icon={faQuestionCircle} /> <a href="/help">Help</a></li>
//             <li><FontAwesomeIcon icon={faPlayCircle} /> <a href="/demo">Demo</a></li>
//           </ul>
//         </div>
//         <div className="footer-section footer-newsletter">
//           <h3 className="footer-heading">Newsletter</h3>
//           <form className="newsletter-form">
//             <label htmlFor="name">Your Name:</label>
//             <input type="text" id="name" name="name" required />
//             <label htmlFor="email">Your Email:</label>
//             <input type="email" id="email" name="email" required />
//             <label htmlFor="phone">Your Phone:</label>
//             <input type="text" id="phone" name="phone" required />
//             <button type="submit">Submit Now</button>
//           </form>
//         </div>
//       </div>
//       <div className="footer-bottom">
//         <p>@alfabetoglobal All Rights Reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



