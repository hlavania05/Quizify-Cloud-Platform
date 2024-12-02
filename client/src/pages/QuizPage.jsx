import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './QuizPage.css'; 

export const QuizPage = () => {
    const { quizId } = useParams();
    const [quizData, setQuizData] = useState({});
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await fetch(`/api/quiz/${quizId}`);
                if (!response.ok) {
                    throw new Error("Quiz not found");
                }
                const data = await response.json();
                setQuizData(data);
            } catch (error) {
                setErrorMessage("Error loading quiz data. Please try again later.");
            }
        };

        fetchQuizData();
    }, [quizId]);

    const handleAnswerChange = (e, questionId) => {
        setSelectedAnswers((prev) => {
            const updatedAnswers = prev.filter((ans) => ans.questionId !== questionId);
            updatedAnswers.push({ questionId, answer: e.target.value });
            return updatedAnswers;
        });
    };

    const calculateScore = () => {
        let score = 0;
        quizData.questions?.forEach((question) => {
            const selectedAnswer = selectedAnswers.find((ans) => ans.questionId === question._id);
            if (selectedAnswer && selectedAnswer.answer === question.answer) {
                score++;
            }
        });
        return score;
    };

    const handleSubmitQuiz = async (event) => {
        event.preventDefault();
    
        if (!userId) {
            console.error("User not logged in");
            setErrorMessage("Please log in to submit your quiz.");
            return;
        }
    
        if (selectedAnswers.length !== quizData.questions?.length) {
            setErrorMessage("Please answer all the questions before submitting.");
            return;
        }
    
        const score = calculateScore(); 
    
        try {
            const response = await fetch("/api/quiz/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quizId,
                    userId,
                    answers: selectedAnswers.map(ans => ans.answer), 
                    score,
                }),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                console.log("Quiz submitted successfully:", result);
                navigate("/results", { state: { result } });
            } else {
                setErrorMessage(result.message || "Error submitting quiz");
                console.error("Error submitting quiz:", result.message || "Unknown error");
            }
        } catch (error) {
            setErrorMessage("Error submitting quiz. Please try again later.");
            console.error("Error submitting quiz:", error);
        }
    };

    return (
        <div className="quiz-container">
            <h2 className="quiz-title">{quizData.title}</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmitQuiz} className="quiz-form">
                {quizData.questions?.map((question) => (
                    <div key={question._id} className="question-container">
                        <p className="question-text">{question.questionText}</p>
                        {question.options.map((option, index) => (
                            <div key={index} className="option-container">
                                <input
                                    type="radio"
                                    id={option}
                                    name={`question_${question._id}`}
                                    value={option}
                                    onChange={(e) => handleAnswerChange(e, question._id)}
                                    className="option-input"
                                />
                                <label htmlFor={option} className="option-label">{option}</label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit" className="submit-btn">Submit Quiz</button>
            </form>
        </div>
    );
};
