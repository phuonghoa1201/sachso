require('dotenv').config();
const express = require('express'); 
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./routes/api');
const dropdownRoutes = require('./routes/question_routes/dropdownAPI')
const connection = require('./config/database');
const { getHomepage } = require('./controllers/homeController');
require('./models/question/grade');
require('./models/question/unit');
require('./models/question/skill');
require('./models/question/questionType');
require('./models/question/cognitionLevel');
const cors = require('cors');
const questionAPI = require('./routes/question_routes/questionAPI');


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
app.use('/v1/api/dropdowns/', dropdownRoutes)
app.use('/v1/api/', questionAPI)

//khai báo route
app.use('/', getHomepage);
// lỗi cors chỉ bị lỗi khi gọi từ browser lên phía server



(async () => {
    try {
        //using mongoose
        await connection();

        app.listen(port, () => {
           console.log(`Backend Nodejs App đang chạy tại: http://localhost:${port}`);
        })
    } catch (error) {
        console.log(">>> Error connect to DB: ", error)
    }
})()
