require("dotenv").config()
const Grade = require('../../models/question/grade')
const Unit = require('../../models/question/unit')
const CognitionLevel = require('../../models/question/cognitionLevel')
const Skill = require('../../models/question/skill')
const QuestionType = require('../../models/question/questionType')
const getGradeService = async () => {
    try {
        let grade = await Grade.find({})
        return grade

    } catch (error) {
        console.log(error);
        return null;

    }
}
const getUnitService = async () => {
    try {
        let unit = await Unit.find().populate('gradeId','name')
        return unit

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getLevelService = async () => {
    try {
        let cognitionLevel = await CognitionLevel.find({})
        return cognitionLevel

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getSkillService = async () => {
    try {
        let cogSkill = await Skill.find({})
        return cogSkill

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getQuestionTypeService = async () => {
    try {
        let questionType = await QuestionType.find({})
        return questionType
    } catch (error) {
        console.log(error);
        return null;

    }
}

module.exports = {
    getGradeService,
    getUnitService,
    getLevelService,
    getSkillService,
    getQuestionTypeService
}