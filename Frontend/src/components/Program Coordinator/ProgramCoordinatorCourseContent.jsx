import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProgramCoordinatorCourseContent() {
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [coursesContent, setCoursesContent] = useState([]);
  const [nocourses, setnoCourses] = useState(false);

  
  useEffect(()=>{
    const username=window.userName
    const role="Instructor"
    const newList=[]
    // axios.post('http://localhost:3001/allStudents',{username,role})
    // axios.post('allStudents.php',{username,role})
    axios.post('user/allStudents',{username,role})
    .then((res)=>{
      if(res.data.message){
        setInstructors(["No Instructors Found"])
      }
      else{
        // console.log("Result: ",res.data)
        res.data.map((username,index)=>(
          // axios.post('http://localhost:3001/instructorCourseContent',{username})
          // axios.post('instructorCourseContent.php',{username})
          axios.post('instructorCourseContent',{username})
            .then((res1)=>{
            if(res1.data.message){
              setCourses(["No Courses Registered"])
              setnoCourses(true)
            }
            else{
              // console.log("Result: ",res1.data)
              res1.data.map((r)=>(newList.push(username+'&&&'+r)))
            }
            if(index==res.data.length-1)
            {
              console.log('NEWLIST: ',newList)
              setCourses(newList)
              setnoCourses(false)
            }
          })
        ))
        setInstructors(res.data)
      }
    })
},[])

//   useEffect(()=>{
//     const username=window.userName
//     // console.log(username)
//     axios.post('http://localhost:3001/instructorCourseContent',{username})
//     .then((res)=>{
//       if(res.data.message){
//         setCourses(["No Courses Registered"])
//         setnoCourses(true)
//       }
//       else{
//         console.log("Result: ",res.data)
//         setCourses(res.data)
//         setnoCourses(false)
//       }
//     })
// },[])

  const handleUpdate=() =>{ 
    console.log("COURSES: ",courses)  
    let courseContent=document.getElementById("courseHeading").value;
    let courseName=document.getElementById("courseCode").value;
    if(courseContent && courseName)
    {
      // const newList = courses.concat(courseContent);
      // setCourses(newList);
      // // console.log(newList)
      let name=''
      let newList=[]
      let value=''
      for(let i=0;i<courses.length;i++)
      {
        name=courses[i].split('&&&')[1]
        if(name==courseName)
        {
          value=courseName+"&&&"+courseContent
        }
        else{
          newList.push(courses[i])
        }
      }
      newList.push(value)
      document.getElementById("courseHeading").value=''
      document.getElementById("courseCode").value=''

      const username=window.userName
      // axios.post('http://localhost:3001/updateCourseContent',{username,courseContent,courseName})
      // axios.post('updateCourseContent.php',{username,courseContent,courseName})
      axios.post('updateCourseContent',{username,courseContent,courseName})
        .then((res)=>{
            if(res.data.message){
            console.log("second Result1: ",res.data)
            alert(res.data.message)
            }
            else{
            console.log("second Result2: ",res.data)
            alert("Successfully Updated Course Content")
            setCourses(newList)
            }
        })
    } 
    else{
      alert("Please enter all the fields")
    }
  }
  
  // const handleDelete = (course) => {
  //   const newList = courses.filter((item) => item !== course);
  //   console.log("NEWLIST: ",newList,course)
  //   setCourses(newList);
    
  //   axios.post('http://localhost:3001/deleteCourse',{course})
  //   .then((res)=>{
  //     if(res.data.message){
  //       console.log("Result: ",res)
  //     }
  //     else{
  //       console.log("Result: ",res.data)
  //       alert("Course Deleted");
  //     }
  //   })
  // };

  return (
    <div>
     <br></br> <br></br>
      <div className="container">
      <center><h2>COURSE CONTENT</h2></center> <br/><br/>
      <div id='inputBlock'>
      <button id='miniButton' className="create-button" onClick={() => handleUpdate()}>UPDATE COURSE CONTENT</button>
      <input type='text' id="courseHeading" placeholder='Enter Course Content'></input>
      <input type='text' id="courseCode" placeholder='Enter Course Name'></input>
      </div> <br/><br/>
        <div className="courses-section">
        {courses && courses.map((course,index) => (
          <div className="course courseContent">
            <div id="courseInfo">
              <h2>{course.split('&&&')[0]}:-</h2>
              <h3>{course.split('&&&')[1]}</h3>
              <h3>{course.split('&&&')[2]}</h3>
              {/* <button id='miniButton' className="delete-button" onClick={() => handleDelete(course)}>DELETE COURSE CONTENT</button> */}
            </div>
          </div>
        ))}
        </div>   
      </div>
    </div>
  );
}

export default ProgramCoordinatorCourseContent;
