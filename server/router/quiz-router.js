const express = require("express");
const router = express.Router();
const quizzControllers = require("../controller/quiz-controller");

/**
 * @swagger
 * tags:
 *   name: Quiz
 *   description: Quiz management and results
 */

/**
 * @swagger
 * /api/quiz/allusersResult:
 *   get:
 *     summary: Get quiz results of all users
 *     tags: [Quiz]
 *     responses:
 *       200:
 *         description: Returns all users' quiz results
 */
router.get("/allusersResult", quizzControllers.getQuizResults);

/**
 * @swagger
 * /api/quiz/quizzes:
 *   get:
 *     summary: Get all quizzes
 *     tags: [Quiz]
 *     responses:
 *       200:
 *         description: Returns a list of quizzes
 */
router.get("/quizzes", quizzControllers.getAllQuizzes);

/**
 * @swagger
 * /api/quiz/submit:
 *   post:
 *     summary: Submit a quiz
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quizId, userId, answers, score]
 *             properties:
 *               quizId:
 *                 type: string
 *               userId:
 *                 type: string
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     answer:
 *                       type: string
 *               score:
 *                 type: number
 *     responses:
 *       200:
 *         description: Quiz submitted successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error submitting quiz
 */
router.post("/submit", quizzControllers.submitQuiz);


/**
 * @swagger
 * /api/quiz/results/{userId}:
 *   get:
 *     summary: Get quiz results of a specific user
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Returns the user’s quiz results
 */
router.get("/results/:userId", quizzControllers.getUserResults);

module.exports = router;
