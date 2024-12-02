// quiz-router.js
const express = require("express");
const router = express.Router();
const quizzControllers = require("../controller/quiz-controller");

router.get("/allusersResult", quizzControllers.getQuizResults);
router.get("/quizzes", quizzControllers.getAllQuizzes);
router.get("/:quizId", quizzControllers.getQuizQuestions); 
router.post("/submit", quizzControllers.submitQuiz);
router.get("/results/:userId", quizzControllers.getUserResults);

module.exports = router;
