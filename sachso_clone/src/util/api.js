import axios from "./axios.customize";

const createUserApi = (name, email, password, level, phone, date) => {
    return axios.post("/v1/api/register", {
        name,
        email,
        password,
        level,
        phone,
        date
    });
};

const loginApi = (email, password) => {
    const URL_API = "/v1/api/login"
    const data = {
        // viết tắt thui chứ thiệt ra là truyền vào
        email, password
    }
    return axios.post(URL_API, data)
}
// api manage user
// get user from table
const getUserApi = () => {
    const URL_API = "/v1/api/user"
    return axios.get(URL_API)
}

const addUserApi = (name, email, role, level, phone, date) => {
    const URL_API = "v1/api/add-user"
    const dataAddUser = {
        name, email, role, level, phone, date
    }
    return axios.post(URL_API, dataAddUser)
}

const editUserApi = (id, dataEditUser) => {
    const URL_API = `v1/api/edit-user/${id}`;
    return axios.put(URL_API, dataEditUser);
}

const deleteUserApi = (id) => {
    const URL_API = `v1/api/delete-user/${id}`;
    return axios.delete(URL_API)
}
const viewUserApi = (id) => {
    const URL_API = `v1/api/view-user/${id}`;
    return axios.get(URL_API)

}

// mangae question
const getQuestionApi = () => {
    const URL_API = "/v1/api/question"
    return axios.get(URL_API)
}
const addQuestionApi = (gradeId, unitId, skillId, questionTypeId, cognitionLevelId, requirement, audioUrl, imageUrl, readingText, content, answerType, answers) => {
    const URL_API = "v1/api/add-question"
    const dataAddQuestion = {
        gradeId, unitId, skillId, questionTypeId, cognitionLevelId, requirement, audioUrl, imageUrl, readingText, content, answerType, answers
    }
    return axios.post(URL_API, dataAddQuestion)

}
const editQuestionApi = (id, dataEditQuestion) => {
    const URL_API = `v1/api/edit-question/${id}`;
    return axios.put(URL_API, dataEditQuestion);
}
// vì file này xuất ra nhiều file api
export {
    createUserApi,
    loginApi,
    getUserApi,
    addUserApi,
    editUserApi,
    deleteUserApi,
    viewUserApi,
    getQuestionApi,
    addQuestionApi,
    editQuestionApi

} 