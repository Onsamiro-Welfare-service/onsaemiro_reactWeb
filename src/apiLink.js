// const baseURL = `https://test.onsaemiro.site/api`; // 기본 api 주소
const baseURL = `https://test.onsaemiro.site/api`;
export const API = {
    // 회원가입 요청 API
    "manageRegister": `${baseURL}/member/register/manager`, 
    "manageDoubleCheck" : `${baseURL}/auth/login/doublecheck`, // 아이디 중복체크
    "departmentGetList": `${baseURL}/member/auth/department/all`, // 부서 리스트

    // 로그인 요청 API
    "loginAdmin": `${baseURL}/member/auth/login/manager`,
    // 로그아웃 요청 API
    "manageLogout": `${baseURL}/member/manager/manager/logout`,

    // "LoginIdCheck": `${baseURL}/member/auth/login/doublecheck`,
};
