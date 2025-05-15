import axios from 'axios';
import React,{useState} from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProgramCoordinatorDashboard() {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);
  const [messages,setMessages]=useState([])
  const [noMessages,setNoMessages]=useState(false)

  useEffect(()=>{
    const username=window.userName
    const role="Instructor"
    // axios.post('http://localhost:3001/allStudents',{username,role})
    // axios.post('allStudents.php',{username,role})
    axios.post('user/allStudents',{username,role})
    .then((res)=>{
      if(res.data.message){
        setInstructors(["No Instructors Found"])
      }
      else{
        console.log("Result: ",res.data)
        setInstructors(res.data)
      }
    })
},[])

useEffect(()=>{
  const username=window.userName
  const role="Student"
  // axios.post('http://localhost:3001/allStudents',{username,role})
    // axios.post('allStudents.php',{username,role})
    axios.post('user/allStudents',{username,role})
  .then((res)=>{
    if(res.data.message){
      setStudents(["No Students Found"])
    }
    else{
      console.log("Result: ",res.data)
      setStudents(res.data)
    }
  })
},[])


useEffect(()=>{
  const username=window.userName
  // axios.post('http://localhost:3001/getPCFeedback',{username})
  // axios.post('getPCFeedback.php',{username})
  axios.post('getPCFeedback',{username})
    .then((res)=>{
      if(res.data.message){
        console.log("first Result1: ",res.data)
        setMessages(res.data.message)
        setNoMessages(true)
      }
      else{
        console.log("first Result2: ",res.data)
        setMessages(res.data)
        setNoMessages(false)
      }
  })
},[])


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
      setChatMessages([...chatMessages, userMessage]);

      // Simulate a reply (you can replace this with actual logic)
      setTimeout(() => {
        const reply = { type: 'received', text: "This is a reply from the chatbot." };
        setChatMessages((prevMessages) => [...prevMessages, reply]);
      }, 1000);

      setNewMessage('');
    }
  };

  const handleOverview = () => {
    navigate('/ProgramCoordinatorOverview')
  };

  const handleCourseContent = () => {
    navigate('/ProgramCoordinatorCourseContent')
  }

  const handleAssessment = () => {
    navigate('/ProgramCoordinatorAssessments')
  }

  const handlePerformance = () => {
    navigate('/StudentPerformance')
  }

  const handleStudentSupport = () => {
    navigate('/ProgramCoordinatorMessages')
  }

  const Logout = () => {
    localStorage.setItem("adminToken","false")
    navigate('/login');
  };

  return (
    <div>
      <br></br><br></br><br></br><br></br>
      <button id='logout' onClick={Logout}>LOGOUT</button>
      <div className="container">
        <br />
        <center><h2>PROGRAM COORDINATOR</h2></center>
        <br />
        <div className="dashboard-section">
          <h2>Acdemic Program</h2>
          <button id='miniButton' className="manage-students-button" onClick={handleOverview}>Overview</button>
        </div>
        <div className="dashboard-section">
          <h2 style={{display:"inline"}}>Instructors:</h2>
{instructors.map((instructor,index)=>(<span className="manage-students-button" style={{fontWeight:"bold"}}>{instructor}{index!=instructors.length-1 && ","}</span>))}<br/><br/>
<button id='miniButton' className="manage-students-button" onClick={handleCourseContent}>Course Content</button>
<button id='miniButton' className="manage-students-button" onClick={handleAssessment}>Assessments</button>
        </div>
        <div className="dashboard-section">
          <h2 style={{display:"inline"}}>Students:</h2>
{students.map((student,index)=>(<span className="manage-students-button" style={{fontWeight:"bold"}}>{student}{index!=students.length-1 && ","}</span>))}<br/><br/>
<button id='miniButton' className="manage-students-button" onClick={handlePerformance}>Performance Data </button>
{/* <button id='miniButton' className="student-support-button" onClick={handleStudentSupport}>Student Support</button> */}
        {<sup id='sup'><button id='miniButton' className="student-support-button" onClick={handleStudentSupport}>Student Support</button>{(messages[messages.length-1] && messages[messages.length-1].split(',')[1]!=window.userName) && 1}</sup>}
        {/* {(messages[messages.length-1] && messages[messages.length-1].split(',')[1]==window.userName) && <button id='miniButton' className="student-support-button" onClick={handleStudentSupport}>Student Support</button>} */}
        </div>
        {/* <div className="dashboard-section">
          <button
            className="manage-students-button"
            onClick={() => handleButtonClick('Manage Students Button Clicked')}
          >
            Manage Students
          </button>
          <button
            className="feedback-button"
            onClick={() => handleButtonClick('Feedback Button Clicked')}
          >
            Feedback
          </button>
          <br />
          <br />
          <button
            className="manage-instructors-button"
            onClick={() => handleButtonClick('Manage Instructors Button Clicked')}
          >
            Manage Instructors
          </button>
          <button
            className="manage-administrators-button"
            onClick={() => handleButtonClick('Manage Administrators Button Clicked')}
          >
            Manage Administrators
          </button>
          <br />
          <br />
        </div> */}
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

export default ProgramCoordinatorDashboard;
