// const baseURL = `https://test.onsaemiro.site/api`; // 기본 api 주소
const baseURL = `https://test.onsaemiro.site/api`;
export const API = {
    // 회원가입 요청 API
    "manageRegister": `${baseURL}/member/register/manager`, // 관리자 회원가입
    "manageDoubleCheck" : `${baseURL}/member/auth/login/doublecheck`, // 아이디 중복체크
    "departmentGetList": `${baseURL}/member/auth/department/all`, // 부서 리스트

    // 로그인 요청 API
    "loginAdmin": `${baseURL}/member/auth/login/manager`, // 관리자 로그인
    // 로그아웃 요청 API
    "manageLogout": `${baseURL}/member/manager/manager/logout`, // 로그아웃
    // RefreshToken 요청 API
    "refreshToken": `${baseURL}/member/auth/newtoken`, // 토큰 재발급


    // 유저 프로필 페이지 요청 API
    "userProfileList": `${baseURL}/member/user/management/department/get`, // 유저 프로필 리스트 받아오기
    "userProfileCreate": `${baseURL}/member/register/user`, // 유저 프로필 등록
    "userProfileUpdate": `${baseURL}/member/user/change`, // 유저 프로필 수정
    "getUserLoginCode": `${baseURL}/member/auth/user/loginCode`, // 유저 로그인 코드 받아오기
    "deleteUserProfile": `${baseURL}/member/user/delete`, // 유저 프로필 삭제

    // 유저 답변 페이지 요청 API
    "userSurveyAnswer": `${baseURL}/survey/answer`, // 유저 답변 페이지 받아오기

    // 카테고리 요청 API
    "getCategoryList": `${baseURL}/survey/category/get`, // 카테고리 리스트 받아오기
    "getCategorySurveyList": `${baseURL}/survey/get/category`, // 카테고리별 설문 리스트 받아오기

    // 질문 페이지 요청 API
    "createSurvey": `${baseURL}/survey/management/add`, // 설문 추가
    "modifySurvey": `${baseURL}/survey/management/change`, // 설문 수정
    "deleteSurvey": `${baseURL}/survey/management/delete`, // 설문 삭제
    "changeSurveyOrder": `${baseURL}/survey/management/num/change`, // 질문 순서 변경

    // 유저 요구사항 페이지 요청 API
    "getRequirementList": `${baseURL}/request/get/all/bymanager`, // 요구사항 리스트 받아오기
    "getNewRequirementList": `${baseURL}/request/get/new`, // 새로운 요구사항 리스트 받아오기
    "checkRequirement": `${baseURL}/request/check`, // 요구사항 확인
    "deleteRequirement": `${baseURL}/request/delete`, // 요구사항 삭제
};
