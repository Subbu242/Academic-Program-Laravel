import React, { useEffect } from "react";
import './index.css';
import { NavLink,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function StudentAcademicProgram() {
  const navigate=useNavigate();
    
  const [programs, setPrograms] = useState([{}]);

  useEffect(()=>{
    const username=window.userName
    // console.log(username)
    // axios.post('http://localhost:3001/getPrograms',{username})
    // axios.post('getPrograms.php',{username})
    axios.post('programs/getPrograms',{username})
    .then((res)=>{
      if(res.data.message){
        setPrograms(["No Programs Registered"])
      }
      else{
        console.log("Result: ",res.data);
        setPrograms(res.data)
      }
    })
},[])

const handleCreate=() =>{ 
    console.log("COURSES: ",programs)  
    let ProgramName=document.getElementById("ProgramName").value;
    let ProgramCode=document.getElementById("ProgramCode").value;
    let College=document.getElementById("ProgramCollege").value;
    if(ProgramName && ProgramCode && College)
    {
      const newList = programs.concat({ProgramName,ProgramCode,College});
      setPrograms(newList);
      document.getElementById("ProgramName").value=''
      document.getElementById("ProgramCode").value=''
      document.getElementById("ProgramCollege").value=''

      const username=window.userName
      // axios.post('http://localhost:3001/addProgram',{username,ProgramName,ProgramCode,College})
      // axios.post('addProgram.php',{username,ProgramName,ProgramCode,College})
      axios.post('programs/addProgram',{username,ProgramName,ProgramCode,College})
        .then((res)=>{
            if(res.data.message){
            console.log("second Result1: ",res.data)
            }
            else{
            console.log("second Result2: ",res.data)
            alert("Successfully created Program")
            }
        })
    } 
    else{
      alert("Please enter all the fields")
    }
  }
  
  const handleDelete = (program) => {
    const newList = programs.filter((item) => item !== program);
    console.log("NEWLIST: ",newList,program.ProgramName)
    let ProgramName=program.ProgramName
    setPrograms(newList);
    
    // axios.post('http://localhost:3001/deleteProgram',{ProgramName})
    // axios.post('deleteProgram.php',{ProgramName})
    axios.post('programs/deleteProgram',{ProgramName})
    .then((res)=>{
      if(res.data.message){
        console.log("Result: ",res)
      }
      else{
        console.log("Result: ",res.data)
        alert("Course Deleted");
      }
    })
  };

  const handleProgram = (programName) =>{
    console.log('PROGRAM: ',programName)
        if(programName=="Computer Science")
        {
            navigate('/CSProgram')
        }
        else if(programName=="Business Administration"){
            
            navigate('/BAProgram')
        }
        else{            
            navigate('/CCJProgram')
        }
  }
    return (
        <div>
          <br></br><br></br>
          <div className="container">
          <center><h2>ACADEMIC PROGRAM</h2></center>
          <br/><br/>
   {/* <button id='miniButton' className="create-button" onClick={() => handleCreate()}>CREATE PROGRAM</button>
            <input type='text' id="ProgramName" placeholder='Enter Program Name'></input>
            <input type='text' id="ProgramCode" placeholder='Enter Program Code'></input> */}
            {/* <input type='text' id="ProgramCollege" placeholder='Enter College of Program'></input> */}
            <div className="courses-section">
            {programs.map((program) => (
              <div className="course courseDiv">
                <div id="courseInfo1">
                  <h1>{program.ProgramName+"("}{program.ProgramCode+")"}</h1>
                  <h4>{program.College}</h4>
              {/* <button id='miniButton' className="delete-button" onClick={() => handleDelete(program)}>DELETE PROGRAM</button> */}
                  <button id="moreInfo" onClick={()=>handleProgram(program.ProgramName)}>&gt;</button>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      );


}

export default StudentAcademicProgram;
