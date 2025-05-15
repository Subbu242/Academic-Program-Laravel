import React, { useState } from "react";
import './index.css';
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function Results() {
  
  // axios.defaults.baseURL = 'http://localhost:8000/api/';
    const [scores, setScores] = useState([])
    const [courses, setCourses] = useState([]);
    const [nocourses, setnoCourses] = useState(false);
  
    useEffect(()=>{
      const username=window.userName
      console.log(username)
      // axios.post('http://localhost:3001/studentCourse',{username})
      // axios.post('studentCourse.php',{username})
      axios.post('studentCourse',{username})
      .then((res)=>{
        if(res.data.message){
          console.log("Result: ",res.data)
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

    useEffect(()=>{
      const username=window.userName
      // console.log(username)
      // axios.post('http://localhost:3001/getScores',{username})
      // axios.post('getScores.php',{username})
      axios.post('getScores',{username})
      .then((res)=>{
        if(res.data.message){
          setScores(["No Scores found"])
        }
        else{
          console.log("MAINResult: ",res.data)
          setScores(res.data)
        }
        console.log(courses)
      })
    },[])

   
    return (
        <div className=''>
            <center><h1 id="heading">Overall Results</h1>
            <br></br>
            <div className="results-container">
                {courses.map((course,score) => (
                    <h2>{course}:-  {scores[score]}</h2>
                ))}  
            <div className="barChart" style={{ width: "650px" }}> 
            <Bar 
              data={{ 
                // Name of the variables on x-axies for each bar 
                labels: courses, 
                datasets: [ 
                  { 
                    // Label for bars 
                    label: "Total Score", 
                    // Data or value of your each variable 
                    data: scores, 
                    // Color of each bar 
                    backgroundColor: ["aqua", "green", "red", "yellow"], 
                    // Border color of each bar 
                    borderColor: ["aqua", "green", "red", "yellow"], 
                    borderWidth: 0.5, 
                  }, 
                ], 
              }} 
              // Height of graph 
              height={400} 
              options={{ 
                maintainAspectRatio: false, 
                scales: { 
                  yAxes: { 
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
            </center>
        </div>
    );


}

export default Results;
