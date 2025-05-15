import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style.css'

function InstructorGrades() {
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
  const [nocourses, setnoCourses] = useState(false);
  const [students, setStudents] = useState([]);
  // const [labels, setLabels] = useState(["A","B","C","D","E","F"]);
  const labels=[{0:"A"},{1:"B"},{2:"C"},{3:"D"},{4:"E"},{5:"F"}]

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
  // axios.post('http://localhost:3001/getStudent',{username})
  // axios.post('getStudent.php',{username})
  axios.post('user/getStudent',{username})
  .then((res)=>{
    console.log("Result: ",res.data)
    if(res.data.message){
      setStudents(["No Students Registered"])
    }
    else{
      setStudents(res.data)
    }
  })
},[])
  
  const handleGrade = (student,Cid) => {
    let grade=document.getElementById(student+Cid).value
    let feedback=document.getElementById(student+Cid+"feedback").value
    console.log("NEWLIST: ",student,Cid,grade)
    if(grade && feedback)
    {
      // axios.post('http://localhost:3001/updateGrades',{student,Cid,grade,feedback})
      // axios.post('updateGrades.php',{student,Cid,grade,feedback})
      axios.post('updateGrades',{student,Cid,grade,feedback})
      .then((res)=>{
        if(res.data.message=="Error"){
          console.log("Result: ",res)
        }
        else{
          console.log("Result: ",res.data)
          document.getElementById(student+Cid).value=''
          document.getElementById(student+Cid+"feedback").value=''
          alert("Grades Updated");
        }
      })
    }
    else
    {
      if(!grade && !feedback)
      {
        alert("Please Enter Grade and Feedback for student "+student)
      }
      else if(!grade)
      {
        alert('Please enter the grade for student '+student)
      }
      else
      {
        alert('Please enter the feedback for student '+student)
      }
    }
  };

  return (
    <div>
     <br></br> <br></br>
      <div className="container">
      <center><h2>GRADES</h2></center> 
        <div className="courses-section">
        {courses.map((course,index) => (
          <div className="course instructorGradesContainer">
            <div id="courseInfo">
              <h2>{course}:-</h2>
              {students.map((student) => (
                <div>
                  <h2>{student.Cid==index+1 && student.username+":"} {student.Cid==index+1 && student.Score}
                  {/* {labels.map((label,i) => (  
                    <span style={{marginLeft:"60px"}}>         
                      <span for="A" >{student.Cid==index+1 && label[i]}</span>   
                      {student.Cid==index+1 && <input type="radio" id={student.username} value={label[i]} name="A"/> }
                      </span> 
                  ))} */}
                  </h2>
{student.Cid==index+1 && <input type="text" style={{width:"100px"}} className='gradesInput' id={student.username+student.Cid} placeholder='Enter Grades'/> }
{student.Cid==index+1 && <input type="text" style={{width:"500px"}} className='gradesInput' id={student.username+student.Cid+"feedback"} placeholder='Enter Feedback'/> }
{student.Cid==index+1 && <button id='miniButton' className="delete-button" onClick={() => handleGrade(student.username,student.Cid)}>GRADE</button>}
              </div>
              ))}
            </div>
          </div>
        ))}
        </div>   
      </div>
    </div>
  );
}

export default InstructorGrades;
