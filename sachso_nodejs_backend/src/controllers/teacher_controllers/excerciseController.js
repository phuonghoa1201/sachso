const { getAllQuestionsService, createExerciseService, getExerciseService, deleteExerciseService } = require("../../services/teacher_services/manageExerciseService");

async function getQuestions(req, res) {
  try {
    const { class_id } = req.query;

    // tạo filter nếu muốn
    const filter = {};

    const questions = await getAllQuestionsService(filter);
    res.json({
      EC: 0,              
      EM: "Lấy câu hỏi thành công", 
      DT: questions       
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ EC: 1, EM: "Lỗi server", DT: [] });
  }
}


async function addExercise(req, res) {
  try {
    console.log("Body nhận được từ client:", req.body);
    const exercise = await createExerciseService(req.user.email, req.body);
    res.status(201).json(exercise);
  } catch (err) {
    console.error("Create Exercise error:", err.message);
    res.status(500).json({ message: err.message || "Lỗi server" });
  }
}

const getExercise = async (req, res) => {

  const data = await getExerciseService();

  return res.status(200).json(data)

}

const deleteExercise = async (req, res) => {
  const exerciseId = req.params.id;
  try {
    const result = await deleteExerciseService(exerciseId);

    return res.status(200).json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    });
  } catch (error) {
    console.error("Lỗi controller khi xóa exercise", error);
    return res.status(500).json({
      EC: 99,
      EM: "Lỗi server không xác định",
      DT: null
    });
  }
}

module.exports = {
     getQuestions,
     addExercise,
     getExercise,
     deleteExercise
    };