import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizDetails.css';

export const QuizDetails = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [questionsVisible, setQuestionsVisible] = useState({});
    const [questions, setQuestions] = useState({});
    const [showQuizForm, setShowQuizForm] = useState(false);
    const [newQuiz, setNewQuiz] = useState({
        title: '',
        questions: [{ questionText: '', options: ['', '', '', ''], answer: '' }]
    });

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('/api/quiz/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };
        fetchQuizzes();
    }, []);

    const toggleQuestionsVisibility = async (quizId) => {
        if (!questions[quizId]) {
            try {
                const response = await axios.get(`/api/quiz/${quizId}`);
                setQuestions((prevState) => ({
                    ...prevState,
                    [quizId]: response.data.questions,
                }));
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }
        setQuestionsVisible((prevState) => ({
            ...prevState,
            [quizId]: !prevState[quizId],
        }));
    };

    const handleAddQuiz = () => {
        setShowQuizForm(!showQuizForm);
    };

    const handleQuizChange = (e) => {
        const { name, value } = e.target;
        setNewQuiz((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = newQuiz.questions.map((q, i) => {
            if (i === index) return { ...q, [field]: value };
            return q;
        });
        setNewQuiz((prevState) => ({ ...prevState, questions: updatedQuestions }));
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = newQuiz.questions.map((q, i) => {
            if (i === questionIndex) {
                const updatedOptions = q.options.map((opt, idx) => (idx === optionIndex ? value : opt));
                return { ...q, options: updatedOptions };
            }
            return q;
        });
        setNewQuiz((prevState) => ({ ...prevState, questions: updatedQuestions }));
    };

    const handleAddQuestion = () => {
        setNewQuiz((prevState) => ({
            ...prevState,
            questions: [...prevState.questions, { questionText: '', options: ['', '', '', ''], answer: '' }]
        }));
    };

    const handleSubmitQuiz = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/create', newQuiz);
            setQuizzes([...quizzes, response.data.quiz]);
            setNewQuiz({ title: '', questions: [{ questionText: '', options: ['', '', '', ''], answer: '' }] });
            setShowQuizForm(false);
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    return (
        <section className="quiz-details-section">
            <header className="section-header">
                <h1 className="section-title">Quiz Details</h1>
            </header>
            <button onClick={handleAddQuiz} className="add-quiz-btn">
                {showQuizForm ? 'Cancel' : 'Add Quiz'}
            </button>

            {showQuizForm && (
                <form className="quiz-form" onSubmit={handleSubmitQuiz}>
                    <input
                        type="text"
                        name="title"
                        value={newQuiz.title}
                        onChange={handleQuizChange}
                        placeholder="Quiz Title"
                        required
                    />
                    {newQuiz.questions.map((question, index) => (
                        <div key={index} className="question-field">
                            <input
                                type="text"
                                value={question.questionText}
                                onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
                                placeholder="Question Text"
                                required
                            />
                            {question.options.map((option, idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, idx, e.target.value)}
                                    placeholder={`Option ${idx + 1}`}
                                    required
                                />
                            ))}
                            <input
                                type="text"
                                value={question.answer}
                                onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                                placeholder="Correct Answer"
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddQuestion} className="add-question-btn">
                        Add Question
                    </button>
                    <button type="submit" className="submit-quiz-btn">Submit Quiz</button>
                </form>
            )}

            <div className="quiz-list">
                {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <div key={quiz._id} className="quiz-card">
                            <h2 className="quiz-title">{quiz.title}</h2>
                            <div className="quiz-actions">
                                <button
                                    onClick={() => toggleQuestionsVisibility(quiz._id)}
                                    className="show-questions-btn"
                                >
                                    {questionsVisible[quiz._id] ? 'Hide Questions' : 'Show Questions'}
                                </button>
                            </div>
                            {questionsVisible[quiz._id] && questions[quiz._id] && (
                                <div className="questions-list">
                                    <ul>
                                        {questions[quiz._id].map((question, index) => (
                                            <li key={index} className="question-item">
                                                <p className="question-text">{question.questionText}</p>
                                                <ul className="question-options">
                                                    {question.options.map((option, idx) => (
                                                        <li key={idx} className="question-option">{option}</li>
                                                    ))}
                                                </ul>
                                                <p className="correct-answer">
                                                    Correct Answer: {question.answer}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="no-quizzes">No quizzes found</p>
                )}
            </div>
        </section>
    );
};
