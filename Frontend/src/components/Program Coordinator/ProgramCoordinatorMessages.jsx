import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProgramCoordinatorMessages() {
  const navigate = useNavigate();
  
  const [messages,setMessages]=useState([])
  const [noMessages,setNoMessages]=useState(false)
  const [studentInstructors,setstudentInstructors]=useState([])

  useEffect(()=>{
    const username=window.userName
    // axios.post('http://localhost:3001/getPCFeedback',{username})
    // axios.post('getPCFeedback.php',{username})
    axios.post('getPCFeedback',{username})
      .then((res)=>{
        if(res.data.message){
          console.log("first Result1: ",res.data)
          // setMessages(res.data.message)
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
    // axios.post('http://localhost:3001/getPCStudent',{username})
    // axios.post('getPCStudent.php',{username})
    axios.post('user/getPCStudent',{username})
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
  
  const handleSend = (msg) => {
    console.log("ENTERING SEND")
    const instructorUsername=window.userName
    const student=msg.split(',')[1]
    const message=document.getElementById(msg).value;
    console.log(instructorUsername,message,student)
    // axios.post('http://localhost:3001/coordinatorSendMessage',{instructorUsername,message,student})
    // axios.post('coordinatorSendMessage.php',{instructorUsername,message,student})
    axios.post('coordinatorSendMessage',{instructorUsername,message,student})
    .then((res)=>{
      if(res.data.message){
        console.log("Result: ",res)
      }
      else{
        console.log("Result: ",res.data)
        document.getElementById(msg).style.display="none"
        document.getElementById(msg+"BTN").style.display="none"
        alert("Message Sent");
        const newMessage = messages.concat(message+','+instructorUsername);
        setMessages(newMessage)
      }
    })
  };

  
  const handleFirstSend = () => {
    const student=document.getElementById("instructor").value;
    const instructorUsername=window.userName
    const message=document.getElementById("msg").value;
    console.log(instructorUsername,message,student)
    // axios.post('http://localhost:3001/coordinatorSendMessage',{instructorUsername,message,student})
    // axios.post('coordinatorSendMessage.php',{instructorUsername,message,student})
    axios.post('coordinatorSendMessage',{instructorUsername,message,student})
    .then((res)=>{
      if(res.data.message){
        console.log("Result: ",res)
      }
      else{
        console.log("Result: ",res.data)
        document.getElementById("msg").style.display="none"
        document.getElementById("BTN").style.display="none"
        alert("Message Sent")
        const newMessage = messages.concat(message+','+instructorUsername);
        console.log("newMessage: ",newMessage)
        setMessages(newMessage)
      }
    })
  };

  const showMessages = () => {
    const username=document.getElementById("instructor").value;
    console.log('STUDENT: ',username)
    // axios.post('http://localhost:3001/getStudentFeedback',{username})
    // axios.post('getStudentFeedback.php',{username})
    axios.post('getStudentFeedback',{username})
      .then((res)=>{
        if(res.data.message){
          console.log("first Result1: ",res.data)
          // setMessages(res.data.message)
          setNoMessages(true)
        }
        else{
          console.log("first Result2: ",res.data)
          setMessages(res.data)
          setNoMessages(false)
        }
    })
  }

  return (
    <div>
     <br></br> <br></br>
      <div className="container">
      <center><h2>MESSAGES</h2></center>    
      
            <label for="instructor">Select a Student</label>
            <select name="instructor" id="instructor" onChange={showMessages}>
              {studentInstructors.map((instructor) => ( <option id="instructor">{instructor.username}</option>))}
            </select>  
            {messages.length==0 &&     
              <div> 
                  <textarea className='messageInputNew' id="msg"></textarea>      
                  <button className="send-buttonNew" id="BTN" onClick={() => handleFirstSend()}>Send</button>   
              </div>
            }   
            {messages.map((message,index) => (
                <div className="message-section"> 
                        <textarea className='messageInput' id={message}></textarea>          
                        <button className="send-button" id={message+"BTN"} onClick={() => handleSend(message)}>Send</button>  
                        <h1>{message.split(',')[1]}:-</h1>
                        <p>{message.split(',')[0]}</p>
{(index==messages.length-1) && (message.split(',')[1]!=window.userName)  && <button className="reply-button" id={message+"REPLY"}  onClick={() => handleReply(message)}>Reply</button>}
                </div>  
            ))}    
      </div>
    </div>
  );
}

export default ProgramCoordinatorMessages;
