const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const authRouter = require("./router/auth-router");
const quizRouter = require("./router/quiz-router");
const connectdb = require("./utils/db");
// Swagger Middlewares 
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// CORS configuration
const corsOptions = {
    // origin: "http://quizify.zapto.org",
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const urlLog = (req, res, next) => {
    console.log(req.url);
    next()
    
}

app.use(urlLog);

// Routers
app.use("/api/auth", authRouter);
app.use("/api/quiz", quizRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});

// Server start
const PORT = 3000;
connectdb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: http://localhost:${PORT}`);
        console.log(`Swagger is running on: http://localhost:${PORT}/api-docs`);

    });
});
