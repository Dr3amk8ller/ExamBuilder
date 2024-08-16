import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import HomePage from './Dashboard/HomePage';
import Login from './Login';
import Register from './UserAuth/Register';
import Navigation from './Navigation'; 
import NavigationBar from './Dashboard/NavigationBar'; 
import AboutUsPage from './AboutUsPage';
import FeaturesPage from './FeaturesPage';
import HelpPage from './HelpPage';
import Header from './Header';

const App = () => {
  const hostname = window.location.hostname;

  return (
    <Router>
      <div className="App">
        <Routes>
          {hostname === 'exambuilder.online' ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : hostname === 'admin.exambuilder.online' ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/navigation/*" element={<Navigation />} />
              <Route path="/NavigationBar" element={<NavigationBar />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/navigation/*" element={<Navigation />} />
              <Route path="/NavigationBar" element={<NavigationBar />} /> 
              <Route path="/header" element={<Header />} /> 
              <Route path="/Aboutpage" element={<AboutUsPage />} /> 
              <Route path="/Features" element={<FeaturesPage />} /> 
              <Route path="/Helppage" element={<HelpPage />} /> 
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
