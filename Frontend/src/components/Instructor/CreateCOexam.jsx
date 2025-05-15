import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateCOexam() {
  const navigate = useNavigate();
  const CID=2;

  const handleSubmit=() =>{  

      const username=window.userName
      let question1=document.getElementById('question1-input').value
      let question2=document.getElementById('question2-input').value
      let question3=document.getElementById('question3-input').value
      let question4=document.getElementById('question4-input').value
      let answer1=document.getElementById('q1-answer').value
      let answer2=document.getElementById('q2-answer').value
      let answer3=document.getElementById('q3-answer').value
      let answer4=document.getElementById('q4-answer').value
      let options1=document.getElementById('q1-option1').value+"&&&"+document.getElementById('q1-option2').value+"&&&"+document.getElementById('q1-option3').value+"&&&"+document.getElementById('q1-option4').value
      let options2=document.getElementById('q2-option1').value+"&&&"+document.getElementById('q2-option2').value+"&&&"+document.getElementById('q2-option3').value+"&&&"+document.getElementById('q2-option4').value
      let options3=document.getElementById('q3-option1').value+"&&&"+document.getElementById('q3-option2').value+"&&&"+document.getElementById('q3-option3').value+"&&&"+document.getElementById('q3-option4').value
      let options4=document.getElementById('q4-option1').value+"&&&"+document.getElementById('q4-option2').value+"&&&"+document.getElementById('q4-option3').value+"&&&"+document.getElementById('q4-option4').value
  
      // axios.post('http://localhost:3001/createExam',{CID,username,question1,question2,question3,question4,options1,options2,options3,options4,answer1,answer2,answer3,answer4})
      // axios.post('createExam.php',{CID,username,question1,question2,question3,question4,options1,options2,options3,options4,answer1,answer2,answer3,answer4})
      axios.post('createExam',{CID,username,question1,question2,question3,question4,options1,options2,options3,options4,answer1,answer2,answer3,answer4})
        .then((res)=>{
            if(res.data.message=="Could not create exam"){
              alert(res.data.message)
            }
            else{
              console.log("second Result2: ",res.data)
              alert("Successfully created exam")
              document.getElementById('question1-input').value=''
              document.getElementById('question2-input').value=''
              document.getElementById('question3-input').value=''
              document.getElementById('question4-input').value=''
              document.getElementById('q1-answer').value=''
              document.getElementById('q2-answer').value=''
              document.getElementById('q3-answer').value=''
              document.getElementById('q4-answer').value=''
              document.getElementById('q1-option1').value=''
              document.getElementById('q1-option2').value=''
              document.getElementById('q1-option3').value=''
              document.getElementById('q1-option4').value=''
              document.getElementById('q2-option1').value=''
              document.getElementById('q2-option2').value=''
              document.getElementById('q2-option3').value=''
              document.getElementById('q2-option4').value=''
              document.getElementById('q3-option1').value=''
              document.getElementById('q3-option2').value=''
              document.getElementById('q3-option3').value=''
              document.getElementById('q3-option4').value=''
              document.getElementById('q4-option1').value=''
              document.getElementById('q4-option2').value=''
              document.getElementById('q4-option3').value=''
              document.getElementById('q4-option4').value=''
          
            }
        })
  };
  

  return (
    <div>
     <br></br> <br></br>
      <div className="container">
      <center><h2>CO EXAM</h2></center> 
        <div className="courses-section">
          <label for="question1-input"><h2>Question1:</h2></label>
          <input type="text" id="question1-input" placeholder="Type question 1..."/>
          <label>Options:</label>
          <input type="text" id="q1-option1" placeholder="Type option 1 for question 1..."/>
          <input type="text" id="q1-option2" placeholder="Type option 2 for question 1..."/>
          <input type="text" id="q1-option3" placeholder="Type option 3 for question 1..."/>
          <input type="text" id="q1-option4" placeholder="Type option 4 for question 1..."/>
          <label for="answer-input">Answer:</label>
          <input type="text" id="q1-answer" placeholder="Type answer for question 1..."/>
          <br></br>
          <label for="question2-input"><h2>Question2:</h2></label>
          <input type="text" id="question2-input" placeholder="Type question 2..."/>
          <label>Options:</label>
          <input type="text" id="q2-option1" placeholder="Type option 1 for question 2..."/>
          <input type="text" id="q2-option2" placeholder="Type option 2 for question 2..."/>
          <input type="text" id="q2-option3" placeholder="Type option 3 for question 2..."/>
          <input type="text" id="q2-option4" placeholder="Type option 4 for question 2..."/>
          <label for="answer-input">Answer:</label>
          <input type="text" id="q2-answer" placeholder="Type answer for question 2..."/>
          <br></br>
          <label for="question3-input"><h2>Question3:</h2></label>
          <input type="text" id="question3-input" placeholder="Type question 3..."/>
          <label>Options:</label>
          <input type="text" id="q3-option1" placeholder="Type option 1 for question 3..."/>
          <input type="text" id="q3-option2" placeholder="Type option 2 for question 3..."/>
          <input type="text" id="q3-option3" placeholder="Type option 3 for question 3..."/>
          <input type="text" id="q3-option4" placeholder="Type option 4 for question 3..."/>
          <label for="answer-input">Answer:</label>
          <input type="text" id="q3-answer" placeholder="Type answer for question 3..."/>
          <br></br>
          <label for="question4-input"><h2>Question4:</h2></label>
          <input type="text" id="question4-input" placeholder="Type question 4..."/>
          <label>Options:</label>
          <input type="text" id="q4-option1" placeholder="Type option 1 for question 4..."/>
          <input type="text" id="q4-option2" placeholder="Type option 2 for question 4..."/>
          <input type="text" id="q4-option3" placeholder="Type option 3 for question 4..."/>
          <input type="text" id="q4-option4" placeholder="Type option 4 for question 4..."/>
          <label for="answer-input">Answer:</label>
          <input type="text" id="q4-answer" placeholder="Type answer for question 4..."/>
          <button id='miniButton' className="submit-button" onClick={handleSubmit}>SUBMIT</button>
        </div>   
      </div>
    </div>
  );
}

export default CreateCOexam;
