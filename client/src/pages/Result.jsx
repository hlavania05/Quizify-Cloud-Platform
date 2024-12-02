import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Result.css";

export const Result = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchQuizResults(userId);
    } else {
      setError("User not logged in");
      setLoading(false);
    }
  }, [userId]); 

  const fetchQuizResults = async (userId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `/api/quiz/results/${userId}`
      );
      console.log("API Response:", response.data); 

      if (response.data && response.data.length > 0) {
        setQuizResults(response.data);
      } else {
        setError("No results found for this user.");
      }
    } catch (err) {
      setError("Error fetching quiz results.");
    } finally {
      setLoading(false);
    }
  }; 

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  return (
    <div className="result-container">
      <h2 className="result-title">Your Quiz Results</h2>
      {loading ? (
        <div className="loading">Loading results...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : quizResults.length === 0 ? (
        <div className="no-results">No results available.</div>
      ) : (
        quizResults.map((result) => {
          const { quizId, score, createdAt } = result;
          const { title, questions } = quizId;

          return (
            <div key={result._id} className="quiz-result">
              <h3 className="quiz-title">{title}</h3>
              <p className="quiz-score">
                <strong>Score:</strong> {score}/{questions.length}
              </p>
              <p className="quiz-date">
                <strong>Date Taken:</strong> {formatDate(createdAt)}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};
