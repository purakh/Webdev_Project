import React, { useState, useRef } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
    const [index, setIndex] = useState(0); // Index should start from 0 to match array indexing
    const [question, setQuestion] = useState(data[0]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const option_array = [Option1, Option2, Option3, Option4];

    const checkAns = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans - 1].current.classList.add("correct");
            }
        }
    };

    const nextQuestion = () => {
        if (index < data.length - 1) {
            setIndex(index + 1);
            setQuestion(data[index + 1]);
            setLock(false);
            option_array.forEach(option => {
                option.current.classList.remove("correct", "wrong");
            });
        } else {
            setQuizCompleted(true);
        }
    };

    const resetQuiz = () => {
        setIndex(0);
        setQuestion(data[0]);
        setLock(false);
        setScore(0);
        setQuizCompleted(false);
        option_array.forEach(option => {
            option.current.classList.remove("correct", "wrong");
        });
    };

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            <h2>{index + 1}. {question.question}</h2>
            <ul>
                <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
            </ul>
            {quizCompleted ? (
                <button onClick={resetQuiz}>Reset</button>
            ) : (
                <button onClick={nextQuestion}>Next</button>
            )}
            <div className="index">{index + 1} of {data.length} Questions</div>
            {quizCompleted && <div className="score">Your score is: {score}</div>}
        </div>
    );
};

export default Quiz;
