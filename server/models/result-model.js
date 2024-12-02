const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: [{ type: String }], 
    score: { type: Number, required: true },
  },
  { timestamps: true }
);

const QuizResult = mongoose.model("QuizResult", quizResultSchema);
module.exports = QuizResult;
