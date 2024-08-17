import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbarr from '../Navbarr';
import AboutUsPage from '../AboutUsPage';
import FeaturesPage from '../FeaturesPage';
import HelpPage from '../HelpPage';
import Footer from '../Footer';
import '../HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [showWhyChooseUs, setShowWhyChooseUs] = useState(false);

    const handleWhyChooseUsClick = () => {
        setShowWhyChooseUs(!showWhyChooseUs);
    };
   // when we make any changes like any button that shift on admin module from homepage
    const handleRegisterClick = () => {
        const hostname = window.location.hostname;

        if (hostname === 'exambuilder.online') {
            // Change hostname to admin.exambuilder.online and navigate to /login
            window.location.href = 'https://admin.exambuilder.online/register';
        } else {
            navigate('/register');
        }
    };

    return (
        <div>
            <Navbarr />
            <section id="home">
                <div className="home-container">
                    <div className="header-content">
                        <p className="para">Your gateway to manage and take exams efficiently</p>
                        <div className="login-options">
                            <button className="registerbutton" onClick={handleRegisterClick}>
                                Register Here
                            </button>
                        </div>
                    </div>
                </div>

                <section className="about-section">
                    <div className="about-content">
                        <div className="about-text">
                            <h2>About Us</h2>
                            <h3>Best Software For Your Evaluation</h3>
                            <p>
                                Experience the ultimate solution in online examination systems!
                                Our innovative online exam builder empowers you to effortlessly
                                create engaging exams tailored to any difficulty level. Say goodbye
                                to outdated methods and hello to a seamless, intuitive process.
                            </p>
                            <p>
                                With our platform, you can design comprehensive online exams and tests
                                with unmatched ease, ensuring your users receive constructive feedback
                                that enriches their learning journey. Elevate your assessment capabilities
                                and provide an exceptional educational experience that inspires and motivates.
                            </p>
                            <p>
                                This is the last online exam system you'll ever need!
                            </p>
                            <a href="#why-choose-us" className="homebtn-about" onClick={handleWhyChooseUsClick}>
                                Why Choose Us?
                            </a>
                        </div>
                    </div>
                </section>

                {showWhyChooseUs && (
                    <section id="why-choose-us" className="why-choose-us">
                        <div className="why-choose-us-content">
                            <blockquote className="highlighted-text">
                                Are you searching for robust testing software for your students? <br />
                                Need a streamlined way to distribute certificates?
                            </blockquote>
                            <p className="chooseus">
                                Whether you’re looking to effortlessly set up exam software and invite participants or integrate your testing system with your existing software, our Online Exam Builder has you covered.
                            </p>
                            <p className="chooseus">
                                Start using our Online Exam Builder and unlock a world of possibilities. Explore our comprehensive features and solutions designed to meet all your examination needs. With our tool, everything is within reach, making your testing process efficient, effective, and user-friendly.
                            </p>
                            <div className="cards-container">
                                <div className="card">
                                    <div className="card-content">
                                        <h3>Effortless to Use our service</h3>
                                        <p>
                                            Our exam builder is designed with simplicity in mind, making it incredibly easy to use for both students and administrators.
                                            Starting with our online exam builder is a breeze, adding a touch of fun to the process.
                                        </p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-content">
                                        <h3>Stunning on All Devices</h3>
                                        <p>
                                            Whether you're on a phone, tablet, or PC, your online exams will look fantastic. Our examination system is fully responsive,
                                            ensuring a seamless and visually appealing experience across all platforms.
                                        </p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-content">
                                        <h3>Exceptional Support</h3>
                                        <p>
                                            Got questions about our online examination software? Our dedicated support team, fondly known as our support owls, is always ready
                                            to assist you. Expect the best possible support to help you every step of the way!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="chooseus">
                                Discover how our tool can be the perfect solution for you. Our demo will provide you with all the insights you need. Don't wait—it's completely free! Visit our demo page now.
                            </p>
                            <a href="/demo" className="homebtn-about">Visit Demo Page</a>
                        </div>
                    </section>
                )}
                <AboutUsPage />
                <FeaturesPage />
                <HelpPage />
            </section>
            <Footer />
        </div>
    );
};

export default HomePage;
