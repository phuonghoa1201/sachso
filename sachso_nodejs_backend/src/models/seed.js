// const mongoose = require("mongoose");
// require("dotenv").config();

// const Grade = require("./question/grade");
// const Skill = require("./question/skill");
// const QuestionType = require("./question/questionType");
// const CognitionLevel = require("./question/cognitionLevel");
// const Unit = require("./question/unit");
// const Question = require("./question/question")

// const seed = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_DB_URL);

//     console.log("✅ Connected to MongoDB");

//     const questionData = {
//       content: "What is the capital of France?",
//       unitId: "6895c04766d6e5473e3d484d",          // Thay bằng ObjectId thật của bạn
//       gradeId: "689330784d3b4a2b25729f81",        // Thay bằng ObjectId thật của bạn
//       skillId: "689330784d3b4a2b25729f8e",         // "L" skill
//       cognitionLevelId: "689330784d3b4a2b25729f96", // "Nhận biết"
//       requirement:"Listen, read and tick the correct answer.",
//       questionTypeId: "689330784d3b4a2b25729f93", // Thay bằng ObjectId thật của bạn
//       answerType: "text",
//       answers: [
//         { content: "Paris", isCorrect: true },
//         { content: "London", isCorrect: false },
//         { content: "Berlin", isCorrect: false },
//         { content: "Madrid", isCorrect: false }
//       ],
//       // createdAt: new Date(),
//       // updatedAt: new Date()
//     };

//     const newQuestion = new Question(questionData);
//     await newQuestion.save();

//     console.log("Seed question thành công:", newQuestion._id);

//     await mongoose.disconnect();
//   } catch (error) {
//     console.error("Lỗi khi seed question:", error);
//   }
// }


// seed();
// seedClass.js
const mongoose = require("mongoose");
require("dotenv").config();
const { customAlphabet } = require("nanoid");
const Class = require("./class/class"); // đường dẫn tới file model Class

// Khởi tạo hàm sinh shortCode gồm 6 ký tự A-Z0-9
const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("✅ Connected to MongoDB");

    // Xóa dữ liệu cũ trước khi seed
    await Class.deleteMany({});
    console.log("🗑️ Đã xóa dữ liệu cũ");

    // Dữ liệu test cho lớp học
    const classesData = [
      { gradeId: "689330784d3b4a2b25729f81", nameofClass: "Lớp 1A", noteClass: "Ghi chú lớp 1A" },
      { gradeId: "689330784d3b4a2b25729f82", nameofClass: "Lớp 2B", noteClass: "Ghi chú lớp 2B" },
      { gradeId: "689330784d3b4a2b25729f83", nameofClass: "Lớp 3C", noteClass: "Ghi chú lớp 3C" },
    ];

    for (let cls of classesData) {
      const newClass = new Class({
        ...cls,
        shortCode: nanoid(), // thêm shortCode khi seed
        totalStudent: 0 
      });
      await newClass.save();
      console.log("✅ Seed class thành công:", newClass.nameofClass, "-", newClass.shortCode);
    }
  } catch (error) {
    console.error("❌ Lỗi khi seed class:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

seed();


