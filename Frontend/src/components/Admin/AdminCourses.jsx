import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminCourses() {
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
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
        setCourses(res.data)
        setnoCourses(false)
      }
    })
},[])

  const handleCreate=() =>{ 
    console.log("COURSES: ",courses)  
    let courseName=document.getElementById("courseHeading").value;
    let courseCode=document.getElementById("courseCode").value;
    if(courseName && courseCode)
    {
      const newList = courses.concat(courseName);
      setCourses(newList);
      document.getElementById("courseHeading").value=''
      document.getElementById("courseCode").value=''

      const username=window.userName
      // axios.post('http://localhost:3001/addCourse',{username,courseName,courseCode})
      // axios.post('addCourse.php',{username,courseName,courseCode})
      axios.post('addCourse',{username,courseName,courseCode})
        .then((res)=>{
            if(res.data.message){
            console.log("second Result1: ",res.data)
            }
            else{
            console.log("second Result2: ",res.data)
            }
        })
    } 
    else{
      alert("Please enter all the fields")
    }
  }
  
  const handleDelete = (course) => {
    const newList = courses.filter((item) => item !== course);
    console.log("NEWLIST: ",newList,course)
    setCourses(newList);
    
    // axios.post('http://localhost:3001/deleteCourse',{course})
    // axios.post('deleteCourse.php',{course})
    axios.post('deleteCourse',{course})
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

  return (
    <div>
     <br></br> <br></br>
      <div className="container">
      <center><h2>COURSES</h2></center> 
      <br/><br/>
      <div id='inputBlock'>
  <button id='miniButton' className="create-button" onClick={() => handleCreate()}>CREATE COURSE</button>
            <input type='text' id="courseHeading" placeholder='Enter Course Name'></input>
            <input type='text' id="courseCode" placeholder='Enter Course Code'></input>
            </div> <br/><br/>
        <div className="courses-section">
        {courses.map((course,index) => (
          <div className="course">
            <div id="courseInfo">
              <h2 id='courseHead'>{course}</h2>
              <button id='miniButton' className="delete-button deleteButton" onClick={() => handleDelete(course)}>DELETE COURSE</button>
            </div>
          </div>
        ))}
        </div>   
      </div>
    </div>
  );
}

export default AdminCourses;
