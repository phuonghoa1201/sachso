// services/questionService.js

const Exercise = require("../../models/exercise/Exercise");
const Question = require("../../models/question/question");
const User = require("../../models/user");


async function getAllQuestionsService(filter = {}) {
  try {
    // Chỉ lấy những field cần hiển thị
    const questions = await Question.find(filter)
      .select("_id content gradeId unitId questionTypeId imageUrl audioUrl")
      .populate("gradeId", "name")
      .populate("unitId", "name")
      .populate("questionTypeId", "name")
      .lean();
    return questions;
  } catch (err) {
    console.error("Question service error:", err);
    throw err;
  }
}

async function createExerciseService(userEmail, data) {
  try {
    // Lấy user hiện tại từ email trong JWT
    const user = await User.findOne({ email: userEmail });
    if (!user) throw new Error("User không tồn tại");

    const exercise = await Exercise.create({
      title: data.title,
      ex_type: data.ex_type,
      color: data.color,
      requirement: data.requirement,
      score: data.score,
      teacher_id: user._id,
      class_id: data.class_id,
      questions: data.questions
    });

    await exercise.populate("questions");
    return exercise;

  } catch (err) {
    throw err;
  }
}

const getExerciseService = async () => {
  try {
    const exercises = await Exercise.find({}, "title questions"); // chỉ lấy title và questions

    // map lại để trả về đúng định dạng bạn cần
    const simplified = exercises.map(ex => ({
      _id: ex._id,
      title: ex.title,
      totalQuestions: ex.questions.length
    }));

    return simplified;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài tập:", error);
    return null;
  }
};

const deleteExerciseService = async (exerciseId) => {
  try {
    // Kiểm tra bài tập tồn tại
    const existingExerciseTable = await Exercise.findById(exerciseId);
    if (!existingExerciseTable) {
      console.log(`Không tìm bài tập`);
      return {
        EC: 1,
        EM: "Không tìm thấy bài tập",
        DT: null
      };
    }

    // Xóa exercise khỏi database
    const result = await Exercise.deleteOne({ _id: exerciseId });

    return {
      EC: 0,
      EM: "Xóa exercise thành công",
      DT: result
    };

  } catch (error) {
    console.log("Error in delete exercise Table", error);
    return {
      EC: 2,
      EM: error.message || "Lỗi server không xác định",
      DT: null
    };
  }
}

module.exports = {
  createExerciseService,
  getAllQuestionsService,
  createExerciseService,
  getExerciseService,
  deleteExerciseService
};
