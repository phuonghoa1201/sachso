const mongoose = require("mongoose");
require("dotenv").config();

const Grade = require("./question/grade");
const Skill = require("./question/skill");
const QuestionType = require("./question/questionType");
const CognitionLevel = require("./question/cognitionLevel");
const Unit = require("./question/unit");
const Question = require("./question/question")

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);

    console.log("✅ Connected to MongoDB");


    const questionData = {
      content: "What is the capital of France?",
      unitId: "6895c04766d6e5473e3d484d",          // Thay bằng ObjectId thật của bạn
      gradeId: "689330784d3b4a2b25729f81",        // Thay bằng ObjectId thật của bạn
      skillId: "689330784d3b4a2b25729f8e",         // "L" skill
      cognitionLevelId: "689330784d3b4a2b25729f96", // "Nhận biết"
      requirement:"Listen, read and tick the correct answer.",
      questionTypeId: "689330784d3b4a2b25729f93", // Thay bằng ObjectId thật của bạn
      answerType: "text",
      answers: [
        { content: "Paris", isCorrect: true },
        { content: "London", isCorrect: false },
        { content: "Berlin", isCorrect: false },
        { content: "Madrid", isCorrect: false }
      ],
      // createdAt: new Date(),
      // updatedAt: new Date()
    };

    const newQuestion = new Question(questionData);
    await newQuestion.save();

    console.log("Seed question thành công:", newQuestion._id);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Lỗi khi seed question:", error);
  }
}


seed();