import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function QAOfficerAssessments() {
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [nocourses, setnoCourses] = useState(false);

  useEffect(()=>{
    const username=window.userName
    // console.log(username)
    // axios.post('http://localhost:3001/allCourse',{username})
    // axios.post('allCourse.php',{username})
    axios.post('allCourse',{username})
    .then((res)=>{
      if(res.data.message){
        setCourses(["No Courses Registered"])
        setnoCourses(true)
      }
      else{
        console.log("Result: ",res.data)
        // setCourses(res.data)
        setnoCourses(false)
      }
    })
},[])

useEffect(()=>{
  const username=window.userName
  // console.log(username)
  let newCourses=[]
  let assessments=[]
  // axios.post('http://localhost:3001/allAssessments',{username})
  // axios.post('allAssessments.php',{username})
  axios.post('allAssessments',{username})
  .then((res)=>{
    if(res.data.message){
      setAssessments(["No Assessments created"])
    }
    else{
      console.log("Result: ",res.data)
      res.data.map((res,i)=>(res.courseName && newCourses.push(res) ))  //|| assessments.push(res)
      res.data.map((res,i)=>(!res.courseName && assessments.push(res)))
      setAssessments(assessments)
      setCourses(newCourses)
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
      <center><h2>ASSESSMENTS</h2></center> 
        <div className="courses-section">
        {courses.map((course,index) => (
          <div className="course">
            <div id="courseInfo">
              <h2>{course.courseName}</h2>
              <p>{assessments[index].description+": "}{assessments[index].totalPoints+" Points"}</p>
              {/* <button id='miniButton' className="delete-button" onClick={() => handleCreateExam(course)}>CREATE ASSESSMENT</button> */}
            </div>
          </div>
        ))}
        </div>   
      </div>
    </div>
  );
}

export default QAOfficerAssessments;
