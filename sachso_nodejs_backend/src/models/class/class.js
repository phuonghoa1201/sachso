const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  gradeId: { type: mongoose.Schema.Types.ObjectId, ref: "Grade", required: true },
  nameofClass: { type: String, required: true, unique: true },
  totalStudent: { type: Number, default: 0 },
  noteClass: { type: String },
  shortCode: { type: String, unique: true },
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;