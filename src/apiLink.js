// const baseURL = `https://test.onsaemiro.site/api`; // 기본 api 주소
const baseURL = `https://onsaemiro.site/test/api/`;
export const API = {
    "manageRegister": `${baseURL}/auth/register/manager`,
    "manageDoubleCheck" : `${baseURL}/auth/login/doublecheck`,

    "loginAdmin": `${baseURL}/auth/login/manager`,
    "departmentGetList": `${baseURL}/auth/department/all`,
    
    "manageLogout": `${baseURL}/management/manager/logout`
};
