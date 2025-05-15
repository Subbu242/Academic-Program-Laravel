import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function InstructorMessages() {
  axios.defaults.baseURL = 'http://localhost:8000/api/';
  const navigate = useNavigate();
  
  const [messages,setMessages]=useState([])
  const [noMessages,setNoMessages]=useState(false)
  const [studentInstructors,setstudentInstructors]=useState([])

  useEffect(()=>{
    const username=window.userName
    // axios.post('http://localhost:3001/getInstructorMessage',{username})
    // axios.post('getInstructorMessage.php',{username})
    axios.post('getInstructorMessage',{username})
      .then((res)=>{
        if(res.data.message){
          console.log("first Result1: ",res.data)
          // setMessages(res.data.message)
          setNoMessages(true)
        }
        else{
          console.log("first Result2: ",res.data)
          // let name=''
          // let msg=""
          // for(let i=0;i<res.data.length;i++)
          // {
          //     name=res.data[i].split(',')[1]
          //     for(let j=0;j<res.data.length;j++)
          //     {
          //       if(name==res.data[j].split(',')[1] && i!=j)
          //       {
          //         msg=res.data[i].split(',')[0]+". "+res.data[j].split(',')[0];
          //         res.data[i]=msg+","+name
          //         res.data.splice(j, 1);
          //       }
          //     }
          // }
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
  
  const handleSend = (msg) => {
    console.log("ENTERING SEND")
    const instructorUsername=window.userName
    const student=msg.split(',')[1]
    const message=document.getElementById(msg).value;
    console.log(instructorUsername,message,student)
    // axios.post('http://localhost:3001/instructorSendMessage',{instructorUsername,message,student})
    // axios.post('instructorSendMessage.php',{instructorUsername,message,student})
    axios.post('instructorSendMessage',{instructorUsername,message,student})
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
    // axios.post('http://localhost:3001/instructorSendMessage',{instructorUsername,message,student})
    // axios.post('instructorSendMessage.php',{instructorUsername,message,student})
    axios.post('instructorSendMessage',{instructorUsername,message,student})
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

  return (
    <div>
     <br></br> <br></br>
      <div className="container">
      <center><h2>MESSAGES</h2></center>   
      {messages.length==0 &&     
        <div>
            <label for="instructor">Select a Student</label>
            <select name="instructor" id="instructor">
              {studentInstructors.map((instructor) => ( <option id="instructor">{instructor.username}</option>))}
            </select>   
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

export default InstructorMessages;
