const req = require('express/lib/request');
const {getGradeService, getUnitService, getLevelService, getSkillService, getQuestionTypeService} = require('../../services/question_services/dropdownsService')

const getGrade =  async (req, res) => {
    try {
        const grade_data = await getGradeService()
        return res.status(200).json(grade_data)   
    } catch (error) {
        console.log("Error in get Grade", error);
        return res.status(500).json({message: "Internal server error", error: error.message }) 
        
    }
}
const getUnit = async (req, res) => {
    try {
        const unit_data = await getUnitService()
        return res.status(200).json(unit_data)
    } catch (error) {
        console.log("Error in get Unit data", error);
        return res.status(500).json({message:"Internal server err", error: error.message})
        
        
    }
}

const getLevel = async (req, res) => {
    try {
        const level_data = await getLevelService()
        return res.status(200).json(level_data)
    } catch (error) {
        console.log("Error in get level data", error);
        return res.status(500).json({message:"Internal server err", error: error.message})
        
        
    }
}
const getSkill = async (req, res) => {
    try {
        const skill_data = await getSkillService()
        return res.status(200).json(skill_data)
    } catch (error) {
        console.log("Error in get skill data", error);
        return res.status(500).json({message:"Internal server err", error: error.message})
        
        
    }
}
const getQuestionType = async (req, res) => {
    try {
        const question_type_data = await getQuestionTypeService();
        return res.status(200).json(question_type_data)
        
    } catch (error) {
        console.log("Error in get question type data", error);
        return res.status(500).json({message: "Internal server err", error: error.message})
          
    }
}
module.exports = {
    getGrade,
    getUnit,
    getLevel,
    getSkill,
    getQuestionType

}
