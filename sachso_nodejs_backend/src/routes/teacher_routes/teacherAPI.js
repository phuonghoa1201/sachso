const express = require('express');

const auth = require('../../middleware/auth');

const authorizeRole = require('../../middleware/authorizeRole');
const { getViewClass, addClass, getViewDetailClass, editClass, deleteClass } = require('../../controllers/class_controllers/manageClassControllers');
const { getQuestions, addExercise, getExercise, deleteExercise } = require('../../controllers/teacher_controllers/excerciseController');



const teacherAPI = express.Router();

teacherAPI.all("*", auth);

// teacher manage class page
teacherAPI.get("/view-class",authorizeRole(['teacher']), getViewClass)
teacherAPI.post("/add-class", authorizeRole(['teacher']), addClass)
teacherAPI.get("/view-class/:id", authorizeRole(["teacher"]), getViewDetailClass)
teacherAPI.put("/edit-class/:id", authorizeRole(["teacher"]), editClass)
teacherAPI.delete("/delete-class/:id",authorizeRole(["teacher"]), deleteClass)

// teacher create excercise
teacherAPI.get("/questions", authorizeRole(["teacher", "admin"]), getQuestions)
teacherAPI.post("/add-exercise", authorizeRole(["teacher", "admin"]), addExercise)
teacherAPI.get("/exercises/:classId",authorizeRole(["teacher", "admin"]),getExercise )
teacherAPI.delete("/delete-exercise/:id", authorizeRole(["teacher",'admin']), deleteExercise)


module.exports = teacherAPI; //export default