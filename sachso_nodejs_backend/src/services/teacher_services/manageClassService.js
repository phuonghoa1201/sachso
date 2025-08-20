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

const editClassService = async (classId, updatedData) => {
  try {
    const {
      gradeId, nameofClass, noteClass
    } = updatedData;
    // {$set: updatedData}: chỉ update những field có trong body
    // {new: true}: trả về doc mới
    const updatedClass  = await Class.findByIdAndUpdate(classId, { $set: updatedData }, { new: true }).populate("gradeId", "name")

    if (!updatedClass ) {
      return {
        EC: 1,
        EM: "Không tìm thấy lớp học",
        DT: null,
      };
    }
    return {
      EC: 0,
      EM: "Cập nhật lớp học thành công",
      DT: updatedClass,

    }

  } catch (error) {
    console.error("Error in editClassService:", error);
    return {
      EC: 2,
      EM: error.message || "Lỗi server không xác định",
      DT: null,
    };
  }
};
// const editClassService = async (classId, updatedData) => {
//   try {
//     const {
//       gradeId, nameofClass, noteClass
//     } = updatedData;

//     const existingClass = await Class.findById(classId);
//     if (!existingClass) {
//       return {
//         EC: 1,
//         EM: "Không tìm thấy lớp học",
//         DT: null
//       };
//     }

//     // Cập nhật thông tin (nếu không có giá trị mới thì giữ nguyên)
//     existingClass.gradeId = gradeId || existingClass.gradeId;
//     existingClass.nameofClass = nameofClass || existingClass.nameofClass;
//     existingClass.noteClass = noteClass || existingClass.noteClass;

//     const result = await existingClass.save();

//     const populatedResult = await Class.findById(result._id)
//       .populate('gradeId', 'name')

//     return {
//       EC: 0,
//       EM: "Cập nhật lớp học",
//       DT: populatedResult
//     };

//   } catch (error) {
//     console.error("Error in editClassService:", error);
//     return {
//       EC: 2,
//       EM: error.message || "Lỗi server không xác định",
//       DT: null
//     };
//   }
// };

const deleteClassService = async (classId) => {
    try {
        // Kiểm tra lớp học có tồn tại hay không
        const existingClass = await Class.findById(classId);
        if (!existingClass) {
            console.log(`Không tìm thấy class`);
            return {
                EC: 1,
                EM: "Không tìm thấy clss",
                DT: null
            };
        }

        // Xóa class khỏi database
        const result = await Class.deleteOne({ _id: classId });

        return {
            EC: 0,
            EM: "Xóa lớp học thành công",
            DT: result
        };

    } catch (error) {
        console.log("Error in delete classTable", error);
        return {
            EC: 2,
            EM: error.message || "Lỗi server không xác định",
            DT: null
        };
    }
}




module.exports = {
  getClassService,
  addClassService,
  viewClassDetailService,
  editClassService,
  deleteClassService
}