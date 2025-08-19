const { getClassService, addClassService, viewClassDetailService } = require("../../services/teacher_services/manageClassService");

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
module.exports = {
    getViewClass,
    addClass,
    getViewDetailClass
}