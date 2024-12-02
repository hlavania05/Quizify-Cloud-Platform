const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const authRouter = require("./router/auth-router");
const quizRouter = require("./router/quiz-router");
const connectdb = require("./utils/db");

// CORS configuration
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routers
app.use("/api/auth", authRouter);
app.use("/api/quiz", quizRouter);

// Server start
const PORT = 5000;
connectdb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });
});
