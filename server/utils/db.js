const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/quiz_admin";

const connectdb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection successful to db");
  } 
  catch (error) {
    console.error("database connection failed");
    process.exit(0);
  }
};

module.exports = connectdb;
