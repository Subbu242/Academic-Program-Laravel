import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

function AdministratorDashboard() {
  const navigate = useNavigate();
  // Function to show an alert when a button is clicked
  const handleButtonClick = (message) => {
    alert(message);
  };
  const [chatMessages, setChatMessages] = useState([
    { type: 'received', text: "Hello! How can I assist you today?" },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const userMessage = { type: 'sent', text: newMessage };
      // Add the user's message to the chat
      setChatMessages([...chatMessages, userMessage]);

      // Simulate a reply (you can replace this with actual logic)
      setTimeout(() => {
        const reply = { type: 'received', text: "This is a reply from the chatbot." };
        setChatMessages((prevMessages) => [...prevMessages, reply]);
      }, 1000);

      setNewMessage('');
    }
  };

  const handleCourse = () => {
    navigate('/AdminCourses')
  };

  const manageStudents = () => {
    navigate('/AdminStudents')
  }

  const manageQAOfficer = () => {
    navigate('/AdminQAOfficer')
  }

  const manageCoordinator = () => {
    navigate('/AdminCoordinator')
  }

  const manageInstructor= () => {
    navigate('/AdminInstructors')
  }

  const manageSettings = () =>{
    navigate("/AdminSettings")
  }

  const manageAcademicProgram = () => {    
    navigate('/AdminAcademicProgram')
  }

  const manageAnalytics = () => {
    navigate('/AdminAnalytics')
  }
  
    
  const Logout = () => {
    localStorage.setItem("adminToken","false")
    navigate('/login');
  };
    
  return (
    <div>
      <br></br><br></br>
      <button id='logout' onClick={Logout}>LOGOUT</button>
      <div className="container">
      <center><h2>ADMIN</h2></center>
        <div className="dashboard-section">
          <h2>Coordinator</h2>
          <button className="assign-students-button manageCoordinator" name="manageCoordinator" id="miniButton" onClick={manageCoordinator}>
          Manage Coordinator
          </button>
          <button className="handle-course-button" id="miniButton" onClick={handleCourse}>
          Manage Course
          </button>
          {/* <button className="manage-button" onClick={() => handleButtonClick('Manage Button Clicked')}>
            Assign Students
          </button>
          <button className="review-button" onClick={() => handleButtonClick('Review Button Clicked')}>
            Review
          </button> */}
        </div>
        <div className="dashboard-section">
          <h2>QA Officer</h2>
          <button className="manage-button" id="miniButton" onClick={manageQAOfficer}>
            Manage QA Officer
          </button>
          {/* <button className="handle-permissions-button" onClick={() => handleButtonClick('Handle Permissions Button Clicked')}>
            Handle Permissions
          </button>
          <button className="reports-button" onClick={() => handleButtonClick('Reports Button Clicked')}>
            Reports
          </button>
          <button className="performance-button" onClick={() => handleButtonClick('Performance Button Clicked')}>
            Performance
          </button> */}
        </div>
        <div className="dashboard-section">
          <h2>Students</h2>
          <button className="manage-students-button" id="miniButton" onClick={manageStudents}>
            Manage Students
          </button>
          <button className="manage-instructor-button"  id="miniButton" onClick={manageInstructor}>
            Manage Instructor
          </button>
          {/* <button className="reports-button" onClick={() => handleButtonClick('Reports Button Clicked')}>
            Reports
          </button>
          <button className="performance-button" onClick={() => handleButtonClick('Performance Button Clicked')}>
            Performance
          </button> */}
        </div>
          {/* <button className="manage-course-button" id="miniButton" onClick={manageSettings}>
            Settings
          </button> */}
          <button className="manage-course-button"  id="miniButton" onClick={manageAcademicProgram}>
            Manage Academic Program
          </button>
          <button className="manage-analytics-button"  id="miniButton" onClick={manageAnalytics}>
            Reports and Analytics 
          </button>
          {/* <button className="manage-analytics-button"  id="miniButton" onClick={manageSettings}>
            Settings
          </button> */}
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
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button id="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default AdministratorDashboard;
