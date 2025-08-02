require('dotenv').config
const jwt = require("jsonwebtoken")
// thằng middileware có ba tham số
const auth = (req, res, next) => {

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
                const decoded = jwt.verify(token, process.env.JWT_SECRET,)
                console.log("check token >>", decoded)
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
