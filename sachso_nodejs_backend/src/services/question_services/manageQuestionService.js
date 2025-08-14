require("dotenv").config();

const Question = require('../../models/question/question');
const questionAPI = require("../../routes/question_routes/questionAPI");

const getQuestionService = async () => {
    try {
        const questions = await Question.find()
            .populate('gradeId', 'name')
            .populate('unitId', 'name')
            .populate('skillId', 'name')
            .populate('questionTypeId', 'name')
            .populate('cognitionLevelId', 'name');

        return {
            EC: 0,
            EM: "Lấy câu hỏi thành công",
            DT: questions,
        };
    } catch (error) {
        console.error('Error in getQuestionService [EC=2]:', error);
        return {
            EC: 2,
            EM: error.message || "Lỗi server không xác định",
            DT: null,
        };
    }
};

const addQuestionService = async (questionTableData) => {
    try {
        const {
            gradeId,
            unitId,
            skillId,
            questionTypeId,
            cognitionLevelId,
            requirement,
            audioUrl,
            imageUrl,
            readingText,
            content,
            answerType,
            answers,
        } = questionTableData;

        const newQuestion = await Question.create({
            gradeId,
            unitId,
            skillId,
            questionTypeId,
            cognitionLevelId,
            requirement,
            audioUrl,
            imageUrl,
            readingText,
            content,
            answerType,
            answers,
        });

        return {
            EC: 0,
            EM: "Thêm câu hỏi thành công!",
            DT: newQuestion,
        };
    } catch (error) {
        console.error("Error in addQuestionService:", error);
        return {
            EC: 1,
            EM: error.message || "Lỗi server không xác định",
            DT: null,
        };
    }
};

const editQuestionService = async (questionId, updatedData) => {
    try {
        const {
            gradeId,
            unitId,
            skillId,
            questionTypeId,
            cognitionLevelId,
            requirement,
            audioUrl,
            imageUrl,
            readingText,
            content,
            answerType,
            answers
        } = updatedData;

        const existingQuestion = await Question.findById(questionId);
        if (!existingQuestion) {
            return {
                EC: 1,
                EM: "Không tìm thấy câu hỏi",
                DT: null
            };
        }

        // Cập nhật thông tin (nếu không có giá trị mới thì giữ nguyên)
        existingQuestion.gradeId = gradeId || existingQuestion.gradeId;
        existingQuestion.unitId = unitId || existingQuestion.unitId;
        existingQuestion.skillId = skillId || existingQuestion.skillId;
        existingQuestion.questionTypeId = questionTypeId || existingQuestion.questionTypeId;
        existingQuestion.cognitionLevelId = cognitionLevelId || existingQuestion.cognitionLevelId;
        existingQuestion.requirement = requirement || existingQuestion.requirement;
        existingQuestion.audioUrl = audioUrl || existingQuestion.audioUrl;
        existingQuestion.imageUrl = imageUrl || existingQuestion.imageUrl;
        existingQuestion.readingText = readingText || existingQuestion.readingText;
        existingQuestion.content = content || existingQuestion.content;
        existingQuestion.answerType = answerType || existingQuestion.answerType;
        existingQuestion.answers = answers || existingQuestion.answers;

        const result = await existingQuestion.save();

        return {
            EC: 0,
            EM: "Cập nhật câu hỏi thành công",
            DT: {
                gradeId: result.gradeId,
                unitId: result.unitId,
                skillId: result.skillId,
                questionTypeId: result.questionTypeId,
                cognitionLevelId: result.cognitionLevelId,
                requirement: result.requirement,
                audioUrl: result.audioUrl,
                imageUrl: result.imageUrl,
                readingText: result.readingText,
                content: result.content,
                answerType: result.answerType,
                answers: result.answers
            }
        };

    } catch (error) {
        console.error("Error in editQuestionService:", error);
        return {
            EC: 2,
            EM: error.message || "Lỗi server không xác định",
            DT: null
        };
    }
};

module.exports = {
    getQuestionService,
    addQuestionService,
    editQuestionService
};
