const Class = require("../../models/class/class");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);

const getClassService = async () => {
    try {
        // truyền biến obj rỗng là lấy tất cả người dùng
        let result = await Class.find({})
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const addClassService = async (classTableData) => {
    try {
        const { gradeId, nameofClass, totalStudent, noteClass } = classTableData;

        const shortCode = classTableData.shortCode || nanoid();

        // save user to database
        const newClass = await Class.create({
            gradeId, nameofClass, totalStudent, noteClass, shortCode
        });
        const populatedClass = await Class.findById(newClass._id)
            .populate('gradeId', 'name')
        console.log("Populated classes:", populatedClass);

        return {
            EC: 0,
            EM: "Thêm lớp thành công",
            DT: populatedClass
        };

    } catch (error) {
        console.log("Error in add Class Table", error);
        return {
            EC: 2,
            EM: error.message || "Lỗi server không xác định",
            DT: null
        };
    }
}

const viewClassDetailService = async (classId) => {
  try {
    const clss = await Class.findById(classId)

    if (!clss) {
      return {
        EC: 1,
        EM: "Không tìm thấy lớp học",
        DT: null
      };
    }
    return {
      EC: 0,
      EM: "Xem chi tiết lớp học thành công",
      DT: clss
    };
  } catch (error) {
    console.error("Lỗi khi xem chi tiết lớp học", error);
    return {
      EC: -1,
      EM: "Đã xảy ra lỗi trong quá trình xử lý",
      DT: null
    };
  }
};


module.exports = {
    getClassService,
    addClassService,
    viewClassDetailService
}