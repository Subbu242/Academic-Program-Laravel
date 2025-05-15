import React from "react";
// import './index.css';
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

function AdminBAProgram() {
    const [programs, setPrograms] = useState([{}]);
    const PID=2;

    useEffect(()=>{
      const username=window.userName
      // console.log(username)
      // axios.post('http://localhost:3001/getProgramObjectives',{username,PID})
      // axios.post('getProgramObjectives.php',{username,PID})
      axios.post('programObjectives/getProgramObjectives',{username,PID})
      .then((res)=>{
        if(res.data.message){
            setPrograms(["No ProgramObjectives present"])
        }
        else{
          console.log("Result: ",res.data);
          setPrograms(res.data)
        }
      })
  },[])

  
const handleCreate=() =>{ 
    console.log("COURSES: ",programs)  
    let Objective=document.getElementById("ProgramObjective").value;
    if(Objective)
    {
      const newList = programs.concat({PID,Objective});
      console.log(newList)
      setPrograms(newList);
      document.getElementById("ProgramObjective").value=''

      const username=window.userName
      // axios.post('http://localhost:3001/addProgramObjective',{username,PID,Objective})
      // axios.post('addProgramObjective.php',{username,PID,Objective})
      axios.post('programObjectives/addProgramObjective',{username,PID,Objective})
        .then((res)=>{
            if(res.data.message){
            console.log("second Result1: ",res.data)
            }
            else{
            console.log("second Result2: ",res.data)
            alert("Successfully created Program Objective")
            }
        })
    } 
    else{
      alert("Please enter all the fields")
    }
  }

  const handleDelete = (program) => {
    const newList = programs.filter((item) => item !== program);
    console.log("NEWLIST: ",newList,program.Objective)
    let Objective=program.Objective
    setPrograms(newList);
    
    // axios.post('http://localhost:3001/deleteProgramObjective',{Objective})
    // axios.post('deleteProgramObjective.php',{Objective})
    axios.post('programObjectives/deleteProgramObjective',{Objective})
    .then((res)=>{
      if(res.data.message){
        console.log("Result: ",res)
      }
      else{
        console.log("Result: ",res.data)
        alert("Program Objective Deleted");
      }
    })
  };
    return (
        <div className='' >
            <h1 id="heading">BUSINESS ADMINISTRATION</h1>
            <h2 id="miniHeading">ABOUT THE PROGRAM:-</h2>
            <p style={{fontSize:"20px"}}>The 36-credit hour MBA program prepares leaders with or without prior business education or experience for careers within all types of organizations by offering a comprehensive, advanced understanding of business principles.</p>
            <table id="Table">
                <thead>
                    <th id="TableHead">SI No.</th>
                    <th id="TableHead">Courses</th>
                </thead>
                <tbody>
                    <tr>
                        <td id="TableData">1</td>
                        <td id="TableData">FINANCIAL MANAGEMENT.</td>                   
                    </tr>
                    <tr>
                        <td id="TableData">2</td>
                        <td id="TableData">DECISIONS AND STRATEGY.</td>                    
                    </tr>
                    <tr>
                        <td id="TableData">3</td>
                        <td id="TableData">OPERATIONS MANAGEMENT.</td>                        
                    </tr>
                    <tr>
                        <td id="TableData">4</td>
                        <td id="TableData">MARKETING.</td>                        
                    </tr>
                </tbody>
            </table>
            <table id="Table2">
                <thead>
                    <th id="TableHead">SI No.</th>
                    <th id="TableHead2">Program Objectives</th>
                </thead>
                <tbody>
                {programs.map((program,i) => (
                    <tr>
                        <td id="TableData">{i+1}</td>
                        <td id="TableData2">{program.Objective}</td>      
                        <td id="TableData"><Button variant="outlined" startIcon={<DeleteIcon/>}  onClick={() => handleDelete(program)} /></td>             
                    </tr>
            ))}
                </tbody>
            </table>
            <input type='text' id="ProgramObjective" placeholder='Enter Program Objective'></input>
   <button id='miniButton' className="ProgramObjectiveButton" onClick={() => handleCreate()}>CREATE</button>
        </div>
    );


}

export default AdminBAProgram;
