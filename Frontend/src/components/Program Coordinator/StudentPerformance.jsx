import React, { useState } from "react";
import '../Student/index.css';
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function StudentPerformance() {
  
    const [scores, setScores] = useState([])
    const [courses, setCourses] = useState([]);
    const [nocourses, setnoCourses] = useState(false);
    const [students, setStudents] = useState([]);
    const [courseNames, setcourseNames] = useState([]);

    
    useEffect(()=>{
      const username=window.userName
      const role="Student"
      // axios.post('http://localhost:3001/allStudents',{role})
      // axios.post('allStudents.php',{role})
      axios.post('user/allStudents',{role})
      .then((res)=>{
        if(res.data.message){
          console.log("Result: ",res.data)
          setStudents(["No Students Found"])
        }
        else{
          // console.log("Result: ",res.data)
          setStudents(res.data)
          let newScores=[]
          let newCourses=[]
          const role="Instructor"
          // axios.post('http://localhost:3001/allStudents',{role})
          // axios.post('allStudents.php',{role})
          axios.post('user/allStudents',{role})
          .then((res1)=>{
            if(res1.data.message){
              setStudents(["No Instructors Found"])
            }
            else{ 
              res.data.map((username,i)=>(
                res1.data.map((instructor)=>(
                  // axios.post('http://localhost:3001/course',{username,instructor})
                  // axios.post('course.php',{username,instructor})
                  axios.post('course',{username,instructor})
                  .then((res2)=>{
                    if(res2.data.message){
                      // console.log("Result1: ",res2.data)
                      setCourses(["No Courses Registered"])
                      setnoCourses(true)
                    }
                    else{
                      // console.log("Result1: ",res2.data)
                      res2.data.map((r)=>newCourses.push(username+"&&&"+r))
                    }
                    if(i==res.data.length-1)
                    {
                      // console.log("New Course: ",newCourses)
                      setcourseNames(newCourses.map((course)=>course.split('&&&')[1]))
                      setCourses(newCourses)
                      setnoCourses(false)
                    }
                  })
                ))
              ))
            }
          })
          res.data.map((username)=>(
            // axios.post('http://localhost:3001/getScores',{username})
            // axios.post('getScores.php',{username})
            axios.post('getScores',{username})
            .then((res)=>{
              if(res.data.message){
                // console.log("MAINResult: ",res.data)
                setScores(["No Scores found"])
              }
              else{
                // console.log("MAINResult: ",res.data)
                res.data.map((r)=>newScores.push(username+"&&&"+r))
                
              }
            })
          ))
          setScores(newScores) 
        }
      })
    },[])
  
    // useEffect(()=>{
    //   const username=localStorage.getItem('student')
    //   const instructor=localStorage.getItem('instructor')
    //   console.log(username)
    //   if(username)
    //   {
    //     axios.post('http://localhost:3001/course',{username,instructor})
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
    //   }
    // },[])

    // useEffect(()=>{
    //   const username=localStorage.getItem('student')
    //   // console.log(username)
    //   axios.post('http://localhost:3001/getScores',{username})
    //   .then((res)=>{
    //     if(res.data.message){
    //       setScores(["No Scores found"])
    //     }
    //     else{
    //       console.log("MAINResult: ",res.data)
    //       setScores(res.data)
    //     }
    //     console.log(courses)
    //   })
    // },[])

   
    return (
        <div className=''>
            <center><h1 id="heading">Performance Data</h1>
            <br></br>
            {students.map((student)=>(         
              <div className="results-container">
                  <h1><u>{student}</u></h1><br/>
                  {courses && courses.map((course,score) => (
               <h2>{course.split('&&&')[0]==student &&  course.split('&&&')[1]+":-"} {course.split('&&&')[0]==student && scores[score] && scores[score].split('&&&')[1]}</h2> 
                  ))}   
            <div className="barChart" style={{ width: "650px" }}> 
            <Bar 
              data={{ 
                // Name of the variables on x-axies for each bar 
                labels: courses.map((course)=>((course.split('&&&')[0]==student && course.split('&&&')[1])||(''))), 
                datasets: [ 
                  { 
                    // Label for bars 
                    label: "Total Score", 
                    // Data or value of your each variable 
                    data: scores.map((score,i)=>(score.split('&&&')[0]==student && score.split('&&&')[1])), 
                    // Color of each bar 
                    backgroundColor: ["aqua", "green", "red", "yellow"], 
                    // Border color of each bar 
                    borderColor: ["aqua", "green", "red", "yellow"], 
                    borderWidth: 0.5, 
                  }, 
                ], 
              }} 
              // Height of graph 
              height={350} 
              options={{ 
                maintainAspectRatio: false, 
                scales: { 
                  yAxes: 
                    { 
                      ticks: { 
                        // The y-axis value will start from zero 
                        beginAtZero: true, 
                      }, 
                    }, 
                }, 
                legend: { 
                  labels: { 
                    fontSize: 15, 
                  }, 
                }, 
              }} 
            /> 
          </div> 
              </div>
             ))} 
             </center>
        </div>
    );
}

export default StudentPerformance;
