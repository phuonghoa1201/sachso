const { createUserService, handleLoginService } = require("../services/userService");


// console.log("Check req.body", req.body);
const createUser = async (req, res) => {
    const { name, email, password, level, phone, date } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name || !email || !password) {
        return res.status(400).json({
            EC: 1,
            EM: "Thiếu các trường bắt buộc: name, email, password"
        });
    }
    try {
    const data = await createUserService({ name, email, password, level, phone, date });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(error.statusCode || 500).json({
      EC: 1,
      EM: error.message || "Lỗi server không xác định"
    });
  }
};



const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await handleLoginService(email, password)
    return res.status(200).json(data)

}


module.exports = {
    createUser,
    handleLogin,

}