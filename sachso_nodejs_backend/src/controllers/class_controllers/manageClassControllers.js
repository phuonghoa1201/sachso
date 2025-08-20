const { getClassService, addClassService, viewClassDetailService, editClassService, deleteClassService } = require("../../services/teacher_services/manageClassService");

const getViewClass = async (req, res) => {

  const data = await getClassService();

  return res.status(200).json(data)

}

const addClass = async (req, res) => {
  console.log('Request body:', req.body);
  const { gradeId, nameofClass, totalStudent, noteClass, shortCode  } = req.body;
  try {
    const dataClass = await addClassService({ gradeId, nameofClass, totalStudent, noteClass, shortCode})
    return res.status(200).json(dataClass)
  } catch (error) {
    console.log("Error in create class", error);
    return res.status(error.statusCode || 500).json({
      EC: 1,
      EM: error.message || "Lỗi server không xác định"
    });
  }
}

const getViewDetailClass = async(req, res) => {
    const classId = req.params.id;
    const data = await viewClassDetailService(classId)

    return res.status(200).json(data)

}

const editClass = async (req, res) => {
  const classId = req.params.id;
  const updatedData = req.body;

  const result = await editClassService(classId, updatedData)
  return res.status(200).json(result)

}

const deleteClass = async (req, res) => {
  const classId = req.params.id;
  try {
    const result = await deleteClassService(classId);

    return res.status(200).json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    });
  } catch (error) {
    console.error("Lỗi controller khi xóa class:", error);
    return res.status(500).json({
      EC: 99,
      EM: "Lỗi server không xác định",
      DT: null
    });
  }
}
module.exports = {
    getViewClass,
    addClass,
    getViewDetailClass,
    editClass,
    deleteClass
}