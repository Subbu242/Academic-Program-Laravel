import React, { useEffect } from "react";
// import './index.css';
import { NavLink,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function AdminAnalytics() {
  const navigate=useNavigate();

const [scores, setScores] = useState([])
const [finalScores, setFinalScores] = useState([])
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
      // console.log("Result: ",res.data)
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
  // axios.post('http://localhost:3001/getAllCourseScores',{username})
  // axios.post('getAllCourseScores.php',{username})
  axios.post('getAllCourseScores',{username})
  .then((res)=>{
    if(res.data.message){
      setScores(["No Scores found"])
    }
    else{
      console.log("MAINResult: ",res.data)
      let Cid=''
      let included=false
      let newList=[]
      let count=1;
      for(let i=0;i<res.data.length;i++)
      {
        included=false
        Cid=res.data[i].split('&&&')[0]
        for(let j=0;j<res.data.length;j++)
        {
          count=1
          if(res.data[j].split('&&&')[0]===Cid && i!=j)
          {
            count++;
            newList.push((parseInt(res.data[i].split('&&&')[1])+parseInt(res.data[j].split('&&&')[1]))/count)
            res.data.splice(j,1)
            included=true
          }
        }
        if(!included)
        {
          newList.push(parseInt(res.data[i].split('&&&')[1])/count)
        }
      }
      console.log("RES: ",res.data)
      console.log("NEWLIST: ",newList)
      setScores(newList)
    }
  })
},[])

  return (
    <div className='Materials1'>
        <center><h1 id="heading">REPORT AND ANALYTICS</h1></center>
        <br></br>
        <div className="results-container" id="results" style={{overflowY:"scroll",height:"500px",width:"800px"}}>
            {courses.map((course,score) => (
                <h2>{course}:-  {scores[score] || "NA"}</h2>
            ))}  
        </div>
        <div className="barChart" style={{ width: "650px" }}> 
        <Bar 
          data={{ 
            // Name of the variables on x-axies for each bar 
            labels: courses, 
            datasets: [ 
              { 
                // Label for bars 
                label: "Average Score", 
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
);



}

export default AdminAnalytics;
