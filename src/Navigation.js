import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import CreateExam from './Dashboard/CreateExam';
import ExamForm from './Dashboard/ExamForm';
import Navbar from './Dashboard/NavBar';
import SideBar from './Dashboard/SideBar';
import Quiz from './Dashboard/Quiz';
import EditMcqQuestion from './Dashboard/EditMcqQuestion';
import EditDescriptiveQuestion from './Dashboard/EditDescriptiveQuestion';
import './css/Navigation.css';
import EditExam from './Dashboard/EditExam';
import Profile from './Dashboard/Profile';
import AboutUs from './Components/AboutUs';
import QuizSearch from './Dashboard/QuizSearch';
// import LoginPage from './Dashboard/LoginPage';
import SetExamTime from './Dashboard/SetExamTime';






const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={handleToggleSidebar} />
      <div className="navigation-container">
        <SideBar isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="routes-container">
            <Routes>
         
              <Route path="/create-exam" element={<CreateExam />} />
              <Route path="/exam-form" element={<ExamForm />} />
              <Route path="/edit-exam/:id" element={<EditExam />} />
              <Route path="/quiz-detail/:id" element={<Quiz />} />
              <Route path="/mcq/:questionId" element={<EditMcqQuestion />} />
              <Route path="/descriptive/:questionId" element={<EditDescriptiveQuestion />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/QuizSearch" element={<QuizSearch />} />
              {/* <Route path="/LoginPage" element={<LoginPage />} /> */}
              <Route path="/exam-time/:id" element={<SetExamTime />} />
        
    
              
              
              
              
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
