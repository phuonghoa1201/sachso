require('dotenv').config();
const express = require('express'); //commonjs
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./routes/api');
const connection = require('./config/database');
const { getHomepage } = require('./controllers/homeController');
const cors = require('cors')


const app = express();
const port = process.env.PORT || 8888;

// config cors
app.use(cors());

//config req.body
// cau hinh request body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config template engine
configViewEngine(app);


app.use('/v1/api/', apiRoutes);
//khai báo route
app.use('/', getHomepage);
// lỗi cors chỉ bị lỗi khi gọi từ browser lên phía server



(async () => {
    try {
        //using mongoose
        await connection();

        app.listen(port, () => {
           console.log(` Backend Nodejs App đang chạy tại: http://localhost:${port}`);
        })
    } catch (error) {
        console.log(">>> Error connect to DB: ", error)
    }
})()
