import React, { useState } from "react";
import './index.css';
import { NavLink } from "react-router-dom";
import axios from "axios";

function OSassessment() {
  const CID=3;
  const [ques,setQues]=useState([])

    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
    const [scores, setScores] = useState(0)

  useEffect(()=>{
    // axios.post('http://localhost:3001/getExam',{CID})
    // axios.post('getExam.php',{CID})
    axios.post('getExam',{CID})
    .then((res)=>{
      if (res.data.message || res.data.length === 0) {
        console.warn("No questions returned: ", res.data.message);
        setQues(null); // or keep it as empty
      }
      else{
        setQues(res.data[0])
      }
    })
},[])

if (!ques || Object.keys(ques).length === 0) {
  return (
    <div className='Materials'>
      <h1 id="heading">CO ASSESSMENT</h1>
      <br />
      <div className="quiz-container">
        <p>No exam questions available for this course.</p>
      </div>
    </div>
  );
}

    const quiz = {
        topic: 'OS',
        level: 'Beginner',
        totalQuestions: 4,
        perQuestionScore: 5,
        questions: [
          {
            // question: 'In Operating Systems, which of the following is/are CPU scheduling algorithms?',
            // choices: ['Priority', 'Round Robin','Shortest Job First', 'All of the above'],
            // type: 'MCQs',
            // correctAnswer: 'All of the above',            
            
            question: ques.question1,
            choices: ques.choices1,
            type: 'MCQs',
            correctAnswer: ques.answer1,
          },
          {
            // question: 'CPU scheduling is the basis of ___________',
            // choices: ['multiprogramming operating systems', 'larger memory sized systems', 'multiprocessor systems', 'None of the above'],
            // type: 'MCQs',
            // correctAnswer: 'multiprogramming operating systems',            
            
            question: ques.question2,
            choices: ques.choices2,
            type: 'MCQs',
            correctAnswer: ques.answer2,
          },
          {
            // question:'If a process fails, most operating system write the error information to a ______',
            // choices: ['new file','another running process','log file','None of the above'],
            // type: 'MCQs',
            // correctAnswer: 'log file',            
            
            question: ques.question3,
            choices: ques.choices3,
            type: 'MCQs',
            correctAnswer: ques.answer3,
          },
          {
            // question: 'Which one of the following is not a real time operating system?',
            // choices: ['RTLinux','Palm OS','QNX','VxWorks'],
            // type: 'MCQs',
            // correctAnswer: 'Palm OS',            
            
            question: ques.question4,
            choices: ques.choices4,
            type: 'MCQs',
            correctAnswer: ques.answer4,
          },
        ],
      }

    const { question, choices,correctAnswer } = quiz.questions[activeQuestion]

    const onClickNext = () => {
        setSelectedAnswerIndex(null)
        setResult((prev) =>
          selectedAnswer
            ? {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1,
              }
            : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
        )
        if (activeQuestion !== quiz.questions.length - 1) {
          setActiveQuestion((prev) => prev + 1)
        } else {
          setActiveQuestion(0)
          setShowResult(true)

          const username=window.userName
          // axios.post('http://localhost:3001/scores',{username,scores,CID})
          // axios.post('scores.php',{username,scores,CID})
          axios.post('scores',{username,scores,CID})
          .then((res)=>{
            console.log("RES: ",res)
            if(res.data.message){
              console.log(res.data.message)
            }
            else{
              alert("Score submitted successfully")
            }
          })
        }
      }

    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index)
        if (answer === correctAnswer) {
            setSelectedAnswer(true)
            setScores(scores+25)
        } else {
            setSelectedAnswer(false)
        }
    }

    return (
        <div className='Materials'>
            <h1 id="heading">OS ASSESSMENT</h1>
            <br></br>
            <div className="quiz-container">
            {!showResult ? (
                <div>
                    <div>
                        <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
                        <span className="total-question">/{addLeadingZero(quiz.questions.length)}</span>
                    </div>
                    <h2>{question}</h2>
                    <ul className="ul">
                        {choices && choices.split("&&&").map((answer, index) => (
                        <li id="li"
                            onClick={() => onAnswerSelected(answer, index)}
                            key={answer}
                            className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                            {answer}
                        </li>
                        ))}
                    </ul>
                    <div className="flex-right">
                        <button onClick={onClickNext} className="button" disabled={selectedAnswerIndex === null}>
                        {activeQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
                    ) : (
                <div className="result">
                    <h3>Result</h3>
                    <p>
                        Total Question: <span>{quiz.questions.length}</span>
                    </p>
                    <p>
                        Total Score:<span> {result.score}</span>
                    </p>
                    <p>
                        Correct Answers:<span> {result.correctAnswers}</span>
                    </p>
                    <p>
                        Wrong Answers:<span> {result.wrongAnswers}</span>
                    </p>
                </div>
            )}
            
            </div>
        </div>
    );


}

export default OSassessment;
