import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentMessages() {
  axios.defaults.baseURL = 'http://localhost:8000/api/';
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
        console.log("CourseResult: ",res.data)
        setCourses(["No Courses Registered"])
        setnoCourses(true)
      }
      else{
        console.log("CourseResult: ",res.data)
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
        alert(res.data.message);
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
    // axios.post('http://localhost:3001/studentInstructor',{username})
    // axios.post('studentInstructor.php',{username})
    axios.post('user/studentInstructor',{username})
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

    //post method to edit unread to false from true
    // const username=window.userName
    // axios.post('http://localhost:3001/changeUnread',{username})
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
    const instructor=msg.split(',')[1]
    const username=window.userName
    const message=document.getElementById(msg).value;
    console.log(username,msg,message)
    // axios.post('http://localhost:3001/sendMessage',{username,instructor,message,username})
    // axios.post('sendMessage.php',{username,instructor,message,username})
    axios.post('sendMessage',{username,instructor,message,username})
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
        console.log("newMessage: ",newMessage)
        setMessages(newMessage)
      }
    })
  };

  const handleFirstSend = () => {
    const instructor=document.getElementById("instructor").value;
    const username=window.userName
    const message=document.getElementById("msg").value;
    console.log(username,instructor,message)
    // axios.post('http://localhost:3001/sendMessage',{username,instructor,message,username})
    // axios.post('sendMessage.php',{username,instructor,message,username})
    axios.post('sendMessage',{username,instructor,message,username})
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
            <label for="instructor">Select a Instructor</label>
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

export default StudentMessages;
