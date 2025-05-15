import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function InstructorAssociateProgramObjective() {
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
  const [PO, setPO] = useState([]);
  const [nocourses, setnoCourses] = useState(false);

  useEffect(()=>{
    const username=window.userName
    // console.log(username)
    // axios.post('http://localhost:3001/instructorCourse',{username})
    // axios.post('instructorCourse.php',{username})
    axios.post('instructorCourse',{username})
    .then((res)=>{
      if(res.data.message){
        setCourses(["No Courses Registered"])
        setnoCourses(true)
      }
      else{
        // console.log("Result: ",res.data)
        setCourses(res.data)
        setnoCourses(false)
      }
    })
},[])

useEffect(()=>{
  const username=window.userName
  // console.log(username)
  // axios.post('http://localhost:3001/getAllProgramObjectives',{username})
  // axios.post('getAllProgramObjectives.php',{username})
  axios.post('programObjectives/getAllProgramObjectives',{username})
  .then((res)=>{
    if(res.data.message){
      console.log("Result: ",res.data)
      setPO(["No Courses Registered"])
    }
    else{
      console.log("Result: ",res.data)
      setPO(res.data)
    }
  })
},[])

  const handlePOMapping=(courseName,e) =>{ 
    let PO=e.target.value
    console.log("COURSES: ",courseName,PO)
    if(courseName && PO)
    {
      const username=window.userName
      // axios.post('http://localhost:3001/mapPO',{username,courseName,PO})
      // axios.post('mapPO.php',{username,courseName,PO})
      axios.post('programObjectives/mapPO',{username,courseName,PO})
        .then((res)=>{
            if(res.data.message=='No programObjectives'){
            console.log("second Result1: ",res.data)
            }
            else{
            console.log("second Result2: ",res.data)
            alert("Successfully assosciated Objective with the course "+courseName)
            }
        })
    } 
    else{
      alert("Please enter all the fields")
    }
  }
  
  return (
    <div>
     <br></br> <br></br>
      <div className="container">
      <center><h2>ASSOSCIATE PROGRAM OBJECTIVES</h2></center> 
   {/* <button id='miniButton' className="create-button" onClick={() => handleCreate()}>CREATE COURSE</button>
            <input type='text' id="courseHeading" placeholder='Enter Course Name'></input>
            <input type='text' id="courseCode" placeholder='Enter Course Code'></input> */}
        <div className="courses-section">
        {courses.map((course) => (
          <div className="course">
            <div id="courseInfo">
              <h2>{course}</h2>
              <label for="ProgramObjectives">Choose a Program Objective:</label>
              <select name="ProgramObjectives" id="ProgramObjectives" onChange={(e)=>handlePOMapping(course,e)}>
{PO.map((po,index) => (  <option id={course+index}>{po}</option> ))}
              </select>
              {/* <button id='miniButton' className="delete-button" onClick={() => handleDelete(course)}>DELETE COURSE</button> */}
            </div>
          </div>
        ))}
        </div>   
      </div>
    </div>
  );
}

export default InstructorAssociateProgramObjective;
