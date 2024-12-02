const Quiz = require("../models/quiz-model");
const QuizResult = require("../models/result-model.js");
const User = require("../models/user-model");

const getAllQuizzes = async (req, res) => {
  try {
    console.log("Fetching all quizzes...");
    const quizzes = await Quiz.find({}, "title description");
    console.log("Fetched quizzes:", quizzes);
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching quizzes", error: error.message });
  }
};

const getQuizQuestions = async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    res.status(500).json({ message: "Error fetching quiz questions" });
  }
};

// Submit quiz result
const submitQuiz = async (req, res) => {
  const { quizId, userId, answers, score } = req.body;

  console.log("Received data:", req.body);

  if (!quizId || !userId || !answers) {
    console.log("Missing required fields");
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const quizResult = new QuizResult({
      quizId,
      userId,
      answers,
      score,
    });

    await quizResult.save();
    console.log("Quiz result saved:", quizResult);
    res
      .status(200)
      .json({ message: "Quiz submitted successfully", result: quizResult });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res
      .status(500)
      .json({ message: "Error submitting quiz", error: error.message });
  }
};

// Get results for a specific user by userId
const getUserResults = async (req, res) => {
  const { userId } = req.params;

  try {
    const results = await QuizResult.find({ userId }).populate({
      path: "quizId",
      select: "title questions",
      populate: {
        path: "questions",
        select: "questionText answer",
      },
    });

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No results found for this user" });
    }
    res.status(200).json(results);
  } 
  catch (error) {
    console.error("Error fetching quiz results:", error);
    res
      .status(500)
      .json({ message: "Error fetching quiz results", error: error.message });
  }
};

// fetch all quiz results
const getQuizResults = async (req, res) => {
  try {
    console.log("Fetching all Results...");
    
    const results = await QuizResult.find()
      .populate({
        path: 'quizId', 
        select: 'title questions.length', 
      })
      .populate({
        path: 'userId', 
        select: 'username', 
      });

    const transformedResults = results.map(result => ({
      score: `${result.score}/${result.quizId?.questions.length || 0}`, 
      quizName: result.quizId?.title || "Unknown Quiz", 
      userName: result.userId?.username || "Anonymous User",
      dateTaken: result.createdAt || "Unknown Date",  
    }));

    console.log("Transformed results:", transformedResults);
    res.status(200).json(transformedResults);
  } 
  catch (error) {
    console.error("Error fetching results:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching quiz results", error: error.message });
  }
};


module.exports = {
  getAllQuizzes,
  getQuizQuestions,
  submitQuiz,
  getUserResults,
  getQuizResults,
};
