import React, { useEffect, useState } from "react";
import './index.css';
import { NavLink } from "react-router-dom";
import axios from "axios";

function COassessment() {
  const CID=2;
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

  if (ques === null) {
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


    const quiz = ques && {
        topic: 'CO',
        level: 'Beginner',
        totalQuestions: 4,
        perQuestionScore: 5,
        questions: [
          {
            // question: 'Assembly language is?',
            // choices: ['uses alphabetic codes in place of binary numbers used in machine language', 'is the easiest language to write programs','need not be translated into machine language', 'None of the above'],
            // type: 'MCQs',
            // correctAnswer: 'uses alphabetic codes in place of binary numbers used in machine language',
            question: ques.question1,
            choices: ques.choices1,
            type: 'MCQs',
            correctAnswer: ques.answer1,
          },
          {
            // question: ' In computers, subtraction is generally carried out by?',
            // choices: ['9’s complement', '10’s complement', '1’s complement', '2’s complement'],
            // type: 'MCQs',
            // correctAnswer: '2’s complement',
            question: ques.question2,
            choices: ques.choices2,
            type: 'MCQs',
            correctAnswer: ques.answer2,
          },
          {
            // question:'What characteristic of RAM memory makes it not suitable for permanent storage?',
            // choices: ['too slow','unreliable','it is volatile',' too bulky'],
            // type: 'MCQs',
            // correctAnswer: 'it is volatile',
            
            question: ques.question3,
            choices: ques.choices3,
            type: 'MCQs',
            correctAnswer: ques.answer3,
          },
          {
            // question: 'The circuit used to store one bit of data is known as?',
            // choices: ['Register','Encoder','Decoder','Flip Flop'],
            // type: 'MCQs',
            // correctAnswer: 'Flip Flop',
            
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
            <h1 id="heading">CO ASSESSMENT</h1>
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

export default COassessment;
