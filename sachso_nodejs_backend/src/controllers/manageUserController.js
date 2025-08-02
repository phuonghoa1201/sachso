const { getUserService, addUserService, editUserService, deleteUserService, viewUserService } = require("../services/manageUserService");
const getUser = async (req, res) => {

  const data = await getUserService();

  return res.status(200).json(data)

}

const addUser = async (req, res) => {
  const { name, email, role, level, phone, date, status } = req.body;
  const finalStatus = status || "pending";

  if (!name || !email) {
    return res.status(400).json({
      EC: 1,
      EM: "Thiếu các trường bắt buộc: name, email, password"
    });
  }
  try {
    const data = await addUserService({ name, email, role, level, phone, date, status: finalStatus });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(error.statusCode || 500).json({
      EC: 1,
      EM: error.message || "Lỗi server không xác định"
    });
  }
};

const editUser = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  const result = await editUserService(userId, updatedData)
  return res.status(200).json(result)


}

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await deleteUserService(userId);

    return res.status(200).json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    });
  } catch (error) {
    console.error("Lỗi controller khi xóa người dùng:", error);
    return res.status(500).json({
      EC: 99,
      EM: "Lỗi server không xác định",
      DT: null
    });
  }
}

const viewUser = async (req, res) => {
  const userId = req.params.id;
  const data = await viewUserService(userId);

  return res.status(200).json(data)

}
module.exports = {
  getUser,
  addUser,
  editUser,
  deleteUser,
  viewUser
}