const express = require('express')
const auth = require('../../middleware/auth');
const authorizeRole = require('../../middleware/authorizeRole')
const Grade = require('../../models/question/grade');
const Unit = require('../../models/question/unit')
const { getGrade, getUnit, getLevel, getSkill, getQuestionType } = require('../../controllers/question_controllers/dropdownsController');

const routerDropdowns = express.Router();

routerDropdowns.all("*", auth);

routerDropdowns.get("/grade", authorizeRole(['admin']), getGrade)
routerDropdowns.get("/unit", authorizeRole(['admin']), getUnit)
routerDropdowns.get("/cognition-level",authorizeRole(['admin']), getLevel)
routerDropdowns.get("/skill",authorizeRole(['admin']), getSkill )
routerDropdowns.get("/question-type", authorizeRole(['admin']), getQuestionType)

module.exports = routerDropdowns;