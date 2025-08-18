require("dotenv").config();

const { error } = require("console");
const { cloudinary } = require("../../config/cloudinary");
const Question = require('../../models/question/question');
const fs = require('fs')


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
        // Sau khi thêm câu hỏi thành công thì populate lại một lần nữa để get câu hỏi ra được đúng
        const populatedQuestion = await Question.findById(newQuestion._id)
            .populate('gradeId', 'name')
            .populate('unitId', 'name')
            .populate('skillId', 'name')
            .populate('questionTypeId', 'name')
            .populate('cognitionLevelId', 'name');
        console.log("Populated question:", populatedQuestion);


        return {
            EC: 0,
            EM: "Thêm câu hỏi thành công!",
            DT: populatedQuestion,
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

        const populatedResult = await Question.findById(result._id)
            .populate('gradeId', 'name')
            .populate('unitId', 'name')
            .populate('skillId', 'name')
            .populate('questionTypeId', 'name')
            .populate('cognitionLevelId', 'name');

        return {
            EC: 0,
            EM: "Cập nhật câu hỏi thành công",
            DT: populatedResult
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
// Xử lý upload lên Cloudinary
// file: file gửi, type: để biết nó lưu vào unit ì dạng ì
const uploadFileService = async (file, type) => {
    // Promise: vì phải chờ Cloudinary giải quyết
    return new Promise((resolve, reject) => {
        // tạo stream upload
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: type === 'audio' ? 'uploads/audio' : 'uploads/images',
                resource_type: type === 'audio' ? 'video' : 'image'

            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url)
            }
        )
        stream.end(file.buffer)
    })
}

// const viewQuestionService = async (questionId) => {
//     try {
//         const question = await Question.findById(questionId)

//         if (!question) {
//             console.log("Không tìm thấy câu hỏi");
//             return {
//                 EC: 1,
//                 EM: "Không tìm thấy câu hỏi",
//                 DT: null
//             };
//         }

//         // Lấy stt Ví dụ: lấy tất cả câu hỏi cùng unitId để sắp xếp

//         return {
//             EC: 0,
//             EM: "Xem chi tiết câu hỏi thành công",
//             DT: question
//         };
//     } catch (error) {
//         console.error("Lỗi khi xem chi tiết câu hỏi:", error);
//         return {
//             EC: -1,
//             EM: "Đã xảy ra lỗi trong quá trình xử lý",
//             DT: null
//         };
//     }

// }

const viewQuestionService = async (questionId) => {
    try {
        // Lấy tất cả câu hỏi, sắp xếp theo stt
        const allQuestions = await Question.find({}).sort({ stt: 1 });

        // Tìm câu hỏi cần xem
        const questionIndex = allQuestions.findIndex(q => q._id.toString() === questionId);
        const question = allQuestions[questionIndex];

        if (!question) {
            return { EC: 1, EM: "Không tìm thấy câu hỏi", DT: null };
        }

        // stt chính là index + 1 trong danh sách
        const stt = questionIndex + 1;

        return {
            EC: 0,
            EM: "Xem chi tiết câu hỏi thành công",
            DT: { ...question.toObject(), stt }
        };
    } catch (error) {
        console.error("Lỗi khi xem chi tiết câu hỏi:", error);
        return { EC: -1, EM: "Đã xảy ra lỗi trong quá trình xử lý", DT: null };
    }
};

const deleteQuestionService = async (questionId) => {
    try {
        const existingQuestion = await Question.findById(questionId)
        if (!existingQuestion) {
            console.log("Không tìm thấy câu hỏi");
            return {
                EC: 1,
                EM: "Không tìm thấy câu hỏi",
                DT: null
            };

        }
        const result = await Question.deleteOne({ _id: questionId })
        return {
            EC: 0,
            EM: "Xóa câu hỏi thành công",
            DT: result
        };

    } catch (error) {
        console.log("Error in delete Question Table", error);
        return {
            EC: 2,
            EM: error.message || "Lỗi server không xác định",
            DT: null
        };
    }
}

module.exports = {
    getQuestionService,
    addQuestionService,
    editQuestionService,
    uploadFileService,
    viewQuestionService,
    deleteQuestionService
};
