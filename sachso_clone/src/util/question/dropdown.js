import axios from "../axios.customize"
const getGradeAPI = () => {
    const URL_API = "/v1/api/dropdowns/grade"
    return axios.get(URL_API)
}
const getUnitApi = () => {
    const URL_API = "/v1/api/dropdowns/unit"
    return axios.get(URL_API)
}
const getSkillApi = () => {
    const URL_API = "/v1/api/dropdowns/skill"
    return axios.get(URL_API)
}
const getQuestionTypeApi = () => {
    const URL_API = "/v1/api/dropdowns/question-type"
    return axios.get(URL_API)

}
const getCognitionSelectorApi = () => {
    const URL_API = "/v1/api/dropdowns/cognition-level"
    return axios.get(URL_API)

}
export {
    getGradeAPI,
    getUnitApi,
    getSkillApi,
    getQuestionTypeApi,
    getCognitionSelectorApi

} 