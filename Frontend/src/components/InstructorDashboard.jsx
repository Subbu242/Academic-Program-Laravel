import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function InstructorDashboard() {
  axios.defaults.baseURL = 'http://localhost:8000/api/';
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
    
  const [messages,setMessages]=useState([])
  const [noMessages,setNoMessages]=useState(false)

  useEffect(()=>{
    const username=window.userName
    // axios.post('http://localhost:3001/getInstructorMessage',{username})
    // axios.post('getInstructorMessage.php',{username})
    axios.post('getInstructorMessage',{username})
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
  useEffect(()=>{
    const username=window.userName
    // axios.post('http://localhost:3001/getStudent',{username})
    // axios.post('getStudent.php',{username})
    axios.post('user/getStudent',{username})
    .then((res)=>{
      console.log("RESULT:- ",res)
      if(res.data.message){
        setStudents(["No Students Registered"])
      }
      else{
        let distinctStudents=[];
        res.data.map((res)=>{
          if(!distinctStudents.includes(res.username))
          {
            distinctStudents.push(res.username)
          }
        })
        console.log('DISTINCT:',distinctStudents);
        setStudents(distinctStudents)
      }
    })
  },[])

  const [chatMessages, setChatMessages] = useState([
    { type: 'received', text: "Hello! How can I assist you today?" },
  ]);

  // Function to send a schedule message
  const sendSchedule = () => {
    const scheduleMessage = { type: 'sent', text: "Sending Exam Schedule..." };
    setChatMessages([...chatMessages, scheduleMessage]);
    
    // Simulate a reply or further action here
  };

  // Function to send a notification
  const sendNotification = () => {
    const notificationMessage = { type: 'sent', text: "Sending Notifications..." };
    setChatMessages([...chatMessages, notificationMessage]);
    
    // Simulate a reply or further action here
  };

  // Function to show an alert when a button is clicked
  const handleButtonClick = (message) => {
    alert(message);
  };

  const Logout = () => {
    localStorage.setItem("adminToken","false")
    navigate('/login');
  };
  
  const handleMessage = () => {
    navigate('/InstructorMessages')
  };

  const handleCreateExam = () =>{
    navigate("/CreateExam");
  }
  const handleCreateAssessment = () =>{
    navigate("/CreateAssessment");
  }
  const handleCourse = () =>{
    navigate("/InstructorCourses");
  }
  const handleCourseContent = () =>{
    navigate("/InstructorCourseContent");
  }
  const handleAssosciateProgramObjectives= () =>{
    navigate("/InstructorAssociateProgramObjective");
  }
  const handleGrades = () =>{
    navigate("/InstructorGrades");
  }
  const handleStudent = (student) =>{
    // window.Student=student
    const username=window.userName
    localStorage.setItem('student',student)
    localStorage.setItem('instructor',username)
    navigate("/StudentResults");
  }
  

  return (
    <div>
     <br></br> <br></br>
      <button id='logout' onClick={Logout}>LOGOUT</button>
      <div className="container">
      <center><h2>INSTRUCTOR</h2></center>
        <div className="dashboard-section">
          <h2>Instructor Actions</h2>
          <button id='miniButton'
            className="create-course-button"
            onClick={() => handleCourse()}
          >
            Manage Course
          </button>
          <button id='miniButton'
            className="create-course-button"
            onClick={() => handleCourseContent()}
          >
            Manage Course Content
          </button>
          <button id='miniButton'
            className="create-course-button"
            onClick={() => handleAssosciateProgramObjectives()}
          >
            Assosciate Program Objectives
          </button>
        </div>
        <br />
        <br />
        <div className="dashboard-section">
          <h2>Exam Analysis</h2>
          <button id='miniButton' className="create-exam-button" onClick={() => handleCreateExam()}>Create Exam</button>
          <button id='miniButton' className="create-exam-button" onClick={() => handleCreateAssessment()}>Create Assessment</button>
          <button id='miniButton' className="grade-students-button" onClick={() => handleGrades()}>Grade Students</button>
          {/* <button className="exam-button">Exam 1</button>
          <button className="exam-button">Exam 2</button>
          <button className="exam-button">Exam 3</button> */}
        </div>
        <br />
        <br />
        <div className="dashboard-section">
          <h2>Student Reports</h2>
          {students && students.map((student) => (
            <button className="student-button" id='miniButton' onClick={() => handleStudent(student)}>{student}</button>
          ))}
          {/* <button id='miniButton' className="create-course-button" onClick={handleMessage}>Messages</button> */}
        { (messages[messages.length-1] && messages[messages.length-1].split(',')[1]!=window.userName) && <sup id='sup'><button id='miniButton' className="create-course-button" onClick={() => handleMessage()}>Messages</button>1</sup>}
        { (messages[messages.length-1] && messages[messages.length-1].split(',')[1]==window.userName) && <button id='miniButton' className="create-course-button" onClick={() => handleMessage()}>Messages</button>}
          {/* <button className="student-button">Student 2</button>
          <button className="student-button">Student 3</button>
          <button className="student-button">Student 4</button> */}
        </div>
      </div>

      
      {/* <div className="chat-box">
        <h3>Quick Send</h3>
        <div className="chat-messages" id="chat-messages">
          {chatMessages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <button className={message.type === 'received' ? 'class1' : 'class2'}>{message.text}</button>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <div className="chat-buttons">
            <button className="chat-button" onClick={sendSchedule}>Send Schedule</button>
            <button className="chat-button" onClick={sendNotification}>Send Notifications</button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default InstructorDashboard;
