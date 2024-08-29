import React from 'react';
import './plan.css';

const Plan = () => {
    return (
        <section id="plan" className="plan-page">
        <div className="pricing-container">
            <div className="highlighted-box">
                <h1 className="pricing-title">Plans</h1>
                <div className="pricing-boxes">
                    {/* Box 1 */}
                    <div className="pricing-box">
                        <h2 className="inner-text">Basic</h2>
                        <p><span className="price">₹499 /month</span> or <br /><span className="price">₹4,999 /year</span></p>
                        <p><b>Save 15% with our annual plan!</b></p>
                        <ul className="features">
                            <li><strong>Number of Exams:</strong> Up to 10 exams/month</li>
                            <li><strong>Number of Students:</strong> Up to 100 students/month</li>
                        </ul>
                    </div>
                    {/* Box 2 */}
                    <div className="pricing-box">
                        <h2 className="inner-text">Standard</h2>
                        <p><span className="price">₹999 /month</span> or <br /><span className="price">₹9,999 /year</span></p>
                        <p><b>Save 20% with our annual plan!</b></p>
                        <ul className="features">
                            <li><strong>Number of Exams:</strong> Up to 25 exams/month</li>
                            <li><strong>Number of Students:</strong> Up to 250 students/month</li>
                        </ul>
                    </div>
                    {/* Box 3 */}
                    <div className="pricing-box">
                        <h2 className="inner-text">Professional</h2>
                        <p><span className="price">₹1,999 /month</span> or <br /><span className="price">₹19,999 /year</span></p>
                        <p><b>Save 25% with our annual plan!</b></p>
                        <ul className="features">
                            <li><strong>Number of Exams:</strong> Up to 50 exams/month</li>
                            <li><strong>Number of Students:</strong> Up to 500 students/month</li>
                        </ul>
                    </div>
                    {/* Box 4 */}
                    <div className="pricing-box">
                        <h2 className="inner-text">Enterprise</h2>
                        <p><span className="price">₹3,999 /month</span> or <br /><span className="price">₹39,999 /year</span></p>
                        <p><b>Save 30% with our annual plan!</b></p>
                        <ul className="features">
                            <li><strong>Number of Exams:</strong> Up to 100 exams/month</li>
                            <li><strong>Number of Students:</strong> Up to 1,000 students/month</li>
                        </ul>
                    </div>
                </div>

                <h2 className="addons-title">Add-On Options</h2>
                <div className="addons-boxes">
                    <div className="addons-box">
                        <h4 className="price">Add On Exam</h4>
                        <p><b>* Add more exams to your plan for ₹50 each</b></p>
                    </div>
                    <div className="addons-box">
                        <h4 className="addons-inner-text">Add On Students</h4>
                        <p><b>* Add more students to your plan for ₹10 each</b></p>
                    </div>
                </div>

                <a href="tel:+911234567890" className="contact-button">Buy Plans</a>
            </div>
        </div>
       </section>
    );
};

export default Plan;
