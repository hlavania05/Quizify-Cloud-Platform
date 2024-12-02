import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./portal.css"; 

export const Portal = () => {
  const [username, setUsername] = useState("");
  const [quizzes, setQuizzes] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    console.log("Retrieved username from localStorage:", storedUsername); 
    setUsername(storedUsername);

    const fetchQuizzes = async () => {
      const response = await fetch("/api/quiz/quizzes");
      const data = await response.json();
      setQuizzes(data); 
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="portal-container">
      <h1 className="welcome-message">Welcome, {username}!</h1>{" "}

      <div className="quizzes-list">
        <h2 className="quizzes-title">Available Quizzes:</h2>
        <ul className="quiz-items">
          {quizzes !== null &&
            quizzes.map((quiz) => (
              <li key={quiz._id} className="quiz-item">
                <h3 className="quiz-title">{quiz.title}</h3>
                <NavLink to={`/quiz/${quiz._id}`} className="start-quiz-link">
                  <button className="start-quiz-btn">Start Quiz</button>
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
