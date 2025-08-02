require("dotenv").config()
const User = require("../models/user");


const getUserService = async () => {
    try {
        // truyền biến obj rỗng là lấy tất cả người dùng
        let result = await User.find({}).select("-password")
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const addUserService = async (userTableData) => {
    try {
        const { name, email, role, level, phone, date, status } = userTableData;

        // check user exist
        const existingTableUser = await User.findOne({ email });
        if (existingTableUser) {
            console.log(`User exist, Chọn email khác: ${email}`);
            return {
                EC: 1,
                EM: "Email đã tồn tại",
                DT: null
            };
        }
        // save user to database
        const result = await User.create({
            name,
            email,
            role,
            level,
            phone,
            date: date || new Date(),
            status
        });

        return {
            EC: 0,
            EM: "Thêm người dùng thành công",
            DT: result
        };

    } catch (error) {
        console.log("Error in add userTable", error);
        return {
            EC: 2,
            EM: error.message || "Lỗi server không xác định",
            DT: null
        };
    }
}
const editUserService = async (userId, updatedData) => {
    try {
        const { name, email, role, level, phone, date, status } = updatedData;

        // tim user trung voi id
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            console.log(`Không tìm thấy người dùng`);
            return {
                EC: 1,
                EM: "Không tìm thấy người dùng",
                DT: null
            };
        }
        // kiểm tra email trùng thì thay đổi
        if (email && email == !existingUser.email) {
            const emailExist = await User.findOne({ email });
            if (emailExist) {
                return {
                    EC: 2,
                    EM: "Email đã tồn tại",
                    DT: null

                }
            }
        }
        // update infor
        existingUser.name = name || existingUser.name
        existingUser.email = email || existingUser.email
        existingUser.role = role || existingUser.role
        existingUser.level = level || existingUser.level
        existingUser.phone = phone || existingUser.phone
        existingUser.date = date || existingUser.date
        existingUser.status = status || existingUser.status

        const result = await existingUser.save()

        const userObject = result.toObject();
        delete userObject.password;

        return {
            EC: 0,
            EM: "Thêm người dùng thành công",
            DT: userObject
        };

    } catch (error) {
        console.log("Error in update userTable", error);
        return {
            EC: 3,
            EM: error.message || "Lỗi server không xác định",
            DT: null
        };
    }


}
const deleteUserService = async (userId) => {
    try {
        // Kiểm tra người dùng tồn tại
        const existingUserTable = await User.findById(userId);
        if (!existingUserTable) {
            console.log(`Không tìm thấy người dùng`);
            return {
                EC: 1,
                EM: "Không tìm thấy người dùng",
                DT: null
            };
        }

        // Xóa người dùng khỏi database
        const result = await User.deleteOne({ _id: userId });

        return {
            EC: 0,
            EM: "Xóa người dùng thành công",
            DT: result
        };

    } catch (error) {
        console.log("Error in delete userTable", error);
        return {
            EC: 2,
            EM: error.message || "Lỗi server không xác định",
            DT: null
        };
    }
}

const viewUserService = async (userId) => {
    try {
        const user = await User.findById(userId).select("-password"); 

        if (!user) {
            console.log("Không tìm thấy người dùng");
            return {
                EC: 1,
                EM: "Không tìm thấy người dùng",
                DT: null
            };
        }

        return {
            EC: 0,
            EM: "Xem chi tiết người dùng thành công",
            DT: user
        };
    } catch (error) {
        console.error("Lỗi khi xem chi tiết người dùng:", error);
        return {
            EC: -1,
            EM: "Đã xảy ra lỗi trong quá trình xử lý",
            DT: null
        };
    }

}




module.exports = {
    getUserService,
    addUserService,
    editUserService,
    deleteUserService,
    viewUserService
}