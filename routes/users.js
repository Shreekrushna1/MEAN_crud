const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CRUD');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  email: String,
  mobile: Number,
  created_at: String,
  updated_at: String
});

module.exports = mongoose.model("Users", userSchema);