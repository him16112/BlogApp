const mongoose = require("mongoose");
require('dotenv').config();
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error: ", err));
  

module.exports = mongoose;




