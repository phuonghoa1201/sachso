const express = require('express')
const auth = require('../../middleware/auth');
const authorizeRole = require('../../middleware/authorizeRole')
const Grade = require('../../models/question/grade');
const Unit = require('../../models/question/unit')
const { getGrade, getUnit, getLevel, getSkill, getQuestionType } = require('../../controllers/question_controllers/dropdownsController');

const routerDropdowns = express.Router();

routerDropdowns.all("*", auth);

routerDropdowns.get("/grade", authorizeRole(['admin','teacher']), getGrade)
routerDropdowns.get("/unit", authorizeRole(['admin','teacher']), getUnit)
routerDropdowns.get("/cognition-level",authorizeRole(['admin','teacher']), getLevel)
routerDropdowns.get("/skill",authorizeRole(['admin','teacher']), getSkill )
routerDropdowns.get("/question-type", authorizeRole(['admin','teacher']), getQuestionType)

module.exports = routerDropdowns;