const express = require('express');

const auth = require('../../middleware/auth');

const authorizeRole = require('../../middleware/authorizeRole');
const { getQuestion, addQuestion, editQuestion } = require('../../controllers/question_controllers/manageQuestionController');



const questionAPI = express.Router();

questionAPI.all("*", auth);

// admin manage questions page
questionAPI.get("/question", authorizeRole(['admin']), getQuestion)
questionAPI.post("/add-question", authorizeRole(['admin']), addQuestion)
questionAPI.put("/edit-question/:id", authorizeRole(["admin"]), editQuestion)
module.exports = questionAPI; //export default