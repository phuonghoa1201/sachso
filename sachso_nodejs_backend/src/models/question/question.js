// Mỗi Question thuộc 1 grades
const mongoose = require('mongoose')
const questionSchema = new mongoose.Schema({
    gradeId: { type: mongoose.Schema.Types.ObjectId, ref: "Grade", required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
    skillId: { type: mongoose.Schema.Types.ObjectId, ref: "Skill", required: true },
    questionTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionType", required: true },
    cognitionLevelId: { type: mongoose.Schema.Types.ObjectId, ref: "CognitionLevel", required: true },
    requirement: { type: String, required: true },
    audioUrl: { type: String },
    imageUrl: { type: String },
    readingText: { type: String },
    content: { type: String },
    answerType: { type: String, required: true },
    answers: [
        {
            text: { type: String },
            imageUrl: { type: String },
            // audioUrl: { type: String },              
            isCorrect: { type: Boolean, required: true }

        }
    ],
    // createdAt: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;