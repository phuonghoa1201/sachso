const express = require('express');
const { createUser, handleLogin } = require('../controllers/userController');
const {getUser, addUser, editUser, deleteUser, viewUser} = require('../controllers/manageUserController')
const auth = require('../middleware/auth');

const authorizeRole = require('../middleware/authorizeRole');
// const { getQuestion, addQuestion } = require('../controllers/question_controllers/manageQuestionController');


const routerAPI = express.Router();

routerAPI.all("*", auth);

// truyen tat ca cac thong tin cua thang router truyen qua function
routerAPI.post("/register", createUser)
routerAPI.post("/login", handleLogin)
routerAPI.get("/user",authorizeRole(['admin']), getUser)
// admin manage user
routerAPI.post("/add-user", authorizeRole(["admin"]), addUser )
routerAPI.put("/edit-user/:id", authorizeRole(["admin"]), editUser)
routerAPI.delete("/delete-user/:id", authorizeRole(['admin']), deleteUser)
routerAPI.get("/view-user/:id", authorizeRole(['admin']), viewUser)
// routerAPI.put("user/role")

// routerAPI.get("/question", authorizeRole(['admin']), getQuestion)



module.exports = routerAPI; //export default