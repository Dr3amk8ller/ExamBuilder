// import React from 'react';
// import './HelpPage.css'; // Ensure this file includes updated styles

// const HelpPage = () => {
//   return (
//     <section id="help" className="help-page">
//     <div className="help-page">
//       <header className="help-header">
//         <h1>Need Help? We're Here for You!</h1>
//       </header>
//       <section className="help-intro">
//         <h2 className="section-heading">Welcome to Our Help Center</h2>
//         <p className="section-text">
//           Got questions? We've got answers. Whether you're a seasoned pro or just getting started, our Help Center is designed to provide you with the support and guidance you need.
//         </p>
//       </section>
//       <section className="help-content">
//         <h2 className="section-heading">Why Struggle When Help is Just a Click Away?</h2>
//         <p className="section-text">
//           Don't waste time searching for solutions on your own. Our comprehensive resources are at your fingertips. From detailed guides and FAQs to personalized support, we're here to make your experience as smooth as possible.
//         </p>
//       </section>
//       <section className="knowledge-base">
//         <h2 className="section-heading">Explore Our Knowledge Base</h2>
//         <p className="section-text">
//           Dive into our extensive knowledge base filled with articles, tutorials, and step-by-step guides. Find solutions to common issues, learn how to make the most of our features, and get tips to enhance your learning experience.
//         </p>
//       </section>
//       <section className="contact-support">
//         <h2 className="section-heading">Contact Our Support Team</h2>
//         <p className="section-text">
//           Still can't find what you're looking for? Our dedicated support team is just a message away. Reach out to us for prompt, friendly assistance. We're committed to resolving your issues quickly so you can get back to what you do best.
//         </p>
//         <p className="section-text">
//           Write to us: <a  href="mailto:admin@exambuilder.online">admin@exambuilder.online</a>
//         </p>
//       </section>
//       <section className="feedback">
//         <h2 className="section-heading">Feedback and Suggestions</h2>
//         <div className="feedback-card">
//           <form className="feedback-form">
//             <label htmlFor="name">Name:</label>
//             <input type="text" id="name" name="name" required />
            
//             <label htmlFor="email">Email:</label>
//             <input type="email" id="email" name="email" required />
            
//             <label htmlFor="description">Description (500 words):</label>
//             <textarea id="description" name="description" rows="10" maxLength="500" required></textarea>
            
//             <button type="submit">Submit Feedback</button>
//           </form>
//         </div>
//       </section>
//       <footer className="help-footer">
//         <p className="footer-text">
//           Don't Wait, Get Help Now!
//         </p>
//         <p className="footer-text">
//           Time is precious. Don't let technical difficulties slow you down. Visit our Help Center and get the support you need to keep moving forward. We're here to help you succeed—every step of the way.
//         </p>
//       </footer>
//     </div>
//     </section>
//   );
// };

// export default HelpPage;
import React, { useState } from 'react';
import axios from 'axios';
import './HelpPage.css'; // Ensure this file includes updated styles

const HelpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });
  
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
      const response = await axios.post('https://j0mmgihtaj.execute-api.us-east-1.amazonaws.com/v1/feedBackExamBuilder', formData);

      if (response.status === 201) {
        setSuccessMessage('Feedback submitted successfully.');
        setError(null);
        setFormData({ name: '', email: '', description: '' }); // Clear form
      }
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data.message);
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response received from server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Error occurred while sending feedback.');
      }
      setSuccessMessage(null);
    }
  };

  return (
    <section id="help" className="help-Page">
      <div className="help-page">
        <header className="help-header">
          <h1>Need Help? We're Here for You!</h1>
        </header>
        <section className="help-intro">
          <h2 className="section-heading">Welcome to Our Help Center</h2>
          <p className="section-text">
            Got questions? We've got answers. Whether you're a seasoned pro or just getting started, our Help Center is designed to provide you with the support and guidance you need.
          </p>
        </section>
        <section className="help-content">
          <h2 className="section-heading">Why Struggle When Help is Just a Click Away?</h2>
          <p className="section-text">
            Don't waste time searching for solutions on your own. Our comprehensive resources are at your fingertips. From detailed guides and FAQs to personalized support, we're here to make your experience as smooth as possible.
          </p>
        </section>
        <section className="knowledge-base">
          <h2 className="section-heading">Explore Our Knowledge Base</h2>
          <p className="section-text">
            Dive into our extensive knowledge base filled with articles, tutorials, and step-by-step guides. Find solutions to common issues, learn how to make the most of our features, and get tips to enhance your learning experience.
          </p>
        </section>
        <section className="contact-support">
          <h2 className="section-heading">Contact Our Support Team</h2>
          <p className="section-text">
            Still can't find what you're looking for? Our dedicated support team is just a message away. Reach out to us for prompt, friendly assistance. We're committed to resolving your issues quickly so you can get back to what you do best.
          </p>
          <p className="section-text">
            Write to us: <a href="mailto:admin@exambuilder.online">admin@exambuilder.online</a>
          </p>
        </section>
        <section className="feedback">
          <h2 className="section-heading">Feedback and Suggestions</h2>
          <div className="feedback-card">
            <form className="feedback-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              
              <label htmlFor="description">Description (500 words):</label>
              <textarea id="description" name="description" rows="10" maxLength="500" value={formData.description} onChange={handleChange} required></textarea>
              
              <button type="submit">Submit Feedback</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
        </section>
        <footer className="help-footer">
          <p className="footer-text">
            Don't Wait, Get Help Now!
          </p>
          <p className="footer-text">
            Time is precious. Don't let technical difficulties slow you down. Visit our Help Center and get the support you need to keep moving forward. We're here to help you succeed—every step of the way.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default HelpPage;
