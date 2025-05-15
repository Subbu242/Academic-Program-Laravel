import React from "react";
import '../Student/index.css';
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

function ProgramCoordinatorOverview() {
    const [programs, setPrograms] = useState([{}]);
    const [programObjectives, setProgramObjectives] = useState([{}]);

    useEffect(()=>{
        const username=window.userName
        // console.log(username)
        // axios.post('http://localhost:3001/getCoordinatorProgram',{username})
        // axios.post('getCoordinatorProgram.php',{username})
        axios.post('programs/getCoordinatorProgram',{username})
        .then((res)=>{
          if(res.data.message){
            console.log("Result1: ",res.data);
              setPrograms(["No Program present"])
          }
          else{
            console.log("Result1: ",res.data);
            setPrograms(res.data)
          }
        })
    },[])

    useEffect(()=>{
      const username=window.userName
      // console.log(username)
      // axios.post('http://localhost:3001/getCoordinatorProgramObjectives',{username})
      // axios.post('getCoordinatorProgramObjectives.php',{username})
      axios.post('programObjectives/getCoordinatorProgramObjectives',{username})
      .then((res)=>{
        if(res.data.message){
          console.log("Result2: ",res.data);
            setProgramObjectives(["No ProgramObjectives present"])
        }
        else{
          console.log("Result2: ",res.data);
          setProgramObjectives(res.data)
        }
      })
  },[])

  
const handleCreate=() =>{ 
    // console.log("COURSES: ",programObjectives)  
    let Objective=document.getElementById("ProgramObjective").value;
    if(Objective)
    {
      const PID=programs[0].Pid
      const newList = programObjectives.concat({PID,Objective});
    //   console.log(newList)
      setProgramObjectives(newList);
      document.getElementById("ProgramObjective").value=''

      const username=window.userName
      // axios.post('http://localhost:3001/addProgramObjective',{username,PID,Objective})
      // axios.post('addProgramObjective.php',{username,PID,Objective})
      axios.post('programObjectives/addProgramObjective',{username,PID,Objective})
        .then((res)=>{
            if(res.data.message){
            // console.log("second Result1: ",res.data)
            }
            else{
            // console.log("second Result2: ",res.data)
            alert("Successfully created Program Objective")
            }
        })
    } 
    else{
      alert("Please enter all the fields")
    }
  }

  const handleDelete = (program) => {
    const newList = programObjectives.filter((item) => item !== program);
    // console.log("NEWLIST: ",newList,program.Objective)
    let Objective=program.Objective
    setProgramObjectives(newList);
    
    // axios.post('http://localhost:3001/deleteProgramObjective',{Objective})
    // axios.post('deleteProgramObjective.php',{Objective})
    axios.post('programObjectives/deleteProgramObjective',{Objective})
    .then((res)=>{
      if(res.data.message){
        // console.log("Result: ",res)
      }
      else{
        // console.log("Result: ",res.data)
        alert("Program Objective Deleted");
      }
    })
  };
    return (
      //Materials
        <div className='' >
          <center>
        <h1 id="heading" style={{display:"block !important"}}>{programs[0].College+" : "}</h1>
            <h1 id="heading">{programs[0].ProgramName+"("+programs[0].ProgramCode+")"}</h1>
            <input type='text' id="ProgramObjective" placeholder='Enter Program Objective'></input>
   <button id='miniButton' className="ProgramObjectiveButton" onClick={() => handleCreate()}>CREATE</button>
   
            <table id="Table2">
                <thead>
                    <th id="TableHead">SI No.</th>
                    <th id="TableHead2">Program Objectives</th>
                </thead>
                <tbody>
                {programObjectives.map((program,i) => (
                    <tr>
                        <td id="TableData">{i+1}</td>
                        <td id="TableData2">{program.Objective}</td>      
                        <td id="TableData"><Button variant="outlined" startIcon={<DeleteIcon/>}  onClick={() => handleDelete(program)} /></td>             
                    </tr>
            ))}
                </tbody>
            </table>
            </center>
        </div>
    );


}

export default ProgramCoordinatorOverview;