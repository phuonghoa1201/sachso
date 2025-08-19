// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//     role: String,
// });

// const User = mongoose.model('user', userSchema);

// module.exports = User;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['student', 'teacher', 'admin'] },
  level: { type: String },
  phone: { type: String },
  date: { type: Date },
  status: { type: String, default: "pending" },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
