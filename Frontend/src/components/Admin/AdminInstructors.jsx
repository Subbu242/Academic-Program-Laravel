import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminInstructors() {
  const navigate = useNavigate();
  
  const [students, setStudents] = useState([]);

  useEffect(()=>{
    const username=window.userName
    const role="Instructor"
    // axios.post('http://localhost:3001/allStudents',{username,role})
    // axios.post('allStudents.php',{username,role})
    axios.post('user/allStudents',{username,role})
    .then((res)=>{
      if(res.data.message){
        setStudents(["No Courses Registered"])
      }
      else{
        console.log("Result: ",res.data)
        setStudents(res.data)
      }
    })
},[])

  const handleCreate=() =>{ 
    let studentName=document.getElementById("studentName").value;
    let studentEmail=document.getElementById("studentEmail").value;
    let studentPassword=studentName+"@1234";
    const role="Instructor"
    if(studentName && studentEmail)
    {
      const newList = students.concat(studentName);
      setStudents(newList);
      document.getElementById("studentName").value=''
      document.getElementById("studentEmail").value=''

      const username=window.userName
      // axios.post('http://localhost:3001/addStudent',{username,studentName,studentEmail,studentPassword,role})
      // axios.post('addStudent.php',{username,studentName,studentEmail,studentPassword,role})
      axios.post('user/addStudent',{username,studentName,studentEmail,studentPassword,role})
        .then((res)=>{
            if(res.data.message){
            console.log("second Result1: ",res.data)
            }
            else{
            console.log("second Result2: ",res.data)
            alert('Successfully enrolled Instructor')
            }
        })
    } 
    else{
      alert("Please enter all the fields")
    }
  }
  
  const handleDelete = (student) => {
    const role="Instructor"
    const newList = students.filter((item) => item !== student);
    console.log("NEWLIST: ",newList,student)
    setStudents(newList);
    
    // axios.post('http://localhost:3001/deleteStudent',{student,role})
    // axios.post('deleteStudent.php',{student,role})
    axios.post('user/deleteStudent',{student,role})
    .then((res)=>{
      if(res.data.message){
        console.log("Result: ",res.data)
      }
      else{
        console.log("Result: ",res.data)
        alert("Successfully dropped Instructor");
      }
    })
  };

  return (
    <div>
     <br></br> <br></br>
      <div className="container">
      <center><h2>Instructor</h2></center> 
      <br/><br/>
      <div id='inputBlock'>
    <button id='miniButton' className="create-button" onClick={() => handleCreate()}>ADD INSTRUCTOR</button> 
            <input type='text' id="studentName" placeholder='Enter Instructor Name'></input>
            <input type='email' id="studentEmail" placeholder='Enter Instructor Email'></input>
            </div><br/><br/>
        <div className="courses-section">
        {students.map((student,index) => (
          <div className="course">
            <div id="courseInfo">
              <h2>{student}</h2>
              <button id='miniButton' className="delete-button deleteButton" onClick={() => handleDelete(student)}>DELETE QA OFFICER</button>
            </div>
          </div>
        ))}
        </div>   
      </div>
    </div>
  );
}

export default AdminInstructors;
