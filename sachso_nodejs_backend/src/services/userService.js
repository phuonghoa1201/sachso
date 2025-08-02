require("dotenv").config()
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// muối 
const saltRounds = 10;

// const createUserService = async (name, email, password) => {
//     try {
//         // check user exist
//         const user = await User.findOne({ email });
//         if (user) {
//             console.log(`User exist, Chọn email khác ${email}`);
//             // email khác thì để phần logic dưới này ko chạy nữa
//             return null;

//         }
//         // hash user password
//         // hàm hash của con bcrypt
//         // nó sẽ hash cái password và độ mặn của muối. ncl thuộc tính có sẵn trong thằng bcrypt
//         const hashPassword = await bcrypt.hash(password, saltRounds)
//         // save user to database
//         let result = await User.create({
//             name: name,
//             email: email,
//             password: hashPassword,
//             role: "student"
//         })
//         return result;

//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }
const createUserService = async (userData) => {
    try {
        const { name, email, password, level, phone, date } = userData;

        // check user exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`User exist, Chọn email khác: ${email}`);
            const error = new Error("Email đã tồn tại")
            error.statusCode = 409;
            throw error
        }

        // hash user password
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // save user to database
        const result = await User.create({
            name,
            email,
            password: hashPassword,
            role:"student",
            level,
            phone,
            date: date || new Date() 
        });

        return result;
    } catch (error) {
        console.log("Error in createUserService:", error);
        return null;
    }
};

const handleLoginService = async (email, password) => {
    try {

        // fetch user by email- timf ng dungf coi email có tồn tại ko
        // email: thuoc tinh db- email: input
        // ham find tra ra arr
        const user = await User.findOne({ email: email })
        if (user) {
            // compare password bcrypt
            // console.log("Check User", user)
            // truyen  input mk ng dung => hash(password ng dung luu database)
            const isMatchPassword = await bcrypt.compare(password, user.password)
            if (!isMatchPassword) {
                return {
                    EC: 2,
                    EM: "Email/Password không hợp lệ "

                }
            } else {
                // create an access token
                //  để mà truyền tới accesstoken 
                // gọi hàm sign(payload: data bạn muốn token chứa cái data, mã hóa (phần màu tím)), đặt mk coi tính bải mật

                //  create an access token
                const payload = {
                    email: user.email,
                    name: user.name,
                    role: user.role

                }
                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRED
                    }
                )
                // Trả access token cho front_end
                return {
                    EC: 0,
                    access_token,
                    // trả ra data của nười dùng
                    user: {
                        email: user.email,
                        name: user.name,
                        // role: user.role

                    }

                }

            }
        } else {
            return {
                EC: 1,
                EM: "Email/Password không hợp lệ "

            }
        }
    } catch (error) {
        console.log(error);
        return null;


    }
}



module.exports = {
    createUserService,
    handleLoginService,
  
}