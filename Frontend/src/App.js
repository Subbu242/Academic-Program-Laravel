import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes, Link, useHistory } from 'react-router-dom';

import './style.css';
import './App.css';
import Home from './components/index.jsx';
import Blog from './components/Blog.jsx';
import AboutUs from './components/AboutUs.jsx';
import ContactUs from './components/ContactUs.jsx';
import Services from './components/Services.jsx';
import Login from './components/Login.jsx';
import SignIn from './components/SignIn.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import StudentDashboard from './components/StudentDashboard.jsx';
import AdministratorDashboard from './components/AdministratorDashboard.jsx';
import ProgramCoordinatorDashboard from './components/ProgramCoordinatorDashboard.jsx';
import InstructorDashboard from './components/InstructorDashboard.jsx';
import QualityAssuranceOfficerDashboard from './components/QualityAssuranceOfficerDashboard.jsx';
import PageNotFound from './components/page-not-found';
import ProtectedRoute from './components/ProtectedRoute';
import Materials from './components/Student/materials';
import COmaterials from './components/Student/COmaterials';
import OSmaterials from './components/Student/OSmaterials';
import AImaterials from './components/Student/AImaterials';
import MLmaterials from './components/Student/MLmaterials';
import DSAassessment from './components/Student/DSAassessment';
import COassessment from './components/Student/COassessment';
import OSassessment from './components/Student/COassessment';
import AIassessment from './components/Student/AIassessment';
import MLassessment from './components/Student/MLassessment';
import Results from './components/Student/Results';
import InstructorMessages from './components/Instructor/InstructorMessages';
import StudentMessages from './components/Student/StudentMessages';
import InstructorCourses from './components/Instructor/InstructorCourses';
import CreateExam from './components/Instructor/CreateExam';
import CreateDSAexam from './components/Instructor/CreateDSAexam';
import CreateCOexam from './components/Instructor/CreateCOexam';
import CreateOSexam from './components/Instructor/CreateOSexam';
import CreateAIexam from './components/Instructor/CreateAIexam';
import CreateMLexam from './components/Instructor/CreateMLexam';
import InstructorGrades from './components/Instructor/InstructorGrades';
import CreateAssessment from './components/Instructor/CreateAssessment';
import CreateDSAassessment from './components/Instructor/CreateDSAassessment';
import CreateCOassessment from './components/Instructor/CreateCOassessment';
import CreateOSassessment from './components/Instructor/CreateOSassessment';
import CreateAIassessment from './components/Instructor/CreateAIassessment';
import CreateMLassessment from './components/Instructor/CreateMLassessment';
import StudentsResults from './components/Instructor/StudentResults';
import StudentResults from './components/Instructor/StudentResults';
import AdminCourses from './components/Admin/AdminCourses';
import AdminStudents from './components/Admin/AdminStudents';
import AdminQAOfficer from './components/Admin/AdminQAOfficer';
import AdminCoordinator from './components/Admin/AdminCoordinator';
import AdminInstructors from './components/Admin/AdminInstructors';
import AdminSettings from './components/Admin/AdminSettings';
import StudentAcademicProgram from './components/Student/StudentAcademicProgram';
import CSProgram from './components/Student/CSProgram';
import BAProgram from './components/Student/BAProgram';
import CCJProgram from './components/Student/CCJProgram';
import AdminAcademicProgram from './components/Admin/AdminAcademicProgram';
import AdminCSProgram from './components/Admin/AdminCSProgram';
import AdminBAProgram from './components/Admin/AdminBAProgram';
import AdminCCJProgram from './components/Admin/AdminCCJProgram';
import InstructorCourseContent from './components/Instructor/InstructorCourseContent';
import InstructorAssociateProgramObjective from './components/Instructor/InstructorAssociateProgramObjective';
import AdminAnalytics from './components/Admin/AdminAnalytics';
import ProgramCoordinatorOverview from './components/Program Coordinator/ProgramCoordinatorOverview';
import ProgramCoordinatorInstructor from './components/Program Coordinator/ProgramCoordinatorCourseContent';
import ProgramCoordinatorCourseContent from './components/Program Coordinator/ProgramCoordinatorCourseContent';
import ProgramCoordinatorAssessments from './components/Program Coordinator/ProgramCoordinatorAssessments';
import StudentPerformance from './components/Program Coordinator/StudentPerformance';
import ProgramCoordinatorMessages from './components/Program Coordinator/ProgramCoordinatorMessages';
import StudentSupport from './components/Student/StudentSupport';
import QAOfficerAssessments from './components/Quality Assurance Officer/QAOfficerAssessments';
import IndustryTrends from './components/Quality Assurance Officer/IndustryTrends';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

function App() {
 
  const resetLocalStorage = () => {   
    // localStorage.setItem("token","false")
    localStorage.setItem("adminToken","false")
    localStorage.setItem("studentToken","false")
    localStorage.setItem("instructorToken","false")
    localStorage.setItem("pcToken","false")
    localStorage.setItem("qaoToken","false") 
  }
  return (
      <div className="navbar-wrapper">
        <header>
          {/* <div className="navbar">
            <div className="logo">
              <h1>Msc Academic Program Website</h1>
            </div>
            <nav>
              <ul>
                <li><Link to="/" onClick={resetLocalStorage}>Home</Link></li>
                <li><Link to="/AboutUs" onClick={resetLocalStorage}>About Us</Link></li>
                <li><Link to="/ContactUs" onClick={resetLocalStorage}>Contact Us</Link></li>
                <li><Link to="/Blog" onClick={resetLocalStorage}>Blog</Link></li>
                <li><Link to="/services" onClick={resetLocalStorage}>Services</Link></li>
                <li><Link to="/login" onClick={resetLocalStorage}>Login</Link></li>
              </ul>
            </nav>
          </div> */}
            <h1>Msc Academic Program Website</h1>
            <Navbar collapseOnSelect expand="lg" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <li><Link to="/" onClick={resetLocalStorage}>Home</Link></li>
                <li><Link to="/AboutUs" onClick={resetLocalStorage}>About Us</Link></li>
                <li><Link to="/ContactUs" onClick={resetLocalStorage}>Contact Us</Link></li>
                <li><Link to="/Blog" onClick={resetLocalStorage}>Blog</Link></li>
                <li><Link to="/services" onClick={resetLocalStorage}>Services</Link></li>
                <li><Link to="/login" onClick={resetLocalStorage}>Login</Link></li>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>

        <Routes>
         <Route path="/AboutUs" element={<AboutUs/>} />
          <Route path="/ContactUs" element={<ContactUs/>} />
          <Route path="/ForgotPassword" element={<ForgotPassword/>} />

          {/* <Route element={<ProtectedRoute/>}> */}
          <Route path="/StudentDashboard" element={<ProtectedRoute><StudentDashboard/></ProtectedRoute>} />
          <Route path="/InstructorDashboard" element={<ProtectedRoute><InstructorDashboard/></ProtectedRoute>} />
          <Route path="/ProgramCoordinatorDashboard" element={<ProtectedRoute><ProgramCoordinatorDashboard/></ProtectedRoute>} />
          <Route path="/QualityAssuranceOfficerDashboard" element={<ProtectedRoute><QualityAssuranceOfficerDashboard/></ProtectedRoute>} />
          <Route path="/AdministratorDashboard" element={<ProtectedRoute><AdministratorDashboard/></ProtectedRoute>} />
          {/* </Route> */}

          <Route path='*' element={<PageNotFound />} />
          <Route path="/SignIn" element={<SignIn/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/login" element={<Login/>} />
		      <Route path="/Blog" element={<Blog/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/phase4" element={<Home/>} />
          <Route path="/materials" element={<Materials/>} />
          <Route path="/COmaterials" element={<COmaterials/>} />
          <Route path="/OSmaterials" element={<OSmaterials/>} />
          <Route path="/AImaterials" element={<AImaterials/>} />
          <Route path="/MLmaterials" element={<MLmaterials/>} />
          <Route path="/DSAassessment" element={<DSAassessment/>}/>
          <Route path="/COassessment" element={<COassessment/>}/>
          <Route path="/OSassessment" element={<OSassessment/>}/>
          <Route path="/AIassessment" element={<AIassessment/>}/>
          <Route path="/MLassessment" element={<MLassessment/>}/>
          <Route path="/Results" element={<Results/>}/>
          <Route path="/InstructorMessages" element={<InstructorMessages/>}/>
          <Route path="/StudentMessages" element={<StudentMessages/>}/>
          <Route path="/InstructorCourses" element={<InstructorCourses/>}/>
          <Route path="/CreateExam" element={<CreateExam/>}/>
          <Route path="/CreateDSAexam" element={<CreateDSAexam/>}/>
          <Route path="/CreateCOexam" element={<CreateCOexam/>}/>
          <Route path="/CreateOSexam" element={<CreateOSexam/>}/>
          <Route path="/CreateAIexam" element={<CreateAIexam/>}/>
          <Route path="/CreateMLexam" element={<CreateMLexam/>}/>
          <Route path="/InstructorGrades" element={<InstructorGrades/>}/>
          <Route path="/CreateAssessment" element={<CreateAssessment/>}/>
          <Route path="/CreateDSAassessment" element={<CreateDSAassessment/>}/>
          <Route path="/CreateCOassessment" element={<CreateCOassessment/>}/>
          <Route path="/CreateOSassessment" element={<CreateOSassessment/>}/>
          <Route path="/CreateAIassessment" element={<CreateAIassessment/>}/>
          <Route path="/CreateMLassessment" element={<CreateMLassessment/>}/>
          <Route path="/StudentResults" element={<StudentResults/>}/>
          <Route path="/AdminCourses" element={<AdminCourses/>}/>
          <Route path="/AdminStudents" element={<AdminStudents/>}/>
          <Route path="/AdminQAOfficer" element={<AdminQAOfficer/>}/>
          <Route path="/AdminCoordinator" element={<AdminCoordinator/>}/>
          <Route path="/AdminInstructors" element={<AdminInstructors/>}/>
          <Route path="/AdminSettings" element={<AdminSettings/>}/>
          <Route path="/StudentAcademicProgram" element={<StudentAcademicProgram/>}/>
          <Route path="/CSProgram" element={<CSProgram/>}/>
          <Route path="/BAProgram" element={<BAProgram/>}/>
          <Route path="/CCJProgram" element={<CCJProgram/>}/>
          <Route path="/AdminAcademicProgram" element={<AdminAcademicProgram/>}/>
          <Route path="/AdminCSProgram" element={<AdminCSProgram/>}/>
          <Route path="/AdminBAProgram" element={<AdminBAProgram/>}/>
          <Route path="/AdminCCJProgram" element={<AdminCCJProgram/>}/>
          <Route path="/InstructorCourseContent" element={<InstructorCourseContent/>}/>
          <Route path="/InstructorAssociateProgramObjective" element={<InstructorAssociateProgramObjective/>}/>
          <Route path="/AdminAnalytics" element={<AdminAnalytics/>}/>
          <Route path="/programCoordinatorOverview" element={<ProgramCoordinatorOverview/>}/>
          <Route path="/ProgramCoordinatorCourseContent" element={<ProgramCoordinatorCourseContent/>}/>
          <Route path="/ProgramCoordinatorAssessments" element={<ProgramCoordinatorAssessments/>}/>
          <Route path="/StudentPerformance" element={<StudentPerformance/>}/>
          <Route path="/ProgramCoordinatorMessages" element={<ProgramCoordinatorMessages/>}/>
          <Route path="/StudentSupport" element={<StudentSupport/>}/>
          <Route path="/QAOfficerAssessments" element={<QAOfficerAssessments/>}/>
          <Route path="/IndustryTrends" element={<IndustryTrends/>}/>
        </Routes>

        <footer>
          &copy; 2023 Msc Academic Program Website
        </footer>
      </div>
  );
}

export default App;
