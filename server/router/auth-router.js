// auth-router.js
const express = require("express");
const router = express.Router();
const authControllers = require("../controller/auth-controller");
const signupSchema = require("../validators/auth-validators");
const validate = require("../middlewares/validate-middleware");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Home route
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Returns the home route
 */
router.route("/").get(authControllers.home);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 token:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 isAdmin:
 *                   type: boolean
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.route('/register').post(validate(signupSchema), authControllers.register);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in
 */
router.route('/login').post(authControllers.login);

/**
 * @swagger
 * /api/auth/create:
 *   post:
 *     summary: Create a quiz
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - questions
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Indian Constitution Basics"
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                       example: "What is the length of the Indian Constitution?"
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *                     correctAnswer:
 *                       type: string
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 quiz:
 *                   type: object
 *       500:
 *         description: Error creating quiz
 */
router.post("/create", authControllers.createQuiz);


/**
 * @swagger
 * /api/auth/userDetails:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get('/userDetails', authControllers.getAllUsers);

/**
 * @swagger
 * /api/auth/contact:
 *   post:
 *     summary: Submit contact form
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - message
 *             properties:
 *               username:
 *                 type: string
 *                 example: "Anjali Sharma"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "anjali@example.com"
 *               message:
 *                 type: string
 *                 example: "I have a question regarding your quiz service."
 *     responses:
 *       201:
 *         description: Contact information saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contact information saved successfully
 *       400:
 *         description: All fields are required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: All fields are required
 *       500:
 *         description: Server error while saving contact info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while saving contact information
 */
router.post('/contact', authControllers.submitContact);


/**
 * @swagger
 * /api/auth/deleteUser/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete('/deleteUser/:id', authControllers.deleteUser);


module.exports = router;