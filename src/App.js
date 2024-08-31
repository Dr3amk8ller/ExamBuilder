
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import HomePage from './Dashboard/HomePage';
import Login from './Login';
import Register from './UserAuth/Register';
import Navigation from './Navigation'; 
import Navigationbar from './Dashboard/Navigationbar';
import Header from './Header';
import AboutUsPage from './AboutUsPage';
import FeaturesPage from './FeaturesPage';
import HelpPage from './HelpPage';
import { UserProfileProvider } from './contexts/UserProfileContext';
import Plan from './Plan';

const App = () => {
  const hostname = window.location.hostname;

  return (
    <UserProfileProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* For exambuilder.online */}
            {hostname === 'exambuilder.online' ? (
              <>
                <Route path="/" element={<HomePage />}>
                  {/* Nested routes within HomePage */}
                  <Route path="about" element={<AboutUsPage />} />
                  <Route path="features" element={<FeaturesPage />} />
                  <Route path="help" element={<HelpPage />} />
                  <Route path="plan" element={<Plan />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : hostname === 'admin.exambuilder.online' ? (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/navigation/*" element={<Navigation />} />
                <Route path="/all-quizzes" element={<Navigationbar />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<HomePage />}>
                  {/* Nested routes within HomePage */}
                  <Route path="about" element={<AboutUsPage />} />
                  <Route path="features" element={<FeaturesPage />} />
                  <Route path="help" element={<HelpPage />} />
                  <Route path="plan" element={<Plan />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/navigation/*" element={<Navigation />} />
                <Route path="/all-quizzes" element={<Navigationbar />} /> 
                <Route path="/header" element={<Header />} /> 
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </UserProfileProvider>
  );
};

export default App;
