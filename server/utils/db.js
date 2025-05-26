const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;

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
