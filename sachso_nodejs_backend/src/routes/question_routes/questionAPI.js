const express = require('express');

const auth = require('../../middleware/auth');

const authorizeRole = require('../../middleware/authorizeRole');
const {uploadFields} = require('../../middleware/uploadFields')
const { getQuestion, addQuestion, editQuestion, uploadFiles, viewQuestion, deleteQuestion } = require('../../controllers/question_controllers/manageQuestionController');
const { connectCloudinary, cloudinary } = require('../../config/cloudinary')
connectCloudinary()


const questionAPI = express.Router();

questionAPI.all("*", auth);

// admin manage questions page
questionAPI.get("/question", authorizeRole(['admin']), getQuestion)
questionAPI.post("/add-question", authorizeRole(['admin']), addQuestion)
questionAPI.put("/edit-question/:id", authorizeRole(["admin"]), editQuestion)

questionAPI.post("/upload",uploadFields, authorizeRole(["admin"]), uploadFiles )

questionAPI.get("/view-question/:id", authorizeRole(["admin"]), viewQuestion)
questionAPI.delete("/delete-question/:id",authorizeRole(["admin"]),deleteQuestion)


module.exports = questionAPI; //export default