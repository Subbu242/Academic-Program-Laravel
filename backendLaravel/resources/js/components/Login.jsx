import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';

function Login() {
  const navigate = useNavigate();
  // State variables for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loginStatus, setloginStatus] = useState('');
  
  
  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // You can add your login logic here.
    // For this example, we'll check if the username and password are empty.
    if (!username || !password) {
      alert('Please fill in both fields.');
    } else {
      // You can add further logic here to validate the credentials or make an API request.
      // For simplicity, we're just displaying a success alert.
      axios.post('user/login',{username,password,role})
      .then((res)=>{
        if(res.data.message){
          console.log("LOGIN: ",res.data)
          alert(res.data.message)
          setloginStatus(res.data);
        }
        else{ 
          // localStorage.setItem("token","true")  
          console.log("LOGIN:",res.data)
          window.userName=username
          if(res.data.role==='admin')  
          {
            localStorage.setItem('adminToken',"true")
            navigate('/AdministratorDashboard');
          }
          else if(res.data.role==='Student')  
          {
            localStorage.setItem('studentToken',"true")
            navigate('/StudentDashboard');
          }
          else if(res.data.role==='Instructor')  
          {
            localStorage.setItem('instructorToken',"true")
            navigate('/InstructorDashboard');
          }
          else if(res.data.role==='Program Coordinator')  
          {
            localStorage.setItem('pcToken',"true")
            navigate('/ProgramCoordinatorDashboard');
          }
          else{
            localStorage.setItem('qaoToken',"true")
            navigate('/QualityAssuranceOfficerDashboard');
          }
          setloginStatus("LOGIN SUCCESSFUL");
        }
      })
    }
  };

  return (
<div>
  <br></br>
    {/* Buttons with links to different dashboards */}
    {/* <center><div>
    <button>
      <Link to="/StudentDashboard">Student Dashboard</Link>
    </button>
    <button>
      <Link to="/AdministratorDashboard">Admin Dashboard</Link>
    </button>
    <button>
      <Link to="/ProgramCoordinatorDashboard">Coordinator Dashboard</Link>
    </button>
    <button>
      <Link to="/InstructorDashboard">Instructor Dashboard</Link>
    </button>
    <button>
      <Link to="/QualityAssuranceOfficerDashboard">QA Officer Dashboard</Link>
    </button>
  </div></center> */}
  <br></br>
    <div className="container2">
      <br />
      <br />
      <center>
        <h2>Login</h2>
      </center>
      <br />
      <center>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          {/* <label for="role">Select a Role</label>
          <select name="role" id="role" onChange={(e) => setRole(e.target.value)}>
            <option value="default" selected disabled>Select a Role</option>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="admin">Administrator</option>
            <option value="Program Coordinator">Program Coordinator</option>
            <option value="Quality Assurance Officer">Quality Assurance Officer</option>
          </select> */}

          <br/>
          <button type="submit">Login</button>
        </form>
      </center>
      <br />
      <div>
        <p>
          {/* Link to the "Forgot Password" page */}
          <Link to="/ForgotPassword">Forgot password?</Link>
        </p>
      </div>
      <div>
        <p>
          {/* Link to the "Sign Up" page */}
          Don't have an account. <Link to="/SignIn">Sign Up</Link>
        </p>
      </div>

      </div>
          {/* <div style={{display:"none"}}> <StudentDashboard username={username}></StudentDashboard></div>  */}
    </div>
  );
}

export default Login;
