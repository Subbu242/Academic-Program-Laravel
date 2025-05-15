import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function QualityAssuranceOfficerDashboard() {
  const navigate = useNavigate();
  // State for chat messages
  const [chatMessages, setChatMessages] = useState([
    { type: 'received', text: "Hello! How can I assist you today?" },
  ]);

  // State for user input in the chat
  const [userMessage, setUserMessage] = useState('');

  // Function to send a chat message
  const sendMessage = () => {
    if (userMessage.trim() !== '') {
      const newMessage = { type: 'sent', text: userMessage };
      setChatMessages([...chatMessages, newMessage]);

      // Simulate a reply (you can replace this with actual logic)
      setTimeout(() => {
        const reply = { type: 'received', text: "This is a reply from the chatbot." };
        setChatMessages((prevMessages) => [...prevMessages, reply]);
      }, 1000);

      setUserMessage('');
    }
  };

  // Function to show an alert when a button is clicked
  const handleButtonClick = (message) => {
    alert(message);
  };

  const manageAcademicProgram = () => {
    navigate('/AdminAcademicProgram')
  }

  const manageAssessments = () => {
    navigate('/QAOfficerAssessments')
  }

  const manageCourseContent = () => {
    navigate('/ProgramCoordinatorCourseContent')
  }

  const handlePerformance = () => {
    navigate('/StudentPerformance')
  }

  const manageTrends = () => {
    navigate('/IndustryTrends')
  }

  const Logout = () => {
    localStorage.setItem("adminToken","false")
    navigate('/login');
  };

  return (
    <div>
      <br /><br/><br/>
      <button id='logout' onClick={Logout}>LOGOUT</button>
      <div className="container">
      <center><h2>QUALITY ASSURANCE OFFICER</h2></center>        
        <br />  
        <div className="dashboard-section">          
          <h2>Quality and Effectiveness</h2>
          <button className="assign-students-button"  id="miniButton" onClick={manageAcademicProgram}>Academic Program</button>
          <button className="assign-students-button"  id="miniButton" onClick={manageAssessments}>Assessments</button>
        </div>
        <div className="dashboard-section">          
          <h2>Course</h2>
          <button className="assign-students-button"  id="miniButton" onClick={manageCourseContent}>Course Content</button>
        </div>
        <div className="dashboard-section"> 
          <h2>Students:</h2>
          <button id='miniButton' className="manage-students-button" onClick={handlePerformance}>Performance Data </button>
          {/* <button id='miniButton' className="student-support-button" onClick={handleStudentSupport}>Student Support</button> */}
        </div>
        {/* <div className="dashboard-section">
          <button
            className="reports-button" onClick={() => handleButtonClick('Reports Button Clicked')}>Reports</button>
          <button
            className="feedback-button" onClick={() => handleButtonClick('Feedback Button Clicked')}>Feedback</button>
          <button
            className="faculty-development-button" onClick={() => handleButtonClick('Faculty Development Button Clicked')}>Faculty Development</button>
          <br />
          <br />
          <button
            className="quality-standards-button" onClick={() => handleButtonClick('Quality Standards Button Clicked')}>Quality Standards</button>
          <button className="student-support-button" onClick={() => handleButtonClick('Student Support Button Clicked')}>Student Support</button>
        </div> */}
          <button className="manage-course-button"  id="miniButton" onClick={manageTrends}>Industry Trends</button>
      </div>

      {/* <div className="chat-box">
        <h3>Chat Box</h3>
        <div className="chat-messages" id="chat-messages">
          {chatMessages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            id="message-input"
            placeholder="Type your message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button id="send-button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default QualityAssuranceOfficerDashboard;
