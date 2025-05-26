import React, { useState, useEffect } from "react";
import "./UserResultDetails.css";

export const UserResultDetails = () => {
  const [userResults, setUserResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserResults = async () => {
      try {
        const response = await fetch(
          "/api/quiz/allusersResult"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setUserResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserResults();
  }, []);

  return (
    <div className="user-result-container">
      <div className="user-result-details">
        <h2>All Users' Results</h2>
        {isLoading && <p className="loading-message">Loading results...</p>}
        {error && <p className="error-message">{error}</p>}
        {!isLoading && !error && (
          <div className="result-list">
            {userResults.length > 0 ? (
              userResults.map((result, index) => (
                <div className="result-card" key={index}>
                  <div className="result-card-header">
                    <p className="user-name">
                      <strong>User:</strong> {result.userName}
                    </p>
                    <p className="quiz-title">
                      <strong>Quiz:</strong> {result.quizName}
                    </p>
                  </div>
                  <div className="result-card-body">
                    <p className="user-score">
                      <strong>Score:</strong> {result.score}
                    </p>
                    <p className="date-taken">
                      <strong>Date Taken:</strong>{" "}
                      {new Date(result.dateTaken).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
