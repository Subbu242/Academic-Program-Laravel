import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateAssessment() {
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
      navigate('/CreateDSAassessment');
    }
    else if(course=="Computer Organization") 
    {
      navigate('/CreateCOassessment');
    }
    else if(course=="Operating Systems") 
    {
      navigate('/CreateOSassessment');
    }
    else if(course=="Artificial Intelligence") 
    {
      navigate('/CreateAIassessment');
    }
    else{
      navigate('/CreateMLassessment');
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
              <button id='miniButton' className="delete-button createAssessmentButton" onClick={() => handleCreateExam(course)}>CREATE ASSESSMENT</button>
            </div>
          </div>
        ))}
        </div>   
      </div>
    </div>
  );
}

export default CreateAssessment;
