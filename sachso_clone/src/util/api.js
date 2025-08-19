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

const getAccountApi = () => {
    const URL_API = "/v1/api/account"
    return axios.get(URL_API)
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
// Bởi vì back end dùng multer nên nó expect nhận file qua multipart/ data
// multipart /form data: là chuẩn http để gửi file và dữ liêu text cùng lúc
const uploadFileApi = (imageFile, audioFile) => {
    const URL_API = "v1/api/upload"
    const formData = new FormData();

    if (imageFile) formData.append("image", imageFile);
    if (audioFile) formData.append("audio", audioFile)

    return axios.post(URL_API, formData, {
        headers: {
            "Content-Type" : "multipart/form-data"
        }
    } )
}

const viewQuestionApi = (id) => {
    const URL_API = `v1/api/view-question/${id}`;
    return axios.get(URL_API)

}

const deleteQuestionApi = (id) => {
    const URL_API = `v1/api/delete-question/${id}`;
    return axios.delete(URL_API)
}
// vì file này xuất ra nhiều file api
export {
    createUserApi,
    loginApi,
    getAccountApi,
    getUserApi,
    addUserApi,
    editUserApi,
    deleteUserApi,
    viewUserApi,
    getQuestionApi,
    addQuestionApi,
    editQuestionApi,
    uploadFileApi,
    viewQuestionApi,
    deleteQuestionApi

} 