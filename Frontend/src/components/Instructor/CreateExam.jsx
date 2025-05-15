import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateExam() {
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
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
        console.log("Result: ",res.data)
        setCourses(res.data)
        setnoCourses(false)
      }
    })
},[])

  const handleCreateExam=(course) =>{ 
    console.log("COURSES: ",course)  

    if(course=="Data Structures and Algorithms") 
    {
      navigate('/CreateDSAexam');
    }
    else if(course=="Computer Organization") 
    {
      navigate('/CreateCOexam');
    }
    else if(course=="Operating Systems") 
    {
      navigate('/CreateOSexam');
    }
    else if(course=="Artificial Intelligence") 
    {
      navigate('/CreateAIexam');
    }
    else{
      navigate('/CreateMLexam');
    }
  }
  
  return (
    <div>
     <br></br> <br></br>
      <div className="container">
      <center><h2>COURSES</h2></center> 
        <div className="courses-section">
        {courses.map((course,index) => (
          <div className="course">
            <div id="courseInfo">
              <h2>{course}</h2>
              <button id='miniButton' className="delete-button createExamButton" onClick={() => handleCreateExam(course)}>CREATE EXAM</button>
            </div>
          </div>
        ))}
        </div>   
      </div>
    </div>
  );
}

export default CreateExam;
