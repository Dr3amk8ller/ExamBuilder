import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import HomePage from './Dashboard/HomePage';
import Login from './Login';
import Register from './UserAuth/Register';
import Navigation from './Navigation'; 
import NavigationBar from './Dashboard/NavigationBar'; 
import Header from './Header';
// import Homepage from './HomePrev';
import AboutUsPage from './AboutUsPage';
import FeaturesPage from './FeaturesPage';
import HelpPage from './HelpPage';
import { UserProfileProvider } from './contexts/UserProfileContext';


const App = () => {
  const hostname = window.location.hostname;
  return (
    <UserProfileProvider>
    <Router>
      <div className="App">
        <Routes>
  
          {hostname === 'exambuilder.online' ? (                // if changes are done both on local host and hompageee
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : hostname === 'admin.exambuilder.online' ? (       // if changes are done both on local host and admin module 
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/navigation/*" element={<Navigation />} />
              <Route path="/navigationbar" element={<NavigationBar />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/navigation/*" element={<Navigation />} />
              <Route path="/navigationbar" element={<NavigationBar />} /> 
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
    </UserProfileProvider>
  );
};

export default App;
