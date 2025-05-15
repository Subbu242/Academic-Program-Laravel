import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentSupport() {
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
  const [nocourses, setnoCourses] = useState(false);
  const [messages,setMessages]=useState([])
  const [noMessages,setNoMessages]=useState(false)
  const [studentInstructors,setstudentInstructors]=useState([])

  useEffect(()=>{
    const username=window.userName
    // axios.post('http://localhost:3001/studentCourse',{username})
    // axios.post('studentCourse.php',{username})
    axios.post('studentCourse',{username})
    .then((res)=>{
      if(res.data.message){
        // console.log("CourseResult: ",res.data)
        setCourses(["No Courses Registered"])
        setnoCourses(true)
      }
      else{
        // console.log("CourseResult: ",res.data)
        setCourses(res.data)
        setnoCourses(false)
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
          // console.log("first Result1: ",res.data)
          alert(res.data.message);
          // setMessages(res.data.message)
          setNoMessages(true)
        }
        else{
          // console.log("first Result2: ",res.data)
          setMessages(res.data)
          setNoMessages(false)
        }
    })
  },[])

  useEffect(()=>{
    const username=window.userName
    // axios.post('http://localhost:3001/studentCoordinator',{username})
    // axios.post('studentCoordinator.php',{username})
    axios.post('user/studentCoordinator',{username})
      .then((res)=>{
        if(res.data.message){
          console.log("first Result1: ",res.data)
          alert(res.data.message);
        }
        else{
          console.log("first Result2: ",res.data)
          setstudentInstructors(res.data)
        }
    })
  },[])

  const handleReply=(message) =>{      
    document.getElementById(message).style.display="block"
    document.getElementById(message+"BTN").style.display="block" 
    //   document.getElementById(message+"REPLY").style.display="none"   
    //post method to edit unread to false from true
    // const username=window.userName
    // axios.post('http://localhost:3001/changeFeedbackUnread',{username})
    //   .then((res)=>{
    //       if(res.data.message){
    //       console.log("second Result1: ",res.data)
    //       }
    //       else{
    //       console.log("second Result2: ",res.data)
    //       }
    //   })
  }
  
  const handleSend = (msg,course) => {
    const coordinator=msg.split(',')[1]
    const username=window.userName
    const message=document.getElementById(msg).value;
    console.log(username,msg,message)
    
    // axios.post('http://localhost:3001/studentSendMessage',{username,coordinator,message,username})    
    // axios.post('studentSendMessage.php',{username,coordinator,message,username})
    axios.post('studentSendMessage',{username,coordinator,message,username})
    .then((res)=>{
      if(res.data.message){
        console.log("Result: ",res)
      }
      else{
        console.log("Result: ",res.data)
        document.getElementById(msg).style.display="none"
        document.getElementById(msg+"BTN").style.display="none"
        alert("Message Sent")
        const newMessage = messages.concat(message+','+username);
        setMessages(newMessage)
      }
    })
  };

  const handleFirstSend = () => {
    const coordinator=document.getElementById("instructor").value;
    const username=window.userName
    const message=document.getElementById("msg").value;
    console.log(username,coordinator,message)
    // axios.post('http://localhost:3001/studentSendMessage',{username,coordinator,message,username})
    // axios.post('studentSendMessage.php',{username,coordinator,message,username})
    axios.post('studentSendMessage',{username,coordinator,message,username})
    .then((res)=>{
      if(res.data.message){
        console.log("Result: ",res)
      }
      else{
        console.log("Result: ",res.data)
        document.getElementById("msg").style.display="none"
        document.getElementById("BTN").style.display="none"
        alert("Message Sent")
        const newMessage = messages.concat(message+','+username);
        console.log("newMessage: ",newMessage)
        setMessages(newMessage)
      }
    })
  };

  return (
    <div>
     <br></br> <br></br>
      <div className="container">
      <center><h2>MESSAGES</h2></center>    
      {messages.length==0 &&     
        <div>
            <label for="instructor">Select Coordinator</label>
            <select name="instructor" id="instructor">
              {studentInstructors.map((instructor) => ( <option id="instructor">{instructor}</option>))}
            </select>   
            <textarea className='messageInputNew' id="msg"></textarea>      
            <button className="send-buttonNew" id="BTN" onClick={() => handleFirstSend()}>Send</button>   
        </div>
        }   
            {messages.map((message,index) => (
                <div className="message-section"> 
                        <textarea className='messageInput' id={message}></textarea>          
                        <button className="send-button" id={message+"BTN"} onClick={() => handleSend(message,courses[index])}>Send</button>  
                        <h1>{message.split(',')[1]}:-</h1>
                        <p>{message.split(',')[0]}</p>
{(index==messages.length-1) && (message.split(',')[1]!=window.userName)  && <button className="reply-button" id={message+"REPLY"}  onClick={() => handleReply(message)}>Reply</button>}
                </div>  
            ))}    
      </div>
    </div>
  );
}

export default StudentSupport;
