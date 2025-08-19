const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  title: { type: String, required: true },        
  ex_type: { type: String, required: true },      
  color: { type: String, required: true },       
  requirement: { type: String, required: true }, 
  score: { type: Number, required: true },  
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ai tạo
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },   // Lớp
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],            // Array question_id
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);