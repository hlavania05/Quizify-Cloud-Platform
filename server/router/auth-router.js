// auth-router.js
const express = require("express");
const router = express.Router();
const authControllers = require("../controller/auth-controller");
const signupSchema = require("../validators/auth-validators");
const validate = require("../middlewares/validate-middleware");

router.route("/").get(authControllers.home);
router.route('/register').post(validate(signupSchema), authControllers.register);
router.route('/login').post(authControllers.login);
router.post("/create", authControllers.createQuiz);
router.get('/userDetails', authControllers.getAllUsers);
router.post('/contact', authControllers.submitContact);
router.delete('/deleteUser/:id', authControllers.deleteUser);

module.exports = router;