const { getQuestionService, addQuestionService, editQuestionService } = require("../../services/question_services/manageQuestionService");

const getQuestion = async (req, res) => {
  try {
    const data = await getQuestionService();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error in getQuestion:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
const addQuestion = async (req, res) => {
  console.log('Request body:', req.body);
  const { gradeId, unitId, skillId, questionTypeId, requirement, cognitionLevelId, audioUrl, imageUrl, readingText, content, answerType, answers } = req.body;
  try {
    const dataQuestion = await addQuestionService({ gradeId, unitId, skillId, questionTypeId, requirement, cognitionLevelId, audioUrl, imageUrl, readingText, content, answerType, answers })
    return res.status(200).json(dataQuestion)
  } catch (error) {
    console.log("Error in create question", error);
    return res.status(error.statusCode || 500).json({
      EC: 1,
      EM: error.message || "Lỗi server không xác định"
    });
  }
}

const editQuestion = async (req, res) => {
  const questionId = req.params.id;
  const updatedData = req.body;

  const result = await editQuestionService(questionId, updatedData)
  return res.status(200).json(result)
}


module.exports = {
  getQuestion,
  addQuestion,
  editQuestion
}