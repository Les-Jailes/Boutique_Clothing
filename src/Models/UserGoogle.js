import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: String, 
  gender: String,
  imagePath: String,
});

module.exports = mongoose.model('User', userSchema);
