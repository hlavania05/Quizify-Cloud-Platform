const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Quizify API Documentation",
      version: "1.0.0",
      description: "API documentation for Quizify project using Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000", // Update if needed
      },
    ],
  },
  apis: ["./router/*.js"], // Adjust path if your route is somewhere else
};

module.exports = swaggerJsDoc(options);
