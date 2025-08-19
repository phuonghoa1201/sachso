require("dotenv").config();
const jwt = require('jsonwebtoken');

const authorizationRole = (roles) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
            return res.status(401).json({ message: "Thiếu token" });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

           
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Không có quyền truy cập" });
            }

            // req.user = decoded;
            next();

        } catch (err) {
            return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
        }
    };
};

module.exports = authorizationRole;