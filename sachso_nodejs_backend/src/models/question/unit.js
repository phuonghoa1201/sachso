// Mỗi unit thuộc 1 grades
const mongoose = require('mongoose')
const unitSchema = new mongoose.Schema({
    gradeId: { type: mongoose.Schema.Types.ObjectId, ref: "Grade", required: true },
    name: { type: String, required: true },

});

const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;