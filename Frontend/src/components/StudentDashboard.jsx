import React,{useState,useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Materials from './Student/materials';
import axios from 'axios';

function StudentDashboard(props) {
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { type: 'received', text: "Hello! How can I assist you today?" },
  ]);

  const [courses, setCourses] = useState([]);
  const [nocourses, setnoCourses] = useState(false);
  const [instructorMessages,setinstructorMessages]=useState([])
  const [coordinatorMessages,setcoordinatorMessages]=useState([])
  const [noMessages,setNoMessages]=useState(false)

  useEffect(()=>{
    const username=window.userName
    console.log(username)
    // axios.post('http://localhost:3001/studentCourse',{username})
      // axios.post('studentCourse.php',{username})
      axios.post('studentCourse',{username})
    .then((res)=>{
      if(res.data.message){
        console.log("Result: ",res.data)
        setCourses(["No Courses Registered"])
        setnoCourses(true)
      }
      else{
        console.log("Result: ",res.data)
        setCourses(res.data)
        setnoCourses(false)
      }
    })
},[])

useEffect(()=>{
  const username=window.userName
  // axios.post('http://localhost:3001/getStudentMessage',{username})
  // axios.post('getStudentMessage.php',{username})
  axios.post('getStudentMessage',{username})
    .then((res)=>{
      if(res.data.message){
        console.log("first Result1: ",res.data)
        // setinstructorMessages(res.data.message)
        setNoMessages(true)
      }
      else{
        console.log("first Result2: ",res.data)
        setinstructorMessages(res.data)
        setNoMessages(false)
      }
  })
},[])


useEffect(()=>{
  const username=window.userName
  // axios.post('http://localhost:3001/getStudentFeedback',{username})
  // axios.post('getStudentFeedback.php',{username})
  axios.post('getStudentFeedback',{username})
    .then((res)=>{
      if(res.data.message){
        console.log("second Result1: ",res.data)
        setcoordinatorMessages(res.data.message)
        setNoMessages(true)
      }
      else{
        console.log("second Result2: ",res.data)
        setcoordinatorMessages(res.data)
        setNoMessages(false)
      }
  })
},[])

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

  const Logout = () => {
    localStorage.setItem("adminToken","false")
    navigate('/login');
  };

  const handleMaterials = (course) => {
      console.log(course.course);   
    if(course.course=="Data Structures and Algorithms") 
    {
      navigate('/materials');
    }
    else if(course.course=="Computer Organization") 
    {
      navigate('/COmaterials');
    }
    else if(course.course=="Operating Systems") 
    {
      navigate('/OSmaterials');
    }
    else if(course.course=="Artificial Intelligence") 
    {
      navigate('/AImaterials');
    }
    else{
      navigate('/MLmaterials');
    }
  };

  const handleAssessment = (course) => {
    if(course.course=="Data Structures and Algorithms") 
    {
      let CID=1
      // axios.post('http://localhost:3001/getExam',{CID})
    // axios.post('getExam.php',{CID})
    axios.post('getExam',{CID})
      .then((res)=>{
        if(res.data.message){
          console.log("Result: ",res.data)
          alert("No exams Found!")
        }
        else{          
          navigate('/DSAassessment');
        }
      })
    }
    else if(course.course=="Computer Organization") 
    {
      let CID=2
      // axios.post('http://localhost:3001/getExam',{CID})
    // axios.post('getExam.php',{CID})
    axios.post('getExam',{CID})
      .then((res)=>{
        if(res.data.message){
          alert(res.data.message);
        }
        else{          
          navigate('/COassessment');
        }
      })
    }
    else if(course.course=="Operating Systems") 
    {
      let CID=3
      // axios.post('http://localhost:3001/getExam',{CID})
    // axios.post('getExam.php',{CID})
    axios.post('getExam',{CID})
      .then((res)=>{
        if(res.data.message){
          alert(res.data.message);
        }
        else{          
          navigate('/OSassessment');
        }
      })
    }
    else if(course.course=="Artificial Intelligence") 
    {
      let CID=4
      // axios.post('http://localhost:3001/getExam',{CID})
    // axios.post('getExam.php',{CID})
    axios.post('getExam',{CID})
      .then((res)=>{
        if(res.data.message){
          alert(res.data.message);
        }
        else{          
          navigate('/AIassessment');
        }
      })
    }
    else{
      let CID=5
      // axios.post('http://localhost:3001/getExam',{CID})
    // axios.post('getExam.php',{CID})
    axios.post('getExam',{CID})
      .then((res)=>{
        if(res.data.message){
          alert(res.data.message);
        }
        else{          
          navigate('/MLassessment');
        }
      })
    }
  };

  const handleResults = (course) => {
    navigate("/Results")
  };

  const handleMessage = (course) => {
    navigate('/StudentMessages')
  };

  const handleSupport = () => {
    navigate('/StudentSupport')
  }

  const handleAcademicProgram = (course) => {
    navigate('/StudentAcademicProgram')
  };


  return (
    <div>
      <br></br><br></br>
      <button id='logout' onClick={Logout}>LOGOUT</button>
      <div className="container">
      <center><h2>STUDENT</h2></center>
        <button id='miniButton' className="analytics-button" onClick={() => handleAcademicProgram()}>Academic Program</button>
        {!nocourses && <button id='miniButton' className="analytics-button" onClick={() => handleResults()}>Course Catalog</button>}
        <div className="courses-section">
        {courses.map((course) => (
          <div className="course">
            <div id="courseInfo">
              <h2>{course}</h2>
  {!nocourses && <button id='miniButton' className="materials-button" onClick={() => handleMaterials({course})}>Materials</button>}
  {!nocourses && <button id='miniButton' className="assessment-button" onClick={() => handleAssessment({course})}>Assessment</button>}
            </div>
          </div>
        ))}
        {!nocourses &&  <sup id='sup'><button id='miniButton' className="report-button" onClick={() => handleMessage()}>Messages</button>{instructorMessages[instructorMessages.length-1] && instructorMessages[instructorMessages.length-1].split(',')[1]!=window.userName && 1}</sup>}
        {/* {!nocourses && (instructorMessages[instructorMessages.length-1] && instructorMessages[instructorMessages.length-1].split(',')[1]==window.userName) && <button id='miniButton' className="report-button" onClick={() => handleMessage()}>Messages</button>} */}
        {!nocourses &&  <sup id='sup'><button id='miniButton' className="report-button" onClick={() => handleSupport()}>Support</button>{coordinatorMessages[coordinatorMessages.length-1] && coordinatorMessages[coordinatorMessages.length-1].split(',')[1]!=window.userName && 1}</sup>}
        {/* {!nocourses && (coordinatorMessages[coordinatorMessages.length-1] && coordinatorMessages[coordinatorMessages.length-1].split(',')[1]==window.userName) && <button id='miniButton' className="report-button" onClick={() => handleSupport()}>Support</button>} */}
        </div>
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
          <button id="send-button" onClick={handleSendMessage}>Send</button>
        </div>
      </div> */}
    </div>
  );
}

export default StudentDashboard;
