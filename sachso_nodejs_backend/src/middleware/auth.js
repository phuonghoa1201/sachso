require('dotenv').config();

const jwt = require("jsonwebtoken");
const User = require('../models/user');
// thằng middileware có ba tham số
const auth = async (req, res, next) => {

    // white_list: là những cái end point mà bạn không muốn nó xác thực >< blacklist
    // const white_lists = ["/", "/register", "/login"]

    // if (white_lists.find(item => '/v1/api' + item === req.originalUrl)) {
    //     next();
    const white_lists = ["/", "/register", "/login"]

    if (white_lists.includes(req.url)) {
        next();

    } else {
        if (req.headers && req.headers.authorization) {
            // lôi bearer token từ front end dề
            const token = req.headers.authorization.split(' ')[1];

            // verify token
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                // Lấy user từ DB
                const user = await User.findOne({ email: decoded.email });
                if (!user) return res.status(404).json({ message: "User not found" });

                req.user = {
                    email: decoded.email,
                    name: decoded.name,
                    phone: user.phone 
                }
                console.log("check token >>", decoded)
                console.log("Check res", req.user);
                
                next();
            } catch (error) {
                return res.status(401).json({
                    message: "Token hêt hạn/ ko hợp lệ"
                })
            }
        } else {
            // 401 - authorization
            return res.status(401).json({
                message: "Bạn chưa truyền Access Token ở header/ Hặc token bị hết hạn"
            })
        }

    }

}

module.exports = auth;
