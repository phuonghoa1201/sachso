import axios from "../axios.customize"

const getClassApi = () => {
    const URL_API = "/v1/api/teacher/view-class"
    return axios.get(URL_API)
}

const addClassApi = (gradeId, nameofClass, totalStudent, noteClass) => {
    const URL_API = "v1/api/teacher/add-class"
    const dataAddClass = {
        gradeId, nameofClass, totalStudent, noteClass
    }
    return axios.post(URL_API, dataAddClass)

}

const viewClassApi = (id) => {
    const URL_API = `v1/api/teacher/view-class/${id}`;
    return axios.get(URL_API)

}

const getAllQuestionsApi = () => {
    const URL_API = `v1/api/teacher/questions`;
    return axios.get(URL_API)

}

const addExerciseApi = (payload) => {
    const URL_API = "v1/api/teacher/add-exercise";
    return axios.post(URL_API, payload);
};

const getExerciseApi = () => {
    const URL_API = "/v1/api/teacher/exercises"
    return axios.get(URL_API)
}

const deleteExerciseApi = (id) => {
    const URL_API = `v1/api/teacher/delete-exercise/${id}`;
    return axios.delete(URL_API)
}

export {
    getClassApi,
    addClassApi,
    viewClassApi,
    addExerciseApi,
    getAllQuestionsApi,
    getExerciseApi,
    deleteExerciseApi


} 