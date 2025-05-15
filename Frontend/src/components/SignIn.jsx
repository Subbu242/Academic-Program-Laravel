import React, { useState,useRef } from 'react';
import axios from 'axios';
import { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function SignIn() {
  const navigate=useNavigate()
  const form = useRef();
  const [formData, setFormData] = useState({
    username: '',
    role: 'role1',
    email: '',
    password: '',
    registerStatus: ''
  });
  const [registerStatus, setregisterStatus] = useState('');
  const [phoneNo, setphoneNo] = useState('');  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhone = (e) => {
    console.log('Entering handlePhone: ',e);
     var phone ='+'+ e;
    // setphoneNo(e);
    if (/^\+[1-9]{1}[0-9]{10,14}$/.test(phone)) {  
      return '';
    } else {
      return 'Enter valid Phone Number!'
    }
};

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password should be at least 8 characters long.';
    }
    if (!/[!@#\$%^&*]/.test(password)) {
      return 'Password should contain at least one special character (!@#$%^&*).';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password should contain at least one uppercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password should contain at least one digit (0-9).';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email=formData.email;
    const username=formData.username;
    const password=formData.password;
    const role=formData.role;

    if (formData.username && formData.email) {
      const passwordValidationMessage = validatePassword(formData.password);
      const phoneValidationMessage = handlePhone(phoneNo);
      if (passwordValidationMessage) 
      {
        window.alert('Please fix the password issue:\n' + passwordValidationMessage);
      } 
      if (phoneValidationMessage) 
      {
        window.alert('Please fix the Phone number issue:\n' + passwordValidationMessage);
      }
      else 
      {
        // Perform your registration logic here, for example, sending a request to a server.
        // axios.post('user.php',{email,username,password,role})
        axios.post('user/signup',{email,username,password,role})
        .then((res)=>{
          console.log("RES: ",res)
          if(res.data.message=='User with this email already exists'){
            alert('User with this email already exists');
            setFormData({
              username: '',
              email: '',
              password: '',
              role: '',
            });
            setregisterStatus(res.data.message);
          }
          else{
            setregisterStatus("ACCOUNT CREATED SUCCESSFULLY");
            emailjs.sendForm('service_ln8yy06', 'template_xeq59o8', form.current, 'Td16zd_wAlASkROEj')
            .then((result) => {
                console.log(result.text);
                alert('Thank you for registering. We have sent you a confirmation email!');
                navigate('/login')
            }, (error) => {
                console.log(error.text);
            });
            // alert("ACCOUNT CREATED SUCCESSFULLY")
          }
        })

        // window.alert('Registration successful!');
      }
    } else {
      window.alert('Please fill in all required fields.');
    }
  };

  return (
    <div>
      <br></br><br></br>
    <div className="container2">
      <br />
      <br />
      <center>
        <h2>Sign In</h2>
      </center>
      <br />
      <center>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <br /><br/>
          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <select
              id="role"
              name="role"
              // value={formData.role}
              onChange={handleChange}
            >
              <option value="default" selected disabled>Select a Role</option>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
              <option value="admin">Administrator</option>
              <option value="Program Coordinator">Program Coordinator</option>
              <option value="Quality Assurance Office">Quality Assurance Office</option>
            </select>
          </div>
          <br />
          <label htmlFor="email">Phone Number:</label>
          <label htmlFor="phoneNo" id="name" className="col-form-label"></label>
          <PhoneInput type="text" country={'us'} name="phoneNo" value={phoneNo} id="phoneNo" className="phoneNo"  onChange={(e) => setphoneNo(e)} placeholder="Please enter you phone number."/>
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Register</button>
        </form>
      </center>
    </div>

    <form ref={form} style={{display:"none"}}>
      <label>Name</label>
      <input type="text" name="to_name" value={formData.username}/>
      <input type="email" name="recipient" value={formData.email}/>
      <input type="text" name="role" value={formData.role}/>
      <input type="text" name="username" value={formData.username}/>
      <input type="text" name="password" value={formData.password}/>
    </form>
    </div>
  );
}

export default SignIn;
