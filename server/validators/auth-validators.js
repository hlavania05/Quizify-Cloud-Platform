// auth-validators.js
const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long.")
    .max(255, "Name must not exceed 255 characters."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .min(3, "Email must be at least 3 characters long.")
    .max(255, "Email must not exceed 255 characters."),

  password: z
    .string()
    .min(7, "Password must be at least 7 characters long.")
    .max(1024, "Password cannot exceed 1024 characters."),
});

module.exports = signupSchema;
