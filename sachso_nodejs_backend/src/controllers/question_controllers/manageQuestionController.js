const { name } = require("ejs");
const { getQuestionService, addQuestionService, editQuestionService, uploadFileService, viewQuestionService, deleteQuestionService } = require("../../services/question_services/manageQuestionService");

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

const uploadFiles = async (req, res) => {
  try {
     console.log("req.files:", req.files);
    // req.file: obj do multer tạo ra khi upload nhiều file ?. : optional chainning
    // Lấy file đầu tiên trong image 
    // Lấy file từ req.files
    const imageFile = req.files?.image?.[0];
    const audioFile = req.files?.audio?.[0];

    const imageUrl = imageFile ? await uploadFileService(imageFile, 'image') : null;
    const audioUrl = audioFile ? await uploadFileService(audioFile, 'audio') : null;


    return res.status(200).json({message: 'Upload thành công !', imageUrl, audioUrl})

  } catch (error) {
    console.log("Error in upload images/ audio", error);
    return res.status(500).json({message: "Internal server error", error})
  
  }
}

const viewQuestion = async (req, res) => {
  const questionId = req.params.id;
  const data = await viewQuestionService(questionId);

  return res.status(200).json(data)

}

const deleteQuestion = async (req, res) => {
  const questionId = req.params.id;
  try {
    const result = await deleteQuestionService(questionId);

    return res.status(200).json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    });
  } catch (error) {
    console.error("Lỗi controller khi xóa câu hỏi:", error);
    return res.status(500).json({
      EC: 99,
      EM: "Lỗi server không xác định",
      DT: null
    });
  }
}

module.exports = {
  getQuestion,
  addQuestion,
  editQuestion,
  uploadFiles,
  viewQuestion,
  deleteQuestion

}