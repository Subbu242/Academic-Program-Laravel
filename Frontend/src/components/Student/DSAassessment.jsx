import React, { useState } from "react";
import './index.css';
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function DSAassessment() {
  const CID=1;
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
        topic: 'DSA',
        level: 'Beginner',
        totalQuestions: 4,
        perQuestionScore: 5,
        questions: [
          {
            // question: 'Minimum number of fields in each node of a doubly linked list is?',
            question: ques.question1,
            // choices: ['2', '3', '4', 'None of the above'],
            choices: ques.choices1,
            type: 'MCQs',
            // correctAnswer: '3',
            correctAnswer: ques.answer1,
          },
          {
            // question: 'A graph in which all vertices have equal degree is known as?',
            question: ques.question2,
            // choices: ['Complete graph', 'Regular graph', 'Multi graph', 'Simple graph'],
            choices: ques.choices2,
            type: 'MCQs',
            // correctAnswer: 'Complete graph',
            correctAnswer: ques.answer2,
          },
          {
            // question:'To perform level-order traversal on a binary tree, which of the following data structure will be required?',
            question: ques.question3,
            // choices: ['Hash table', 'Queue', 'Binary search tree', 'Stack'],
            choices: ques.choices3,
            type: 'MCQs',
            // correctAnswer: 'Queue',
            correctAnswer: ques.answer3,
          },
          {
            // question: 'The number of edges in a complete graph of n vertices is?',
            question: ques.question4,
            // choices: ['n(n+1)/2','n(n-1)/2','n^2/2','n'],
            choices: ques.choices4,
            type: 'MCQs',
            // correctAnswer: 'n(n-1)/2',
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
                score: prev.score + 25,
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
            <h1 id="heading">DSA ASSESSMENT</h1>
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

export default DSAassessment;
