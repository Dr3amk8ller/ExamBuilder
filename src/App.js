import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './Login';
import AboutUs from './Components/AboutUs';
import Register from './UserAuth/Register';
import Navigation from './Navigation'; 
import NavigationBar from './Dashboard/NavigationBar'; 
import HomePage from './Dashboard/HomePage';
import Header from './Header';
import Homepage from './Homepage';
import AboutUsPage from './AboutUsPage';
import FeaturesPage from './FeaturesPage';
import HelpPage from './HelpPage';



const App = () => {
  return (

    <Router>
      <div className="App">
   
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Home" element={<Homepage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          {/* <Route path="/about" element={<AboutUs />} /> */}
          <Route path="/navigation/*" element={<Navigation />} />
          <Route path="/NavigationBar" element={<NavigationBar />} /> 
          <Route path="/header" element={<Header />} /> 
          <Route path="/HomePage" element={<HomePage />} /> 
          <Route path="/Aboutpage" element={<AboutUsPage />} /> 
          <Route path="/Features" element={<FeaturesPage />} /> 
          <Route path="/Helppage" element={<HelpPage />} /> 
            
         
        </Routes>
      </div>
    </Router>
  );
};

export default App;
