// const baseURL = `https://test.onsaemiro.site/api`; // 기본 api 주소
const baseURL = `http://localhost:8080`;
export const API = {
    "manageRegister": `${baseURL}/auth/register/manager`,
    "newToken": `${baseURL}/auth/newtoken`,
    "loginAdmin": `${baseURL}/auth/login/manager`,
    "imgUpload": `${baseURL}/image/upload`,
    "imgGet": `${baseURL}/image`,
    "surveyAdd": `${baseURL}/management/survey/add`,
    "surveyAddImg": `${baseURL}/management/survey/add/image`,
    "surveyCategoryAdd": `${baseURL}/management/category/add`,
    "surveyAll": `${baseURL}/management/survey/get`,
    "surveyGet": `${baseURL}/management/survey/get/id/`,
    "surveyCategoryList": `${baseURL}/management/survey/category/`,
    "userInfoChange": `${baseURL}/management/user/change`,
    "userResigter": `${baseURL}/management/user/register`,
    "userListGet": `${baseURL}/management/department/users`,
    "userListPost": `${baseURL}/management/department/users`,
    "userDelete": `${baseURL}/managemnet/user/delete`,

    "departmentAdd": `${baseURL}/management/department/add`,
    "departmentGetList": `${baseURL}/auth/department/all`
};
