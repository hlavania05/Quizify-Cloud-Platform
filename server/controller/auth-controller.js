//  auth-controller.js
const User = require("../models/user-model");
const Quiz = require("../models/quiz-model");
const Contact = require("../models/contact-info");
const bycrpt = require("bcryptjs");

//-----------------Home page logic---------------------
const home = async (req, res) => {
  try {
    res.status(200).send("welcome to our Quizify Platform");
  } catch (error) {
    console.log(error);
  }
};

// -----------Registration logic---------------------
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password, isAdmin } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "email already exist" });
    }

    // hash the password
    const saltRound = 10;
    const hash_password = await bycrpt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      password: hash_password,
      isAdmin,
    });

    res.status(201).json({
      msg: "registration successfull",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
      isAdmin: userCreated.isAdmin,
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

//------------------------ User Login Logic--------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const user = await bycrpt.compare(password, userExist.password);
    if (user) {
      res.status(200).json({
        msg: "Login successfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
        username: userExist.username,
        isAdmin: userExist.isAdmin ? userExist.isAdmin : false,
      });
    } 
    else {
      res.status(401).json({ msg: "Invalid email or Password" });
    }
  } catch (error) {
    res.status(500).json("Internal server error!");
  }
};

// Create a new quiz
const createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const quiz = await Quiz.create({ title, questions });
    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error });
  }
};

//---------------------- get details of all user-------------
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
};

//----------------------save contact info-----------------------
const submitContact = async (req, res) => {
  try {
    const { username, email, message } = req.body;
    if (!username || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newContact = new Contact({
      username,
      email,
      message,
    });
    await newContact.save();
    res.status(201).json({ message: "Contact information saved successfully" });
  } 
  catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving contact information" });
  }
};

// ------------------------------------------------------------------------
const deleteUser = async (req, res) => {
  try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
          return res.status(404).json({ msg: 'User not found' });
      }
      res.status(200).json({ msg: 'User deleted successfully' });
  } 
  catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'An error occurred while deleting the user' });
  }
};

module.exports = {
  home,
  register,
  login,
  createQuiz,
  getAllUsers,
  submitContact,
  deleteUser,
};
